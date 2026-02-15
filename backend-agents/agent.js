const { ethers } = require("ethers");
const path = require("path");
const bnbData = require("./binance"); // Same folder

// Look up one level, then into src/abis
const masterArenaAbi = require(path.join(__dirname, "..", "src", "abis", "MasterArena.json"));

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL || "https://rpc.monad.xyz");
const contractAddress = process.env.CONTRACT_ADDRESS;
const privateKeys = [process.env.PRIVATE_KEY_1, process.env.PRIVATE_KEY_2, process.env.PRIVATE_KEY_3];

async function run() {
    for (const key of privateKeys) {
        if (!key) continue;
        const wallet = new ethers.Wallet(key, provider);
        const contract = new ethers.Contract(contractAddress, masterArenaAbi, wallet);
        try {
            const taskCount = await contract.taskCount();
            console.log(`Agent ${wallet.address} checking task ${taskCount}`);
            // Logic for betting...
        } catch (e) { console.error(e.message); }
    }
}

setInterval(run, 15 * 60 * 1000);
run();
