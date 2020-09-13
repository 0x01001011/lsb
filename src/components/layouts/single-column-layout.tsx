import React from 'react'
import { Container } from '@material-ui/core'
import { Footer } from './footer'
import { Navigator } from './navigator'
import { MasterLayout } from './master-layout'

export const SingleColumnLayout = ({ children }) => {
	return (
		<MasterLayout>
			<Container>
				<Navigator />
				{children}
				<Footer />
			</Container>
		</MasterLayout>
	)
}
