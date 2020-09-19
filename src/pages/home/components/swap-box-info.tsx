import { TableContainer, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'

import React from 'react'

import styled from 'styled-components'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import NetworkCheckIcon from '@material-ui/icons/NetworkCheck'
import { useParams } from 'react-router-dom'
import { useWalletState } from 'stores/implements/wallet'

const SwapboxInfoContainer = styled(TableContainer)`
	/* background-color: #f4f7fa;
	margin: 6px;
	padding: 8px;
	border-radius: 8px; */
`

export const SwapBoxInfo = () => {
	const { paidToken } = useParams<{ paidToken: string }>()
	const account = useWalletState((s) => s.account)
	const [balance, setBalance] = React.useState(0)
	const balanceText = account?.accountName ? `${balance} ${paidToken}` : 'Connect Your Private'
	return (
		<SwapboxInfoContainer>
			<List>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<AccountBalanceWalletIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary="Balance" secondary={balanceText} />
				</ListItem>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<AttachMoneyIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary="MaxPrice" secondary="Coming" />
				</ListItem>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<NetworkCheckIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary="PoolSize" secondary="Coming" />
				</ListItem>
			</List>
		</SwapboxInfoContainer>
	)
}
