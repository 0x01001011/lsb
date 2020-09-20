import React from 'react'
import styled from 'styled-components'
import PrvSrc from 'assets/prv@2x.png'
import DefaultTokenImage from 'assets/default-token.png'
import { Avatar, Tooltip, Typography } from '@material-ui/core'
import { AvatarGroup } from '@material-ui/lab'
import { useDictionaryTokenInfos, useTokenInfos } from 'services/token-collections'
import { PerPair } from 'models/incscan-api'
import { TokenUiModel } from 'models/token'

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

function isZero(num: number): boolean {
	return Math.abs(num) < 1e-7
}

export const StyledOption = (props: PerPair) => {
	const { pair, volume, liquidity } = props
	const [first, second] = pair.split('-')

	return (
		<Option>
			<Tooltip title={`${first}-${second}`} placement="bottom-start">
				<AvatarGroup>
					<TokenImage tokenName={first} first />
					<TokenImage tokenName={second} />
				</AvatarGroup>
			</Tooltip>
			<Typography align="right" variant="body2">
				{isZero(volume) ? '-' : formatNumber(volume)}
			</Typography>
			<Typography align="right" variant="body2">
				{isZero(liquidity) ? '-' : formatNumber(liquidity)}
			</Typography>
		</Option>
	)
}

const getTokenImage = (tokenInfo: TokenUiModel) => {
	if (!tokenInfo) {
		return DefaultTokenImage
	}
	return tokenInfo.tokenSymbol === 'PRV' ? PrvSrc : tokenInfo.icon
}

export const TokenImage: React.FC<{ tokenName: string; first?: boolean }> = ({ tokenName, first }) => {
	const { isFetching, data } = useDictionaryTokenInfos('Ally')
	if (isFetching) {
		return null
	}
	return (
		<StyledAvatar
			style={first ? { marginLeft: 0 } : { marginLeft: '-8px', zIndex: 1 }}
			src={getTokenImage(data[tokenName])}
			alt={DefaultTokenImage}
		/>
	)
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
	z-index: 2;
	border: 2px solid #fafafa;

	&.MuiAvatar-root {
		width: 32px;
		height: 32px;
	}
`
