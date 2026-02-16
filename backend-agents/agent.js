import { ethers } from 'ethers';

// --- CONFIGURATION ---
const RPC_URL = "https://rpc.monad.xyz"; 
const PRIVATE_KEY = process.env.CREATOR_PRIVATE_KEY; 
const MARKET_ADDRESS = "0x086C0E4cf774237c9D201fCB196b6fe8f126ea37"; 

const MarketABI = [
  "function createTask(string description, uint256 deadline) external returns (uint256)",
  "event TaskCreated(uint256 indexed taskId, string description, address creator)"
];

const provider = new ethers.JsonRpcProvider(RPC_URL);
let lastTaskTime = 0; // Prevents spamming transactions

// Robust Price Fetcher to fix "Price Fetch Failed"
async function getPrice(coinId = 'bitcoin') {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`);
        
        if (response.status === 429) {
            console.log("⚠️ CoinGecko Rate Limit hit. Waiting...");
            return null;
        }

        const data = await response.json();
        return data[coinId]?.usd || null;
    } catch (e) {
        console.log("❌ Network issue reaching CoinGecko.");
        return null;
    }
}

async function runAgent() {
    // 1. Check for Private Key
    if (!PRIVATE_KEY) {
        console.error("CRITICAL ERROR: CREATOR_PRIVATE_KEY is missing in Render Environment Variables!");
        process.exit(1);
    }

    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const marketContract = new ethers.Contract(MARKET_ADDRESS, MarketABI, wallet);

    console.log("--- SMART CREATOR AGENT ONLINE ---");
    console.log(`Wallet Address: ${wallet.address}`);
    console.log(`Targeting Market: ${MARKET_ADDRESS}`);

    // Main Loop - Checks every 60 seconds
    setInterval(async () => {
        try {
            const btcPrice = await getPrice('bitcoin');
            const balance = await provider.getBalance(wallet.address);
            const now = Date.now();
            
            // Log Status
            if (btcPrice) {
                console.log(`[Mainnet] BTC: $${btcPrice} | Balance: ${ethers.formatEther(balance)} MON`);
            } else {
                console.log(`[Mainnet] Price unavailable | Balance: ${ethers.formatEther(balance)} MON`);
            }

            // CREATOR LOGIC: 
            // Trigger if BTC > 50k AND it's been at least 1 hour since the last task (3600000 ms)
            if (btcPrice && btcPrice > 50000 && (now - lastTaskTime > 3600000)) { 
                const description = `BTC is currently at $${btcPrice}. Will it stay above $50,000 for the next hour?`;
                
                console.log("🚀 Condition Met. Creating Task on Monad Mainnet...");

                // Create Task with 1-hour deadline
                const deadline = Math.floor(Date.now() / 1000) + 3600;
                const tx = await marketContract.createTask(description, deadline, {
                    gasLimit: 500000 // Added safety gas limit
                });

                console.log(`Transaction Sent! Hash: ${tx.hash}`);
                await tx.wait();
                
                lastTaskTime = now; // Update cooldown
                console.log("✅ Task successfully confirmed on-chain.");
            }

        } catch (error) {
            console.error("Loop Error:", error.reason || error.message);
        }
    }, 60000); 
}

runAgent().catch((err) => {
    console.error("FATAL STARTUP ERROR:", err);
    process.exit(1);
});
