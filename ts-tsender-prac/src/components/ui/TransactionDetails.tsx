"use client";

import { useReadContract } from "wagmi";
import { erc20Abi } from "@/constants";
import { formatUnits } from "viem";
import { useMemo } from "react";

interface TransactionDetailsProps {
  tokenAddress: string;
  totals: number | bigint;
}

export default function TransactionDetails({
  tokenAddress,
  totals,
}: TransactionDetailsProps) {
  // fetching token metaData
    // -TOKEN NAME
    const { data: tokenName } = useReadContract({
      abi: erc20Abi,
      address: tokenAddress as `0x${string}`,
      functionName: "name",
      query: { enabled: tokenAddress.length === 42 },// prevents unnecesary RPC calls while user is still typing
    });
    // TOKEN DECIMALS
    const { data: tokenDecimals } = useReadContract({
      abi: erc20Abi,
      address: tokenAddress as `0x${string}`,
      functionName: "decimals",
      query: { enabled: tokenAddress.length === 42 },
    });
    // A useMemo to convert my totals in wei into decimal format.(handles cases where token decimals haven't been added yet.)
    const formattedAmounts = useMemo(() => {
      if (!tokenDecimals || !totals) return "0";
      try {
        return formatUnits(BigInt(totals), Number(tokenDecimals));
      } catch (e) {
        return "0";
      }
    }, [totals, tokenDecimals]);

  return (
    <div className="mt-8 p-6 bg-gray-900 border border-gray-700 rounded-xl text-white">
      <h3 className="text-lg font-bold mb-4">Transaction Details</h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Token Name:</span>
          <span className="font-medium text-gray-200">
            {(tokenName as string) || "Unknown Token"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Amount (wei):</span>
          <span className="font-mono text-gray-200">{totals.toString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Amount (tokens):</span>
          <span className="font-medium text-gray-200">{formattedAmounts}</span>
        </div>
      </div>
    </div>
  );
}
