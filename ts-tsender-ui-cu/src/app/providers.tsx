// List of tools that will wrap around our entire application
// Includes: rainboKitConfig

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode } from "react";
import { useState } from "react";
import { WagmiProvider } from "wagmi"; //we will use to interact with the blockchain, including connecting to wallets and sending transactions
import config from "@/rainbowKitConfig"; //@ sign means to start from the root of the project, so this is importing from src/rainbowKitConfig.tsx
import { RainbowKitProvider} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

export function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {props.children}
        </RainbowKitProvider> 
      </QueryClientProvider>
    </WagmiProvider>
  );
}


