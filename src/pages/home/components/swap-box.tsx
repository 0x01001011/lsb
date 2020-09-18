import { TableContainer, Button, Card, CardActionArea, CardActions, CardContent, Typography } from '@material-ui/core'
import { Alert, Skeleton } from '@material-ui/lab'
import React from 'react'
import { usePairCandles } from 'services/token-collections/pair-candles'
import styled from 'styled-components'

const SwapboxContainer = styled(TableContainer)`
	background-color: #f4f7fa;
	margin: 6px;
	padding: 8px;
	border-radius: 8px;
`

const SwapboxCard = styled(Card)``

export const SwapBox = () => {
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
		<SwapboxContainer>
			<SwapboxCard>
				<CardActionArea>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							SWAPBOX
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
							continents except Antarctica
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button size="small" color="primary">
						Share
					</Button>
					<Button size="small" color="primary">
						Learn More
					</Button>
				</CardActions>
			</SwapboxCard>
		</SwapboxContainer>
	)
}
