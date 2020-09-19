import { Chip, Avatar, CircularProgress } from '@material-ui/core'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useDictionaryTokenInfos } from 'services/token-collections'
import styled from 'styled-components'
import { TokenImage } from './token-list/option'

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
	const { paidToken, receivedToken } = useParams<{ paidToken: string; receivedToken: string }>()
	const { isFetching, data } = useDictionaryTokenInfos('Ally')

	const tokenName = isFrom ? paidToken : receivedToken
	const label = isFrom ? 'From: ' : 'To: '
	return (
		<Container>
			{label}
			{isFetching ? (
				<TokenSelectStyled avatar={<CircularProgress size={24} />} label="Loading..." variant="outlined" />
			) : (
				<TokenSelectStyled
					avatar={<TokenImage tokenName={tokenName} />}
					label={data[tokenName].tokenName}
					variant="outlined"
				/>
			)}
		</Container>
	)
}
