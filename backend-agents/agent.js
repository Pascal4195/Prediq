const { ethers } = require("ethers");
const path = require("path");
const bnbData = require("./binance"); // Same folder

// This jumps OUT of backend-agents and INTO src/abis
const abiPath = path.join(__dirname, "..", "src", "abis", "MasterArena.json");
const masterArenaAbi = require(abiPath);

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL || "https://rpc.monad.xyz");
const contractAddress = process.env.CONTRACT_ADDRESS;
const privateKeys = [process.env.PRIVATE_KEY_1, process.env.PRIVATE_KEY_2, process.env.PRIVATE_KEY_3];

async function processAgent(privateKey) {
    if (!privateKey) return;
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, masterArenaAbi, wallet);
    try {
        const address = await wallet.getAddress();
        console.log(`[Agent ${address}] Active`);
        const taskCount = await contract.taskCount();
        if (taskCount === 0n) return;
        const task = await contract.tasks(taskCount);
        if (!task.resolved) {
            const btcPrice = await bnbData.getBTCPrice();
            const tx = await contract.predict(task.id, btcPrice > 60000, {
                value: ethers.parseEther("0.1"),
                gasLimit: 250000
            });
            await tx.wait();
            console.log("Bet placed!");
        }
    } catch (err) { console.error("Error:", err.message); }
}

setInterval(() => {
    privateKeys.forEach(key => processAgent(key));
}, 15 * 60 * 1000);
privateKeys.forEach(key => processAgent(key));
