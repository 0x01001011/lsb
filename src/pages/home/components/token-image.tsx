import React from 'react'
import styled from 'styled-components'
import PrvSrc from 'assets/prv@2x.png'
import DefaultTokenImage from 'assets/default-token.png'
import { useDictionaryTokenInfos, useTokenInfos } from 'services/token-collections'
import { TokenUiModel } from 'models/token'
import { Avatar } from '@material-ui/core'

const getTokenImage = (tokenInfo: TokenUiModel) => {
	if (!tokenInfo) {
		return DefaultTokenImage
	}
	return tokenInfo.tokenSymbol === 'PRV' ? PrvSrc : tokenInfo.icon
}

export const TokenImage: React.FC<{ tokenName: string; first?: boolean }> = ({ tokenName, first }) => {
	const { isFetching, data } = useDictionaryTokenInfos('Ally')
	if (isFetching) {
		return null
	}
	return (
		<StyledAvatar
			style={first ? { marginLeft: 0 } : { marginLeft: '-8px', zIndex: 1 }}
			src={getTokenImage(data[tokenName])}
			alt={DefaultTokenImage}
		/>
	)
}

const StyledAvatar = styled(Avatar)`
	z-index: 2;
	border: 2px solid #fafafa;

	&.MuiAvatar-root {
		width: 32px;
		height: 32px;
	}
`
