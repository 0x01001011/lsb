import { Tooltip } from '@material-ui/core'
import React from 'react'
import { useWalletState } from 'stores/implements/wallet'
import styled from 'styled-components'

const Container = styled.div<{ width: number }>`
	display: inline-block;
	width: ${({ width }) => width}px;
	position: relative;
`
const TextEllipsLeftStyled = styled.span`
	display: inline-block;
	width: calc(100% / 2);
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`
const TextEllipsRightStyled = styled.span`
	display: inline-block;
	width: calc(100% / 2);
	overflow: hidden;
	white-space: nowrap;
	text-overflow: '';
	direction: rtl;
`
export const PrivateKeyEllipse: React.FC<{ width: number }> = ({ children, width }) => {
	const accountState = useWalletState((s) => s.account)
	if (accountState?.keys?.privateKey) {
		return (
			<Tooltip title={children}>
				<Container width={width}>
					<TextEllipsLeftStyled>{children}</TextEllipsLeftStyled>
					<TextEllipsRightStyled>{children}</TextEllipsRightStyled>
				</Container>
			</Tooltip>
		)
	}
	return <> Connect First </>
}
