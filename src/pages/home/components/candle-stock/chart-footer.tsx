import React from 'react'
import styled from 'styled-components'
import { changeGranuality, PairCandleGranuality, useTradingState } from 'stores/implements/trading'
import { useDispatch } from 'react-redux'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { useCandleSticks } from 'services/revolutions'
import { usePairsFromUrl } from 'utils/hooks'
import { last } from 'lodash'

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	min-height: 5vw;
`

export const ChartFooter = () => {
	const dispatch = useDispatch()
	const granuality = useTradingState((s) => s.granuality)

	const handleChangeGranuality = (event: React.MouseEvent<HTMLElement>, value: PairCandleGranuality) => {
		dispatch(changeGranuality({ granuality: value }))
	}

	return (
		<Wrapper>
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
