import { Chip, Avatar } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
	padding: 8px 0;
`

const TokenSelectStyled = styled(Chip)`
	&&& {
		border: 1px dashed #e3eaf6;
		&:hover {
			cursor: pointer;
			border: 1px solid #e3eaf6;
		}
	}
`

export const SelectTokenPopup: React.FC<{ isFrom?: boolean }> = ({ isFrom }) => {
	return (
		<Container>
			{isFrom ? 'From: ' : 'Target: '}
			<TokenSelectStyled
				avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
				label="Deletable"
				variant="outlined"
			/>
		</Container>
	)
}
