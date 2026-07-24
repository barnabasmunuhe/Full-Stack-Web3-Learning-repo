import {createWalletClient, custom, createPublicClient, parseEther,formatEther, defineChain} from "https://esm.sh/viem" //importing the viem project directly from the viem site itself
import {contractAddress, abi} from "./constants-js.js"

const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")
const ethAmountInput = document.getElementById("ethAmount")
const balanceButton = document.getElementById("balanceButton")
const withdrawButton = document.getElementById("withdrawButton")

let walletClient;
let publicClient;

async function connectWallet() {
    // setting up a wallet client to connect to the user's wallet and request access to their accounts
    if(typeof window.ethereum !== 'undefined') {
        walletClient = createWalletClient({
            transport: custom(window.ethereum)//creates a Viem wallet Client
        })
        await walletClient.requestAddresses() //wait requesting access to user's wallet addresses 
        connectButton.innerText = "Connected";
    } else {
        connectButton.innerHTML = "MetaMask not detected";
    }
}

async function fund() {
    const ethAmount = await ethAmountInput.value // gets the value of what is in the input tag with a placeholder 
    console.log(`funding with ${ethAmount} ether...`);

    // setting up a wallet client to connect to the user's wallet and request access to their accounts
    if(typeof window.ethereum !== 'undefined') {//checks if metamask is installed
        try {
        walletClient = createWalletClient({
            transport: custom(window.ethereum)
        })
        const [connectedAccount] = await walletClient.requestAddresses() //returns a list of accounts and we are destructuring it to get the first account in the list
        console.log(`Connected account: ${connectedAccount}`);
        const currentChain = await getCurrentChain(walletClient)
        console.log(`Current chain: ${currentChain.name}`);

        // setting up the public client to interact with the blockchain without needing to sign transactions
        // To use any type of client you MUST first create it then use it to call desired functions
        publicClient = createPublicClient({
            transport: custom(window.ethereum)
        })

        // First we simulate the contract
        const {request} = await publicClient.simulateContract({
            address: contractAddress, //address of the contract we are working with
            abi, //key & value pair are the same in structs
            functionName:"fund",
            account: connectedAccount,
            chain: currentChain,
            value: parseEther(ethAmount) //converts ethereumAmount into it's wei equivalent(100000000000000000)
        })

        //  Then actually call the contract with the request object we got from simulating the contract
        const hash = await walletClient.writeContract(request) //you show to the user(METAMASK pop-up), do you want to send your transaction?
        console.log(hash)
    } catch (error) {
        console.log(error)
    }
    } else {
        connectButton.innerHTML = "MetaMask not detected";
    }
}

async function withdraw() {
    console.log("Withdrawing funds...");

    if (typeof window.ethereum !== "undefined") {
        try {
        // Create wallet client
        const walletClient = createWalletClient({
            transport: custom(window.ethereum),
        });

        const [connectedAccount] = await walletClient.requestAddresses();
        console.log(`Connected account: ${connectedAccount}`);

        const currentChain = await getCurrentChain(walletClient);
        console.log(`Current chain: ${currentChain.name}`);

        // Create public client
        const publicClient = createPublicClient({
            transport: custom(window.ethereum),
        });

        // Simulate the withdraw transaction request
        const { request } = await publicClient.simulateContract({
            address: contractAddress,
            abi, 
            functionName: "withdraw",
            account: connectedAccount,
            chain: currentChain,
            // value: balance, // Assuming you want to withdraw the entire balance
        });

        // Send the transaction
        const hash = await walletClient.writeContract(request);
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
        console.log(error)
    }
    }
    else {
        connectButton.innerHTML = "MetaMask not detected";
    }
}

async function getBalance() {
  if (typeof window.ethereum !== "undefined") {
    try {
      publicClient = createPublicClient({
        transport: custom(window.ethereum),
      })
      const balance = await publicClient.getBalance({
        address: contractAddress,
      })
      console.log(formatEther(balance))
    } catch (error) {
      console.log(error)
    }
  } else {
    balanceButton.innerHTML = "Please install MetaMask"
  }
}

async function getCurrentChain(client) {
  const chainId = await client.getChainId()
  const currentChain = defineChain({
    id: chainId,
    name: "Custom Chain",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ["http://localhost:8545"],
      },
    },
  })
  return currentChain
}

connectButton.onclick = connectWallet
fundButton.onclick = fund
balanceButton.onclick = getBalance
withdrawButton.onclick = withdraw