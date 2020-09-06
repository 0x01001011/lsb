import React from 'react'
import styled from 'styled-components'
import { Typography, Grid, responsiveFontSizes, createMuiTheme, ThemeProvider } from '@material-ui/core'
import { SearchAutoComplete } from 'src/components/common/search-autocomplete'
import { MasterLayout } from 'src/components/layouts'
import { TokenCard } from 'src/components/common/token-card'
import { TokenUiModel } from 'src/models/token'
import { Eth, Btc, Incognito } from 'src/assets/token-logos'

const HomePageContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`

const Slogan = styled(Typography)`
	font-weight: 400;
`

const Margin = styled.div`
	margin: 4vw 0;
`

const Emphrasis = styled.span`
	color: #00bcd4;
	font-size: 3.75rem;
	font-weight: 500;

	@media (max-width: 768px) {
		font-size: 2.4rem;
		font-weight: 400;
	}
`

const Center = styled(Grid)`
	display: flex;
	justify-content: center;
	align-items: center;
`

const featureTokens: TokenUiModel[] = [
	{
		tokenSymbol: 'PRV',
		tokenName: 'Privacy Coin',
		icon: Incognito,
		colors: ['#303030', '#00bcd4'],
		gradients: ['rgb(238, 238, 238)', 'rgb(194, 194, 194)'],
	},
	{
		tokenSymbol: 'pETH',
		tokenName: 'Ethereum',
		icon: Eth,
		colors: ['rgb(69, 105, 207)', 'rgb(69, 105, 207)'],
		gradients: ['rgb(228, 234, 253)', 'rgb(188, 200, 241)'],
	},
	{
		tokenSymbol: 'pBTC',
		tokenName: 'Bitcoin',
		icon: Btc,
		colors: ['rgb(255, 210, 51)', 'rgb(255, 210, 51)'],
		gradients: ['rgb(255, 246, 231)', 'rgb(255, 237, 209)'],
	},
]

export const HomePage = () => {
	// const { status, data, error, isFetching } = useShieldCoins()

	const responsiveType = responsiveFontSizes(createMuiTheme())

	return (
		<HomePageContainer>
			<MasterLayout>
				<Grid container alignItems="center" justify="center">
					<Grid item xs={12}>
						<Margin>
							<ThemeProvider theme={responsiveType}>
								<Slogan variant="h2" align="center">
									Simple crypto trading <br /> for <Emphrasis>Incognito.</Emphrasis>
								</Slogan>
							</ThemeProvider>
						</Margin>
					</Grid>
					<Grid item xs={10}>
						<Center>
							<SearchAutoComplete maxWidth="480px" />
						</Center>
					</Grid>
				</Grid>
				<Grid style={{ margin: '32px 0' }} container alignItems="center" justify="center" spacing={2}>
					{featureTokens.map((token) => (
						<Center item xs={9} sm={6} md={4} lg={3}>
							<TokenCard state={token} />
						</Center>
					))}
				</Grid>
			</MasterLayout>
		</HomePageContainer>
	)
}
