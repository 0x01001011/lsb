
declare module 'redux-persist-webextension-storage';
declare module 'incognito-chain-web-js/build/wallet';
declare module 'craco-antd';

declare global {
  type KeyWalletChainCode = Uint8Array;
  type KeyWalletChildNumber = Uint8Array;
  type KeyWalletDepth = number;
  type KeyBytes = Uint8Array;
  type TokenIdType = string;
  type TokenSymbolType = string;
  type TokenNameType = string;
  type TokenTxType = number;
}

declare class Go {
  run: Function;

  importObject: any;
}
