const { ethers } = require("ethers");
const MasterArena = require("../src/abis/MasterArena.json");

/**
 * THE CLEANER: 
 * Handles '0x' prefix, removes spaces, and ensures a single '0x' 
 * so there is no repetition (0x0x...).
 */
const getCleanWallet = (rawKey, provider) => {
    if (!rawKey) throw new Error("AGENT_KEY_1 is missing in Render environment");

    let k = rawKey.trim();

    // Remove 0x if it exists so we can clean the raw hex
    if (k.toLowerCase().startsWith('0x')) {
        k = k.slice(2);
    }

    // Remove any remaining non-hex characters (hidden spaces/tabs)
    const hexOnly = k.replace(/[^a-fA-F0-9]/g, "");

    // Attach exactly ONE 0x
    const finalKey = "0x" + hexOnly;

    if (hexOnly.length !== 64) {
        throw new Error(`Invalid Key Length: ${hexOnly.length} (Expected 64). Check your paste!`);
    }

    return new ethers.Wallet(finalKey, provider);
};

async function startAgent() {
    console.log("--- Monad Agent: Force Mode Active ---");

    try {
        const provider = new ethers.JsonRpcProvider(process.env.RPC_URL, { 
            name: 'monad', 
            chainId: 143 
        });

        const wallet = getCleanWallet(process.env.AGENT_KEY_1, provider);
        console.log("Wallet Loaded Successfully:", wallet.address);

        const contract = new ethers.Contract(
            process.env.CONTRACT_ADDRESS, 
            MasterArena.abi || MasterArena, 
            wallet
        );

        // --- DYNAMIC TASK DETECTION ---
        // Instead of guessing, we ask the contract for the latest task
        const count = await contract.taskCount();
        const latestId = Number(count);

        if (latestId > 0) {
            console.log(`Targeting latest Task ID: ${latestId}`);

            // predict(taskId, side) -> true = Yes/Up
            // value: 0.01 MON
            const tx = await contract.predict(latestId, true, { 
                value: ethers.parseEther("0.01") 
            });

            console.log("TRANSACTION SENT! Hash:", tx.hash);
            await tx.wait();
            console.log("Transaction confirmed on Monad.");
        } else {
            console.log("No tasks found on contract. Waiting for Boss...");
        }

    } catch (error) {
        console.error("AGENT ERROR:", error.message);
    }
}

// Run every 2 minutes to keep the activity flowing
setInterval(startAgent, 120000);
startAgent();
