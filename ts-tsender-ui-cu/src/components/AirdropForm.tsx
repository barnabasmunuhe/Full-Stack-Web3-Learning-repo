"use client"
import InputField from "@/components/ui/InputField"
import { useState } from "react"

export default function AirdropForm() {
    const [tokenAddress, setTokenAddress] = useState("")
    const [recipientAddresses, setRecipientAddresses] = useState("")
    const [amounts, setAmounts] = useState("")

    async function handleSubmit() {
        console.log(tokenAddress, recipientAddresses, amounts);
    }

    return (
        <div>
            <InputField
                label="Token Address"
                placeholder="0x"
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
            />
            <InputField
                label="Recipient Address (comma or new line separated)"
                placeholder="0x123..., 0x456..."
                value={recipientAddresses}
                onChange={(e) => setRecipientAddresses(e.target.value)}
                large={true}
            />
            <InputField
                label="Amounts (wei; comma or new line separated)"
                placeholder="100,200,300,..."
                value={amounts}
                onChange={(e) => setAmounts(e.target.value)}
                large={true}
            />

            <button onClick={handleSubmit}>
                Send Tokens
            </button>
        </div>
    )
}