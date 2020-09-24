/* eslint-disable no-lonely-if */
import React from 'react'
import styled from 'styled-components'
import {
	Button,
	createStyles,
	IconButton,
	InputAdornment,
	makeStyles,
	Paper,
	TextField,
	Theme,
	Typography,
} from '@material-ui/core'
import { Drawer } from 'antd'
import { CloseRounded, InfoRounded, SwapVertRounded } from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { changeToken, useTradingState } from 'stores/implements/trading'
import { usePairCandles } from 'services/token-collections'
import { usePairsFromUrl } from 'utils/hooks'
import { usePriceEstimate } from 'services/trading'
import { Skeleton } from '@material-ui/lab'
import { TokenSelector } from './token-selector'
import { InlineSearch } from './inline-search'
import { TradingDialog } from './trading-dialog'

const WrappedCard = styled(Paper)`
	transition: all 0.1s ease-in;
	height: 50%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 16px;
	position: relative;
	overflow: hidden;
	background: rgba(0, 87, 255, 0.06);

	&.MuiPaper-rounded {
		border-radius: 16px;
	}
`

const WrappedSwap = styled(Paper)`
	height: 50%;
	width: 100%;
	display: flex;
	align-self: center;
	flex-direction: column;
	/* padding: 8px 16px 16px; */
	position: relative;
	overflow: hidden;
	margin: 16px 0px;

	&.MuiPaper-elevation0 {
		box-shadow: 0 0px 3px 0px rgba(11, 11, 11, 0.09);
	}

	&.MuiPaper-rounded {
		border-radius: 8px;
	}
`

const Header = styled.div`
	display: flex;
	width: 100%;
	align-self: center;
	flex-direction: row;
	justify-content: space-between;
	margin-left: 8px;
`

const TopPayInfo = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 8px 0px 0px;
`

const BottomPayInfo = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 8px 0px 0px;
`

const TokenSelection = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 0px;
`

const TopperCard = styled.div`
	flex-grow: 1;
	background: transparent;
	transition: all 0.1s ease-in;
	display: flex;
	flex-direction: column;
	padding: 8px 16px;
`

const BottomCard = styled.div`
	flex-grow: 1;
	background: #e6eaf2;
	transition: all 0.1s ease-in;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 16px 16px 8px;
	border-radius: 0px;
`

const StyledDrawer = styled(Drawer)`
	.ant-drawer-mask {
		background: #fdfefe11;
	}
	.ant-drawer-body {
		padding: 8px;
	}
`

const DrawerHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 8px;
	overflow: hidden;

	&.ant-drawer-body::after {
		display: block;
		position: absolute;
		background: transparent;
		box-shadow: 0px 4px 16px 0px white inset;
	}
`

const BottomField = styled(TextField)`
	& .MuiOutlinedInput-input {
		padding: 12px;
	}

	& div.MuiInputBase-root {
		background: #fdfefe;
		box-shadow: rgba(14, 16, 60, 0.2) 0px 0px 1px, rgba(4, 8, 106, 0.07) 0px 2px 2px inset;
		border-radius: 8px;

		&:hover .MuiOutlinedInput-notchedOutline {
			border-color: #294698;
		}

		& fieldset {
			border-color: transparent;
		}
	}
`

const StyledField = styled(TextField)`
	&.MuiFormControl-root {
		margin-bottom: 24px;
	}
	& .MuiOutlinedInput-input {
		padding: 12px;
	}

	& div.MuiInputBase-root {
		background: #fdfefe;
		box-shadow: rgba(14, 16, 60, 0.2) 0px 0px 1px, rgba(4, 8, 106, 0.07) 0px 2px 2px inset;
		border-radius: 8px;

		&:hover .MuiOutlinedInput-notchedOutline {
			border-color: #294698;
		}

		& fieldset {
			border-color: transparent;
		}
	}
`

const SwapButton = styled(IconButton)`
	&.MuiIconButton-root {
		background: #fdfefe;
		padding: 8px;
		width: 44px;
		transform: translateY(calc(-50% - 16px)) translateX(16px);
		position: absolute;
		border: 2px solid rgba(0, 87, 255, 0.06);

		&:hover {
			color: #294698;
			background: #fdfefe;
		}
	}
`

const StyledIconButton = styled(IconButton)`
	background: transparent;

	&.MuiIconButton-root {
		padding: 4;
		&:hover {
			background: transparent;
		}
	}
`

export const SwapBox = () => {
	const dispatch = useDispatch()
	const history = useHistory()
	const [search, toggleSearch] = React.useState(false)
	const [type, setType] = React.useState<'PAY' | 'RECEIVE'>('PAY')
	const { paidToken, receivedToken } = usePairsFromUrl()
	const [firstTokenInput, setFirstTokenInput] = React.useState(0)
	const { estimateResult, setPaidNum } = usePriceEstimate(firstTokenInput)

	const searchItemClickCallback = React.useCallback(
		(changedToken: string) => {
			handleCloseDrawer()

			if (type === 'PAY') {
				if (changedToken === 'PRV' && receivedToken === 'PRV') {
					history.push(`/${changedToken}/${paidToken}`) // receivedToken <- paidToken
				} else if (changedToken !== 'PRV' && receivedToken !== 'PRV') {
					history.push(`/${changedToken}/PRV`) // receivedToken <- PRV
				} else {
					history.push(`/${changedToken}/${receivedToken}`)
				}
			} else {
				if (changedToken === 'PRV' && paidToken === 'PRV') {
					history.push(`/${receivedToken}/${changedToken}`) // paidToken <- receivedToken
				} else if (changedToken !== 'PRV' && paidToken !== 'PRV') {
					history.push(`/PRV/${changedToken}`) // paidToken <- PRV
				} else {
					history.push(`/${paidToken}/${changedToken}`)
				}
			}
		},
		[paidToken, receivedToken, type, history],
	)

	const handleSwapTrading = () => {
		if (receivedToken !== '' && paidToken !== '') {
			history.push(`/${receivedToken}/${paidToken}`)
		} else {
			dispatch(changeToken({ receivedToken: paidToken, paidToken: receivedToken }))
		}
	}

	const handleCloseDrawer = () => toggleSearch(false)

	const handleOpenDrawer = (searchType: 'PAY' | 'RECEIVE') => {
		toggleSearch(true)
		setType(searchType)
	}

	const handleOnFirstInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = parseFloat(e.target.value || '0')
		setFirstTokenInput(inputValue)
		setPaidNum(inputValue)
	}

	return (
		<>
			<Header>
				<Typography variant="h5">Light Shadow Swap</Typography>
				<StyledIconButton onClick={() => null} size="small">
					<InfoRounded style={{ color: '#294698' }} />
				</StyledIconButton>
			</Header>
			<WrappedSwap elevation={0}>
				<StyledDrawer
					placement="bottom"
					onClose={handleCloseDrawer}
					closable={false}
					visible={search}
					getContainer={false}
					height="100%"
					style={{ position: 'absolute' }}
				>
					<DrawerHeader>
						<Typography>You {type.charAt(0) + type.slice(1).toLowerCase()}</Typography>
						<StyledIconButton onClick={handleCloseDrawer}>
							<CloseRounded />
						</StyledIconButton>
					</DrawerHeader>
					<InlineSearch itemClickCallback={searchItemClickCallback} />
				</StyledDrawer>
				<TopperCard>
					<TopPayInfo>
						<Typography variant="body2">From</Typography>
						<Typography variant="caption" />
					</TopPayInfo>
					<TokenSelection>
						<div />
						<TokenSelector onClick={() => handleOpenDrawer('PAY')} isFrom />
					</TokenSelection>
					<StyledField
						onChange={handleOnFirstInputChanged}
						variant="outlined"
						value={firstTokenInput}
						InputProps={{ endAdornment: <InputAdornment position="end">{paidToken}</InputAdornment> }}
					/>
				</TopperCard>
				<BottomCard>
					<SwapButton onMouseDown={handleSwapTrading}>
						<SwapVertRounded fontSize="default" />
					</SwapButton>
					<BottomPayInfo>
						<Typography variant="body2">To</Typography>
						<Typography variant="caption" />
					</BottomPayInfo>
					<TokenSelection>
						<div />
						<TokenSelector onClick={() => handleOpenDrawer('RECEIVE')} />
					</TokenSelection>
					<StyledField
						variant="outlined"
						value={estimateResult}
						InputProps={{ endAdornment: <InputAdornment position="end">{receivedToken}</InputAdornment> }}
					/>
				</BottomCard>
			</WrappedSwap>
			<TradingDialog />
		</>
	)
}
