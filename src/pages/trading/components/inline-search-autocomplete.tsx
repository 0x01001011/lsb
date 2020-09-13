import React, { ChangeEvent } from 'react'
import styled from 'styled-components'
import DefaultIcon from 'assets/default-token.png'
import {
	createStyles,
	Divider,
	InputAdornment,
	List,
	ListItem,
	ListSubheader,
	makeStyles,
	TextField,
	Theme,
	Tooltip,
	Typography,
	useMediaQuery,
	useTheme,
} from '@material-ui/core'
import { SearchRounded } from '@material-ui/icons'
import { TokenUiModel } from 'models/token'
import { useTokenInfos } from 'services/token-collections'
import { VariableSizeList, ListChildComponentProps } from 'react-window'

function renderRow(props: ListChildComponentProps) {
	const { data, index, style } = props
	return React.cloneElement(data[index], {
		style: { ...style },
	})
}

const OuterElementContext = React.createContext({})

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
	const outerProps = React.useContext(OuterElementContext)
	return <div ref={ref} {...props} {...outerProps} />
})

function useResetCache(data: any) {
	const ref = React.useRef<VariableSizeList>(null)
	React.useEffect(() => {
		if (ref.current != null) {
			ref.current.resetAfterIndex(0, true)
		}
	}, [data])
	return ref
}

// Adapter for react-window
export const ListboxComponent = React.forwardRef<HTMLDivElement>(function ListboxComponent(props, ref) {
	const { children, ...other } = props
	const itemData = React.Children.toArray(children)
	const theme = useTheme()
	const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true })
	const itemCount = itemData.length
	const itemSize = smUp ? 56 : 42

	const getChildSize = (child: React.ReactNode) => {
		if (React.isValidElement(child) && child.type === ListSubheader) {
			return 56
		}

		return itemSize
	}

	const getHeight = () => {
		if (itemCount > 5) {
			return 5 * itemSize
		}
		return itemData.map(getChildSize).reduce((a, b) => a + b, 0)
	}

	const gridRef = useResetCache(itemCount)

	return (
		<div ref={ref}>
			<OuterElementContext.Provider value={other}>
				<VariableSizeList
					itemData={itemData}
					height={getHeight()}
					width="100%"
					ref={gridRef}
					outerElementType={OuterElementType}
					innerElementType="ul"
					itemSize={(index) => getChildSize(itemData[index])}
					overscanCount={5}
					itemCount={itemCount}
				>
					{renderRow}
				</VariableSizeList>
			</OuterElementContext.Provider>
		</div>
	)
})

const Option = styled.div`
	position: relative;
	display: flex;
	flex-direction: row;
	flex-grow: 1;
	align-items: center;
	height: 56px;
	padding: 8px 16px;
`

const Expanded = styled(Typography)`
	flex-grow: 1;
	font-weight: 500;
	transition: all 0.1s ease-in-out;
`

const Image = styled.img`
	width: 36px;
	height: 36px;
	margin-right: 16px;
`

const StyledOption = (props: TokenUiModel) => {
	const { tokenSymbol, tokenName, icon } = props

	return (
		<Option>
			<Tooltip title={tokenName}>
				<Image src={icon} alt={tokenSymbol} onError={(e) => ((e.target as HTMLImageElement).src = DefaultIcon)} />
			</Tooltip>
			<Expanded>
				<Typography variant="h6">{tokenSymbol}</Typography>
			</Expanded>
			<Divider />
		</Option>
	)
}

const InlineSearchContainer = styled.div`
	margin: 8px;
	display: flex;
	flex-direction: column;
	justify-content: stretch;
`

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		listTokens: {
			position: 'relative',
			height: 300,
			width: '100%',
			overflow: 'auto',
			willChange: 'transform',
			direction: 'ltr',
		},
		spaceBottom: {
			marginBottom: 8,
		},
	}),
)

type Props = {
	// eslint-disable-next-line react/require-default-props
	itemClickCallback?(token: string): void
} & Partial<DefaultProps>

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps = {
	itemClickCallbackL: undefined,
}

export const InlineSearchAutocomplete = (props: Props) => {
	const classes = useStyles()
	const { itemClickCallback } = props
	const [pattern, setPattern] = React.useState<string>('')
	const { isFetching, data = [] } = useTokenInfos('Ally')

	const onChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setPattern(event.target.value.toLowerCase())
	}

	return (
		<InlineSearchContainer>
			<TextField
				className={classes.spaceBottom}
				placeholder="Search.."
				variant="standard"
				onChange={(e) => onChangeHandler(e)}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<SearchRounded />
						</InputAdornment>
					),
				}}
			/>
			{!isFetching && (
				<List component={ListboxComponent as React.ComponentType<React.HTMLAttributes<HTMLElement>>}>
					{data
						.filter((opt) => opt.tokenSymbol.toLowerCase().includes(pattern))
						.map((token: TokenUiModel) => (
							<ListItem
								key={token.tokenSymbol}
								button
								onClick={() => itemClickCallback?.(token.tokenSymbol)}
								disableGutters
							>
								<StyledOption {...token} />
							</ListItem>
						))}
				</List>
			)}
		</InlineSearchContainer>
	)
}
