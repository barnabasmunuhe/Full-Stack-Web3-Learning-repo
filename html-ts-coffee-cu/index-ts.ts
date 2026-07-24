import {
  createWalletClient,
  createPublicClient,
  custom,
  parseEther,
  formatEther,
  defineChain,
  type WalletClient,
  type PublicClient,
} from "viem"
import "viem/window"
import { contractAddress, abi } from "./constants-ts"

const connectButton = document.getElementById(
  "connectButton"
) as HTMLButtonElement

const fundButton = document.getElementById(
  "fundButton"
) as HTMLButtonElement

const balanceButton = document.getElementById(
  "balanceButton"
) as HTMLButtonElement

const withdrawButton = document.getElementById(
  "withdrawButton"
) as HTMLButtonElement

const ethAmountInput = document.getElementById(
  "ethAmount"
) as HTMLInputElement

let walletClient: WalletClient
let publicClient: PublicClient

console.log("Testing If vite is working")

async function connectWallet(): Promise<void> {
  if (typeof window.ethereum !== "undefined") {
    walletClient = createWalletClient({
      transport: custom(window.ethereum),
    })

    await walletClient.requestAddresses()
    connectButton.innerText = "Connected"
  } else {
    connectButton.innerText = "MetaMask not detected"
  }
}

async function fund(): Promise<void> {
  const ethAmount = ethAmountInput.value

  console.log(`Funding with ${ethAmount} ETH...`)

  if (typeof window.ethereum === "undefined") {
    connectButton.innerText = "MetaMask not detected"
    return
  }

  try {
    walletClient = createWalletClient({
      transport: custom(window.ethereum),
    })

    const [connectedAccount] = await walletClient.requestAddresses()

    console.log(`Connected account: ${connectedAccount}`)

    const currentChain = await getCurrentChain(walletClient)

    console.log(`Current chain: ${currentChain.name}`)

    publicClient = createPublicClient({
      transport: custom(window.ethereum),
    })

    const { request } = await publicClient.simulateContract({
      address: contractAddress,
      abi,
      functionName: "fund",
      account: connectedAccount,
      chain: currentChain,
      value: parseEther(ethAmount),
    })

    const hash = await walletClient.writeContract(request)

    console.log(hash)
  } catch (error) {
    console.error(error)
  }
}

async function withdraw(): Promise<void> {
  console.log("Withdrawing funds...")

  if (typeof window.ethereum === "undefined") {
    connectButton.innerText = "MetaMask not detected"
    return
  }

  try {
    walletClient = createWalletClient({
      transport: custom(window.ethereum),
    })

    const [connectedAccount] = await walletClient.requestAddresses()

    console.log(`Connected account: ${connectedAccount}`)

    const currentChain = await getCurrentChain(walletClient)

    console.log(`Current chain: ${currentChain.name}`)

    publicClient = createPublicClient({
      transport: custom(window.ethereum),
    })

    const { request } = await publicClient.simulateContract({
      address: contractAddress,
      abi,
      functionName: "withdraw",
      account: connectedAccount,
      chain: currentChain,
    })

    const hash = await walletClient.writeContract(request)

    console.log("Transaction processed:", hash)

    const owner = await publicClient.readContract({
      address: contractAddress,
      abi,
      functionName: "getOwner",
    })

    console.log("Owner:", owner)

    const version = await publicClient.readContract({
      address: contractAddress,
      abi,
      functionName: "getVersion",
    })

    console.log("Version:", version)

    console.log("Contract:", contractAddress)

    const code = await publicClient.getBytecode({
      address: contractAddress,
    })

    console.log(code)
  } catch (error) {
    console.error(error)
  }
}

async function getBalance(): Promise<void> {
  if (typeof window.ethereum === "undefined") {
    balanceButton.innerText = "Please install MetaMask"
    return
  }

  try {
    publicClient = createPublicClient({
      transport: custom(window.ethereum),
    })

    const balance = await publicClient.getBalance({
      address: contractAddress,
    })

    console.log(formatEther(balance))
  } catch (error) {
    console.error(error)
  }
}

async function getCurrentChain(
  client: WalletClient
): Promise<ReturnType<typeof defineChain>> {
  const chainId = await client.getChainId()

  return defineChain({
    id: chainId,
    name: "Custom Chain",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ["http://127.0.0.1:8545"],
      },
    },
  })
}

connectButton.onclick = connectWallet
fundButton.onclick = fund
balanceButton.onclick = getBalance
withdrawButton.onclick = withdraw