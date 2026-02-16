import { ethers } from 'ethers';

const RPC_URL = "https://rpc.monad.xyz"; 
const PRIVATE_KEY = process.env.CREATOR_PRIVATE_KEY; 
const MARKET_ADDRESS = "0x086C0E4cf774237c9D201fCB196b6fe8f126ea37"; 

const MarketABI = [
  "function createTask(string description, uint256 deadline) external returns (uint256)",
  "event TaskCreated(uint256 indexed taskId, string description, address creator)"
];

const provider = new ethers.JsonRpcProvider(RPC_URL);

// Fetches real-world price data
async function getPrice(coinId = 'bitcoin') {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`);
        const data = await response.json();
        return data[coinId].usd;
    } catch (e) {
        console.log("Price fetch failed, using last known.");
        return null;
    }
}

async function runAgent() {
    if (!PRIVATE_KEY) return console.error("Missing PRIVATE_KEY");
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const marketContract = new ethers.Contract(MARKET_ADDRESS, MarketABI, wallet);

    console.log("--- SMART CREATOR ONLINE ---");

    setInterval(async () => {
        try {
            const btcPrice = await getPrice('bitcoin');
            const balance = await provider.getBalance(wallet.address);
            
            console.log(`[Mainnet] BTC: $${btcPrice} | Balance: ${ethers.formatEther(balance)} MON`);

            // CREATOR LOGIC: Automatically create a task if BTC moves
            if (btcPrice > 50000) { 
                const desc = `BTC is at $${btcPrice}. Will it stay above $50k for the next hour?`;
                console.log("Creating Task...");
                const tx = await marketContract.createTask(desc, Math.floor(Date.now() / 1000) + 3600);
                await tx.wait();
                console.log("✅ Mainnet Task Created!");
            }
        } catch (e) {
            console.log("Waiting for next block...");
        }
    }, 60000); // Checks every minute
}

runAgent().catch(console.error);
