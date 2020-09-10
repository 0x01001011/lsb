import React from 'react'
import styled from 'styled-components'
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography } from '@material-ui/core'

import AccountCircle from '@material-ui/icons/AccountCircle'
import { useWalletRedux } from '../../redux'


const AppBarStyled = styled(AppBar)`
  flex-grow: 1;
`

export const MasterHeader = () => {

  const account = useWalletRedux((s) => s?.account)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  
  return (
    <AppBarStyled position="fixed" color="primary">
      <Toolbar>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
        </Menu>
        <Typography variant="subtitle1">
          {account?.accountName || 'Account'}
        </Typography>
      </Toolbar>
    </AppBarStyled>
  )
}

