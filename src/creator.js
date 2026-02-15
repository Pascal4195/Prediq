const { ethers } = require("ethers");
const bnbData = require("./binance"); // Using your price logic
const masterArenaAbi = require("./abis/MasterArena.json");

// 1. Setup Admin Wallet (The Owner of the Contract)
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL || "https://rpc.monad.xyz");
const adminWallet = new ethers.Wallet(process.env.CREATOR_PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, masterArenaAbi, adminWallet);

async function manageMarkets() {
    try {
        console.log("--- Creator Agent Checking Markets ---");

        // A. Create a New Task (Example: BTC Prediction)
        const btcPriceAtCreation = await bnbData.getBTCPrice();
        const targetPrice = btcPriceAtCreation + 50; // Predict if it goes up $50
        const question = `Will BTC be above $${targetPrice} in 15 minutes?`;

        console.log(`> Creating Task: ${question}`);
        const createTx = await contract.createTask(question, { gasLimit: 250000 });
        await createTx.wait();
        console.log("> Task successfully created!");

        // B. Wait & Resolve (Logic for a production loop)
        // In a real scenario, you'd store the task ID and check back 15 mins later.
        // For now, let's assume we are resolving the PREVIOUS task.
        const taskCount = await contract.taskCount();
        if (taskCount > 1n) {
            const lastId = taskCount - 1n;
            const task = await contract.tasks(lastId);

            if (!task.resolved) {
                console.log(`> Resolving previous Task #${lastId}...`);
                const currentPrice = await bnbData.getBTCPrice();
                
                // Logic: If current price > target in the question (parsed from string or stored)
                // For simplicity, let's say it's a "Higher/Lower" game
                const didWin = currentPrice > btcPriceAtCreation; 
                
                const resolveTx = await contract.resolveTask(lastId, didWin, { gasLimit: 250000 });
                await resolveTx.wait();
                console.log(`> Task #${lastId} resolved! Winner: ${didWin ? "YES" : "NO"}`);
            }
        }

    } catch (err) {
        console.error("[Creator Error]:", err.reason || err.message);
    }
}

// Run this every 15 minutes to match the cycle
setInterval(manageMarkets, 15 * 60 * 1000);
manageMarkets();
