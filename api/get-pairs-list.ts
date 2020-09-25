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
		const listPairs = await db.collection('trade_view').findOne({ viewName: 'PAIR_LIST' })
		res.json(listPairs)
	} catch (err) {
		console.error(err)
		res.status(501).json(err)
	}
}
