import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	TextField,
	DialogActions,
} from '@material-ui/core'
import React from 'react'

import styled from 'styled-components'

const HomePageContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`

export const ConnectWalletModal = () => {
	const [open, setOpen] = React.useState(false)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<div>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Scan To Connect Wallet
			</Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Scan QR Code</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Enter your private key or scan by camera. The private key only use one time and do not store anythings.
					</DialogContentText>
					<TextField autoFocus margin="dense" id="name" label="Account's Private Key" type="email" fullWidth />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleClose} color="primary">
						Connect
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
