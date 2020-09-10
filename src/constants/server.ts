import { APP } from './app'

export const MAINNET_FULLNODE = 'https://fullnode.incognito.best'
// export const MAINNET_FULLNODE = 'https://community-fullnode.incognito.org'
export const TESTNET_FULLNODE = 'https://testnet.incognito.org/fullnode'

export const DEFAULT_LIST_SERVER = [
  {
    id: 'testnet',
    default:!APP.IS_PRODUCTION,
    address: TESTNET_FULLNODE,
    username: '',
    password: '',
    name: 'Testnet'
  },
  {
    id: 'mainnet',
    default: APP.IS_PRODUCTION,
    address: MAINNET_FULLNODE,
    username: '',
    password: '',
    name: 'Mainnet'
  }
]

export const SERVER_ADDRESS = APP.IS_PRODUCTION ? DEFAULT_LIST_SERVER[1] : DEFAULT_LIST_SERVER[0]