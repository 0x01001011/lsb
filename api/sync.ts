import { take } from 'lodash'
import { NowRequest, NowResponse } from '@vercel/node'
import Axios from 'axios'

export default async function sync(req: NowRequest, res: NowResponse) {
	try {
		const pairsResponses = await Axios.get<string[]>('https://api.incscan.io/pdex/pairs')
		const tasks = pairsResponses.data.map(async (pair: string) => {
			Axios.get<string[]>(`http://${req.headers['x-forwarded-host']}/api/sync-pairs?pair=${pair}`)
			await new Promise((r) => setTimeout(() => r(500), 1000))
		})

		await take(tasks, 3).reduce((p, spec) => p.then(() => spec), Promise.resolve(null))

		res.json(pairsResponses.data)
	} catch (err) {
		console.error(err)
		res.status(501).json(err)
	}
}
