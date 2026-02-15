const { ethers } = require("ethers");
const path = require("path");

// Look up one level, then into backend-agents
const bnbData = require(path.join(__dirname, "..", "backend-agents", "binance"));
const masterArenaAbi = require(path.join(__dirname, "abis", "MasterArena.json"));

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL || "https://rpc.monad.xyz");
const adminWallet = new ethers.Wallet(process.env.CREATOR_PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, masterArenaAbi, adminWallet);

async function create() {
    try {
        const price = await bnbData.getBTCPrice();
        console.log("Creator pulse check. BTC Price:", price);
        // Logic for creating tasks...
    } catch (e) { console.error(e.message); }
}

setInterval(create, 15 * 60 * 1000);
create();
