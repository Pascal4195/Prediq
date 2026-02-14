import { ethers } from 'ethers';
import http from 'http';
import MarketABI from '../src/abis/Market.json';

// --- 1. FREE TIER MONITOR SERVER ---
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end("PREDIQ AGENTS STATUS: ACTIVE 🟢");
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Monitor server running on port ${PORT}`));

// --- 2. AGENT CONFIGURATION ---
const provider = new ethers.JsonRpcProvider("https://testnet-rpc.monad.xyz");
const MARKET_ADDRESS = "0xF8262596823a3c7fcd47F407138bcbbbdB4D5F18"; 

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
    
    // We assume getActiveTasks exists on your Market contract
    const activeTasks = await market.getActiveTasks();

    for (const task of activeTasks) {
      for (const agent of agents) {
        const agentContract = market.connect(agent);
        
        // Simple strategy: Alternating bets or random
        const prediction = Math.random() > 0.5; 
        
        console.log(`Agent ${agent.address.slice(0,6)} betting on Task ${task.id}...`);
        const tx = await agentContract.placeBet(task.id, prediction, {
          value: ethers.parseEther("0.01"),
          gasLimit: 500000 // Added gas limit for Monad stability
        });
        await tx.wait();
        console.log(`✅ Bet confirmed for ${agent.address.slice(0,6)}`);
      }
    }
  } catch (err) {
    console.error("Pulse error:", err.message);
  }
}

// Check every 10 minutes
setInterval(runPulse, 600000);
