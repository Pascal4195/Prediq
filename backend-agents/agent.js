import { ethers } from 'ethers';

// --- CONFIGURATION ---
const RPC_URL = "https://testnet-rpc.monad.xyz"; 
const PRIVATE_KEY = "YOUR_PRIVATE_KEY_HERE"; 
const MARKET_ADDRESS = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"; // Verify this address

// --- INLINE ABI (Fixes ENOENT error) ---
// Paste the actual content of your Market.json between the brackets [ ]
const MarketABI = [
  // Example: "function TaskCreated(uint256 taskId, string description, address creator)"
  // PASTE YOUR FULL ABI ARRAY HERE
];

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const marketContract = new ethers.Contract(MARKET_ADDRESS, MarketABI, wallet);

async function runAgent() {
    console.log("--- Agent System Online ---");
    console.log(`Agent Address: ${wallet.address}`);

    marketContract.on("TaskCreated", (taskId, description, creator) => {
        console.log(`NEW TASK: [ID: ${taskId}] - ${description}`);
    });

    setInterval(async () => {
        try {
            const balance = await provider.getBalance(wallet.address);
            console.log(`Heartbeat: Active. Balance: ${ethers.formatEther(balance)} MON`);
        } catch (e) {
            console.error("Heartbeat error:", e.message);
        }
    }, 30000);
}

runAgent().catch(console.error);
