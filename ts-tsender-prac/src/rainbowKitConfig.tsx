"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, anvil, zksync } from "wagmi/chains";

export default getDefaultConfig({
  appName: "TSender Prac",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [mainnet, anvil, zksync],
  ssr: false,
});
