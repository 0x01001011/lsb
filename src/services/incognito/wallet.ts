import * as i from 'incognito-js'
import { WALLET_CONSTANTS } from 'constants/wallet'

export interface AccountInfoInterface {
	accountName: string
	keys: {
		paymentAddressKey: string
		privateKey: string
		publicKey: string
		validatorKey: string
		viewingKey: string
	}
	privacyTokenIds: string[]
	BLSPublicKeyB58CheckEncode: string
	isImport: boolean
	balances: any
}

export class WalletService {
	walletInstance = new i.WalletInstance()

	get masterAccount() {
		if (!this.walletInstance) {
			throw new Error('Wallet is still not created')
		}
		return this.walletInstance.masterAccount
	}

	get currentAccount() {
		return this.walletInstance?.masterAccount.getAccountByName(WALLET_CONSTANTS.ONE_TIME_WALLET_NAME)
	}

	async getAccountInfo(accountName: string): Promise<AccountInfoInterface> {
		const account = this.masterAccount.getAccountByName(accountName)
		account.serializeKeys()
		const BLSPublicKeyB58CheckEncode = await account.getBLSPublicKeyB58CheckEncode()

		console.log(await account.getFollowingPrivacyToken(null))
		console.log(account.privacyTokenIds)

		const PRV = await account.nativeToken.getTotalBalance()
		let balances: any = {
			PRV: PRV.toString(),
		}

		const followers = (await account.getFollowingPrivacyToken(null)) as i.PrivacyTokenInstance[]
		if (followers) {
			await Promise.all(
				followers.map(async (t) => {
					const balance = await t.getTotalBalance(t.tokenId)
					balances = { ...balances, [t.symbol]: balance.toString() }
					return 1
				}),
			)
		}

		return {
			accountName: account.name,
			isImport: account.isImport,
			keys: {
				privateKey: account.key.keySet.privateKeySerialized,
				publicKey: account.key.keySet.publicKeySerialized,
				paymentAddressKey: account.key.keySet.paymentAddressKeySerialized,
				viewingKey: account.key.keySet.viewingKeySerialized,
				validatorKey: account.key.keySet.validatorKey,
			},
			privacyTokenIds: account.privacyTokenIds,
			BLSPublicKeyB58CheckEncode,
			balances,
		}
	}

	async clearAccount() {
		window.sessionStorage.clear()
		this.walletInstance = new i.WalletInstance()
	}

	async createWallet(name: string) {
		const wallet = await this.walletInstance.init('', name)
		return wallet
	}

	async createWalletViaPrivateKey(privateKey: string) {
		const wallet = await this.walletInstance.init('', WALLET_CONSTANTS.ONE_TIME_WALLET_NAME)
		const accountInstanc = await wallet.masterAccount.importAccount(WALLET_CONSTANTS.ONE_TIME_WALLET_NAME, privateKey)
		const backupStr = wallet.backup(WALLET_CONSTANTS.ONE_TIME_PASSWORD)
		window.sessionStorage.setItem(WALLET_CONSTANTS.ONE_TIME_WALLET_NAME, backupStr)
		return accountInstanc
	}

	async loadWalletFromSessionIfExisted() {
		const backupStr = window.sessionStorage.getItem(WALLET_CONSTANTS.ONE_TIME_WALLET_NAME)
		if (backupStr) {
			this.walletInstance = await this.loadWalletFromBackup(backupStr, WALLET_CONSTANTS.ONE_TIME_PASSWORD)
			return true
		}
		return false
	}

	getNameFirstAccount() {
		return this.masterAccount.getAccounts()[0].name
	}

	async loadWalletFromBackup(encryptedWallet: string, backupPassword: string) {
		return i.WalletInstance.restore(encryptedWallet, backupPassword)
	}

	async createNewAccount(name: string) {
		return this.masterAccount.addAccount(name)
	}

	async backupWallet(password: string) {
		return this.walletInstance.backup(password)
	}

	async followTokenById(tokenId: string) {
		this.currentAccount.followTokenById(tokenId)
	}

	/**
	 * requestBuyToken
	 * tokenIdBuy string
	 * amount number
	 * fromToken optional - default is native token
	 */
	async requestBuyToken(tokenIdBuy: string, amount: number, fromToken?: string) {
		// Trade from native token
		if (!fromToken) {
			const tx = await this.currentAccount.nativeToken.requestTrade(tokenIdBuy, amount, amount, 1, 20)
			console.log(tx)
		}
	}
}

export const walletService = new WalletService()

console.log(walletService)
