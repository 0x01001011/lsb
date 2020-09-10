import React from 'react'
import styled from 'styled-components'

import { Typography, Grid, Fade, Divider, Button } from '@material-ui/core'
import { MasterLayout } from 'components/layouts'
import LsbSrc from 'assets/lsb.png'

const LoginPageContainer = styled(Grid)`
	height: 91vh;
`

const StyledAwsButton = styled(Button)`
	margin: 8px;
`

const StyledDivider = styled(Divider)`
	&.MuiDivider-vertical {
		height: 35%;
	}
	margin: 0;
`

const OR = styled(Typography)`
	&.MuiTypography-root {
		margin: 16px;
		font-weight: 300;
	}
`

const LsbLogo = styled.img``

export const LoginPage = () => {
	const [loading, setLoading] = React.useState(true)

	return (
		<LoginPageContainer>
			<MasterLayout>
				<LoginPageContainer container>
					<Grid container xs={5} direction="column" alignItems="center" justify="center">
						<Fade in={!loading} timeout={300}>
							<LsbLogo width={256} src={LsbSrc} onLoad={() => setLoading(false)} />
						</Fade>
						<Typography variant="h4" gutterBottom>
							Need a privacy wallet?
						</Typography>
						<Typography>Create a secure crypto wallet</Typography>
						<Typography gutterBottom>to start trading on Lisawa in seconds.</Typography>
						<StyledAwsButton color="default">Create new Lisawa wallet</StyledAwsButton>
					</Grid>
					<Grid container xs={2} direction="column" alignItems="center" justify="center">
						<StyledDivider orientation="vertical" />
						<OR> Or </OR>
						<StyledDivider orientation="vertical" />
					</Grid>
					<Grid container xs={5} direction="column" alignItems="center" justify="center">
						<Fade in={!loading} timeout={600}>
							<StyledAwsButton color="secondary">Connect to MEW wallet</StyledAwsButton>
						</Fade>
						<Fade in={!loading} timeout={700}>
							<StyledAwsButton color="secondary">Connect to Bitbii wallet</StyledAwsButton>
						</Fade>
						<Fade in={!loading} timeout={800}>
							<StyledAwsButton color="secondary">Connect to Awes wallet</StyledAwsButton>
						</Fade>
					</Grid>
				</LoginPageContainer>
			</MasterLayout>
		</LoginPageContainer>
	)
}
