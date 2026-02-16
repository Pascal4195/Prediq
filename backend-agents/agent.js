import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to handle paths in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CONFIGURATION ---
const RPC_URL = "https://testnet-rpc.monad.xyz"; 
const PRIVATE_KEY = "YOUR_PRIVATE_KEY_HERE"; // Replace with your actual key
const MARKET_ADDRESS = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"; // Verify this from your logs

// --- ABI LOADING ---
// Assuming your ABI is in the root or a shared folder
const marketAbiPath = path.join(__dirname, '../abis/Market.json');
const MarketABI = JSON.parse(fs.readFileSync(marketAbiPath, 'utf8'));

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const marketContract = new ethers.Contract(MARKET_ADDRESS, MarketABI, wallet);

async function runAgent() {
    console.log("--- Agent System Online ---");
    console.log(`Connected to Monad RPC: ${RPC_URL}`);
    console.log(`Agent Address: ${wallet.address}`);

    // Listen for New Tasks (like Task 5/6)
    marketContract.on("TaskCreated", (taskId, description, creator) => {
        console.log(`NEW TASK DETECTED: [ID: ${taskId}] - ${description}`);
        // Add your betting/automation logic here
    });

    // Main Loop to keep the process alive on Render
    setInterval(async () => {
        try {
            const balance = await provider.getBalance(wallet.address);
            console.log(`Heartbeat: Agent Active. Current Balance: ${ethers.formatEther(balance)} MON`);
        } catch (error) {
            console.error("Connection Error during heartbeat:", error.message);
        }
    }, 30000); // Checks every 30 seconds
}

runAgent().catch((error) => {
    console.error("FATAL ERROR ON STARTUP:", error);
    process.exit(1);
});
