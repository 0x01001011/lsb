import React from 'react'
import clsx from 'clsx'
import styled from 'styled-components'
import LogoSrc from 'src/assets/lsb-logo.png'
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	makeStyles,
	createStyles,
	Theme,
	fade,
	useScrollTrigger,
	Hidden,
} from '@material-ui/core'
import { useLocation } from 'react-router-dom'
import { SearchAutoComplete } from './autocomplete/search-autocomplete'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		appBar: {
			backgroundColor: theme.palette.background.default,
			flexDirection: 'row',
			justifyContent: 'center',
		},
		dropGlow: {
			boxShadow: `0px 1px 20px 5px ${fade(theme.palette.primary.main, 0.2)}`,
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
		toolbarIcon: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'flex-end',
			padding: '0 8px',
			...theme.mixins.toolbar,
		},
	}),
)

interface Props {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window?: () => Window
	children: React.ReactElement
	enable: boolean
}

const ScrollProvider = (props: Props) => {
	const classes = useStyles()
	const { children, window, enable } = props
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
		target: window ? window() : undefined,
	})

	React.useEffect(() => console.log({ trigger }), [trigger])

	return React.cloneElement(children, {
		className: clsx(classes.appBar, enable && trigger && classes.dropGlow),
		position: enable ? 'fixed' : 'relative',
	})
}

export const Navigator = () => {
	const auth = false
	const location = useLocation()
	const notAtHome = location.pathname !== '/'
	const visitLoginPage = location.pathname === '/login'

	const classes = useStyles()

	return (
		<ScrollProvider enable={notAtHome}>
			<AppBar elevation={0}>
				<Toolbar className={notAtHome ? classes.stickyToolbar : classes.toolbar}>
					<StyledButton href="/">
						<Logo src={LogoSrc} alt="logo" />
					</StyledButton>
					<ExpandedDiv>
						<Hidden smDown>{!visitLoginPage && notAtHome && <SearchAutoComplete maxWidth="360px" />}</Hidden>
					</ExpandedDiv>
					<StyledButton href="/login">
						<Typography>Wallet</Typography>
					</StyledButton>
				</Toolbar>
			</AppBar>
		</ScrollProvider>
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
