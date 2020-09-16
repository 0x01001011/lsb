/* eslint-disable no-return-assign */
import React from 'react'
import DefaultIcon from 'assets/default-token.png'
import { Autocomplete } from '@material-ui/lab'
import { Typography, TextField, Popper, Divider, useTheme, Tooltip } from '@material-ui/core'
import styled, { ThemeProvider } from 'styled-components'
import { useHistory } from 'react-router-dom'
import { TokenUiModel } from 'models/token'
import { useTokenInfos } from 'services/token-collections'
import { ListboxComponent, renderGroup } from './virtualized-utils'

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
	width: 28px;
	height: 28px;
	margin-right: 16px;
`

const StyledPopper = styled(Popper)`
	div.MuiPaper-elevation1 {
		box-shadow: ${(props) => '0 3px 6px 0 '.concat('rgba(0, 0, 0, 0.18)')};
	}

	div.MuiAutocomplete-paper {
		margin: 0;
	}

	.MuiPaper-rounded {
		border-radius: 0 0 8px 8px;
	}

	.MuiAutocomplete-listbox {
		padding: 0;
	}

	li.MuiAutocomplete-option {
		padding: 0;
		transition: all 0.1s ease-out;
	}
`

const StyledAutoComplete = styled(Autocomplete)`
	div.MuiOutlinedInput-root {
		border-radius: 32px;
		transition: all 0.1s ease-in-out;

		&:hover {
			box-shadow: ${(props) => '0 0 7px '.concat('rgba(0, 0, 0, 0.28)')};

			.MuiOutlinedInput-notchedOutline {
				border: none;
			}
		}

		&:active {
			border-radius: 8px 8px 0 0;
			box-shadow: ${(props) => '0 1px 6px 0 '.concat('rgba(0, 0, 0, 0.28)')};

			.MuiOutlinedInput-notchedOutline {
				border: none;
			}
		}
	}

	div.Mui-focused {
		background: white;
		border-radius: 16px 16px 0 0;
		box-shadow: ${(props) => '0 0px 6px 0 '.concat('rgba(0, 0, 0, 0.28)')};

		&:hover {
			border-radius: 16px 16px 0 0;
			box-shadow: ${(props) => '0 1px 6px 0 '.concat('rgba(0, 0, 0, 0.28)')};
		}

		.MuiOutlinedInput-notchedOutline {
			border: none;
		}
	}
`

const StyledOption = (model: TokenUiModel) => {
	const { tokenSymbol, tokenName, icon } = model
	const history = useHistory()

	return (
		<Option onClick={() => history.push(`/trading/${tokenSymbol}`)}>
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

export type SearchAutoCompleteProps = {
	maxWidth?: string
}

export const SearchAutoComplete = ({ maxWidth }: SearchAutoCompleteProps) => {
	const theme = useTheme()
	const { isFetching, data = [] } = useTokenInfos('Ally')
	const inputRef = React.useRef<HTMLInputElement>()

	const handleClosePopup = () => {
		if (inputRef?.current) {
			inputRef.current.value = ''
			inputRef.current.blur()
		}
	}

	return (
		<ThemeProvider theme={theme}>
			<StyledAutoComplete
				id="virtualized-autocomplete"
				openOnFocus
				clearOnBlur
				disableListWrap
				loading={isFetching}
				style={{ maxWidth, width: '100%' }}
				options={data}
				getOptionLabel={() => ''}
				renderInput={(params) => (
					<TextField {...params} placeholder="Search everything" variant="outlined" inputRef={inputRef} />
				)}
				PopperComponent={StyledPopper}
				ListboxComponent={ListboxComponent as React.ComponentType<React.HTMLAttributes<HTMLElement>>}
				renderGroup={renderGroup}
				renderOption={(token: TokenUiModel) => <StyledOption {...token} />}
				onClose={handleClosePopup}
			/>
		</ThemeProvider>
	)
}
