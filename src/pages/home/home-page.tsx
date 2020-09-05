import React from 'react'
import styled from 'styled-components'
import { Typography, Grid } from '@material-ui/core'
import SearchAutoComplete from 'src/components/common/search-autocomplete'
import { MasterLayout } from 'src/components/layouts'

const HomePageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Slogan = styled(Typography)`
  font-weight: 400;
`

const Margin = styled.div`
	margin: 32px;
`

const Emphrasis = styled.span`
  color: #00bcd4;
  font-size: 3.75rem;
  font-weight: 500;
`

export const HomePage = () => {
  
	return (
		<HomePageContainer>
			<MasterLayout>
				<Grid container alignItems="center" justify="center">
					<Grid item xs={12}>
						<Margin>
							<Slogan variant="h2" align="center">Simple crypto trading <br/> for <Emphrasis>Incognito.</Emphrasis></Slogan>
						</Margin>
					</Grid>
					<Grid item xs={6}>
						<SearchAutoComplete />
					</Grid>
				</Grid>
			</MasterLayout>
		</HomePageContainer>
	)
}
