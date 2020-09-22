import { NowRequest, NowResponse } from '@vercel/node'
import dbAdmin from 'firebase-admin'
import account from './account.json'

const app = dbAdmin.initializeApp(
	{
		credential: dbAdmin.credential.cert(account as any),
	},
	'trade-app',
)

const db = app.firestore()

export default async function (req: NowRequest, res: NowResponse) {
	const data = await db.getAll()
	res.json(JSON.stringify(data))
}
