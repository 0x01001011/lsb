import CryptoJS from 'crypto-js'
import { APP } from 'constants/app'

// const PASSWORD_DURATION_IN_MS = 7 * 24 * 3600 * 1000 // 7 days

export const encrytePassword = (password: string) => {
	return CryptoJS.AES.encrypt(password, APP.PASSWORD_SECRET).toString()
}
