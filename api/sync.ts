import { take } from 'lodash'
import { NowRequest, NowResponse } from '@vercel/node'
import Axios from 'axios'

export default async function sync(req: NowRequest, res: NowResponse) {
	try {
		const pairsResponses = await Axios.get<string[]>('https://api.incscan.io/pdex/pairs')
		const tasks = pairsResponses.data.map(async (pair: string) => {
			console.log(`https://lsb.vercel.app/api/sync-pairs?pair=${pair}`)
			return Axios.get<string[]>(`https://lsb.vercel.app/api/sync-pairs?pair=${pair}`)
		})

		await Promise.all(tasks)

		res.json(pairsResponses.data)
	} catch (err) {
		console.error(err)
		res.status(501).json(err)
	}
}
