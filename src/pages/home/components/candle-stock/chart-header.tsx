import React from 'react'
import styled from 'styled-components'
import PrvSrc from 'assets/prv@2x.png'
import { TokenUiModel } from 'models/token'
import { AvatarGroup, ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { Avatar, Typography } from '@material-ui/core'
import { changeGranuality, PairCandleGranuality, useTradingState } from 'stores/implements/trading'
import { useDispatch } from 'react-redux'

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	min-height: 5vw;
`

const Title = styled(Typography)`
	font-weight: 400;
`

export type HeaderProps = {
	firstToken: TokenUiModel
	secondToken: TokenUiModel
}

export const ChartHeader = ({ firstToken, secondToken }) => {
	const dispatch = useDispatch()
	const granuality = useTradingState((s) => s.granuality)
	const { tokenSymbol: symbolSt, tokenName: nameSt, icon: iconSt } = firstToken
	const { tokenSymbol: symbolNd, tokenName: nameNd, icon: iconNd } = secondToken

	const handleChangeGranuality = (event: React.MouseEvent<HTMLElement>, value: PairCandleGranuality) => {
		dispatch(changeGranuality({ granuality: value }))
	}

	return (
		<Wrapper>
			<div>
				<AvatarGroup>
					<Avatar src={symbolSt === 'PRV' ? PrvSrc : iconSt} alt={symbolSt} />
					<Avatar src={symbolNd === 'PRV' ? PrvSrc : iconNd} alt={symbolNd} />
				</AvatarGroup>
				<Title variant="h5">
					{symbolSt}-{symbolNd}
				</Title>
			</div>

			<ToggleButtonGroup value={granuality} exclusive onChange={handleChangeGranuality}>
				<GranualButton value="1HOUR" disabled>
					1H
				</GranualButton>
				<GranualButton value="6HOUR" disabled>
					6H
				</GranualButton>
				<GranualButton value="1DAY">1D</GranualButton>
			</ToggleButtonGroup>
		</Wrapper>
	)
}

const GranualButton = styled(ToggleButton)`
	&.MuiToggleButton-root {
		border-radius: 0px;
		padding: 0.1em 0.8em;
		background: #e6eaf2;
		color: inherit;
		font-weight: 600;
		letter-spacing: 0.1em;
		margin: 8px 16px;
		border: none;

		&.Mui-selected {
			background: #294698;
			color: #fafbfb;
		}
	}
`
