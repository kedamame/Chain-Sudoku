// Update CONTRACT_ADDRESS after deploying ChainSudoku.sol to Base Mainnet
export const CONTRACT_ADDRESS = '0x94d2Ce99F9563914c93475a5A901cb9603eA674E' as `0x${string}`;
export const IS_CONTRACT_DEPLOYED = CONTRACT_ADDRESS !== '0x0000000000000000000000000000000000000000';

export const ABI = [
  {
    name: 'incrementDaily',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [],
  },
  {
    name: 'incrementRandom',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [],
  },
  {
    name: 'getClears',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'player', type: 'address' }],
    outputs: [
      { name: 'daily', type: 'uint256' },
      { name: 'random', type: 'uint256' },
    ],
  },
] as const;
