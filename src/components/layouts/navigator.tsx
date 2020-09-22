import React from 'react'
import clsx from 'clsx'
import styled, { ThemeProvider } from 'styled-components'
import LogoSrc from 'assets/lsb-logo.png'
import {
	AppBar,
	Toolbar,
	Button,
	makeStyles,
	createStyles,
	Theme,
	fade,
	useScrollTrigger,
	Hidden,
	Grid,
	Divider,
	Grow,
	useTheme,
} from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom'
import { ConnectWalletModal } from 'components/connect'
import { SearchAutoComplete } from '../common/autocomplete/search-autocomplete'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		appBar: {
			backgroundColor: theme.palette.background.default,
			flexDirection: 'row',
			justifyContent: 'center',
			padding: 0,
			height: 81,
		},
		dropGlow: {
			boxShadow: `0px 1px 3px 2px ${fade(theme.palette.primary.main, 0.18)}`,
		},
		stickyToolbar: {
			width: '75%',
			paddingRight: 24, // keep right padding when drawer closed
			[theme.breakpoints.down('sm')]: {
				width: '90%',
			},
		},
		toolbar: {
			width: '100%',
			paddingRight: 24, // keep right padding when drawer closed
		},
	}),
)

const StyledBar = styled(AppBar)`
	background-color: ${(props) => props.theme.palette.background.default};
	flex-direction: 'row';
	justify-content: 'center';
	padding: 0px;
`

const LeftDecor = styled(Grid)`
	height: 81px;
	background: ${(props) => props.theme.palette.background.default};
`

const RightDecor = styled(Grid)`
	height: 81px;
	/* background: #f6f6f9; */
	background: ${(props) => props.theme.palette.background.default};
`

const StyledToolbar = styled(Toolbar)`
	min-height: 81px;
`

export const Navigator = () => {
	const location = useLocation()
	const history = useHistory()
	const classes = useStyles()
	const theme = useTheme()
	const scrollTrigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	})

	if (location.pathname === '/') {
		return (
			<AppBar className={classes.appBar} elevation={0} position="relative">
				<Toolbar className={classes.toolbar}>
					<StyledButton onClick={() => history.push('/')}>
						<Logo src={LogoSrc} alt="logo" />
					</StyledButton>
					<ExpandedDiv />
					<ConnectWalletModal />
				</Toolbar>
			</AppBar>
		)
	}

	if (location.pathname === '/showroom') {
		return (
			<AppBar className={clsx(classes.appBar, scrollTrigger && classes.dropGlow)} elevation={0}>
				<Toolbar className={classes.stickyToolbar}>
					<StyledButton onClick={() => history.push('/')}>
						<Logo src={LogoSrc} alt="logo" />
					</StyledButton>
					<ExpandedDiv>
						<Hidden smDown>
							<SearchAutoComplete maxWidth="360px" />
						</Hidden>
					</ExpandedDiv>
					<ConnectWalletModal />
				</Toolbar>
			</AppBar>
		)
	}

	/* Navigator on trading page */

	return (
		<ThemeProvider theme={theme}>
			<StyledBar elevation={0}>
				<Grid container alignItems="center">
					<Hidden mdDown>
						<LeftDecor item xs={1} />
					</Hidden>
					<Grid container md={12} lg={10}>
						<LeftDecor item xs={12} sm={12} md={7}>
							<StyledToolbar disableGutters>
								<StyledButton onClick={() => history.push('/')}>
									<Logo src={LogoSrc} alt="logo" />
								</StyledButton>
								<ExpandedDiv>{/* <Hidden smDown>
										<SearchAutoComplete maxWidth="360px" />
									</Hidden> */}</ExpandedDiv>
								<Hidden mdUp>
									<ConnectWalletModal />
								</Hidden>
							</StyledToolbar>
							<Grow in={scrollTrigger} timeout={300}>
								<Divider variant="middle" />
							</Grow>
						</LeftDecor>
						<Hidden smDown>
							<RightDecor item md={5}>
								<StyledToolbar>
									<ExpandedDiv />
									<ConnectWalletModal />
								</StyledToolbar>
							</RightDecor>
						</Hidden>
					</Grid>
					<Hidden mdDown>
						<RightDecor item xs={1} />
					</Hidden>
				</Grid>
			</StyledBar>
		</ThemeProvider>
	)
}

const Logo = styled.img`
	height: 48px;
`

const ExpandedDiv = styled.div`
	margin: 0 32px;
	flex-grow: 1;
`

const StyledButton = styled(Button)`
	&.MuiButton-root {
		text-transform: none;
		&:hover {
			background: transparent;
		}
	}
`
