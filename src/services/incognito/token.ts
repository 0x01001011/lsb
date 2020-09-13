import { sdk } from './sdk'

export class TokenService {
  async getTokenList() {
    const tokens = await sdk.getServices().rpc.listCustomTokens()
    console.log(sdk.getServices())
    return tokens
  }
}

export const tokenService = new TokenService()
