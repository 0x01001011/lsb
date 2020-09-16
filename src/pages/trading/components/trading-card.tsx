import {
	Avatar,
	Button,
	createStyles,
	IconButton,
	makeStyles,
	Paper,
	TextField,
	Theme,
	Typography,
} from '@material-ui/core'
import { Drawer } from 'antd'
import { ArrowDropDownRounded, CloseRounded, InfoRounded, SwapVertRounded } from '@material-ui/icons'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { changeToken, swapTrading, useTradingState } from 'stores/implements/trading'
import styled from 'styled-components'
import { InlineSearchAutocomplete } from './inline-search-autocomplete'

const WrappedCard = styled(Paper)`
	transition: all 0.1s ease-in;
	height: 500px;
	width: 400px;
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
	transition: all 0.1s ease-in;
	height: 360px;
	width: 300px;
	display: flex;
	align-self: center;
	flex-direction: column;
	padding: 8px;
	position: relative;
	overflow: hidden;

	&.MuiPaper-elevation0 {
		box-shadow: 0 0px 8px 0px rgba(11, 11, 11, 0.18);
	}

	&.MuiPaper-rounded {
		border-radius: 16px;
	}
`

const Header = styled.div`
	display: flex;
	width: 300px;
	align-self: center;
	flex-direction: row;
	justify-content: space-between;
`

const PayInfo = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 8px 16px;
`

const TokenSelection = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 0px 16px 8px;
`

const TopperCard = styled.div`
	flex-grow: 1;
	background: transparent;
	transition: all 0.1s ease-in;
	display: flex;
	flex-direction: column;
	padding: 8px;
`

const BottomCard = styled.div`
	flex-grow: 1;
	background: rgba(0, 87, 255, 0.06);
	transition: all 0.1s ease-in;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 16px 8px 8px;
	border-radius: 8px;
`

const StyledDrawer = styled(Drawer)`
	.ant-drawer-body {
		padding: 8px;
	}
`

const DrawerHeader = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 8px 16px;
	overflow: hidden;

	&.ant-drawer-body::after {
		display: block;
		position: absolute;
		background: transparent;
		box-shadow: 0px 4px 16px 0px white inset;
	}
`

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		titleText: {
			// color: '#505050',
			fontWeight: 600,
			fontSize: '1.3rem',
			alignSelf: 'center',
		},
		iconButton: {
			background: 'transparent',

			'&.MuiIconButton-root': {
				padding: 0,
			},

			'&.MuiIconButton-root:hover': {
				background: 'transparent',
			},
		},
		tokenSelector: {
			padding: 0,

			'&.MuiButton-root': {
				textTransform: 'none',
				justifyContent: 'left',
				alignItems: 'center',
				width: 128,
				marginRight: 16,

				'& .MuiButton-label': {
					/* color: #505050; */
					fontSize: '1.2rem',
					fontWeight: 700,
				},

				'&:hover': {
					background: 'transparent',

					'& .MuiButton-label': {
						color: theme.palette.primary.dark,
					},
				},
			},
		},
		swapDecor: {
			background: theme.palette.background.paper,
			padding: '8px',
			width: '44px',
			transform: 'translateY(calc(-50% - 16px)) translateX(16px)',
			position: 'absolute',
			border: '2px solid rgba(0, 87, 255, 0.06)',

			'&.MuiIconButton-root:hover': {
				color: theme.palette.primary.main,
				background: theme.palette.background.paper,
			},
		},
		topperField: {
			'& div.MuiInputBase-root': {
				background: 'rgba(0, 87, 255, 0.06)',
				boxShadow: 'rgba(14, 16, 60, 0.2) 0px 0px 1px, rgba(4, 8, 106, 0.07) 0px 2px 2px inset',
				borderRadius: '8px',

				'&:hover .MuiOutlinedInput-notchedOutline': {
					borderColor: theme.palette.primary.main,
				},

				'& fieldset': {
					borderColor: 'transparent',
				},
			},
		},
		bottomField: {
			'& div.MuiInputBase-root': {
				background: theme.palette.background.paper,
				boxShadow: 'rgba(14, 16, 60, 0.2) 0px 0px 1px, rgba(4, 8, 106, 0.07) 0px 2px 2px inset',
				borderRadius: '8px',

				'&:hover .MuiOutlinedInput-notchedOutline': {
					borderColor: theme.palette.primary.main,
				},

				'& fieldset': {
					borderColor: 'transparent',
				},
			},
		},
		tradeButton: {
			width: 300,
			alignSelf: 'center',
			padding: '12px 0px',
			borderRadius: '16px',
		},
		primaryIcon: {
			color: theme.palette.primary.main,
		},
	}),
)

export const TradingCard = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const history = useHistory()
	const [search, toggleSearch] = React.useState(false)
	const [type, setType] = React.useState<'PAY' | 'RECEIVE'>('PAY')
	const { paidToken, paidAmount, receivedToken, receivedAmount } = useTradingState((state) => state)

	const searchItemClickCallback = React.useCallback(
		(changedToken: string) => {
			handleCloseDrawer()

			/* 2 sides already picked */
			if (type === 'PAY' && receivedToken !== '') {
				history.push(`/trading/${changedToken}/${receivedToken}`)
			} else if (type === 'RECEIVE' && paidToken !== '') {
				history.push(`/trading/${paidToken}/${changedToken}`)
				/* Picked 1 side and the other side was empty */
			} else {
				history.push(`/trading/${changedToken}?type=${type}`)
			}
		},
		[dispatch, paidToken, receivedToken, type],
	)

	const handleSwapTrading = () => {
		if (receivedToken !== '' && paidToken !== '') {
			history.push(`/trading/${receivedToken}/${paidToken}`)
		} else {
			dispatch(changeToken({ receivedToken: paidToken, paidToken: receivedToken }))
		}
	}

	const handleCloseDrawer = () => toggleSearch(false)
	const handleOpenDrawer = (searchType: 'PAY' | 'RECEIVE') => {
		toggleSearch(true)
		setType(searchType)
	}

	return (
		<WrappedCard id="drawer-container" elevation={0}>
			<Header>
				<Typography className={classes.titleText}>Light Shadow Swap</Typography>
				<IconButton className={classes.iconButton} onClick={() => null} size="small">
					<InfoRounded className={classes.primaryIcon} />
				</IconButton>
			</Header>
			<WrappedSwap elevation={0}>
				<StyledDrawer
					placement="bottom"
					onClose={handleCloseDrawer}
					closable={false}
					visible={search}
					forceRender
					getContainer={false}
					height="100%"
					style={{ position: 'absolute' }}
				>
					<DrawerHeader>
						<Typography>You {type.charAt(0) + type.slice(1).toLowerCase()}</Typography>
						<IconButton className={classes.iconButton} onClick={handleCloseDrawer}>
							<CloseRounded />
						</IconButton>
					</DrawerHeader>
					<InlineSearchAutocomplete itemClickCallback={searchItemClickCallback} />
				</StyledDrawer>
				<TopperCard>
					<PayInfo>
						<Typography variant="body2">From</Typography>
						<Typography variant="caption" />
					</PayInfo>
					<TokenSelection>
						<Button
							className={classes.tokenSelector}
							style={paidToken === '' ? { width: 171 } : undefined}
							variant="text"
							endIcon={<ArrowDropDownRounded />}
							onMouseDown={() => handleOpenDrawer('PAY')}
						>
							{paidToken || 'Choose token'}
						</Button>
						<div />
					</TokenSelection>
					<TextField classes={{ root: classes.topperField }} variant="outlined" />
				</TopperCard>
				<BottomCard>
					<IconButton className={classes.swapDecor} onMouseDown={handleSwapTrading}>
						<SwapVertRounded fontSize="default" />
					</IconButton>
					<PayInfo>
						<Typography variant="body2">To</Typography>
						<Typography variant="caption" />
					</PayInfo>
					<TokenSelection>
						<Button
							className={classes.tokenSelector}
							style={receivedToken === '' ? { width: 171 } : undefined}
							variant="text"
							endIcon={<ArrowDropDownRounded />}
							onMouseDown={() => handleOpenDrawer('RECEIVE')}
						>
							{receivedToken || 'Choose Token'}
						</Button>
						<div />
					</TokenSelection>
					<TextField classes={{ root: classes.bottomField }} variant="outlined" />
				</BottomCard>
			</WrappedSwap>
			<Button
				className={classes.tradeButton}
				// disabled={!paidAmount || !receivedAmount}
				color="primary"
				variant="contained"
			>
				Swap
			</Button>
		</WrappedCard>
	)
}
