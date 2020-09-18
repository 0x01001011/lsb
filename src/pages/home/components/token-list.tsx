import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import { Alert, Skeleton } from '@material-ui/lab'
import React from 'react'
import { usePairCandles } from 'services/token-collections/pair-candles'
import styled from 'styled-components'

const TokenListContainer = styled(TableContainer)`
	max-height: calc(100vh - 90px);
`

const CustomCellTable = styled(TableCell)`
	border-bottom: 1px dashed #e3eaf6 !important;
`
export const TokenList = () => {
	const pairsData = usePairCandles()
	if (pairsData.isLoading) {
		return (
			<div>
				<Skeleton animation="wave" />
				<Skeleton animation="wave" />
				<Skeleton animation="wave" />
				<Skeleton animation="wave" />
				<Skeleton animation="wave" />
				<Skeleton animation="wave" />
				<Skeleton animation="wave" />
				<Skeleton animation="wave" />
			</div>
		)
	}
	if (pairsData.isError) {
		return (
			<div>
				<Alert variant="filled" severity="error">
					Fetch Data Error
				</Alert>
			</div>
		)
	}
	return (
		<TokenListContainer>
			<Table stickyHeader aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>1</TableCell>
						<TableCell align="right">b</TableCell>
						<TableCell align="right">c</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{pairsData.data.map((row) => (
						<TableRow key={row}>
							<CustomCellTable component="th" scope="row">
								{row}
							</CustomCellTable>
							<CustomCellTable align="right">{row}</CustomCellTable>
							<CustomCellTable align="right">{row}</CustomCellTable>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TokenListContainer>
	)
}
