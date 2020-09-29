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
import { requestTrade, useWalletState } from 'stores/implements/wallet'
import SwapHorizIcon from '@material-ui/icons/SwapHoriz'
import { useTradingState } from 'stores/implements/trading'
import { useDictionaryTokenIds } from 'services/token-collections'

export const TradingDialog = () => {
	const dispatch = useDispatch()
	const walletState = useWalletState((s) => s)
	const { paidAmount, paidToken, receivedToken } = useTradingState((s) => s)
	const tokenIdDict = useDictionaryTokenIds()
	const [open, setOpen] = React.useState(false)
	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleCancel = () => {
		setOpen(false)
	}

	const handleTrade = () => {
		if (walletState.account && tokenIdDict.data) {
			if (paidToken === 'PRV') {
				// From PRV -> pToken
				dispatch(requestTrade({ buyTokenId: tokenIdDict.data[receivedToken].tokenId, amount: paidAmount }))
			} else if (receivedToken === 'PRV') {
				// From pToken -> PRV
				dispatch(
					requestTrade({
						buyTokenId: walletState.account.nativeTokenId,
						amount: paidAmount,
						fromTokenId: tokenIdDict.data[paidToken].tokenId,
					}),
				)
			} else {
				// From pToken1 -> pToken2
				dispatch(
					requestTrade({
						buyTokenId: tokenIdDict.data[receivedToken].tokenId,
						amount: paidAmount,
						fromTokenId: tokenIdDict.data[paidToken].tokenId,
					}),
				)
			}
		}
	}

	const accountName = walletState.account?.accountName

	return (
		<div>
			<Button variant="contained" color="primary" startIcon={<SwapHorizIcon />} onClick={handleClickOpen} fullWidth>
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
					<Button onClick={handleTrade} color="primary" disabled={walletState.account && tokenIdDict.isFetching}>
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
