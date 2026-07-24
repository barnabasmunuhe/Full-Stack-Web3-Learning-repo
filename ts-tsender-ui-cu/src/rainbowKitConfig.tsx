"use client"

import { getDefaultConfig} from "@rainbow-me/rainbowkit"
import {anvil,zksync} from "wagmi/chains"

export default getDefaultConfig ({
    appName: "TSender",
    projectId: process.env.NEXT_PUBLIC_WLLETCONNECT_PROJECT_ID!,
    chains: [anvil,zksync],
    ssr: false,
    
})