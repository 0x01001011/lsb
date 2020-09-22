import React from 'react'
import styled from 'styled-components'
import { changeGranuality, PairCandleGranuality, useTradingState } from 'stores/implements/trading'
import { useDispatch } from 'react-redux'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { useCandleSticks } from 'services/revolutions'
import { usePairsFromUrl } from 'utils/hooks'
import { last } from 'lodash'

const Wrapper = styled.div`
	position: absolute;
	bottom: -28px;
	display: flex;
	justify-content: flex-end;
	width: 100%;
	align-items: center;
	padding-right: 16px;
`

export const ChartFooter = () => {
	const dispatch = useDispatch()
	const granuality = useTradingState((s) => s.granuality)

	const handleChangeGranuality = (event: React.MouseEvent<HTMLElement>, value: PairCandleGranuality) => {
		if (value !== null) {
			dispatch(changeGranuality({ granuality: value }))
		}
	}

	return (
		<Wrapper>
			<ToggleButtonGroup value={granuality} exclusive onChange={handleChangeGranuality}>
				<GranualButton value="1HOUR">1H</GranualButton>
				<GranualButton value="6HOURS">6H</GranualButton>
				<GranualButton value="1DAY">1D</GranualButton>
			</ToggleButtonGroup>
		</Wrapper>
	)
}

const GranualButton = styled(ToggleButton)`
	&.MuiToggleButton-root {
		border-radius: 0px;
		padding: 0.05em 0.6em;
		background: #e6eaf2;
		color: inherit;
		font-weight: 600;
		font-size: 0.75rem;
		letter-spacing: 0.1em;
		margin: 8px 16px;
		border: none;

		&.Mui-selected {
			background: #294698;
			color: #fafbfb;

			&:hover {
				background: #29469877;
			}
		}
	}
`
