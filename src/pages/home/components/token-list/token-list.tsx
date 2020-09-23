import React, { ChangeEvent } from 'react'
import styled from 'styled-components'

import { FilterListRounded, SearchRounded } from '@material-ui/icons'
import { Alert, ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { Skeleton } from 'antd'
import { usePairOverview } from 'services/token-collections'

import { Button, Divider, IconButton, List, ListItem, TextField, Typography } from '@material-ui/core'
import { PerPair } from 'models/incscan-api'
import { useHistory } from 'react-router-dom'
import { sortedIndex } from 'lodash'
import { StyledOption } from './option'
import { ListboxComponent } from './virtualized-sizer'

const TokenListContainer = styled.div`
	max-height: calc(100vh - 90px);
	height: 100%;
`

enum SortType {
	ByVolume,
	ByPair,
	ByLiquidity,
}

const initialState = {
	pattern: '',
	isSearch: false,
	isSort: false,
	sortType: SortType.ByVolume,
}

export const TokenList = () => {
	const history = useHistory()
	const searchRef = React.useRef<HTMLInputElement>()
	const timerRef = React.useRef<number>(null)
	const [localState, setLocalState] = React.useState(initialState)
	const { pattern, isSearch, sortType, isSort } = localState
	const { isFetching, data, isError } = usePairOverview()

	const handleSortFn = React.useCallback(
		(a: PerPair, b: PerPair) => {
			if (sortType === SortType.ByPair) {
				return a.pair.localeCompare(b.pair)
			}
			if (sortType === SortType.ByVolume) {
				return b.volume - a.volume
			}
			return b.liquidity - a.liquidity
		},
		[sortType],
	)

	const displayedItems = React.useMemo(() => {
		if (!data || !handleSortFn) return []
		return data.perPair.filter((opt) => opt.pair.toLowerCase().includes(pattern)).sort(handleSortFn)
	}, [data, pattern, handleSortFn])

	if (isError) {
		return (
			<>
				<Alert variant="filled" severity="error">
					Fetch Data Error
				</Alert>
			</>
		)
	}

	const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		clearTimeout(timerRef.current)
		const { value } = event.target
		timerRef.current = setTimeout(() => setLocalState({ ...localState, pattern: value.toLowerCase() }), 300)
	}

	const handleToggleSearchLazy = () => {
		setTimeout(() => {
			if (!isSearch) searchRef.current?.focus()
			handleToggleSearch()
		}, 50)
	}

	const handleToggleSearch = () => {
		setLocalState({ ...localState, isSearch: !isSearch, isSort: isSearch ? isSort : false })
	}

	const handleItemClick = (pair: string) => {
		const [first, second] = pair.split('-')
		setLocalState({ ...localState, pattern: '' })
		history.push(`/${first}/${second}`)
	}

	const handleSortSelect = (event: React.MouseEvent<HTMLElement>, value: string) => {
		if (value !== null) {
			setLocalState({ ...localState, sortType: SortType[value], isSort: false })
		}
	}

	const handleToggleSort = () => {
		setLocalState({ ...localState, isSort: !isSort })
	}

	return (
		<TokenListContainer>
			<Header>
				<ButtonGroup>
					<StyledIconButton onMouseDown={handleToggleSort}>
						<FilterListRounded />
					</StyledIconButton>
					<StyledIconButton onMouseDown={handleToggleSearchLazy}>
						<SearchRounded />
					</StyledIconButton>
				</ButtonGroup>

				<StyledTitle style={isSearch || isSort ? { opacity: 0 } : { opacity: 1 }} variant="h5">
					Market
				</StyledTitle>

				<StyledInput
					style={isSearch ? { width: 'calc(100% - 64px)' } : { width: 0 }}
					placeholder="PRV-pETH"
					fullWidth
					variant="standard"
					onChange={handleInputChange}
					onBlur={handleToggleSearch}
					inputRef={searchRef}
				/>

				<StyledOptionGroup style={isSort ? { width: 'calc(100% - 64px)' } : { width: 0 }}>
					<ToggleButtonGroup value={SortType[sortType]} exclusive onChange={handleSortSelect}>
						<StyledSortOption value="ByPair">P</StyledSortOption>
						<StyledSortOption value="ByVolume">V</StyledSortOption>
						<StyledSortOption value="ByLiquidity">L</StyledSortOption>
					</ToggleButtonGroup>
				</StyledOptionGroup>
			</Header>
			<Meta>
				<Typography variant="caption">pair</Typography>
				<Typography variant="caption" align="right">
					volume
				</Typography>
				<Typography variant="caption" align="right">
					liquidity
				</Typography>
			</Meta>
			<Divider />
			{isFetching ? (
				<>
					<Skeleton active />
					<Skeleton active />
					<Skeleton active />
					<Skeleton active />
				</>
			) : (
				<List component={ListboxComponent as React.ComponentType<React.HTMLAttributes<HTMLElement>>}>
					{displayedItems.map((pair: PerPair) => (
						<StyledListItem key={pair.pair} button onClick={() => handleItemClick(pair.pair)} disableGutters>
							<StyledOption {...pair} />
						</StyledListItem>
					))}
				</List>
			)}
		</TokenListContainer>
	)
}

const Header = styled.div`
	display: flex;
	position: relative;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 24px;
`

const ButtonGroup = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`

const StyledTitle = styled(Typography)`
	font-weight: 400;
	transition: all 0.2s ease;
	justify-self: flex-end;
`
const StyledInput = styled(TextField)`
	transition: width 0.2s ease;
	&.MuiFormControl-root {
		position: absolute;
		top: auto;
		left: 64px;
	}

	.MuiInputBase-input {
		text-align: right;
		padding-right: 8px;
	}
`

const StyledOptionGroup = styled.div`
	transition: width 0.2s ease;
	display: flex;
	justify-content: flex-end;
	position: absolute;
	top: auto;
	left: 64px;
	overflow: hidden;
`

const StyledSortOption = styled(ToggleButton)`
	&.MuiToggleButton-root {
		border-radius: 0px;
		padding: 0.05em 0.8em;
		background: #e6eaf2;
		color: inherit;
		font-weight: 600;
		font-size: 0.75rem;
		letter-spacing: 0.1em;
		margin: 8px 16px;
		border: none;

		&.Mui-selected {
			background: #294698;
			color: #fafbfb;

			&:hover {
				background: #29469877;
			}
		}
	}
`

const Meta = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	color: rgba(0, 0, 0, 0.54);
	padding: 0px 8px;
	margin-bottom: 16px;
`

const StyledListItem = styled(ListItem)`
	border-bottom: 1px dashed #e3eaf6 !important;
`

const StyledIconButton = styled(IconButton)`
	background: transparent;
	border: none;

	&.MuiIconButton-root {
		padding: 4px;

		&:hover {
			color: #294698;
			background: transparent;
		}
	}
`
