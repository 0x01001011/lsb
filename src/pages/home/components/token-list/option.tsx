import React from 'react'
import styled from 'styled-components'
import { Avatar, Tooltip, Typography } from '@material-ui/core'
import { AvatarGroup } from '@material-ui/lab'
import { PerPair } from 'models/incscan-api'
import { PairDetail } from 'models/token'
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

export const StyledOption = (props: PairDetail) => {
	const { pair, exchange24hPercent = 0, exchangeWeekPercent = 0 } = props
	const [first, second] = pair.split('-')

	return (
		<Option>
			<Tooltip title={`${first}-${second}`} placement="bottom-start">
				<AvatarGroup>
					<TokenImage tokenName={first} first />
					<TokenImage tokenName={second} />
				</AvatarGroup>
			</Tooltip>
			<Typography variant="caption" noWrap>
				{pair}
			</Typography>
			<Typography
				style={{ color: exchange24hPercent < 0 ? '#e0525f' : '#294698' }}
				align="right"
				variant="caption"
				noWrap
			>
				{`${exchange24hPercent.toFixed(1)}%`}
			</Typography>
			<Typography
				style={{ color: exchangeWeekPercent < 0 ? '#e0525f' : '#294698' }}
				align="right"
				variant="caption"
				noWrap
			>
				{`${exchangeWeekPercent.toFixed(1)}%`}
			</Typography>
		</Option>
	)
}

const Option = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: 0.25fr 0.35fr 0.2fr 0.2fr;
	flex-grow: 1;
	align-items: center;
	height: 48px;
	padding: 8px;
`
