const { ethers } = require("ethers");
const http = require("http");
const MasterArena = require("./abis/MasterArena.json");

http.createServer((req, res) => res.end('Boss Active')).listen(process.env.PORT || 10000);

// Key Sanitizer
const cleanKey = (key) => {
    if (!key) return null;
    const k = key.trim();
    return k.startsWith('0x') ? k : `0x${k}`;
};

async function startCreator() {
    console.log("--- Monad Boss: Force Mode ---");
    const key = cleanKey(process.env.CREATOR_PRIVATE_KEY);
    
    try {
        const provider = new ethers.JsonRpcProvider(process.env.RPC_URL, { name: 'monad', chainId: 143 });
        const wallet = new ethers.Wallet(key, provider);
        const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, MasterArena.abi || MasterArena, wallet);

        console.log("Step 1: Creating a Task...");
        // ABI requires a string '_question'
        const tx = await contract.createTask("Will Monad hit $10 today?"); 
        console.log("Tx Sent! Hash:", tx.hash);
        await tx.wait();
        console.log("Task confirmed on-chain.");

    } catch (error) {
        console.error("Boss Error:", error.message);
    }
    setInterval(() => console.log("Boss heartbeat..."), 60000);
}
startCreator();
