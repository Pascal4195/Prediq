const { ethers } = require("ethers");
const http = require("http");
const MasterArena = require("./abis/MasterArena.json");

// Keep Render alive
const port = process.env.PORT || 10000;
http.createServer((req, res) => res.end('Monad Mainnet Backend Live')).listen(port);

async function startCreator() {
    console.log("--- Monad Mainnet Creator Check ---");
    console.log("RPC_URL Found:", !!process.env.RPC_URL);

    try {
        // Explicitly setting Monad Mainnet Chain ID: 10143
        const provider = new ethers.JsonRpcProvider(process.env.RPC_URL, {
            name: 'monad',
            chainId: 10143 
        });
        
        const wallet = new ethers.Wallet(process.env.CREATOR_PRIVATE_KEY, provider);
        console.log("Monad Boss Wallet Address:", wallet.address);

        // --- PASTE YOUR BOSS LOGIC HERE ---

    } catch (error) {
        console.error("Monad Connection Error:", error.message);
    }

    setInterval(() => console.log("Boss Heartbeat (Monad Mainnet)..."), 60000);
}
startCreator();
