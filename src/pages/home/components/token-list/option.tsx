import React from 'react'
import styled from 'styled-components'
import { Avatar, Tooltip, Typography } from '@material-ui/core'
import { AvatarGroup } from '@material-ui/lab'
import { PerPair } from 'models/incscan-api'
import { TokenImage } from '../token-image'

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
			<AvatarGroup>
				<TokenImage tokenName={first} first />
				<TokenImage tokenName={second} />
			</AvatarGroup>
			<Typography align="right" variant="body2">
				{isZero(volume) ? '-' : formatNumber(volume)}
			</Typography>
			<Typography align="right" variant="body2">
				{isZero(liquidity) ? '-' : formatNumber(liquidity)}
			</Typography>
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
	padding: 8px;
`
