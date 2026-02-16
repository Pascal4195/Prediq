const { ethers } = require("ethers");
const MasterArena = require("../src/abis/MasterArena.json");

const cleanKey = (key) => {
    if (!key) return null;
    const k = key.trim();
    return k.startsWith('0x') ? k : `0x${k}`;
};

async function startAgent() {
    console.log("--- Monad Agent: Force Mode ---");
    const key = cleanKey(process.env.AGENT_KEY_1);

    try {
        const provider = new ethers.JsonRpcProvider(process.env.RPC_URL, { name: 'monad', chainId: 143 });
        const wallet = new ethers.Wallet(key, provider);
        const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, MasterArena.abi || MasterArena, wallet);

        // INTELLIGENT STEP: Find the current task count to bet on the latest one
        const currentCount = await contract.taskCount();
        const latestId = Number(currentCount);

        if (latestId > 0) {
            console.log(`Step 2: Predicting on Task ID: ${latestId}...`);
            // predict(taskId, side) -> true for Yes, false for No
            const tx = await contract.predict(latestId, true, { 
                value: ethers.parseEther("0.01") 
            }); 
            console.log("Bet Placed! Hash:", tx.hash);
            await tx.wait();
        } else {
            console.log("No tasks available to bet on yet.");
        }

    } catch (error) {
        console.error("Agent Error:", error.message);
    }
    setInterval(() => console.log("Agents heartbeat..."), 60000);
}
startAgent();
