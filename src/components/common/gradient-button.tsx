import React from 'react'
import { Button, ButtonProps, withStyles } from '@material-ui/core'

const styles = {
	root: {
		background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
		borderRadius: 3,
		border: 0,
		color: 'white',
		height: 48,
		padding: '0 30px',
		boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
	},
}

export const GradientButton = withStyles(styles)(({ classes, color, ...other }: ButtonProps) => (
	<Button className={classes.root} {...other} />
))
