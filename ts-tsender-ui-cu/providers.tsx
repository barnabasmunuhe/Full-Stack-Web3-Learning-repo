// List of tools that will wrap around our application
// Includes: rainboKitConfig

"use client"

import { type ReactNode } from "react"
import {WagmiProvider} from "wagmi"
import config from "@/rainbowKitConfig"
import {RainbowKitProvider } from "@rainbow-me/rainbowkit"

export function Providers (props: {children : ReactNode}) {
    return (
        <WagmiProvider config = {config}>
            <RainbowKitProvider>
                {props.children}
            </RainbowKitProvider>
        </WagmiProvider>
    )
}