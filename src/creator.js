const { ethers } = require("ethers");
const path = require("path");

// creator.js is in src, abis is in src/abis
const masterArenaAbi = require(path.join(__dirname, "abis", "MasterArena.json"));
// Jump OUT of src, INTO backend-agents for binance
const bnbData = require(path.join(__dirname, "..", "backend-agents", "binance"));

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL || "https://rpc.monad.xyz");
const adminWallet = new ethers.Wallet(process.env.CREATOR_PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, masterArenaAbi, adminWallet);

async function create() {
    try {
        const price = await bnbData.getBTCPrice();
        console.log("Creator Pulse - BTC Price:", price);
    } catch (e) { console.error("Creator Error:", e.message); }
}

setInterval(create, 15 * 60 * 1000);
create();
