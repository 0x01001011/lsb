import React from 'react'
import { AutocompleteRenderGroupParams } from '@material-ui/lab/Autocomplete'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import ListSubheader from '@material-ui/core/ListSubheader'
import { useTheme } from '@material-ui/core/styles'
import { VariableSizeList, ListChildComponentProps } from 'react-window'

export function renderRow(props: ListChildComponentProps) {
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
		if (itemCount > 8) {
			return 8 * itemSize
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

export const renderGroup = (params: AutocompleteRenderGroupParams) => [
	<ListSubheader key={params.key} component="div">
		{params.group}
	</ListSubheader>,
	params.children,
]
