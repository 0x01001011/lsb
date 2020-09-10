import * as incognitos from 'incognito-js'
import { API_CONFIG, MAINNET_FULLNODE } from '../../constants'

export class SDK {
  isWASMRunned = false

  async initSDK(wasmPath: string) {
    if (this.isWASMRunned) {
      return 
    }
    incognitos.setConfig({ wasmPath, apiURL: API_CONFIG.API_BASE_URL ,chainURL: MAINNET_FULLNODE, mainnet: false })
    await incognitos.goServices.implementGoMethodUseWasm()
    this.isWASMRunned = true
  }

  getServices() {
    if (!this.isWASMRunned) {
      throw new Error('App still not run')
    }
    return incognitos.services
  }
}

export const sdk = new SDK()

