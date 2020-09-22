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
import { useDispatch } from 'react-redux'
import { useWalletState } from 'stores/implements/wallet'

export const TradingDialog = () => {
	const [open, setOpen] = React.useState(false)

	const dispatch = useDispatch()
	const walletState = useWalletState((s) => s)
	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleCancel = () => {
		setOpen(false)
	}

	const accountName = walletState.account?.accountName

	return (
		<div>
			<Button onClick={handleClickOpen} color="primary" variant="outlined" fullWidth>
				SWAP NOW
			</Button>
			<Dialog open={open} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">SWAP</DialogTitle>
				{accountName ? (
					<DialogContent>Coming Soon!</DialogContent>
				) : (
					<DialogContent>Connect your wallet to swap!</DialogContent>
				)}
				<DialogActions>
					<Button onClick={handleCancel} color="primary">
						OK
					</Button>
					<Button onClick={handleCancel} color="primary">
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
