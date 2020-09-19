import React from 'react'
import PrvSrc from 'assets/prv@2x.png'
import styled from 'styled-components'
import { Avatar, Tooltip, Typography } from '@material-ui/core'
import { AvatarGroup } from '@material-ui/lab'
import { useTokenInfos } from 'services/token-collections'
import { PerPair } from 'models/incscan-api'

const initialState = {
	firstToken: null,
	secondToken: null,
}

function formatNumber(num: number): string {
	if (num >= 1e9) {
		return `${(num/1e9).toFixed(2)}B`
	}
	else if (num >= 1e6) {
		return `${(num/1e6).toFixed(2)}M`
	}
	else if (num >= 1e3) {
		return `${(num/1e3).toFixed(2)}K`
	}
	
	return num.toFixed(2)
}

export const StyledOption = (props: PerPair) => {
	const { pair, volume, liquidity } = props
	const { isFetching, data } = useTokenInfos('Ally')
	const [tokens, setTokens] = React.useState(initialState)
	const { firstToken, secondToken } = tokens

	React.useEffect(() => {
		if (data) {
			const [first, second] = pair.split('-')
			const firstToken = data.find((t) => t.tokenSymbol === first)
			const secondToken = data.find((t) => t.tokenSymbol === second)

			setTokens({ ...tokens, firstToken, secondToken })
		}
	}, [data])

	if (isFetching || !firstToken || !secondToken) {
		return null
	}

	return (
		<Option>
			<Tooltip title={`${firstToken.tokenSymbol}-${secondToken.tokenSymbol}`}>
				<AvatarGroup>
					<Avatar src={firstToken.tokenSymbol === 'PRV' ? PrvSrc : firstToken.icon} />
					<Avatar src={secondToken.tokenSymbol === 'PRV' ? PrvSrc : secondToken.icon} />
				</AvatarGroup>
			</Tooltip>
			<Typography align="right">{formatNumber(volume)}</Typography>
			<Typography align="right">{formatNumber(liquidity)}</Typography>
		</Option>
	)
}

const Option = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	flex-grow: 1;
	align-items: center;
	height: 48px;
	padding: 8px 0px;
`
