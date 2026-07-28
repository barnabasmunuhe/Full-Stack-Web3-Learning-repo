"use client"
import InputField from "@/components/ui/InputField"
import { useState } from "react"

export default function AirdropForm() {
    return (
        <div>
            <InputField
                label="Token Address"
                placeholder="Enter the token address"
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
            />
        </div>
    )
}