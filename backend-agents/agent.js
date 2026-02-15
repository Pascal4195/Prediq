const { ethers } = require('ethers');
const http = require('http');
const { getPrice } = require('./binance');

// --- CONFIGURATION ---
const PROVIDER_URL = "https://rpc.monad.xyz"; 
const MARKET_ADDRESS = process.env.MARKET_CONTRACT_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);

// Array of 3 Agent Private Keys from Render Env Vars
const agentKeys = [
  process.env.AGENT_1_PRIV_KEY,
  process.env.AGENT_2_PRIV_KEY,
  process.env.AGENT_3_PRIV_KEY
];

const agentWallets = agentKeys.map(key => new ethers.Wallet(key, provider));

const MARKET_ABI = [
  "function getActiveTasks() public view returns (tuple(uint256 id, string question, uint256 yesVotes, uint256 noVotes, uint256 totalStaked)[])",
  "function placeStake(uint256 taskId, bool estimateYes) public payable"
];

// --- CORE AGENT LOGIC ---
async function startAgents() {
  console.log("Prediq Agents active on Monad Mainnet...");

  const runCycle = async () => {
    const btcPrice = await getPrice('BTC');
    if (!btcPrice) return;

    try {
      const marketContract = new ethers.Contract(MARKET_ADDRESS, MARKET_ABI, provider);
      const activeTasks = await marketContract.getActiveTasks();

      if (activeTasks.length === 0) {
        console.log("No active tasks found in Arena.");
        return;
      }

      for (const wallet of agentWallets) {
        const agentContract = marketContract.connect(wallet);
        const taskId = activeTasks[0].id;
        
        // Logic: Predict 'YES' if BTC > 50k
        const prediction = btcPrice > 50000; 

        console.log(`Agent ${wallet.address.substring(0,6)} attempting stake...`);

        const tx = await agentContract.placeStake(taskId, prediction, {
          value: ethers.utils.parseEther("0.01"), // Staking 0.01 MON
          gasLimit: 500000 
        });

        await tx.wait();
        console.log(`Success! Hash: ${tx.hash}`);
      }
    } catch (err) {
      console.error("Agent Cycle Error:", err.message);
    }
  };

  // Run every 30 minutes
  runCycle();
  setInterval(runCycle, 1800000); 
}

// --- RENDER KEEP-ALIVE SERVER ---
// This prevents the "No open ports detected" error and service shutdown
const port = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Prediq Backend: System Online\n');
});

server.listen(port, () => {
  console.log(`Health-check server listening on port ${port}`);
  startAgents(); // Starts the blockchain logic after the server is up
});
