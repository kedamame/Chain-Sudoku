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
    sendTransactionAsync,
    data: txHash,
    isPending: isSending,
    error: txError,
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
    try {
      if (chain?.id !== base.id) {
        await switchChainAsync({ chainId: base.id });
      }
      const data = encodeIncrement(
        type === 'daily' ? 'incrementDaily' : 'incrementRandom',
      );
      await sendTransactionAsync({ to: CONTRACT_ADDRESS, data });
    } catch {
      // user rejected or network error — txError state will reflect this
    }
  };

  return {
    onChainDaily: clears ? Number(clears[0]) : null,
    onChainRandom: clears ? Number(clears[1]) : null,
    increment,
    isSending,
    isConfirming,
    isSuccess,
    txHash,
    txError,
    reset,
    isConnected,
    isContractDeployed: IS_CONTRACT_DEPLOYED,
  };
}
