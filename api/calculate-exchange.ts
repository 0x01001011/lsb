import { takeRight } from 'lodash'
import { NowRequest, NowResponse } from '@vercel/node'
import Axios from 'axios'
import { Db, MongoClient } from 'mongodb'

interface PairItemInterface {
	close: number
	high: number
	open: number
	low: number
	time: string
}

let cachedDb: Db = null // Create cached connection variable

const connectToDatabase = async () => {
	if (!cachedDb) {
		const uri = 'mongodb+srv://lsb:NmDZmiPRYJBSTT4L@cluster0.kqbe4.gcp.mongodb.net/lsb?retryWrites=true&w=majority'
		const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
		const db = client.db('lsb')
		cachedDb = db // Cache the database connection
	}
	return cachedDb
}

export default async function calculateExchange(req: NowRequest, res: NowResponse) {
	try {
		const db = await connectToDatabase()

		const pairsResponses = await Axios.get<string[]>('https://api.incscan.io/pdex/pairs')
		const tasks = pairsResponses.data.map(async (pair: string) => {
			const last2Item = await db
				.collection(pair)
				.find<PairItemInterface>({}, { sort: { time: -1 }, limit: 7 })
				.toArray()
			console.log('load last 2 item of pair: ', pair, last2Item)
			return { pair, last2Item }
		})
		const allLast2Items = await Promise.all(tasks)
		const doc = allLast2Items.map((i) => {
			if (i.last2Item.length > 1) {
				const out = {
					pair: i.pair,
					exchange24h: calculateRate(i.last2Item[1], i.last2Item[0]),
					exchange24hPercent: 0,
					exchangeWeek: 0,
					exchangeWeekPercent: 0,
				}

				if (out.exchange24h !== 0) {
					out.exchange24hPercent = (out.exchange24h / i.last2Item[1].close) * 100
				}

				if (i.last2Item.length > 6) {
					out.exchangeWeek = calculateRate(i.last2Item[6], i.last2Item[0])
					if (out.exchangeWeek !== 0) {
						out.exchangeWeekPercent = (out.exchangeWeek / i.last2Item[6].close) * 100
					}
				}

				return out
			}
			return { pair: i.pair, last2Item: i.last2Item, exchange24h: 0 }
		})
		try {
			const collection = await db.createCollection('trade_view')
			await collection.createIndex({ viewName: -1 })
		} catch (err) {
			console.warn(err)
		}

		const updateListPairs = await db
			.collection('trade_view')
			.replaceOne({ viewName: 'PAIR_LIST' }, { viewName: 'PAIR_LIST', data: doc }, { upsert: true })

		res.json(updateListPairs)
	} catch (err) {
		console.error(err)
		res.status(501).json(err)
	}
}

const calculateRate = (a: PairItemInterface, b: PairItemInterface) => {
	const closeA = a?.close || 0
	const closeB = b?.close || 0
	return closeB - closeA
}
