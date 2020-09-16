import * as i from 'incognito-js'
import { WALLET_CONSTANTS } from '../../constants/wallet'

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
	native: any
}

export class WalletService {
	walletInstance = new i.WalletInstance()

	get masterAccount() {
		if (!this.walletInstance) {
			throw new Error('Wallet is still not created')
		}
		return this.walletInstance.masterAccount
	}

	async getAccountInfo(accountName: string): Promise<AccountInfoInterface> {
		const account = this.masterAccount.getAccountByName(accountName)
		account.serializeKeys()
		const BLSPublicKeyB58CheckEncode = await account.getBLSPublicKeyB58CheckEncode()
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
			native: {},
		}
	}

	async createWallet(name: string) {
		const wallet = await this.walletInstance.init('', name)
		return wallet
	}

	async createWalletViaPrivateKey(privateKey: string) {
		const wallet = await this.walletInstance.init('', WALLET_CONSTANTS.ONE_TIME_WALLET_NAME)
		const accountInstanc = await wallet.masterAccount.importAccount(WALLET_CONSTANTS.ONE_TIME_WALLET_NAME, privateKey)
		return accountInstanc
	}

	getNameFirstAccount() {
		return this.masterAccount.getAccounts()[0].name
	}

	async loadWalletFromBackup(encryptedWallet: string, backupPassword: string) {
		this.walletInstance = await i.WalletInstance.restore(encryptedWallet, backupPassword)
		return this.walletInstance
	}

	async createNewAccount(name: string) {
		return this.masterAccount.addAccount(name)
	}

	async backupWallet(password: string) {
		return this.walletInstance.backup(password)
	}
}

export const walletService = new WalletService()
