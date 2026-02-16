const { ethers } = require("ethers");
const MasterArena = require("../src/abis/MasterArena.json");

/**
 * THE CLEANER: 
 * Strips hidden spaces, prevents 0x0x repetition, and ensures valid hex.
 */
const getCleanWallet = (rawKey, provider) => {
    if (!rawKey) return null;
    let k = rawKey.trim();
    if (k.toLowerCase().startsWith('0x')) k = k.slice(2);
    const hexOnly = k.replace(/[^a-fA-F0-9]/g, "");
    if (hexOnly.length !== 64) {
        console.error(`Invalid key length: ${hexOnly.length}. Expected 64.`);
        return null;
    }
    return new ethers.Wallet("0x" + hexOnly, provider);
};

async function startAgent() {
    console.log("--- Monad Multi-Agent: Force Mode ---");

    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL, { 
        name: 'monad', 
        chainId: 143 
    });

    // List of keys to check in Render Environment Variables
    const agentKeys = [
        process.env.AGENT_KEY_1,
        process.env.AGENT_KEY_2,
        process.env.AGENT_KEY_3
    ];

    try {
        const contract = new ethers.Contract(
            process.env.CONTRACT_ADDRESS, 
            MasterArena.abi || MasterArena, 
            provider
        );

        // 1. Check if any tasks exist on the contract
        const count = await contract.taskCount();
        const latestId = Number(count);

        if (latestId === 0) {
            console.log("No tasks found. Waiting for Boss to create one...");
            return;
        }

        // 2. Iterate through each agent and attempt to bet
        for (let i = 0; i < agentKeys.length; i++) {
            const agentNum = i + 1;
            const rawKey = agentKeys[i];

            if (!rawKey) {
                console.log(`Agent ${agentNum}: Key not found in Render (Skipping).`);
                continue;
            }

            try {
                const wallet = getCleanWallet(rawKey, provider);
                if (!wallet) continue;

                console.log(`Agent ${agentNum} (${wallet.address}) attempting bet on Task ${latestId}...`);

                const agentWithContract = contract.connect(wallet);
                
                // predict(taskId, side) -> true for Yes/Up
                const tx = await agentWithContract.predict(latestId, true, { 
                    value: ethers.parseEther("0.01") 
                });

                console.log(`Agent ${agentNum} Success! Hash: ${tx.hash}`);
                await tx.wait();

            } catch (err) {
                console.error(`Agent ${agentNum} Transaction Error:`, err.message);
            }
        }
    } catch (error) {
        console.error("Global Agent Error:", error.message);
    }
}

// Check for new tasks and bet every 2 minutes
setInterval(startAgent, 120000);
startAgent();
