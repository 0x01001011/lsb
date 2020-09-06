import React from 'react'
import styled from 'styled-components'
import { Typography, Grid, responsiveFontSizes, createMuiTheme, ThemeProvider } from '@material-ui/core'
import { MasterLayout } from 'src/components/layouts'

const LoginPageContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`

export const LoginPage = () => {
	return (
		<LoginPageContainer>
			<MasterLayout>Login..</MasterLayout>
		</LoginPageContainer>
	)
}
