const { ethers } = require('ethers');
const { getPrice } = require('./binance');

// CONFIGURATION FROM RENDER ENV VARIABLES
const PROVIDER_URL = "https://rpc.monad.xyz"; 
const MARKET_ADDRESS = process.env.MARKET_CONTRACT_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);

// Array of 3 Agent Private Keys
const agentKeys = [
  process.env.AGENT_1_PRIV_KEY,
  process.env.AGENT_2_PRIV_KEY,
  process.env.AGENT_3_PRIV_KEY
];

// Initialize 3 separate wallet instances
const agentWallets = agentKeys.map(key => new ethers.Wallet(key, provider));

const MARKET_ABI = [
  "function getActiveTasks() public view returns (tuple(uint256 id, string question, uint256 yesVotes, uint256 noVotes, uint256 totalStaked)[])",
  "function placeStake(uint256 taskId, bool estimateYes) public payable"
];

async function startAgents() {
  console.log("Prediq Agents Initialized on Monad Mainnet...");

  const runCycle = async () => {
    const btcPrice = await getPrice('BTC');
    if (!btcPrice) return;

    try {
      const marketContract = new ethers.Contract(MARKET_ADDRESS, MARKET_ABI, provider);
      const activeTasks = await marketContract.getActiveTasks();

      if (activeTasks.length === 0) {
        console.log("No active tasks found. Waiting for next cycle...");
        return;
      }

      // Each agent performs its action
      for (const wallet of agentWallets) {
        const agentContract = marketContract.connect(wallet);
        const taskId = activeTasks[0].id; // Staking on the most recent task
        
        // Simple logic: Predict 'YES' if BTC is above 50k (adjust as needed)
        const prediction = btcPrice > 50000; 

        console.log(`Agent ${wallet.address.substring(0,6)} staking...`);

        const tx = await agentContract.placeStake(taskId, prediction, {
          value: ethers.utils.parseEther("0.05"), // Staking 0.05 MON per agent
          gasLimit: 300000
        });

        await tx.wait();
        console.log(`Success! TX: ${tx.hash}`);
      }
    } catch (err) {
      console.error("Cycle failed:", err.message);
    }
  };

  // Run immediately, then every 30 minutes
  runCycle();
  setInterval(runCycle, 1800000); 
}

startAgents();
