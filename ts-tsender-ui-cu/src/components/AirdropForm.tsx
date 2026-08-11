"use client"
import InputField from "@/components/ui/InputField"
import { useState } from "react"
import {chainsToTSender, tsenderAbi, erc20Abi} from "@/constants"
import { useChainId, useConfig, useAccount} from 'wagmi'
import { readContract } from '@wagmi/core'

export default function AirdropForm() {
    const [tokenAddress, setTokenAddress] = useState("")
    const [recipientAddresses, setRecipientAddresses] = useState("")
    const [amounts, setAmounts] = useState("")
    const chainId = useChainId()
    const config = useConfig()
    const account = useAccount()

    async function getApprovedAmount(tsenderContractAddress: string | null) : Promise<number> {
        if(!tsenderContractAddress) {
            alert("No address found, Please use a supported chain")
            return 0
        }
        // read from the chain to see we have approved enough tokens
        // allowance (it's a read function)
        // instead of using the useReadContract hook, we will use the readContract function from wagmi to read the allowance of the token for the Tsender contract
        const allowanceResponse = await readContract( config, {
            abi: erc20Abi,
            address: tokenAddress as `0x${string}`, //received from our tokenAddress state hook
            functionName: "allowance",
            args: [account.address, tsenderContractAddress as `0x${string}`]
        })
        // same as in solidity: allowance(account, tsenderContractAddress)
        return allowanceResponse as number
    } 

    async function handleSubmit() {
        // 1a. If approved move to step 2
        // 1b. Otherwise approve the Tsender contract to send our tokens
        // 2. Call the airdrop function on Tsender contract
        // 3. Wait for the transaction to be confirmed/mined

        const tSenderContractAddress = chainsToTSender[chainId]["tsender"]
        const approvedAmount = await getApprovedAmount(tSenderContractAddress)// will get how much is Aprroved
        console.log("Approved amount: ", approvedAmount)
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
            <button onClick={handleSubmit} className="
            px-6 py-3
            bg-blue-600 hover:bg-blue-700
            text-white font-semibold 
            rounded-lg 
            shadow-sm
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed">
                Send Tokens
            </button>
        </div>
    )
}