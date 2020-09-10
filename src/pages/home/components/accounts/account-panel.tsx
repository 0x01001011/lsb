import { Paper, Tabs, Tab, Typography, AppBar } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { useAccountPageState, accountPages } from '../../../../redux/account-page'
import { useWalletRedux } from '../../../../redux/wallet'

const Container = styled.div`
  margin-top: 32px;
`
const TabAccountBarStyled = styled(AppBar)`
  top: 0;
`
export const AccountPanel = () => {
  const dispatch = useDispatch()
  const selectedTab = useAccountPageState((s) => s.selectedTab)
  const account = useWalletRedux((s) => s.account)
  return (
    <Container>
      <TabAccountBarStyled color='default' elevation={0}>
        <Typography>{account?.accountName || 'Account Name'}</Typography>
        <Tabs
          value={selectedTab}
          onChange={(_, value: number) => dispatch(accountPages.actions.selectTab({
            tabNum: value
          }))}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Assets" id="tab-panel-assets" aria-controls="tab-panel-assets" />
          <Tab label="Histories" id="tab-panel-history" aria-controls="tab-panel-history"/>
        </Tabs>
      </TabAccountBarStyled>
    </Container>
    
  )
}