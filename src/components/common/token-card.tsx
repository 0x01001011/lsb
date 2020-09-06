import React from 'react'
import { Typography, Card, Grid, useTheme } from '@material-ui/core'
import { ResponsiveLine } from '@nivo/line'
import { TokenUiModel } from 'src/models/token'
import { useUsdEvolution } from 'src/services'
import styled from 'styled-components'
import DefaultIcon from 'src/assets/default-token.png'

export type TokenCardProps = {
	state: TokenUiModel
	href?: string
}

const StyledCard = styled(Card)`
	max-width: 300px;
	margin: 8px;
	padding: 8px;
	transition: all 0.2s ease-in;
	position: relative;

	&:hover {
		transform: scale(0.99);

		.overlay {
			opacity: 0;
			z-index: -1;
		}
	}

	&:hover .hoverable {
		transform: scale(1);
		opacity: 1;
	}
`

const HoverableImage = styled.img`
	width: 100%;
	opacity: 0.9;
	transition: all 0.2s ease-in;
	transform: scale(0.97);
`

const Overlay = styled.div`
	width: 100%;
	height: 100%;
	background: #303030;
	opacity: 0.4;
	position: absolute;
	top: 0;
	left: 0;

	transition: all 0.1s ease;
`

export const TokenCard = (props: TokenCardProps) => {
	const { state } = props
	const { tokenSymbol, tokenName, icon, gradients } = state
	const theme = useTheme()
	const { data, error, isFetching } = useUsdEvolution(tokenSymbol, 'month')

	if (error) {
		return <StyledCard />
	}

	const { currentAmount } = data || { currentAmount: [{ time: 0, value: 0 }] }
	const currentValue = Number(currentAmount[currentAmount.length - 1].value)
	const beginValue = Number(currentAmount.find(({ value }) => value !== null).value)
	const percentage = (currentValue - beginValue) / beginValue

	return (
		<StyledCard style={{ background: `linear-gradient(to bottom, ${gradients[0]}, ${gradients[1]})` }} elevation={0}>
			<Grid style={{ padding: '8px 16px' }} container>
				<Grid item xs={8}>
					<Typography variant="h5" gutterBottom>
						{tokenSymbol}
					</Typography>
					<Typography variant="h5" gutterBottom>
						$ {isFetching ? '-' : currentValue.toFixed(2)}
					</Typography>
					<Typography variant="caption">
						{!isFetching && (
							<span style={{ fontSize: '1.2rem', color: percentage < 0 ? '#f783ac' : '#47ecad' }}>
								{percentage < 0 ? '-' : '+'}
								{percentage.toFixed(2)}%
							</span>
						)}{' '}
						in last 30 days
					</Typography>
				</Grid>
				<Grid item xs={4}>
					{!isFetching && (
						<ResponsiveLine
							data={[{ id: '', color: '', data: currentAmount.map(({ time, value }) => ({ x: time, y: value })) }]}
							margin={{ top: 16, bottom: 16, left: 8 }}
							xScale={{ type: 'point' }}
							yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
							curve="catmullRom"
							axisTop={null}
							axisRight={null}
							axisBottom={null}
							axisLeft={null}
							enableGridX={false}
							enableGridY={false}
							colors={theme.palette.text.primary}
							enablePoints={false}
							isInteractive={false}
							legends={[]}
						/>
					)}
				</Grid>
				<Grid item xs={12}>
					<HoverableImage
						className="hoverable"
						src={icon}
						alt={tokenName}
						// eslint-disable-next-line no-return-assign
						onError={(e) => ((e.target as HTMLImageElement).src = DefaultIcon)}
					/>
				</Grid>
			</Grid>
		</StyledCard>
	)
}
