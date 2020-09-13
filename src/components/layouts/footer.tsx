import React from 'react'
import { Grid, Divider, Hidden, Typography, Button, makeStyles, Theme, createStyles } from '@material-ui/core'
import styled from 'styled-components'

const StyledButton = styled(Button)`
	&.MuiButton-root {
		text-transform: none;
		&:hover {
			background: transparent;
		}
	}
`

const Expanded = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-grow: 1;
`

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			minHeight: 84,
		},
		expanded: {
			display: 'flex',
			alignItems: 'center',
		},
	}),
)

export const Footer = () => {
	const classes = useStyles()

	return (
		<>
			<Divider />
			<Grid className={classes.root} container>
				<Grid className={classes.expanded} item xs={12} sm={6} md={8}>
					<Typography>Incognito.</Typography>
				</Grid>
				<Grid className={classes.expanded} item xs={4} sm={6} md={4}>
					<Hidden xsDown>
						<Grid container>
							<Expanded>
								<StyledButton variant="text">Help</StyledButton>
							</Expanded>
							<Expanded>
								<StyledButton variant="text">Blogs</StyledButton>
							</Expanded>
							<Expanded>
								<StyledButton variant="text">Terms</StyledButton>
							</Expanded>
							<Expanded>
								<StyledButton variant="text">Privacy</StyledButton>
							</Expanded>
						</Grid>
					</Hidden>
				</Grid>
			</Grid>
		</>
	)
}
