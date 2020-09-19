/* eslint-disable no-nested-ternary */
import React from 'react'
import styled from 'styled-components'
import { useLocation, useParams } from 'react-router-dom'
import { Grid, useTheme } from '@material-ui/core'
import { TwoColumnLayout } from 'components/layouts/two-column-layout'
import { changeToken, resetTrading } from 'stores/implements/trading'
import { useDispatch } from 'react-redux'
import { TokenUiModel } from 'models/token'
import { useTokenInfos } from 'services/token-collections'
import { TradingCard } from './components/trading-card'
import { LineStock } from './components/line-stock'

const TradingContainer = styled(Grid)`
	min-height: 100vh;
	position: relative;
`

const LeftContent = styled.div`
	margin-top: 128px;
	display: flex;
	flex-direction: column;
	min-height: 120vh;
`
const RightContent = styled.div`
	margin-top: 128px;
	position: fixed;
	top: 0px;
	right: auto;
`

const TradingCardWrapper = styled.div`
	position: relative;
`

export const SingleTradingPage = () => {
	const theme = useTheme()
	const query = new URLSearchParams(useLocation().search)
	const dispatch = useDispatch()

	const [token, setToken] = React.useState<TokenUiModel>(null)
	const { tokenSymbol } = useParams<{ tokenSymbol: string }>()
	const { data: tokens = [] } = useTokenInfos('Ally')

	/* ComponentDidMount */
	React.useEffect(() => {
		if (query.get('type') === 'RECEIVE') {
			dispatch(changeToken({ receivedToken: tokenSymbol }))
		} else {
			dispatch(changeToken({ paidToken: tokenSymbol }))
		}

		return () => dispatch(resetTrading())
	}, [tokenSymbol])

	React.useEffect(() => {
		setToken(tokens.find((t) => t.tokenSymbol === tokenSymbol))
		console.log('Update info.. ')
	}, [tokens])

	return (
		<TwoColumnLayout>
			<TradingContainer container>
				<Grid
					style={{
						background: theme.palette.background.default,
						flexGrow: 1,
					}}
					item
					md={7}
				>
					<LeftContent>
						{token && <LineStock token={token} />}
						{/* <Typography className={classes.titleText} gutterBottom>
							About {tokenSymbol}
						</Typography> */}
					</LeftContent>
				</Grid>
				<Grid
					style={{
						background: theme.palette.background.default,
						flexGrow: 1,
						display: 'flex',
						justifyContent: 'flex-end',
					}}
					item
					md={5}
				>
					<RightContent>
						<TradingCardWrapper>
							<TradingCard />
						</TradingCardWrapper>
					</RightContent>
				</Grid>
			</TradingContainer>
		</TwoColumnLayout>
	)
}
