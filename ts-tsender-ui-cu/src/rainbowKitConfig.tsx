//Tells us what kind of chains & wallets we can connect to & how to connect to our app.
"use client"// Tells the react component to be rendered on the client side, not the server side. This is important for things like wallet connections that require user interaction.

import { getDefaultConfig} from "@rainbow-me/rainbowkit"
import {anvil,zksync,mainnet,sepolia} from "wagmi/chains" //set of chains.

export default getDefaultConfig ({
    appName: "TSender",
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!, // 
    chains: [anvil,zksync,mainnet,sepolia], 
    ssr: false,
    
})