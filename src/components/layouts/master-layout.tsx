import React from 'react'

import { CssBaseline, Container } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { cyan, deepPurple, pink } from '@material-ui/core/colors'
import { Navigator } from '../common/navigator'

export const MasterLayout = ({ children }) => {
	const darkMode = false
	const palletType = darkMode ? 'dark' : 'light'
	const mainPrimaryColor = darkMode ? cyan[400] : '#000000'
	const mainSecondaryColor = darkMode ? pink[400] : deepPurple.A400
	const themePalette = createMuiTheme({
		palette: {
			type: palletType,
			primary: {
				main: mainPrimaryColor,
			},
			secondary: {
				main: mainSecondaryColor,
			},
		},
		props: {
			MuiButtonBase: {
				// The default props to change
				disableRipple: true, // No more ripple, on the whole application 💣!
			},
		},
	})

	return (
		<ThemeProvider theme={themePalette}>
			<CssBaseline />
			<Container maxWidth="lg">
				<Navigator />
				{children}
			</Container>
		</ThemeProvider>
	)
}
