"use client";

import InputField from "@/components/ui/InputField";
import { useState } from "react";

export default function AirdropForm() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");

  async function handleSubmit() {
    console.log(tokenAddress);
    console.log(recipientAddress);
    console.log(tokenAmount);
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

      <button onClick={handleSubmit}>Send Tokens</button>
    </div>
  )
}
