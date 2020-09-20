import React from 'react'
import { ListSubheader, useMediaQuery, useTheme } from '@material-ui/core'
import { FixedSizeList, ListChildComponentProps } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

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

// Adapter for react-window
export const ListboxComponent = React.forwardRef<HTMLDivElement>(function ListboxComponent(props, ref) {
	const { children, ...other } = props
	const itemData = React.Children.toArray(children)
	const theme = useTheme()
	const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true })
	const itemCount = itemData.length
	const itemSize = smUp ? 48 : 42

	const getChildSize = (child: React.ReactNode) => {
		if (React.isValidElement(child) && child.type === ListSubheader) {
			return 48
		}

		return itemSize
	}

	return (
		<div style={{ height: 'calc(100% - 86px)' }} ref={ref}>
			<AutoSizer>
				{({ height, width }) => (
					<OuterElementContext.Provider value={other}>
						<FixedSizeList
							itemData={itemData}
							height={height}
							width={width}
							outerElementType={OuterElementType}
							innerElementType="ul"
							itemSize={itemSize}
							overscanCount={5}
							itemCount={itemCount}
						>
							{renderRow}
						</FixedSizeList>
					</OuterElementContext.Provider>
				)}
			</AutoSizer>
		</div>
	)
})
