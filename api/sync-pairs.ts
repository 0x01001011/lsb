import { takeRight } from 'lodash'
import { NowRequest, NowResponse } from '@vercel/node'
import Axios from 'axios'
import { MongoClient } from 'mongodb'

export default async function syncPair(req: NowRequest, res: NowResponse) {
	try {
		const end = Math.round(new Date().getTime() / 1000)
		const uri = 'mongodb+srv://lsb:NmDZmiPRYJBSTT4L@cluster0.kqbe4.gcp.mongodb.net/lsb?retryWrites=true&w=majority'
		const c = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
		const client = await c.connect()
		const db = client.db('lsb')
		const pairsResponses = await Axios.get<string[]>('https://api.incscan.io/pdex/pairs')
		const tasks = pairsResponses.data.map(async (pair: string) => {
			console.log('process pair: ', pair)
			const collection = db.collection(pair)
			const lastItem = await collection.findOne({}, { sort: { time: -1 } })
			if (!lastItem) {
				try {
					console.log('create collection: ', pair)
					const collection = await db.createCollection(pair)
					await collection.createIndex({ time: -1, unique: true })
				} catch (err) {
					console.error(err)
				}
				const url = `https://api.incscan.io/pdex/candles/${pair}?granularity=86400&start=1468551184&end=${end}&reversed=false`
				const { data } = await Axios.get<any[]>(url)
				if (data.length === 0) {
					console.log('- pair empty data: ', pair)
					return { pair, result: [] }
				}
				console.log('- got data for pair: ', pair, data.length)
				const result = await collection.insertMany(data)
				return { pair, result }
			}
			const startTime = lastItem.time
			console.log('- only update data for pair: ', pair)
			const url = `https://api.incscan.io/pdex/candles/${pair}?granularity=86400&start=${startTime}&end=${end}&reversed=false`
			const { data } = await Axios.get<any[]>(url)
			if (data.length > 1) {
				const result = await collection.insertMany(data)
				return { pair, result }
			}
			return { pair, result: [] }
		})
		const results = await Promise.all(tasks)
		res.json(results)
	} catch (err) {
		console.error(err)
		res.status(501).json(err)
	}
}
