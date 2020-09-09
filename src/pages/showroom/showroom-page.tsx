import React from 'react'
import styled from 'styled-components'
import { Typography, makeStyles, Theme, createStyles, Grid, Divider, Hidden } from '@material-ui/core'
import { BarLoader } from 'react-spinners'
import { useTokenInfos } from 'src/services/token-infos'
import { MasterLayout } from 'src/components/layouts'
import { TokenCard } from 'src/components/common/token-card'
import { Code, FilterList } from '@material-ui/icons'
import {
	fetchMore,
	TokenVariantType,
	refreshShowroom,
	changeTokenVariant,
	ShowOptionType,
	sortsWith,
	ShowroomState,
} from 'src/redux/showroom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux'
import { PopupMenu } from './components/popup-menu'

const ShowroomContainer = styled.div`
	min-height: 100vh;
	padding: 32px 72px;
`

const Center = styled(Grid)`
	display: flex;
	justify-content: center;
	align-items: center;
`

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		header: {
			marginTop: 128,
		},
		reponsive: {
			[theme.breakpoints.down('sm')]: {
				fontSize: '1.4rem',
			},
			[theme.breakpoints.up('md')]: {
				fontSize: '2.0rem',
			},
		},
	}),
)

export const ShowroomPage = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const { pageId, maxPages, showOption, tokenVariant, batchSize } = useSelector<RootState, ShowroomState>(
		(state) => state.showroom,
	)
	const { data, isFetching } = useTokenInfos(tokenVariant)

	React.useEffect(() => {
		if (data) {
			dispatch(refreshShowroom({ dataSize: data.length }))
		}
	}, [data])

	React.useEffect(() => {
		console.log({ pageId: `Changed ${pageId}` })
	}, [pageId])

	// implement infinite scrolling with intersection observer
	const bottomBoundaryRef = React.useRef(null)

	const scrollObserver = React.useCallback(
		(node) => {
			new IntersectionObserver((entries) => {
				entries.forEach((en) => {
					if (en.intersectionRatio > 0) {
						console.log('Fetch more..')
						dispatch(fetchMore())
					}
				})
			}).observe(node)
		},
		[dispatch],
	)

	React.useEffect(() => {
		console.log({ bottomBoundaryRef })
		if (bottomBoundaryRef.current) {
			console.log('Create observer..')
			scrollObserver(bottomBoundaryRef.current)
		}
	}, [scrollObserver, bottomBoundaryRef])

	const showTokens = React.useCallback(
		(variant: TokenVariantType) => {
			dispatch(changeTokenVariant({ variant }))
		},
		[dispatch],
	)

	const sortTokens = React.useCallback(
		(option: ShowOptionType) => {
			dispatch(sortsWith({ option }))
		},
		[dispatch],
	)

	return (
		<MasterLayout>
			<Grid container className={classes.header} alignItems="center" justify="space-between">
				<Grid item xs={12} sm={8}>
					<Typography className={classes.reponsive}>Availables Tokens</Typography>
				</Grid>
				<Grid item sm={2}>
					<PopupMenu
						selected={tokenVariant}
						options={['Coins', 'Shielded Tokens', 'Custom Tokens']}
						menuClickCallback={showTokens}
						endIcon={<Code />}
					/>
				</Grid>
				<Grid item sm={2}>
					<Hidden smDown>
						<PopupMenu
							selected={showOption}
							options={['A-Z', 'Market Capacity', 'Top Mover', 'Volume']}
							menuClickCallback={sortTokens}
							endIcon={<FilterList />}
						/>
					</Hidden>
				</Grid>
			</Grid>
			<Divider />
			<ShowroomContainer>
				<Grid container alignItems="center" justify="center">
					{isFetching ? (
						<BarLoader />
					) : (
						data.slice(0, (pageId + 1) * batchSize).map((token) => (
							<Center key={token.tokenSymbol} item xs={9} sm={6} md={4} lg={3}>
								<TokenCard state={token} size="small" />
							</Center>
						))
					)}
				</Grid>
				<div ref={bottomBoundaryRef} style={{ width: '100%', height: 64, background: 'transparent' }} />
			</ShowroomContainer>
		</MasterLayout>
	)
}
