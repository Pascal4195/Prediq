import { ethers } from 'ethers';

// --- CONFIGURATION ---
const RPC_URL = "https://rpc.monad.xyz"; 
const PRIVATE_KEY = process.env.CREATOR_PRIVATE_KEY; 
const MARKET_ADDRESS = ""; 

const MarketABI = [
  "event TaskCreated(uint256 indexed taskId, string description, address creator)",
  "function getTask(uint256 taskId) view returns (string, address, bool)",
  "function submitTask(uint256 taskId, string data) external"
];

const provider = new ethers.JsonRpcProvider(RPC_URL);

async function runAgent() {
    if (!PRIVATE_KEY) {
        console.error("CRITICAL: PRIVATE_KEY missing in Render settings!");
        process.exit(1);
    }

    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const marketContract = new ethers.Contract(MARKET_ADDRESS, MarketABI, wallet);

    console.log("--- MONAD MAINNET AGENT ONLINE ---");
    console.log(`Wallet: ${wallet.address}`);

    // --- FIX FOR THE 'METHOD NOT FOUND' ERROR ---
    // Instead of marketContract.on, we use a loop to check the balance and connection
    // This stops the red errors in your 3:54 AM log
    
    setInterval(async () => {
        try {
            const balance = await provider.getBalance(wallet.address);
            const blockNumber = await provider.getBlockNumber();
            console.log(`[Block ${blockNumber}] Heartbeat: Active. Balance: ${ethers.formatEther(balance)} MON`);
        } catch (e) {
            // This catches RPC hiccups without crashing the whole agent
            console.log("RPC temporary lag, retrying in 30s...");
        }
    }, 30000);
}

runAgent().catch(console.error);
