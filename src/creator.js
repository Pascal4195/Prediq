const { ethers } = require("ethers");
const fs = require('fs');
const path = require('path');
// Path: Go up from src, then into backend-agents for binance
const bnbData = require("../backend-agents/binance"); 
const masterArenaAbi = require("../abis/MasterArena.json");

const TARGETS_FILE = path.join(__dirname, 'targets.json');
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL || "https://rpc.monad.xyz");
const adminWallet = new ethers.Wallet(process.env.CREATOR_PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, masterArenaAbi, adminWallet);

function saveTarget(taskId, targetPrice) {
    let data = {};
    if (fs.existsSync(TARGETS_FILE)) data = JSON.parse(fs.readFileSync(TARGETS_FILE));
    data[taskId.toString()] = targetPrice;
    fs.writeFileSync(TARGETS_FILE, JSON.stringify(data, null, 2));
}

function getTarget(taskId) {
    if (!fs.existsSync(TARGETS_FILE)) return null;
    const data = JSON.parse(fs.readFileSync(TARGETS_FILE));
    return data[taskId.toString()];
}

async function manageMarkets() {
    try {
        console.log("--- Creator Cycle Starting ---");
        const taskCount = await contract.taskCount();
        const btcPrice = await bnbData.getBTCPrice();
        const target = btcPrice + 10;
        const currentId = taskCount + 1n;

        console.log(`> Creating Task #${currentId}: Target $${target}`);
        const createTx = await contract.createTask(`Will BTC hit $${target}?`, { gasLimit: 250000 });
        await createTx.wait();
        saveTarget(currentId, target);

        if (taskCount > 0n) {
            const task = await contract.tasks(taskCount);
            if (!task.resolved) {
                const savedTarget = getTarget(taskCount);
                const finalPrice = await bnbData.getBTCPrice();
                if (savedTarget) {
                    const winner = finalPrice >= savedTarget;
                    console.log(`> Resolving #${taskCount}: Winner ${winner ? "YES" : "NO"}`);
                    await (await contract.resolveTask(taskCount, winner, { gasLimit: 250000 })).wait();
                }
            }
        }
    } catch (err) {
        console.error("[Creator Error]:", err.message);
    }
}

setInterval(manageMarkets, 15 * 60 * 1000);
manageMarkets();
