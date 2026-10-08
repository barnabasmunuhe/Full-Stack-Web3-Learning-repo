// src/components/ClientOnlyConnectButton.tsx
'use client';

import dynamic from 'next/dynamic';

const ConnectButton = dynamic(
  () => import('@rainbow-me/rainbowkit').then((mod) => mod.ConnectButton),
  { ssr: false }
);

export default function ClientOnlyConnectButton() {
  return <ConnectButton />;
}