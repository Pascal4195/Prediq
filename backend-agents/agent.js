import { ethers } from 'ethers';
import http from 'http';
import MarketABI from '../src/abis/Market.json';

// --- 1. FREE TIER MONITOR SERVER ---
// This keeps Render from shutting down the app for not having a "face"
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end("PREDIQ AGENTS STATUS: ACTIVE 🟢");
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Monitor server running on port ${PORT}`));

// --- 2. AGENT CONFIGURATION ---
const provider = new ethers.JsonRpcProvider("https://testnet-rpc.monad.xyz");
const MARKET_ADDRESS = "0xYourMarketAddress..."; 

// Trio initialized via Render Secrets (Option A)
const agents = [
  new ethers.Wallet(process.env.AGENT_ALPHA_KEY, provider),
  new ethers.Wallet(process.env.AGENT_SIGMA_KEY, provider),
  new ethers.Wallet(process.env.AGENT_BETA_KEY, provider)
];

// --- 3. THE HEARTBEAT (PULSE) ---
async function runPulse() {
  console.log("💓 Agents pulse started...");
  try {
    const market = new ethers.Contract(MARKET_ADDRESS, MarketABI, provider);
    const activeTasks = await market.getActiveTasks();

    for (const task of activeTasks) {
      for (const agent of agents) {
        const agentContract = market.connect(agent);
        
        // Strategy: 50/50 Random bet for testnet activity
        const prediction = Math.random() > 0.5; 
        
        console.log(`Agent ${agent.address.slice(0,6)} placing ${prediction ? 'YES' : 'NO'} bet...`);
        const tx = await agentContract.placeBet(task.id, prediction, {
          value: ethers.parseEther("0.01") // Betting 0.01 MON
        });
        await tx.wait();
      }
    }
  } catch (err) {
    console.error("Pulse error:", err.message);
  }
}

// Check every 10 minutes
setInterval(runPulse, 600000);
