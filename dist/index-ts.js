"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const viem_1 = require("viem");
require("viem/window");
const constants_ts_ts_1 = require("./constants-ts.ts");
const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
const balanceButton = document.getElementById("balanceButton");
const withdrawButton = document.getElementById("withdrawButton");
const ethAmountInput = document.getElementById("ethAmount");
let walletClient;
let publicClient;
async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
        walletClient = (0, viem_1.createWalletClient)({
            transport: (0, viem_1.custom)(window.ethereum),
        });
        await walletClient.requestAddresses();
        connectButton.innerText = "Connected";
    }
    else {
        connectButton.innerText = "MetaMask not detected";
    }
}
async function fund() {
    const ethAmount = ethAmountInput.value;
    console.log(`Funding with ${ethAmount} ETH...`);
    if (typeof window.ethereum === "undefined") {
        connectButton.innerText = "MetaMask not detected";
        return;
    }
    try {
        walletClient = (0, viem_1.createWalletClient)({
            transport: (0, viem_1.custom)(window.ethereum),
        });
        const [connectedAccount] = await walletClient.requestAddresses();
        console.log(`Connected account: ${connectedAccount}`);
        const currentChain = await getCurrentChain(walletClient);
        console.log(`Current chain: ${currentChain.name}`);
        publicClient = (0, viem_1.createPublicClient)({
            transport: (0, viem_1.custom)(window.ethereum),
        });
        const { request } = await publicClient.simulateContract({
            address: constants_ts_ts_1.contractAddress,
            abi: constants_ts_ts_1.abi,
            functionName: "fund",
            account: connectedAccount,
            chain: currentChain,
            value: (0, viem_1.parseEther)(ethAmount),
        });
        const hash = await walletClient.writeContract(request);
        console.log(hash);
    }
    catch (error) {
        console.error(error);
    }
}
async function withdraw() {
    console.log("Withdrawing funds...");
    if (typeof window.ethereum === "undefined") {
        connectButton.innerText = "MetaMask not detected";
        return;
    }
    try {
        walletClient = (0, viem_1.createWalletClient)({
            transport: (0, viem_1.custom)(window.ethereum),
        });
        const [connectedAccount] = await walletClient.requestAddresses();
        console.log(`Connected account: ${connectedAccount}`);
        const currentChain = await getCurrentChain(walletClient);
        console.log(`Current chain: ${currentChain.name}`);
        publicClient = (0, viem_1.createPublicClient)({
            transport: (0, viem_1.custom)(window.ethereum),
        });
        const { request } = await publicClient.simulateContract({
            address: constants_ts_ts_1.contractAddress,
            abi: constants_ts_ts_1.abi,
            functionName: "withdraw",
            account: connectedAccount,
            chain: currentChain,
        });
        const hash = await walletClient.writeContract(request);
        console.log("Transaction processed:", hash);
        const owner = await publicClient.readContract({
            address: constants_ts_ts_1.contractAddress,
            abi: constants_ts_ts_1.abi,
            functionName: "getOwner",
        });
        console.log("Owner:", owner);
        const version = await publicClient.readContract({
            address: constants_ts_ts_1.contractAddress,
            abi: constants_ts_ts_1.abi,
            functionName: "getVersion",
        });
        console.log("Version:", version);
        console.log("Contract:", constants_ts_ts_1.contractAddress);
        const code = await publicClient.getBytecode({
            address: constants_ts_ts_1.contractAddress,
        });
        console.log(code);
    }
    catch (error) {
        console.error(error);
    }
}
async function getBalance() {
    if (typeof window.ethereum === "undefined") {
        balanceButton.innerText = "Please install MetaMask";
        return;
    }
    try {
        publicClient = (0, viem_1.createPublicClient)({
            transport: (0, viem_1.custom)(window.ethereum),
        });
        const balance = await publicClient.getBalance({
            address: constants_ts_ts_1.contractAddress,
        });
        console.log((0, viem_1.formatEther)(balance));
    }
    catch (error) {
        console.error(error);
    }
}
async function getCurrentChain(client) {
    const chainId = await client.getChainId();
    return (0, viem_1.defineChain)({
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
    });
}
connectButton.onclick = connectWallet;
fundButton.onclick = fund;
balanceButton.onclick = getBalance;
withdrawButton.onclick = withdraw;
