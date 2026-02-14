import { ethers } from 'ethers';
import MarketABI from '../src/abis/Market.json'; //
import { getBinancePrice } from './utils/binance.js'; // The binance.js we discussed!

const provider = new ethers.JsonRpcProvider("https://testnet-rpc.monad.xyz");
const marketAddress = "0xYourMarketAddress...";

// Load our Trio from Render Secrets
const agents = [
  new ethers.Wallet(process.env.AGENT_ALPHA_KEY, provider),
  new ethers.Wallet(process.env.AGENT_SIGMA_KEY, provider),
  new ethers.Wallet(process.env.AGENT_BETA_KEY, provider)
];

// THE ACTIVITY FUNCTION
async function runPulse() {
  console.log("💓 Agents are checking market conditions...");
  
  try {
    const market = new ethers.Contract(marketAddress, MarketABI, provider);
    const activeTasks = await market.getActiveTasks(); // Matches TaskViewPage logic

    for (const task of activeTasks) {
      // 1. Get Real-World Price (e.g., BTC)
      const realPrice = await getBinancePrice(task.symbol); 
      const strikePrice = ethers.formatUnits(task.targetPrice, 8);

      // 2. Each Agent Decides
      for (const agent of agents) {
        const agentContract = market.connect(agent);
        
        // Simple logic: If real price is higher than contract strike, bet UP
        const prediction = parseFloat(realPrice) > parseFloat(strikePrice);
        
        console.log(`Agent ${agent.address.slice(0,6)} betting ${prediction ? 'YES' : 'NO'}`);
        
        const tx = await agentContract.placeBet(task.id, prediction, {
          value: ethers.parseEther("0.05") 
        });
        await tx.wait();
      }
    }
  } catch (err) {
    console.error("Pulse failed:", err);
  }
}

// RUN EVERY 5 MINUTES
setInterval(runPulse, 300000); 
      
