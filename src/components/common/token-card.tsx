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
	size?: 'large' | 'mid' | 'small'
}

const StyledCard = styled(Card)`
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

		.hoverable {
			transform: scale(1) translate3d(0, 1px, 1px);
			opacity: 1;
		}
	}

	&:active {
		transform: scale(0.97);

		.overlay {
			opacity: 0;
			z-index: -1;
		}

		.hoverable {
			transform: scale(1.05) translate3d(0, 1.2px, 1.2px);
			opacity: 1;
		}
	}
`

const Center = styled(Grid)`
	display: flex;
	justify-content: center;
	align-items: center;
`

const HoverableImage = styled.img`
	opacity: 0.9;
	transition: all 0.2s ease-in;
	transform: scale(0.97);
`

export const TokenCard = (props: TokenCardProps) => {
	const theme = useTheme()
	const { state, size = 'mid' } = props
	const { tokenSymbol, tokenName, icon, gradients } = state
	const { data, error, isFetching } = useUsdEvolution(tokenSymbol, 'month')

	if (error) {
		return <StyledCard />
	}

	const { currentAmount } = data || { currentAmount: [{ time: 0, value: 0 }] }
	const properRecords = currentAmount.filter(({ value }) => value)

	let percentage = 0
	let last = 0

	if (!isFetching && properRecords.length > 0) {
		last = Number(properRecords[properRecords.length - 1].value)
		const first = Number(properRecords[0].value)
		percentage = first === 0 ? 0 : (last - first) / first
	}

	return (
		<StyledCard
			style={{
				maxWidth: size === 'small' ? 240 : 300,
				background: `linear-gradient(to bottom, ${gradients[0]}, ${gradients[1]})`,
			}}
			elevation={0}
		>
			<Grid style={{ padding: '8px 16px' }} container>
				<Grid item xs={8}>
					<Typography variant={size === 'small' ? 'body1' : 'h5'} gutterBottom>
						{tokenSymbol}
					</Typography>
					<Typography variant={size === 'small' ? 'body1' : 'h5'} gutterBottom>
						$ {isFetching ? '-' : last.toFixed(2)}
					</Typography>
					<Typography variant="caption">
						{!isFetching && (
							<span
								style={{
									fontSize: size === 'small' ? '0.9rem' : '1.2rem',
									color: percentage < 0 ? '#f783ac' : '#47ecad',
								}}
							>
								{percentage > 0 && '+'}
								{percentage.toFixed(2)}%
							</span>
						)}{' '}
						last 30 days
					</Typography>
				</Grid>
				<Grid style={{ maxHeight: size === 'small' ? 82 : 112 }} item xs={4}>
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
				<Center item xs={12}>
					<HoverableImage
						style={size === 'small' ? { width: '75%', margin: 16 } : { width: '100%' }}
						className="hoverable"
						src={icon}
						alt={tokenName}
						// eslint-disable-next-line no-return-assign
						onError={(e) => ((e.target as HTMLImageElement).src = DefaultIcon)}
					/>
				</Center>
			</Grid>
		</StyledCard>
	)
}
