import { TableContainer, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'

import React from 'react'

import styled from 'styled-components'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import NetworkCheckIcon from '@material-ui/icons/NetworkCheck'

const SwapboxInfoContainer = styled(TableContainer)`
	/* background-color: #f4f7fa;
	margin: 6px;
	padding: 8px;
	border-radius: 8px; */
`

export const SwapBoxInfo = () => {
	return (
		<SwapboxInfoContainer>
			<List>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<AccountBalanceWalletIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary="Balance" secondary="1.123232 PRV" />
				</ListItem>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<AttachMoneyIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary="MaxPrice" secondary="1123.123$" />
				</ListItem>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<NetworkCheckIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary="PoolSize" secondary="123.1231USDT" />
				</ListItem>
			</List>
		</SwapboxInfoContainer>
	)
}
