import React from 'react'
import styled from 'styled-components'
import { Button, MenuItem, Menu } from '@material-ui/core'

const StyledButton = styled(Button)`
	&.MuiButton-root {
		width: 100%;
		height: 100%;
		text-transform: none;
		justify-content: right;

		&:hover {
			background: transparent;
		}
	}
`

export type PopupMenuProps = {
	selected: string
	options: string[]
	menuClickCallback: (value: string) => void
	endIcon: React.ReactNode
}

export const PopupMenu = ({ selected, options, menuClickCallback, endIcon }: PopupMenuProps) => {
	const [open, setOpen] = React.useState(false)
	const anchorEl = React.useRef<HTMLButtonElement>(null)

	const handleClick = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleMenuItemClick = (event, index) => {
		setOpen(false)
		menuClickCallback(options[index])
	}

	return (
		<div>
			<StyledButton ref={anchorEl} onClick={handleClick} variant="text" endIcon={endIcon}>
				{selected}
			</StyledButton>
			<Menu
				id="popup-menu"
				anchorEl={anchorEl.current}
				open={open}
				onClose={handleClose}
				getContentAnchorEl={null}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				PaperProps={{
					style: {
						maxHeight: 48 * 4.5,
						width: '20ch',
					},
				}}
			>
				{options.map((value, index) => (
					<MenuItem key={value} selected={value === selected} onClick={(event) => handleMenuItemClick(event, index)}>
						{value}
					</MenuItem>
				))}
			</Menu>
		</div>
	)
}
