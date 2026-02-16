import { ethers } from 'ethers';

// --- CONFIGURATION ---
const RPC_URL = "https://rpc.monad.xyz"; // Monad Mainnet
const PRIVATE_KEY = process.env.PRIVATE_KEY; 
const MARKET_ADDRESS = "0x086C0E4cf774237c9D201fCB196b6fe8f126ea37"; 

// --- INLINE ABI (Fixed Format) ---
const MarketABI = [
  "event TaskCreated(uint256 indexed taskId, string description, address creator)",
  "function getTask(uint256 taskId) view returns (string, address, bool)",
  "function submitTask(uint256 taskId, string data) external"
];

const provider = new ethers.JsonRpcProvider(RPC_URL);

async function runAgent() {
    if (!PRIVATE_KEY) {
        console.error("CRITICAL: PRIVATE_KEY is missing from Render Environment Variables!");
        process.exit(1);
    }

    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const marketContract = new ethers.Contract(MARKET_ADDRESS, MarketABI, wallet);

    console.log("--- MONAD MAINNET AGENT ONLINE ---");
    console.log(`Agent Address: ${wallet.address}`);

    marketContract.on("TaskCreated", (taskId, description, creator) => {
        console.log(`🚀 MAINNET TASK DETECTED: [ID: ${taskId}] - ${description}`);
    });

    setInterval(async () => {
        try {
            const balance = await provider.getBalance(wallet.address);
            console.log(`Live: Mainnet Status Check. Balance: ${ethers.formatEther(balance)} MON`);
        } catch (e) {
            console.error("Mainnet RPC connection issue:", e.message);
        }
    }, 30000);
}

runAgent().catch((err) => {
    console.error("FATAL STARTUP ERROR:", err);
    process.exit(1);
});
