import { Chip, Avatar, CircularProgress } from '@material-ui/core'
import React from 'react'

import { useDictionaryTokenInfos } from 'services/token-collections'
import styled from 'styled-components'
import { usePairsFromUrl } from 'utils/hooks'
import { TokenImage } from '../token-image'

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

export const TokenSelector: React.FC<{ isFrom?: boolean; onClick?(): void }> = ({ isFrom, onClick }) => {
	const { paidToken, receivedToken } = usePairsFromUrl()
	const { isFetching, data } = useDictionaryTokenInfos('Ally')

	const tokenName = isFrom ? paidToken : receivedToken
	return (
		<Container>
			{isFetching ? (
				<TokenSelectStyled avatar={<CircularProgress size={24} />} label="Loading..." variant="outlined" />
			) : (
				<TokenSelectStyled
					avatar={<TokenImage tokenName={tokenName} />}
					label={data[tokenName]?.tokenName}
					variant="outlined"
					onClick={onClick}
				/>
			)}
		</Container>
	)
}
