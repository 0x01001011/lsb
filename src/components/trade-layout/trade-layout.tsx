import { Container, Grid, Tab, Tabs } from '@material-ui/core'
import { ConnectWalletModal } from 'components/connect'
import React from 'react'
import styled from 'styled-components'
import LogoSrc from 'assets/lsb-logo.png'
import { useHistory } from 'react-router-dom'

export const TradeLayoutContainer = styled.div`
	clear: both;
	flex-grow: 1;
	background-color: #fdfefe;
`

const LayoutColumn = styled.div<{ background?: string }>`
	height: 100%;
	width: 100%;
	padding: 8px;
	border-right: 1px dashed #e3eaf6;
	background: ${(p) => p.background};
`

const RightColumn = styled(LayoutColumn)`
	border-right: none;
`

const HeaderContainer = styled(Container)`
	height: 80px;
	border-bottom: 1px dashed #e3eaf6;
`

const BodyContainer = styled(Container)`
	height: calc(100vh - 100px);
	overflow: hidden;
`

const GridStyled = styled(Grid)`
	height: 100%;
`
const AccountHeader = styled(RightColumn)`
	display: flex;
	justify-content: center;
	align-items: center;
`

const Logo = styled.img`
	margin-top: 8px;
	height: 48px;
	cursor: pointer;
`

export const TradeLayout: React.FC<{
	left: any
	right: any
}> = ({ left, right, children }) => {
	const history = useHistory()

	const handleLogoClick = () => history.push('/')

	return (
		<TradeLayoutContainer>
			<HeaderContainer maxWidth="lg">
				<GridStyled container spacing={0}>
					<Grid item sm={12} md={3}>
						<LayoutColumn>
							<Logo src={LogoSrc} alt="lsb" onClick={handleLogoClick} />
						</LayoutColumn>
					</Grid>
					<Grid item sm={12} md={6}>
						<LayoutColumn>
							<Tabs value={1} onChange={console.log} indicatorColor="primary" textColor="primary" centered>
								<Tab label="Home" />
								<Tab label="Trade" />
								<Tab label="Wallet" />
							</Tabs>
						</LayoutColumn>
					</Grid>
					<Grid item sm={12} md={3}>
						<AccountHeader background="#FAFBFB">
							<ConnectWalletModal />
						</AccountHeader>
					</Grid>
				</GridStyled>
			</HeaderContainer>
			<BodyContainer maxWidth="lg">
				<GridStyled container spacing={0}>
					<Grid item sm={12} md={3}>
						<LayoutColumn>{left}</LayoutColumn>
					</Grid>
					<Grid item sm={12} md={6}>
						<LayoutColumn background="#FAFBFB" style={{ maxHeight: 'calc(100vh - 90px)' }}>
							{children}
						</LayoutColumn>
					</Grid>
					<Grid item sm={12} md={3}>
						<RightColumn>{right}</RightColumn>
					</Grid>
				</GridStyled>
			</BodyContainer>
		</TradeLayoutContainer>
	)
}
