import { concatHex, encodeFunctionData, type Hex } from 'viem';
import { Attribution } from 'ox/erc8021';
import { ABI, CONTRACT_ADDRESS } from './contract';

const BUILDER_SUFFIX = Attribution.toDataSuffix({
  codes: ['bc_v1dpx3w8'],
}) as Hex;

export function encodeIncrement(fn: 'incrementDaily' | 'incrementRandom'): Hex {
  const calldata = encodeFunctionData({ abi: ABI, functionName: fn });
  return concatHex([calldata, BUILDER_SUFFIX]);
}

export { CONTRACT_ADDRESS };
