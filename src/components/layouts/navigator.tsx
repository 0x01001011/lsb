import React from 'react'
import clsx from 'clsx'
import styled from 'styled-components'
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
} from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom'
import { ConnectWalletModal } from 'components/connect/modal'
import { SearchAutoComplete } from '../common/autocomplete/search-autocomplete'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		appBar: {
			backgroundColor: theme.palette.background.default,
			flexDirection: 'row',
			justifyContent: 'center',
			padding: 0,
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
		twoColumnLeft: {
			background: theme.palette.background.default,
			height: '100%',
		},
		twoColumnRight: {
			background: '#f6f6f9',
			height: '100%',
		},
		fullHeight: {
			height: '100%',
		},
	}),
)

export const Navigator = () => {
	const location = useLocation()
	const history = useHistory()
	const classes = useStyles()
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
		<AppBar className={classes.appBar} elevation={0}>
			<Grid container alignItems="center">
				<Hidden mdDown>
					<Grid item xs={2} className={classes.twoColumnLeft} />
				</Hidden>
				<Grid className={classes.fullHeight} container md={12} lg={8}>
					<Grid className={classes.twoColumnLeft} item xs={12} sm={12} md={7} lg={8}>
						<Toolbar disableGutters>
							<StyledButton onClick={() => history.push('/')}>
								<Logo src={LogoSrc} alt="logo" />
							</StyledButton>
							<ExpandedDiv>
								<Hidden smDown>
									<SearchAutoComplete maxWidth="360px" />
								</Hidden>
							</ExpandedDiv>
							<Hidden mdUp>
								<ConnectWalletModal />
							</Hidden>
						</Toolbar>
						<Grow in={scrollTrigger} timeout={300}>
							<Divider variant="middle" />
						</Grow>
					</Grid>
					<Hidden smDown>
						<Grid className={classes.twoColumnRight} item md={5} lg={4}>
							<Toolbar className={classes.fullHeight}>
								<ExpandedDiv />
								<ConnectWalletModal />
							</Toolbar>
						</Grid>
					</Hidden>
				</Grid>
				<Hidden mdDown>
					<Grid item xs={2} className={classes.twoColumnRight} />
				</Hidden>
			</Grid>
		</AppBar>
	)
}

const Logo = styled.img`
	padding: 8px;
	height: 60px;
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
