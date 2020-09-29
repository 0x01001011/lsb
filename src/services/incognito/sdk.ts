import * as incognitos from 'incognito-js'
import { API_CONFIG } from 'constants/api'
import { MAINNET_FULLNODE } from 'constants/server'

export class SDK {
	isWASMRunned = false

	async initSDK(wasmPath: string) {
		if (this.isWASMRunned) {
			return
		}
		incognitos.setConfig({ wasmPath, apiURL: API_CONFIG.API_BASE_URL, chainURL: MAINNET_FULLNODE, mainnet: true })
		incognitos.storageService.implement({
			setMethod: (key: string, data: any) => {
				return window.sessionStorage.setItem(key, data)
			},
			getMethod: (key: string) => {
				return window.sessionStorage.getItem(key)
			},
			removeMethod: (key: string) => window.sessionStorage.removeItem(key),
			namespace: 'WALLET',
		} as any)
		const output = await incognitos.goServices.implementGoMethodUseWasm()
		console.log(output)
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
