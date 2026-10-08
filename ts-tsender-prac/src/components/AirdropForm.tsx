"use client";

import InputField from "@/components/ui/InputField";
import TransactionDetails from "@/components/ui/TransactionDetails";
import { useState, useMemo, useEffect } from "react"; // useMemo: Calculates/remeber a value.  // useEffect:enables side effects, saving & retrieving data from localStorage.(performing somthing because something happened.)
import { chainsToTSender, tsenderAbi, erc20Abi } from "@/constants";
import {
  useChainId,
  useConfig,
  useAccount,
  useWriteContract,
  useReadContract,
} from "wagmi"; //wagmi hooks have context of our state & config
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { calculateTotal } from "@/utils";

export default function AirdropForm() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [isInitialized, setIsInitialized] = useState(false); //prevents the save effect from wiping all the saved data on very first render.

  const totals: number = useMemo(
    // caches calculateTotals result to prevent recalculations whenever the component rerenders.
    () => calculateTotal(tokenAmount),
    [tokenAmount],
  );

  const chainId = useChainId(); // antime the user updates to a different chain this hook will update the chainId variable to the new chainId
  const config = useConfig();
  const account = useAccount();
  const { data: hash, isPending, writeContractAsync } = useWriteContract(); //hook from wagmi that returns  functions: data: hash, isPending, writeContractAsync that we can work with.

  // 1. Loading saved data ONCE when the component mounts
  useEffect(() => {
    const savedData = localStorage.getItem("tsender_form_data"); //Atomic bundling into a JSON object
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Updating the state dependancies
        if (parsed.tokenAddress) setTokenAddress(parsed.tokenAddress);
        if (parsed.recipientAddress)
          setRecipientAddress(parsed.recipientAddress);
        if (parsed.tokenAmount) setTokenAmount(parsed.tokenAmount);
      } catch (e) {
        console.error("Failed to parse saved form data", e);
      }
    }
    setIsInitialized(true);
  }, []); // [] this reads from the browser memory(localStorage) into React memory(state)

  // 2. Save all data to localStorage whenever any input changes
  useEffect(() => {
    if (isInitialized) {
      const dataToSave = { tokenAddress, recipientAddress, tokenAmount };
      localStorage.setItem("tsender_form_data", JSON.stringify(dataToSave));
    }
  }, [tokenAddress, recipientAddress, tokenAmount, isInitialized]); //Runs everytime the state dependancies change

  async function getApprovedAmount(
    tSenderAddress: string | null,
  ): Promise<number> {
    if (!tSenderAddress) {
      alert("Unsupported chain");
      return 0;
    }
    // read from the chain to see if we have approved enough tokens
    const response = await readContract(config, {
      abi: erc20Abi,
      address: tokenAddress as `0x${string}`,
      functionName: "allowance",
      args: [account.address, tSenderAddress as `0x${string}`],
    });
    // THIS IS SAME AS: token.allowance(acount.address, tSenderAddress)
    return response as number;
  }

  async function handleSubmit() {
    // If already approved, send the tokens to the recipients
    // OTHERWISE:
    // Approve our tsender contract to send our tokens
    // Wait for the transaction to be mined
    const tSenderAddress = chainsToTSender[chainId]["tsender"]; //getting the correct chain where TSender contract has been deployed to.
    if (!tSenderAddress) {
      alert("Unsupported chain");
      return;
    }
    const approvedAmount = await getApprovedAmount(tSenderAddress); // will get how much is approved
    // console.log("approvedAmount: ", approvedAmount); //displays the approved amount which in our case will be 0n

    if (approvedAmount < totals) {
      // -Gives us the hash of the transaction once sent to the blockchain
      const approvalHash = await writeContractAsync({
        abi: erc20Abi,
        address: tokenAddress as `0x${string}`,
        functionName: "approve",
        args: [tSenderAddress as `0x${string}`, BigInt(totals)],
      });
      // -BUT wait for the transaction to be mined
      const approvalReceipt = await waitForTransactionReceipt(config, {
        hash: approvalHash,
      });
      console.log("Approval confirmed", approvalReceipt);

      await writeContractAsync({
        abi: tsenderAbi,
        address: tSenderAddress as `0x${string}`,
        functionName: "airdropERC20",
        args: [
          tokenAddress,
          // Comma or new line separated
          recipientAddress
            .split(/[,\n]+/)
            .map((addr) => addr.trim())
            .filter((addr) => addr !== ""),
          tokenAmount
            .split(/[,\n]+/)
            .map((amt) => amt.trim())
            .filter((amt) => amt !== ""),
          BigInt(totals),
        ],
      });
    } else {
      await writeContractAsync({
        abi: tsenderAbi,
        address: tSenderAddress as `0x${string}`,
        functionName: "airdropERC20",
        args: [
          tokenAddress,
          // Comma or new line separated
          recipientAddress
            .split(/[,\n]+/)
            .map((addr) => addr.trim())
            .filter((addr) => addr !== ""),
          tokenAmount
            .split(/[,\n]+/)
            .map((amt) => amt.trim())
            .filter((amt) => amt !== ""),
          BigInt(totals),
        ],
      });
    }
    // Clears both state & the local storage.
    setTokenAddress("");
    setRecipientAddress("");
    setTokenAmount("");
    localStorage.removeItem("tsender_form_data");
  }

  return (
    <div>
      <InputField
        label="Token Address"
        placeholder="0x..."
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
      />
      <InputField
        label="Recipient Address"
        placeholder="0x1234, 0x1234"
        value={recipientAddress}
        onChange={(e) => setRecipientAddress(e.target.value)}
      />
      <InputField
        label="Token Amount"
        placeholder="100,200,300..."
        value={tokenAmount}
        onChange={(e) => setTokenAmount(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="
            px-6 py-3
            bg-blue-600 hover:bg-blue-700
            text-white font-semibold 
            rounded-lg 
            shadow-sm
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send Tokens
      </button>
      <TransactionDetails tokenAddress={tokenAddress} totals={totals} />
    </div>
  );
}
