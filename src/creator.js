const { ethers } = require("ethers");
const path = require("path");

// Bulletproof paths
const binancePath = path.resolve(__dirname, "..", "backend-agents", "binance.js");
const abiPath = path.resolve(__dirname, "abis", "MasterArena.json");

const bnbData = require(binancePath);
const masterArenaAbi = require(abiPath);

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL || "https://rpc.monad.xyz");
const adminWallet = new ethers.Wallet(process.env.CREATOR_PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, masterArenaAbi, adminWallet);

async function manage() {
    try {
        const price = await bnbData.getBTCPrice();
        console.log(`[Creator] BTC Price: ${price}`);
    } catch (e) { console.error("Creator Error:", e.message); }
}

setInterval(manage, 15 * 60 * 1000);
manage();
