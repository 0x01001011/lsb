/* eslint-disable prefer-template */
/* eslint-disable quotes */
import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { AwesomeButton, AwesomeButtonProps } from 'react-awesome-button'
import 'src/styles/re-theme/styles.scss'

export type ReButtonProps = {
	borderRadius?: string
	fontSize?: string
	raiseLevel?: string
	hoverPressure?: 1 | 2 | 3 | 4
	hoverDarkOpacity?: number
	horizontalPadding?: string
} & Partial<DefaultProps> &
	AwesomeButtonProps
const defaultProps = {
	borderRadius: '2px',
	fontSize: '14px',
	raiseLevel: '2px',
	hoverPressure: 1,
	hoverDarkOpacity: 0.1,
	horizontalPadding: '16px',
}

type DefaultProps = Readonly<typeof defaultProps>

const StyledButton = styled(AwesomeButton)`
	${(props) => props.theme.borderRadius && `--button-default-border-radius: ` + props.theme.borderRadius + `;`}
	${(props) => props.theme.fontSize && `--button-default-font-size: ` + props.theme.fontSize + `;`}
	${(props) =>
		props.theme.hoverDarkenOpacity && `--button-hover-darken-opacity: ` + props.theme.hoverDarkenOpacity + `;`}
	${(
		props,
	) => props.theme.horizontalPadding && `--button-horizontal-padding: ` + props.theme.horizontalPadding + `;`}
	${(
		props,
	) => props.theme.raiseLevel && `--button-raise-level: ` + props.theme.raiseLevel + `;`}
	${(props) =>
		props.theme.hoverPressure && `--button-hover-pressure: ` + props.theme.hoverPressure + `;`}
`

export const ReButton = (props: ReButtonProps) => {
	const { children, raiseLevel, borderRadius, fontSize, hoverDarkOpacity, hoverPressure, horizontalPadding } = props
	return (
		<ThemeProvider theme={{ raiseLevel, borderRadius, fontSize, hoverDarkOpacity, hoverPressure, horizontalPadding }}>
			<StyledButton>{children} </StyledButton>
		</ThemeProvider>
	)
}
