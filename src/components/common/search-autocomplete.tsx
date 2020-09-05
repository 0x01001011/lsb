import React from 'react'
import { Autocomplete } from '@material-ui/lab'
import { Typography, TextField, Zoom, Popper, Divider, useTheme, fade } from '@material-ui/core'
import styled, { ThemeProvider } from 'styled-components'
import { Band, Btc, Dai, Eth, Link } from 'src/assets/token-logos'

const tokenSamples = [
	{
		tokenName: 'pETH',
		icon: Eth,
		color: 'rgb(69, 105, 207)',
		gradients: ['rgb(228, 234, 253)', 'rgb(188, 200, 241)'],
	},
	{
		tokenName: 'pBTC',
		icon: Btc,
		color: 'rgb(255, 210, 51)',
		gradients: ['rgb(255, 246, 231)', 'rgb(255, 237, 209)'],
	},
	{
		tokenName: 'pDAI',
		icon: Dai,
		color : 'rgb(255, 219, 0)',
		gradients: ['rgb(255, 239, 177)', 'rgb(255, 236, 166)'],
	},
	{
		tokenName: 'pBAND',
		icon: Band,
		color: 'rgb(0, 124, 236)',
		gradients: ['rgb(159, 202, 255)', 'rgb(82, 159, 255)'],
	},
	{
		tokenName: 'pLINK',
		icon: Link,
		color: 'rgb(74, 52, 251)',
		gradients: ['rgb(184, 203, 255)', 'rgb(96, 139, 255)'],
	}
]


type SAOptionProps = {
	tokenName: string
	icon: string
  color: string
  selected: boolean
	gradients: Array<string>
}

const StyledOption = (props: SAOptionProps) => {
	const theme = useTheme()
	const [hover, setHover] = React.useState(false)
	const { tokenName, icon, gradients, color, selected } = props
	const [ , darkShade] = gradients

	// React.useEffect(() => console.log(`Option ${tokenName} : ${hover}`), [hover])

	return (
		<Option onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onAuxClick={() => console.log('Trigger')}>
			<Expanded 
				style={hover || selected ? { 
					color, 
					textShadow: `0 0 7px ${darkShade}`,
					letterSpacing: '0.1em',
					fontStyle: 'italic'
				} : undefined }
			>
				{tokenName}
			</Expanded>
			<Zoom key={tokenName} in={hover || selected} style={{ position: 'absolute', right: '16px', top: 'auto' }}>
				<Image src={icon} alt={tokenName}/>
			</Zoom>
			<Incognito className="incognito" style={{ background: theme.palette.text.primary, ...(hover && { opacity: 0 }) }} />
			<Divider />
			{/* <IconButton><PlayForWorkRounded fontSize="small"/></IconButton> */}
		</Option>
	)
}

const Incognito = styled.div`
  position: absolute;
  top: auto;
  right: 16px;
  padding: 5px;
  width: 32px;
  height: 32px;
  transition: all 0.1s ease-in-out;
  border-radius: 16px;
`

const Option = styled.div`
  position: relative;
	display: flex;
	flex-direction: row;
	flex-grow: 1;
	align-items: center;
	height: 56px;
	padding: 7px 24px 8px;
`

const Expanded = styled(Typography)`
	flex-grow: 1;
	font-weight: 500;
	transition: all .1s ease-in-out;
`

const Image = styled.img`
	width: 42px;
	height: 42px;
`

const StyledPopper = styled(Popper)`
  
  div.MuiPaper-elevation1 {
    box-shadow: ${props => '0 3px 6px 0 '.concat(fade(props.theme.palette.primary.main, 0.28))};
  }

  div.MuiAutocomplete-paper {
    margin: 0;
  }

  .MuiPaper-rounded {
    border-radius: 0 0 16px 16px;
  }

  .MuiAutocomplete-listbox {
    padding: 0;
  }

  li.MuiAutocomplete-option {
		padding: 0;
    transition: all 0.1s ease-out;
	}

  
  div.incognito {
    opacity: 0;
    transform: scale(0, 0);
  }
  

  li.MuiAutocomplete-option[data-focus="true"] {
    letter-spacing: 0.1em;
    font-style: italic;
    
    div.incognito {
      opacity: 1;
      transform: scale(1, 1);
      display: block;
    }
  }
`


const StyledAutoComplete = styled(Autocomplete)`


	div.MuiOutlinedInput-root {
		border-radius: 32px;
    transition: all 0.1s ease-in-out;
	  
    &:hover {
      box-shadow: ${props => '0 0 12px '.concat(fade(props.theme.palette.primary.main, 0.28))};
    }

    &:active {
      border-radius: 16px 16px 0 0;
      box-shadow: ${props => '0 1px 6px 0 '.concat(fade(props.theme.palette.primary.main, 0.28))};
    }
	}

  div.Mui-focused {
    border-radius: 16px 16px 0 0;
    box-shadow: ${props => '0 0px 6px 0 '.concat(fade(props.theme.palette.primary.main, 0.28))};
  }


	div.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {

	}
`

export type SearchAutoCompleteProps = {
  maxWidth?: string
}

const SearchAutoComplete = ({ maxWidth }: SearchAutoCompleteProps) => {
	const theme = useTheme()

	return (
		<ThemeProvider theme={theme}>
			<StyledAutoComplete
				id="token-autocomplete"
				style={{ maxWidth, width: '100%' }}
				options={tokenSamples}
				getOptionLabel={(token: SAOptionProps) => token.tokenName}
				renderInput={(params) => (
					<TextField {...params} label="Trading Token" variant="outlined" margin="normal" />
				)}
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				renderOption={({ tokenName, color, icon, gradients }, { inputValue, selected}) => <StyledOption {...{ tokenName, color, icon, gradients, selected }}  />}
				PopperComponent={StyledPopper}
			/>
		</ThemeProvider>
	)
}

export default SearchAutoComplete