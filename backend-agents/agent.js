const { ethers } = require("ethers");
const path = require("path");
// binance.js is in the same folder
const bnbData = require("./binance"); 

// Jump OUT of backend-agents, INTO src, INTO abis
const abiPath = path.join(__dirname, "..", "src", "abis", "MasterArena.json");
const masterArenaAbi = require(abiPath);

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL || "https://rpc.monad.xyz");
const contractAddress = process.env.CONTRACT_ADDRESS;
const privateKeys = [process.env.PRIVATE_KEY_1, process.env.PRIVATE_KEY_2, process.env.PRIVATE_KEY_3];

async function run() {
    console.log("--- Agents Cycle Starting ---");
    for (const key of privateKeys) {
        if (!key) continue;
        const wallet = new ethers.Wallet(key, provider);
        const contract = new ethers.Contract(contractAddress, masterArenaAbi, wallet);
        try {
            const taskCount = await contract.taskCount();
            console.log(`Agent ${wallet.address.slice(0,6)} checking task #${taskCount}`);
        } catch (e) { console.error("Agent Error:", e.message); }
    }
}

setInterval(run, 15 * 60 * 1000);
run();
