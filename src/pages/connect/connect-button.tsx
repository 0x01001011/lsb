import React from 'react'
import { Button } from '@material-ui/core'
import { useWalletState } from 'stores/implements/wallet'

export const ConnectButton: React.FC<{ handleClickOpen: () => void }> = ({ handleClickOpen }) => {
	const wallet = useWalletState((s) => s.account)
	if (wallet?.accountName) {
		return (
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Change Account
			</Button>
		)
	}
	return (
		<Button variant="outlined" color="primary" onClick={handleClickOpen}>
			Scan To Connect Wallet
		</Button>
	)
}
