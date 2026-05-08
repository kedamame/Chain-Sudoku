'use client';

import { useEffect } from 'react';
import {
  useAccount,
  useReadContract,
  useSendTransaction,
  useSwitchChain,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { base } from 'wagmi/chains';
import { ABI, CONTRACT_ADDRESS, IS_CONTRACT_DEPLOYED } from '@/lib/contract';
import { encodeIncrement } from '@/lib/attribution';

export function useOnChainClears() {
  const { address, chain, isConnected } = useAccount();
  const { switchChainAsync } = useSwitchChain();

  const { data: clears, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'getClears',
    args: [address ?? '0x0000000000000000000000000000000000000000'],
    query: { enabled: IS_CONTRACT_DEPLOYED && !!address },
  });

  const {
    sendTransaction,
    data: txHash,
    isPending: isSending,
    reset,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  useEffect(() => {
    if (isSuccess) refetch();
  }, [isSuccess, refetch]);

  const increment = async (type: 'daily' | 'random') => {
    if (!isConnected || !IS_CONTRACT_DEPLOYED) return;
    if (chain?.id !== base.id) {
      try {
        await switchChainAsync({ chainId: base.id });
      } catch {
        return;
      }
    }
    const data = encodeIncrement(
      type === 'daily' ? 'incrementDaily' : 'incrementRandom',
    );
    sendTransaction({ to: CONTRACT_ADDRESS, data });
  };

  return {
    onChainDaily: clears ? Number(clears[0]) : null,
    onChainRandom: clears ? Number(clears[1]) : null,
    increment,
    isSending,
    isConfirming,
    isSuccess,
    txHash,
    reset,
    isConnected,
    isContractDeployed: IS_CONTRACT_DEPLOYED,
  };
}
