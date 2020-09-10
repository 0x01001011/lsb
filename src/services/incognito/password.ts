

import CryptoJS from 'crypto-js'
import { APP, STORAGE_KEYS } from '../../constants'
import { syncStorage } from '../storage'

// const PASSWORD_DURATION_IN_MS = 7 * 24 * 3600 * 1000 // 7 days

export function clearPassword() {
  syncStorage.removeItem(STORAGE_KEYS.PASSPHRASE_KEY)
}

export const encrytePassword = (password: string) => {
  return CryptoJS.AES.encrypt(password, APP.PASSWORD_SECRET).toString()
}
