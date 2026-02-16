import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to handle paths in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CONFIGURATION ---
const RPC_URL = "https://testnet-rpc.monad.xyz"; 
const PRIVATE_KEY = "YOUR_PRIVATE_KEY_HERE"; 

// --- THE SMART CONTRACT ADDRESS ---
// Paste your actual Market Contract address below
const MARKET_ADDRESS = "0xYourActualContractAddressHere"; 

// --- ABI LOADING ---
// This looks one level up from /backend-agents/ to find your /abis/ folder
const marketAbiPath = path.join(__dirname, '../abis/Market.json');
const MarketABI = JSON.parse(fs.readFileSync(marketAbiPath, 'utf8'));

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const marketContract = new ethers.Contract(MARKET_ADDRESS, MarketABI, wallet);

async function runAgent() {
    console.log("--- Agent System Online ---");
    console.log(`Connected to Monad RPC: ${RPC_URL}`);
    console.log(`Agent Address: ${wallet.address}`);
    console.log(`Targeting Market Contract: ${MARKET_ADDRESS}`);

    // Listen for New Tasks on the Blockchain
    marketContract.on("TaskCreated", (taskId, description, creator) => {
        console.log(`NEW TASK DETECTED: [ID: ${taskId}] - ${description}`);
    });

    // Keep-alive loop for Render
    setInterval(async () => {
        try {
            const balance = await provider.getBalance(wallet.address);
            console.log(`Heartbeat: Agent Active. Current Balance: ${ethers.formatEther(balance)} MON`);
        } catch (error) {
            console.error("Connection Error during heartbeat:", error.message);
        }
    }, 30000); 
}

runAgent().catch((error) => {
    console.error("FATAL ERROR ON STARTUP:", error);
    process.exit(1);
});
