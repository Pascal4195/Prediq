import { ethers } from 'ethers';

const RPC_URL = "https://rpc.monad.xyz"; 
const PRIVATE_KEY = process.env.CREATOR_PRIVATE_KEY; 
const MARKET_ADDRESS = "0x086C0E4cf774237c9D201fCB196b6fe8f126ea37"; 

const MarketABI = [
  "event TaskCreated(uint256 indexed taskId, string description, address creator)",
  "function createTask(string description, uint256 deadline) external returns (uint256)",
  "function submitTask(uint256 taskId, string data) external"
];

const provider = new ethers.JsonRpcProvider(RPC_URL);

async function getPrice(coinId = 'bitcoin') {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`);
        const data = await response.json();
        return data[coinId].usd;
    } catch (e) {
        return null;
    }
}

async function runAgent() {
    if (!PRIVATE_KEY) return;
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const marketContract = new ethers.Contract(MARKET_ADDRESS, MarketABI, wallet);

    console.log(`--- CREATOR AGENT ACTIVE: ${wallet.address} ---`);

    setInterval(async () => {
        try {
            const price = await getPrice('bitcoin');
            const balance = await provider.getBalance(wallet.address);
            console.log(`[Mainnet] BTC Price: $${price} | Wallet: ${ethers.formatEther(balance)} MON`);

            // CREATOR LOGIC: If price is high, create a "Short" task. If low, create a "Long" task.
            if (price > 50000) { 
                const description = `BTC is at $${price}. Predict: Will it drop below $48k in 1 hour?`;
                console.log("Creating new Task on Mainnet...");
                
                // This calls the actual Smart Contract to create the task
                const tx = await marketContract.createTask(description, Math.floor(Date.now() / 1000) + 3600);
                await tx.wait();
                console.log("✅ Task Created Successfully!");
            }
        } catch (e) {
            console.log("Waiting for next block...");
        }
    }, 60000); 
}

runAgent().catch(console.error);
