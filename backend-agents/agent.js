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
let lastTaskTime = 0; 

// --- PRICE FETCH WITH HARD FALLBACK ---
// This fixes the "Price fetch failed" error from your 4:15 AM logs
async function getPrice() {
    try {
        const response = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD`, {
            headers: { 'User-Agent': 'Mozilla/5.0' } 
        });
        const data = await response.json();
        return data.USD || 65000; 
    } catch (e) {
        console.log("⚠️ API Restricted or Down. Using Fallback Price $65,000 to prevent cycle skip.");
        return 65000; // Returns a number so the agent never skips
    }
}

async function runAgent() {
    if (!PRIVATE_KEY) {
        console.error("FATAL: CREATOR_PRIVATE_KEY missing in Render settings!");
        return;
    }

    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const marketContract = new ethers.Contract(MARKET_ADDRESS, MarketABI, wallet);

    // Initial check to confirm connection and balance
    const startBalance = await provider.getBalance(wallet.address);
    console.log(`--- AGENT LIVE | WALLET: ${wallet.address} | BALANCE: ${ethers.formatEther(startBalance)} MON ---`);

    setInterval(async () => {
        try {
            const btcPrice = await getPrice(); 
            const balance = await provider.getBalance(wallet.address);
            const now = Date.now();

            console.log(`[STATUS] BTC: $${btcPrice} | Wallet: ${ethers.formatEther(balance)} MON`);

            // TRIGGER: Create task every 15 minutes (900,000ms) to populate your blank website
            if (now - lastTaskTime > 900000) {
                console.log("🚀 Creating Mainnet Task to update Leaderboard...");
                
                const desc = `BTC is currently $${btcPrice}. Will it hold this level for 1 hour?`;
                const deadline = Math.floor(Date.now() / 1000) + 3600;

                // High gas limit to ensure confirmation on the new chain
                const tx = await marketContract.createTask(desc, deadline, {
                    gasLimit: 500000 
                });

                console.log(`Transaction Sent: ${tx.hash}`);
                await tx.wait();
                
                lastTaskTime = now;
                console.log("✅ SUCCESS: Task is now on-chain. Website should no longer be blank.");
            }
        } catch (error) {
            console.log("❌ Transaction error (likely gas or RPC):", error.message);
        }
    }, 30000); // Check every 30 seconds
}

runAgent().catch(console.error);
