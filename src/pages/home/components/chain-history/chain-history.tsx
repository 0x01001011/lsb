import React from 'react'
import styled from 'styled-components'
import PrvSrc from 'assets/prv@2x.png'
import DefaultTokenImage from 'assets/default-token.png'
import {
	Avatar,
	Divider,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TablePagination,
	TableRow,
	Typography,
	useTheme,
} from '@material-ui/core'
import { KeyboardArrowRight, KeyboardArrowLeft, FirstPage, LastPage } from '@material-ui/icons'
import { useTradeHistory } from 'services/revolutions'
import { useTradingState } from 'stores/implements/trading'
import { TokenUiModel } from 'models/token'
import { useDictionaryTokenInfos } from 'services/token-collections'
import { useWindowSize } from 'utils/hooks'

const ChainHistoryContainer = styled.div`
	padding: 8px 12px;
	margin-bottom: 24px;
`

interface TablePaginationActionsProps {
	count: number
	page: number
	rowsPerPage: number
	onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void
}

function TablePaginationActions(props: TablePaginationActionsProps) {
	const theme = useTheme()
	const { count, page, rowsPerPage, onChangePage } = props

	const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onChangePage(event, 0)
	}

	const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onChangePage(event, page - 1)
	}

	const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onChangePage(event, page + 1)
	}

	const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
	}

	return (
		<>
			<StyledIconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
				{theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
			</StyledIconButton>
			<StyledIconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
				{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
			</StyledIconButton>
			<StyledIconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
			</StyledIconButton>
			<StyledIconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				{theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
			</StyledIconButton>
		</>
	)
}

const getTokenImage = (tokenInfo: TokenUiModel) => {
	if (!tokenInfo) {
		return DefaultTokenImage
	}
	return tokenInfo.tokenSymbol === 'PRV' ? PrvSrc : tokenInfo.icon
}

const TokenImage: React.FC<{ tokenName: string }> = ({ tokenName }) => {
	const { isFetching, data } = useDictionaryTokenInfos('Ally')
	if (isFetching) {
		return null
	}
	return <StyledAvatar src={getTokenImage(data[tokenName])} alt="-" />
}

const initialState = {
	page: 0,
	rowsPerPage: 4,
}

export const ChainHistory = () => {
	const [state, setState] = React.useState(initialState)
	const { page, rowsPerPage } = state
	const { paidToken, receivedToken } = useTradingState((state) => state)
	const { isFetching, data: records, isError } = useTradeHistory(`${paidToken}-${receivedToken}`)
	const windowSize = useWindowSize()

	React.useEffect(() => {
		const { width, height } = windowSize

		if (width > 1280 && height > 700) {
			setState({ ...state, rowsPerPage: Math.floor((height - 680) / 38) })
		}
	}, [windowSize])

	if (isError || isFetching) {
		return null
	}

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, records.length - page * rowsPerPage)

	const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
		setState({ ...state, page: newPage })
	}

	return (
		<ChainHistoryContainer>
			<Typography variant="h6" gutterBottom>
				Chain History
			</Typography>
			<Meta>
				<Typography variant="caption">from</Typography>
				<Typography variant="caption">to</Typography>
				<Typography variant="caption" align="right">
					rate
				</Typography>
				<Typography variant="caption" align="right">
					time
				</Typography>
			</Meta>
			<Divider />
			<TableContainer>
				<Table aria-label="history-chain" style={{ tableLayout: 'fixed' }}>
					<TableBody style={{ whiteSpace: 'nowrap' }}>
						{records
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map(({ pair, quoteAmount, baseAmount, buyOrSell, price, time }) => {
								const [first, second] = pair.split('-')
								const unitPrice = Number(price)

								const [fromToken, toToken, fromAmount, toAmount] =
									buyOrSell === 'buy'
										? [first, second, baseAmount, quoteAmount]
										: [second, first, quoteAmount, baseAmount]
								const exRate = buyOrSell === 'buy' ? unitPrice.toFixed(7) : (unitPrice ** -1).toFixed(7)
								return (
									<TableRow key={time.toString()}>
										<StyledLeftCell style={{ width: '25%' }}>
											<Typography variant="caption">
												<span>
													<TokenImage tokenName={fromToken} />
												</span>
												{`${fromAmount.toFixed(2)} ${fromToken}`}
											</Typography>
										</StyledLeftCell>
										<StyledLeftCell style={{ width: '25%' }}>
											<Typography variant="caption">
												<span>
													<TokenImage tokenName={toToken} />
												</span>
												{`${toAmount.toFixed(2)} ${toToken}`}
											</Typography>
										</StyledLeftCell>
										<StyledRightCell style={{ width: '15%' }} align="right">
											<Typography variant="caption">{`${exRate}`}</Typography>
										</StyledRightCell>
										<StyledRightCell style={{ width: '35%' }} align="right">
											<Typography variant="caption">{new Date(time).toUTCString().slice(4)}</Typography>
										</StyledRightCell>
									</TableRow>
								)
							})}
						{emptyRows > 0 && (
							<TableRow style={{ height: 38 * emptyRows }}>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								style={{ borderBottom: 'none' }}
								rowsPerPageOptions={[]}
								colSpan={6}
								align="right"
								count={records.length}
								rowsPerPage={rowsPerPage}
								page={page}
								onChangePage={handleChangePage}
								ActionsComponent={TablePaginationActions}
							/>
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		</ChainHistoryContainer>
	)
}

const Meta = styled.div`
	display: grid;
	grid-template-columns: 0.25fr 0.25fr 0.15fr 0.35fr;
	color: rgba(0, 0, 0, 0.54);
	margin-bottom: 8px;
`

const StyledLeftCell = styled(TableCell)`
	&.MuiTableCell-root {
		padding: 8px 0px;
		padding-right: 8px;
	}
	border-bottom: 1px dashed #e3eaf6 !important;
`

const StyledRightCell = styled(TableCell)`
	&.MuiTableCell-root {
		padding: 8px 0px;
		padding-left: 8px;
	}
	border-bottom: 1px dashed #e3eaf6 !important;
`

const StyledAvatar = styled.img`
	width: 1rem;
	height: 1rem;
	margin-right: 4px;
`

const StyledIconButton = styled(IconButton)`
	background: transparent;
	border: none;

	&.MuiIconButton-root {
		padding: 0px;
		margin: 0px 16px;

		&:hover {
			color: #294698;
			background: transparent;
		}
	}
`
