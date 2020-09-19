import { useParams } from 'react-router-dom'

export const usePairsFromUrl = () => {
	const { paidToken = 'PRV', receivedToken = 'pUSDT' } = useParams<{ paidToken: string; receivedToken: string }>()
	return { paidToken, receivedToken }
}
