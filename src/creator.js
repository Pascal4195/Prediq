const { ethers } = require("ethers");
const http = require("http");
const MasterArena = require("./abis/MasterArena.json");

// Keep Render happy with a dummy server
http.createServer((req, res) => res.end('Boss Forced')).listen(process.env.PORT || 10000);

async function startCreator() {
    console.log("--- Monad Boss: Force Mode ---");
    try {
        const provider = new ethers.JsonRpcProvider(process.env.RPC_URL, { name: 'monad', chainId: 143 });
        const wallet = new ethers.Wallet(process.env.CREATOR_PRIVATE_KEY, provider);
        const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, MasterArena.abi || MasterArena, wallet);

        console.log("Executing force transaction: startNewRound...");
        // Replace 'startNewRound' with your actual function name if it differs
        const tx = await contract.startNewRound(); 
        console.log("Tx Sent! Hash:", tx.hash);
        
        await tx.wait();
        console.log("CONFIRMED: Task created on Monad Mainnet.");

    } catch (error) {
        console.error("Boss Force Error:", error.message);
    }
    // Keep alive loop
    setInterval(() => console.log("Boss heartbeat..."), 60000);
}
startCreator();
