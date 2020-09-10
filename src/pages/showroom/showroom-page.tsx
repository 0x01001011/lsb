import React from 'react'
import styled from 'styled-components'
import { Typography, makeStyles, Theme, createStyles, Grid, Divider, Hidden } from '@material-ui/core'
import { BarLoader } from 'react-spinners'
import { useTokenInfos } from 'services/token-infos'
import { MasterLayout } from 'components/layouts'
import { TokenCard } from 'components/common/token-card'
import { Code, FilterList } from '@material-ui/icons'
import {
	fetchMore,
	TokenVariantType,
	refreshShowroom,
	changeTokenVariant,
	ShowOptionType,
	sortsWith,
	useShowRoomState,
} from 'stores/implements/showroom'
import { useDispatch } from 'react-redux'
import { PopupMenu } from './components/popup-menu'

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
		expanded: {
			width: '100%',
			height: '100%',
		},
		showroom: {
			minHeight: '90vh',
			padding: '16px 84px',
		},
	}),
)

export const ShowroomPage = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const { pageId, maxPages, showOption, tokenVariant, batchSize } = useShowRoomState((state) => state)
	const { data, isFetching } = useTokenInfos(tokenVariant)

	React.useEffect(() => {
		if (data) {
			dispatch(refreshShowroom({ dataSize: data.length }))
		}
	}, [data])

	// implement infinite scrolling with intersection observer
	const bottomBoundaryRef = React.useRef(null)

	const interactObserver = new IntersectionObserver((entries) => {
		entries.forEach((en) => {
			if (en.intersectionRatio > 0) {
				dispatch(fetchMore())
			}
		})
	})

	const scrollObserver = React.useCallback(
		(node) => {
			interactObserver.observe(node)
		},
		[dispatch, interactObserver],
	)

	React.useEffect(() => {
		if (bottomBoundaryRef.current) {
			scrollObserver(bottomBoundaryRef.current)
		}

		return () => bottomBoundaryRef.current && interactObserver.unobserve(bottomBoundaryRef.current)
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

			<Grid container className={classes.showroom} alignItems="center" justify="center">
				{isFetching ? (
					<BarLoader width="30%" />
				) : (
					data.slice(0, (pageId + 1) * batchSize).map((token, i) => (
						// eslint-disable-next-line react/no-array-index-key
						<Center key={`${token.tokenSymbol}-{${i}}`} item xs={9} sm={6} md={4} lg={3}>
							<TokenCard state={token} size="small" timeout={300 * (i % batchSize)} />
						</Center>
					))
				)}
			</Grid>
			{!isFetching && pageId < maxPages && (
				<div ref={bottomBoundaryRef} style={{ width: '100%', height: 8, background: 'transparent' }} />
			)}
		</MasterLayout>
	)
}
