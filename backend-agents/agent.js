import { ethers } from 'ethers';

const RPC_URL = "https://rpc.monad.xyz"; 
const PRIVATE_KEY = process.env.CREATOR_PRIVATE_KEY; 
const MARKET_ADDRESS = "0x086C0E4cf774237c9D201fCB196b6fe8f126ea37"; 

const MarketABI = [
  "function createTask(string description, uint256 deadline) external returns (uint256)",
  "event TaskCreated(uint256 indexed taskId, string description, address creator)"
];

const provider = new ethers.JsonRpcProvider(RPC_URL);
let lastTaskTime = 0; // Cooldown tracker

async function getPrice(coinId = 'bitcoin') {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`);
        const data = await response.json();
        return data[coinId].usd;
    } catch (e) {
        console.log("Price fetch failed.");
        return null;
    }
}

async function runAgent() {
    if (!PRIVATE_KEY) return console.error("Missing CREATOR_PRIVATE_KEY");
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const marketContract = new ethers.Contract(MARKET_ADDRESS, MarketABI, wallet);

    console.log(`--- SMART CREATOR ONLINE: ${wallet.address} ---`);

    setInterval(async () => {
        try {
            const btcPrice = await getPrice('bitcoin');
            const balance = await provider.getBalance(wallet.address);
            const now = Date.now();
            
            console.log(`[Mainnet] BTC: $${btcPrice} | Balance: ${ethers.formatEther(balance)} MON`);

            // CREATOR LOGIC: Create task only if BTC > 50k AND 1 hour has passed since last task
            if (btcPrice > 50000 && (now - lastTaskTime > 3600000)) { 
                const desc = `BTC is at $${btcPrice}. Will it stay above $50k for the next hour?`;
                console.log("🚀 Creating New Mainnet Task...");
                
                const tx = await marketContract.createTask(
                    desc, 
                    Math.floor(Date.now() / 1000) + 3600,
                    { gasLimit: 500000 } // Safety gas limit
                );
                
                await tx.wait();
                lastTaskTime = now;
                console.log(`✅ Task Created! TX: ${tx.hash}`);
            }
        } catch (e) {
            console.log("Network busy, retrying in 60s...");
        }
    }, 60000); 
}

runAgent().catch(console.error);
