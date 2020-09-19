import React from 'react'
import PrvSrc from 'assets/prv@2x.png'
import styled from 'styled-components'
import { Avatar, Tooltip, Typography } from '@material-ui/core'
import { AvatarGroup } from '@material-ui/lab'
import { useDictionaryTokenInfos, useTokenInfos } from 'services/token-collections'
import { PerPair } from 'models/incscan-api'
import { TokenUiModel } from 'models/token'
import DefaultTokenImage from 'assets/default-token.png'

const initialState = {
	firstToken: null,
	secondToken: null,
}

function formatNumber(num: number): string {
	if (num >= 1e9) {
		return `${(num / 1e9).toFixed(2)}B`
	}
	if (num >= 1e6) {
		return `${(num / 1e6).toFixed(2)}M`
	}
	if (num >= 1e3) {
		return `${(num / 1e3).toFixed(2)}K`
	}

	return num.toFixed(2)
}

export const StyledOption = (props: PerPair) => {
	const { pair, volume, liquidity } = props
	const [first, second] = pair.split('-')

	return (
		<Option>
			<Tooltip title={`${first}-${second}`}>
				<AvatarGroup>
					<TokenImage tokenName={first} />
					<TokenImage tokenName={second} />
				</AvatarGroup>
			</Tooltip>
			<Typography align="right">{formatNumber(volume)}</Typography>
			<Typography align="right">{formatNumber(liquidity)}</Typography>
		</Option>
	)
}

const getTokenImage = (tokenInfo: TokenUiModel) => {
	if (!tokenInfo) {
		return DefaultTokenImage
	}
	return tokenInfo.tokenSymbol === 'PRV' ? PrvSrc : tokenInfo.icon
}
export const TokenImage: React.FC<{ tokenName: string }> = ({ tokenName }) => {
	const { isFetching, data } = useDictionaryTokenInfos('Ally')
	if (isFetching) {
		return null
	}
	return <StyledAvatar src={getTokenImage(data[tokenName])} />
}

const Option = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	flex-grow: 1;
	align-items: center;
	height: 48px;
	padding: 8px;
`

const StyledAvatar = styled(Avatar)`
	&.MuiAvatar-root {
		width: 32px;
		height: 32px;
	}
`
