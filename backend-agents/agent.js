const { ethers } = require("ethers");
const bnbData = require("./binance"); // Importing your price logic
const masterArenaAbi = require("./abis/MasterArena.json"); // Using the ABI you just updated

// 1. Setup Connection to Monad Mainnet
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL || "https://rpc.monad.xyz");
const contractAddress = process.env.CONTRACT_ADDRESS;

// 2. Load the 3 Agents from Render Environment Variables
const privateKeys = [
    process.env.PRIVATE_KEY_1,
    process.env.PRIVATE_KEY_2,
    process.env.PRIVATE_KEY_3
];

/**
 * Main Logic for a Single Agent
 */
async function processAgent(privateKey) {
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, masterArenaAbi, wallet);
    
    try {
        const address = await wallet.getAddress();
        console.log(`\n[Agent ${address}] checking status...`);

        // A. Auto-Register (Only runs once if the name is empty in the new contract)
        const currentName = await contract.agentNames(address);
        if (!currentName || currentName === "") {
            const shortAddr = address.slice(0, 6);
            console.log(`> Registering new identity: Agent_${shortAddr}`);
            const regTx = await contract.registerName(`Agent_${shortAddr}`);
            await regTx.wait();
        }

        // B. Check for Latest Task
        const taskCount = await contract.taskCount();
        if (taskCount == 0n) return console.log("> No tasks available yet.");

        const task = await contract.tasks(taskCount);
        
        if (!task.resolved) {
            // C. PREDICT LOGIC
            // Use your binance.js logic to decide. 
            // Example: If BTC > $60k, bet YES (true)
            const btcPrice = await bnbData.getBTCPrice(); // Adjust based on your binance.js exports
            const prediction = btcPrice > 60000; 

            console.log(`> Task #${task.id}: "${task.question}"`);
            console.log(`> Current Price: $${btcPrice}. Betting: ${prediction ? "YES" : "NO"}`);

            // Check if already bet to save gas
            const myStake = await contract.stakes(task.id, prediction, address);
            if (myStake > 0n) {
                console.log("> Already placed a bet on this task.");
            } else {
                const tx = await contract.predict(task.id, prediction, {
                    value: ethers.parseEther("0.1"), // Standard stake
                    gasLimit: 250000
                });
                await tx.wait();
                console.log("> Prediction submitted successfully!");
            }
        } else {
            // D. CLAIM LOGIC
            // If the task is resolved, try to claim. 
            // The contract require() will handle checking if this agent actually won.
            console.log(`> Task #${task.id} is RESOLVED. Checking for winnings...`);
            try {
                const claimTx = await contract.claimWinnings(task.id, { gasLimit: 200000 });
                await claimTx.wait();
                console.log("> SUCCESS: Winnings claimed and moved to agent wallet!");
            } catch (error) {
                console.log("> Nothing to claim (Agent lost or already claimed).");
            }
        }

    } catch (err) {
        console.error(`[Agent Error]: ${err.reason || err.message}`);
    }
}

/**
 * The Orchestrator: Runs all agents in a sequence
 */
async function runAllAgents() {
    console.log("--- Starting Agent Cycle ---");
    for (const key of privateKeys) {
        if (key) await processAgent(key);
    }
    console.log("--- Cycle Complete ---");
}

// Run every 15 minutes
setInterval(runAllAgents, 15 * 60 * 1000);
runAllAgents();
