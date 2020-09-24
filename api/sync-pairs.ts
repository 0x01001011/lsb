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

		const url = `https://api.incscan.io/pdex/candles/${pair}?granularity=3600&start=1468551184&end=${end}&reversed=false`
		const data = await Axios.get<any[]>(url)
		const last2Item = takeRight(data.data, 2)
		const record = { pair, data: data.data, last2Item, exchangeRate: 0 }

		if (last2Item.length === 2) {
			record.exchangeRate = last2Item[1].close - last2Item[0].close
		}

		await client.db('lsb').collection('trades').updateOne({ pair }, record, { upsert: true })
		res.json(record)
		await client.close()
	} catch (err) {
		console.error(err)
		res.status(501).json(err)
	}
}
