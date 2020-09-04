import React from 'react'

import { Link } from 'react-router-dom'

import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'

export const MasterLayout = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} />
        {children}
      </Container>
    </>
  )
}
