import { Token } from '@nguyenphu27/sdk'
import { parseUnits } from 'ethers/lib/utils'
import { SerializedToken } from '../actions'
import useActiveWeb3React  from '../../../hooks/useActiveWeb3React'

export function serializeToken(token: Token): SerializedToken {
  return {
    chainId: token.chainId,
    address: token.address,
    decimals: token.decimals,
    symbol: token.symbol,
    name: token.name,
  }
}

export function deserializeToken(serializedToken: SerializedToken): Token {
  console.log('serialized token ' + JSON.stringify(serializedToken))
  const { chainId } = useActiveWeb3React()
  try {
    return new Token(
      chainId,
      serializedToken.address[chainId],
      serializedToken.decimals,
      serializedToken.symbol,
      serializedToken.name ? serializedToken.name : ''
    )
  } catch (e) {
    console.log(e)
  }
}

export enum GAS_PRICE {
  default = '5',
  fast = '6',
  instant = '7',
  testnet = '10',
}

export const GAS_PRICE_GWEI = {
  default: parseUnits(GAS_PRICE.default, 'gwei').toString(),
  fast: parseUnits(GAS_PRICE.fast, 'gwei').toString(),
  instant: parseUnits(GAS_PRICE.instant, 'gwei').toString(),
  testnet: parseUnits(GAS_PRICE.testnet, 'gwei').toString(),
}
