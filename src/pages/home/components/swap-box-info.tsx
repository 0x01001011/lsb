import { TableContainer, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'

import React from 'react'

import styled from 'styled-components'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import NetworkCheckIcon from '@material-ui/icons/NetworkCheck'
import { useWalletState } from 'stores/implements/wallet'
import { usePairsFromUrl } from 'utils/hooks'
import { TokenImage } from './token-list/option'

const SwapboxInfoContainer = styled(TableContainer)`
	/* background-color: #f4f7fa;
	margin: 6px;
	padding: 8px;
	border-radius: 8px; */
`

export const SwapBoxInfo = () => {
	const { paidToken, receivedToken } = usePairsFromUrl()
	const account = useWalletState((s) => s.account)
	const paidTokenBalance = account?.accountName
		? `${account?.balances[paidToken] || 0} ${paidToken}`
		: 'Connect Your Wallet To View'
	const receiveTokenBalance = account?.accountName
		? `${account?.balances[receivedToken] || 0} ${receivedToken}`
		: 'Connect Your Wallet To View'
	return (
		<SwapboxInfoContainer>
			<List>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<TokenImage tokenName={paidToken} />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary={`Your ${paidToken} Balance`} secondary={paidTokenBalance} />
				</ListItem>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<TokenImage tokenName={receivedToken} />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary={`Your ${receivedToken} Balance`} secondary={receiveTokenBalance} />
				</ListItem>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<AttachMoneyIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary="MaxPrice" secondary="Connect Your Wallet To View" />
				</ListItem>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<NetworkCheckIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary="PoolSize" secondary="Connect Your Wallet To View" />
				</ListItem>
			</List>
		</SwapboxInfoContainer>
	)
}
