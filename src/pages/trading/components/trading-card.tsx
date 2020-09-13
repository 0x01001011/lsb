import {
	Button,
	createStyles,
	Divider,
	IconButton,
	makeStyles,
	Paper,
	TextField,
	Theme,
	Typography,
} from '@material-ui/core'
import { Drawer } from 'antd'
import { ArrowDropDownRounded, CloseRounded, SwapVertRounded } from '@material-ui/icons'
import clsx from 'clsx'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { changeToken, swapTrading, useTradingState } from 'stores/implements/trading'
import styled from 'styled-components'
import { InlineSearchAutocomplete } from './inline-search-autocomplete'

const ContainerPaper = styled(Paper)`
	transition: all 0.1s ease-in;
	height: 420px;
	width: 360px;
	display: flex;
	flex-direction: column;
	padding: 8px;
	position: relative;
	overflow: hidden;

	&.MuiPaper-rounded {
		border-radius: 8px;
	}

	&.MuiPaper-elevation0 {
		box-shadow: 0 0px 16px 0px rgba(11, 11, 11, 0.18);
	}
`

const Header = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 8px 10px;
`

const PayInfo = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 16px 20px 12px;
`

const TradingInput = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 8px 20px 12px;
`

const TokenButton = styled(Button)`
	padding: 0px;

	span.MuiButton-label {
		color: #505050;
		font-size: 1.2rem;
		font-weight: 700;
	}

	&.MuiButton-root {
		text-transform: none;
		justify-content: left;
		align-items: center;
		width: 128px;
		height: 56px;
		margin-right: 16px;

		&:hover {
			background: transparent;

			span.MuiButton-label {
				color: #000000;
			}
		}
	}
`

const TopperCard = styled.div`
	flex-grow: 2;
	background: transparent;
	transition: all 0.1s ease-in;
	display: flex;
	flex-direction: column;
	padding: 8px;
`

const BottomCard = styled.div`
	flex-grow: 3;
	background: #f6f6f9;
	transition: all 0.1s ease-in;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 8px;
	border-radius: 8px;
`

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		titleText: {
			color: '#505050',
			fontWeight: 600,
			alignSelf: 'center',
		},
		iconButton: {
			background: theme.palette.background.paper,

			'&.MuiIconButton-root:hover': {
				background: theme.palette.background.paper,
			},
		},
		swapDecor: {
			padding: '8px',
			width: '42px',
			transform: 'translateY(calc(-50% - 8px)) translateX(16px)',
			position: 'absolute',
			border: '2px solid #f6f6f9',
		},
		topperField: {
			'& div.MuiInputBase-root': {
				background: '#f6f6f9',
				boxShadow: 'rgba(14, 16, 60, 0.2) 0px 0px 1px, rgba(4, 8, 106, 0.07) 0px 2px 2px inset',
				borderRadius: '8px',

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

				'& fieldset': {
					borderColor: 'transparent',
				},
			},
		},
		tradeButton: {
			padding: '16px 0px',
			borderRadius: '16px',
		},
	}),
)

const StyledDrawer = styled(Drawer)`
	.ant-drawer-body {
		padding: 8px;
	}
`

export const TradingCard = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const history = useHistory()
	const [search, toggleSearch] = React.useState(false)
	const [type, setType] = React.useState<'pay' | 'receive'>('pay')
	const { paidToken, paidAmount, receivedToken, receivedAmount } = useTradingState((state) => state)

	const searchItemClickCallback = React.useCallback(
		(token: string) => {
			handleCloseDrawer()
			dispatch(changeToken({ type, token }))
			// history.push(`/trading/${paidToken}/${receivedToken}`)
		},
		[dispatch, paidToken, receivedToken, type],
	)

	const handleSwapTrading = () => dispatch(swapTrading())

	const handleCloseDrawer = () => toggleSearch(false)
	const handleOpenDrawer = (searchType: 'pay' | 'receive') => {
		toggleSearch(true)
		setType(searchType)
	}

	return (
		<ContainerPaper id="drawer-container" elevation={0}>
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
				<Header>
					<Typography className={classes.titleText}>You {type.charAt(0).toUpperCase() + type.slice(1)}</Typography>
					<IconButton className={classes.iconButton} onClick={handleCloseDrawer}>
						<CloseRounded />
					</IconButton>
				</Header>
				<InlineSearchAutocomplete itemClickCallback={searchItemClickCallback} />
			</StyledDrawer>
			<Header>
				<Typography className={classes.titleText}>Market Order</Typography>
				<div />
			</Header>
			<Divider />
			<TopperCard>
				<PayInfo>
					<Typography className={classes.titleText}>You Pay</Typography>
					<Typography variant="caption" />
				</PayInfo>
				<TradingInput>
					<TokenButton
						style={paidToken === '' ? { width: 171 } : undefined}
						variant="text"
						endIcon={<ArrowDropDownRounded />}
						onMouseDown={() => handleOpenDrawer('pay')}
					>
						{paidToken || 'Choose token'}
					</TokenButton>
					{paidToken && <TextField classes={{ root: classes.topperField }} variant="outlined" />}
				</TradingInput>
			</TopperCard>
			<BottomCard>
				<IconButton className={clsx(classes.iconButton, classes.swapDecor)} onMouseDown={handleSwapTrading}>
					<SwapVertRounded fontSize="default" />
				</IconButton>
				<PayInfo>
					<Typography className={classes.titleText}>You Receive</Typography>
					<Typography variant="caption" />
				</PayInfo>
				<TradingInput>
					<TokenButton
						style={receivedToken === '' ? { width: 171 } : undefined}
						variant="text"
						endIcon={<ArrowDropDownRounded />}
						onMouseDown={() => handleOpenDrawer('receive')}
					>
						{receivedToken || 'Choose Token'}
					</TokenButton>
					{receivedToken && <TextField classes={{ root: classes.bottomField }} variant="outlined" />}
				</TradingInput>
				<Button
					className={classes.tradeButton}
					disabled={!paidAmount || !receivedAmount}
					color="primary"
					variant="contained"
				>
					Review Order
				</Button>
			</BottomCard>
		</ContainerPaper>
	)
}
