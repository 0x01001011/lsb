import { Grid, Hidden } from '@material-ui/core'
import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Navigator } from './navigator'
import { MasterLayout } from './master-layout'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		leftSpace: {
			background: theme.palette.background.default,
			minHeight: '100vh',
		},
		rightSpace: {
			background: '#f6f6f9',
			minHeight: '100vh',
		},
	}),
)

export const TwoColumnLayout = ({ children }) => {
	const classes = useStyles()

	return (
		<MasterLayout>
			<Grid container>
				<Hidden mdDown>
					<Grid item xs={2} className={classes.leftSpace} />
				</Hidden>
				<Navigator />
				<Grid item md={12} lg={8}>
					{children}
				</Grid>
				<Hidden mdDown>
					<Grid item xs={2} className={classes.rightSpace} />
				</Hidden>
			</Grid>
		</MasterLayout>
	)
}
