import { TableContainer, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'

import React from 'react'

import styled from 'styled-components'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import NetworkCheckIcon from '@material-ui/icons/NetworkCheck'
import { followTokenById, useWalletState } from 'stores/implements/wallet'
import { usePairsFromUrl } from 'utils/hooks'
import { useDispatch } from 'react-redux'
import { useDictionaryTokenIds } from 'services/token-collections'
import { TokenImage } from '../token-image'

const SwapboxInfoContainer = styled(TableContainer)`
	/* background-color: #f4f7fa;
	margin: 6px;
	padding: 8px;
	border-radius: 8px; */
`

const StyledItem = styled(ListItem)`
	&.MuiListItem-root {
		padding: 0px;
	}
`

export const SwapBoxInfo = () => {
	const dispatch = useDispatch()
	const { paidToken, receivedToken } = usePairsFromUrl()
	const account = useWalletState((s) => s.account)
	const tokenIdDict = useDictionaryTokenIds()

	React.useEffect(() => {
		if (tokenIdDict.data) {
			if (paidToken !== 'PRV') {
				dispatch(followTokenById({ tokenId: tokenIdDict.data[paidToken]?.tokenId }))
			}
			if (receivedToken !== 'PRV') {
				dispatch(followTokenById({ tokenId: tokenIdDict.data[receivedToken]?.tokenId }))
			}
		}
	}, [account, tokenIdDict, paidToken, receivedToken])

	const paidTokenBalance = account?.accountName
		? `${account?.balances[paidToken] || 0} n${paidToken}`
		: 'Connect Your Wallet To View'
	const receiveTokenBalance = account?.accountName
		? `${account?.balances[receivedToken] || 0} n${receivedToken}`
		: 'Connect Your Wallet To View'
	return (
		<SwapboxInfoContainer>
			<List>
				<ListItem style={{ paddingTop: '0px' }}>
					<ListItemAvatar>
						<Avatar>
							<TokenImage tokenName={paidToken} />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary={`Your ${paidToken} Balance`} secondary={paidTokenBalance} />
				</ListItem>
				<ListItem style={{ paddingTop: '0px' }}>
					<ListItemAvatar>
						<Avatar>
							<TokenImage tokenName={receivedToken} />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary={`Your ${receivedToken} Balance`} secondary={receiveTokenBalance} />
				</ListItem>
				<ListItem style={{ paddingTop: '0px' }}>
					<ListItemAvatar>
						<Avatar>
							<AttachMoneyIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary="MaxPrice" secondary="Connect Your Wallet To View" />
				</ListItem>
				<ListItem style={{ paddingTop: '0px' }}>
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
