//List of tools that will wrap around our entire application
// -eg rainbowKitConfig

"use client";

import { type ReactNode } from "react";
import { useState } from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import config from "@/rainbowKitConfig";
import { WagmiProvider } from "wagmi";
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