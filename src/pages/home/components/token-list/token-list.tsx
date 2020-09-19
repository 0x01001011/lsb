import React, { ChangeEvent } from 'react'
import styled from 'styled-components'

import { SearchRounded } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'
import { Skeleton } from 'antd'
import { usePairOverview } from 'services/token-collections'

import { IconButton, List, ListItem, TextField, Typography } from '@material-ui/core'
import { ListboxComponent } from 'components/common/autocomplete/virtualized-utils'
import { PerPair } from 'models/incscan-api'
import { useHistory } from 'react-router-dom'
import { StyledOption } from './option'

const TokenListContainer = styled.div`
	max-height: calc(100vh - 90px);
`

const initialState = {
	pattern: '',
	searching: false,
}

export const TokenList = () => {
	const [localState, setLocalState] = React.useState(initialState)
	const { pattern, searching } = localState
	const searchRef = React.useRef<HTMLInputElement>()
	const history = useHistory()

	const { isFetching, data, isError } = usePairOverview()

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
		setLocalState({ ...localState, pattern: event.target.value.toLowerCase() })
	}

	const handleMouseDown = () => {
		setTimeout(() => {
			if (!searching) searchRef.current?.focus()
			handleToggleSearch()
		}, 50)
	}

	const handleToggleSearch = () => {
		setLocalState({ ...localState, searching: !searching })
	}

	const handleItemClick = (pair: string) => {
		const [first, second] = pair.split('-')
		history.push(`/${first}/${second}`)
	}

	return (
		<TokenListContainer>
			<Header>
				<StyledIconButton onMouseDown={handleMouseDown}>
					<SearchRounded />
				</StyledIconButton>
				<StyledInput
					style={searching ? { width: 'calc(100% - 32px)' } : { width: 0 }}
					placeholder="Type to search"
					fullWidth
					variant="standard"
					onChange={handleInputChange}
					onBlur={handleToggleSearch}
					inputRef={searchRef}
				/>
				<StyledTitle style={searching ? { opacity: 0 } : { opacity: 1 }} variant="h5">
					Market
				</StyledTitle>
			</Header>
			<Meta>
				<Typography variant="body2">Pair</Typography>
				<Typography variant="body2" align="right">
					Volume
				</Typography>
				<Typography variant="body2" align="right">
					Liquidity
				</Typography>
			</Meta>

			{isFetching ? (
				<>
					<Skeleton active />
					<Skeleton active />
					<Skeleton active />
					<Skeleton active />
				</>
			) : (
				<List component={ListboxComponent as React.ComponentType<React.HTMLAttributes<HTMLElement>>}>
					{data.perPair
						.filter((opt) => opt.pair.toLowerCase().includes(pattern))
						.map((pair: PerPair) => (
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

const StyledTitle = styled(Typography)`
	font-weight: 400;
	transition: all 0.2s ease;
`
const StyledInput = styled(TextField)`
	transition: width 0.2s ease;
	&.MuiFormControl-root {
		position: absolute;
		top: auto;
		left: 32px;
	}

	.MuiInputBase-input {
		text-align: right;
		padding-right: 8px;
	}
`

const Meta = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	color: rgba(0, 0, 0, 0.54);
	padding: 0px 8px;
`

const StyledListItem = styled(ListItem)`
	border-bottom: 1px dashed #e3eaf6 !important;
`

const StyledIconButton = styled(IconButton)`
	background: transparent;
	border: none;

	&.MuiIconButton-root {
		padding: 0px;

		&:hover {
			color: #294698;
			background: transparent;
		}
	}
`
