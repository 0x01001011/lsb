import React from 'react'
import { Button, CardHeader, CircularProgress, IconButton, Menu, MenuItem, Typography } from '@material-ui/core'
import { clearAccount, useWalletState } from 'stores/implements/wallet'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import FingerprintIcon from '@material-ui/icons/Fingerprint'
import { AddressKeyEllipse } from 'components/wallets'

import { useDispatch } from 'react-redux'

export const ConnectButton: React.FC<{ handleClickOpen: () => void }> = ({ handleClickOpen }) => {
	// const dispatch = useDispatch()
	// const wallet = useWalletState((s) => s)
	// const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	// const open = Boolean(anchorEl)

	// const handleClick = (event: React.MouseEvent<HTMLElement>) => {
	// 	setAnchorEl(event.currentTarget)
	// }

	// const handleClose = () => {
	// 	setAnchorEl(null)
	// }

	// const handleClearAccount = () => {
	// 	dispatch(clearAccount())
	// }

	// if (!wallet.sdkLoaded) {
	// 	return (
	// 		<Button variant="outlined" color="primary">
	// 			<CircularProgress size={24} />
	// 		</Button>
	// 	)
	// }

	// if (wallet?.account?.accountName) {
	// 	return (
	// 		<>
	// 			<CardHeader
	// 				avatar={<FingerprintIcon />}
	// 				action={
	// 					<IconButton aria-label="settings" onClick={handleClick}>
	// 						<MoreVertIcon />
	// 					</IconButton>
	// 				}
	// 				title={`Balance: ${wallet.account.balances.PRV} PRV`}
	// 				subheader={<AddressKeyEllipse width={180}>{wallet.account.keys.privateKey}</AddressKeyEllipse>}
	// 			/>
	// 			<Menu anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
	// 				<MenuItem onClick={handleClearAccount}>
	// 					<Typography>Clear Your Private Key</Typography>
	// 				</MenuItem>
	// 			</Menu>
	// 		</>
	// 	)
	// }
	return (
		<Button variant="outlined" color="primary" onClick={handleClickOpen}>
			Scan To Connect Wallet
		</Button>
	)
}
