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

// --- ROBUST API: CryptoCompare (No regional blocks, no keys needed for public data) ---
async function getPrice() {
    try {
        const response = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD`);
        const data = await response.json();
        if (data && data.USD) {
            return data.USD;
        }
        throw new Error("Invalid data format");
    } catch (e) {
        console.log("❌ Price Fetch Failed. Retrying in next cycle...");
        return null;
    }
}

async function runAgent() {
    if (!PRIVATE_KEY) {
        console.error("FATAL: CREATOR_PRIVATE_KEY missing in Render settings!");
        return;
    }

    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const marketContract = new ethers.Contract(MARKET_ADDRESS, MarketABI, wallet);

    console.log(`--- AGENT LIVE | WALLET: ${wallet.address} ---`);

    // Main logic loop
    setInterval(async () => {
        try {
            const btcPrice = await getPrice();
            const balance = await provider.getBalance(wallet.address);
            const now = Date.now();

            if (btcPrice) {
                console.log(`[STATUS] BTC: $${btcPrice} | Wallet: ${ethers.formatEther(balance)} MON`);
                
                // COOLDOWN: 15 minutes (900,000 ms) so you can actually see tasks on the site quickly
                if (now - lastTaskTime > 900000) {
                    console.log("🚀 Conditions met. Creating Mainnet Task...");
                    
                    const desc = `BTC is currently $${btcPrice}. Will it stay above this price for 1 hour?`;
                    const deadline = Math.floor(Date.now() / 1000) + 3600;

                    const tx = await marketContract.createTask(desc, deadline, {
                        gasLimit: 300000 // Essential for Monad Mainnet stability
                    });

                    console.log(`Transaction Sent: ${tx.hash}`);
                    await tx.wait();
                    
                    lastTaskTime = now;
                    console.log("✅ SUCCESS: Task is now on-chain. Website should update.");
                }
            }
        } catch (error) {
            console.log("Cycle skipped: Network or Gas issue.");
        }
    }, 30000); // Check every 30 seconds
}

runAgent().catch(console.error);
