import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	TextField,
	DialogActions,
} from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { isEmpty } from 'lodash'
import React from 'react'
import { useDispatch } from 'react-redux'
import { connectViaPrivateKey, useWalletState } from 'stores/implements/wallet'

import { ConnectButton } from './connect-button'
import { QRCam } from './qr-cam'

export const ConnectWalletModal = () => {
	const [open, setOpen] = React.useState(false)
	const [privateKey, setPrivateKey] = React.useState('')
	const dispatch = useDispatch()
	const walletState = useWalletState((s) => s)
	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleCancel = () => {
		setOpen(false)
	}

	React.useEffect(() => {
		if (isEmpty(privateKey)) {
			return
		}
		dispatch(connectViaPrivateKey({ privateKey }))
	}, [privateKey, dispatch])

	const accountName = walletState.account?.accountName
	return (
		<div>
			<ConnectButton handleClickOpen={handleClickOpen} />
			<Dialog open={open} aria-labelledby="form-dialog-title" keepMounted={false}>
				<DialogTitle id="form-dialog-title">Scan QR Code</DialogTitle>
				<DialogContent>
					{/* <DialogContentText>
						Enter your private key or scan by camera. The private key only use one time and do not store anythings.
					</DialogContentText>
					{accountName ? (
						<Alert severity="success">
							<AlertTitle>Connect Success</AlertTitle>
							Your wallet is connected — <strong>click OK to continue!</strong>
						</Alert>
					) : (
						<QRCam onHaveValue={(value) => setPrivateKey(value)} />
					)}
					<TextField
						value={privateKey}
						onChange={(v) => setPrivateKey(v.target.value)}
						autoFocus
						margin="dense"
						id="name"
						label="Private Key"
						type="text"
						fullWidth
					/> */}
					<DialogContentText id="alert-dialog-slide-description">COMING SOON!</DialogContentText>
				</DialogContent>
				<DialogActions>
					{accountName ? (
						<Button onClick={handleCancel} color="primary">
							OK
						</Button>
					) : (
						<Button onClick={handleCancel} color="primary">
							OK
						</Button>
					)}
				</DialogActions>
			</Dialog>
		</div>
	)
}
