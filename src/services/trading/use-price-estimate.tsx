import { last } from 'lodash'
import React from 'react'
import { useCandleSticks } from 'services/revolutions'

import { usePairsFromUrl } from 'utils/hooks/use-pairs-from-url'

export const usePriceEstimate = (initPrice = 0) => {
	const [paidNum, setPaidNum] = React.useState(0)
	const [price, setPrice] = React.useState(initPrice)
	const { paidToken, receivedToken } = usePairsFromUrl()
	const { data } = useCandleSticks(`${paidToken}-${receivedToken}`, '1HOUR')

	React.useEffect(() => {
		const lastPrice = last(data)
		setPrice(lastPrice?.close || 0)
	}, [data])

	const estimateResult = React.useMemo(() => {
		return paidNum * price
	}, [paidNum, price])

	return { estimateResult, setPaidNum }
}
