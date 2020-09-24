import { takeRight } from 'lodash'
import { NowRequest, NowResponse } from '@vercel/node'
import Axios from 'axios'
import { MongoClient } from 'mongodb'

export default async function syncPair(req: NowRequest, res: NowResponse) {
	try {
		const pair = req.query.pair as string
		console.log(pair)
		const end = Math.round(new Date().getTime() / 1000)
		const uri = 'mongodb+srv://lsb:NmDZmiPRYJBSTT4L@cluster0.kqbe4.gcp.mongodb.net/lsb?retryWrites=true&w=majority'
		const c = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
		const client = await c.connect()
		const collection = client.db('lsb').collection(pair)
		const lastItem = await collection.findOne({}, { sort: { time: -1 } })
		if (!lastItem) {
			const collection = await client.db('lsb').createCollection(pair)
			await collection.createIndex({ time: -1 })
			const url = `https://api.incscan.io/pdex/candles/${pair}?granularity=3600&start=1468551184&end=${end}&reversed=false`
			const { data } = await Axios.get<any[]>(url)
			const result = await collection.insertMany(data)
			res.json(result)
			await client.close()
			return
		}
		const startTime = lastItem.time
		const url = `https://api.incscan.io/pdex/candles/${pair}?granularity=3600&start=${startTime}&end=${end}&reversed=false`
		const { data } = await Axios.get<any[]>(url)
		if (data.length > 1) {
			const result = await collection.insertMany(data)
			res.json({ result, addMore: data })
			return
		}
		res.json({ noChangeFromURL: url })
	} catch (err) {
		console.error(err)
		res.status(501).json(err)
	}
}
