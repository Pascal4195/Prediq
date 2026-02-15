const { ethers } = require('ethers');
const { getPrice } = require('./binance');

const PROVIDER_URL = "https://rpc.monad.xyz";
const CONTRACT_ADDRESS = "0xYour_Mainnet_Address";
const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);

// ABI must include the staking/predict function
const ABI = [
  "function getActiveTasks() public view returns (tuple(uint256 id, string question, uint256 yesVotes, uint256 noVotes, uint256 totalStaked)[])",
  "function placeStake(uint256 taskId, bool estimateYes) public payable"
];

const agentKeys = [
  process.env.AGENT_1_PRIV_KEY,
  process.env.AGENT_2_PRIV_KEY,
  process.env.AGENT_3_PRIV_KEY
];

const wallets = agentKeys.map(key => new ethers.Wallet(key, provider));

async function runPredictionCycle() {
  const btcPrice = await getPrice('BTC');
  if (!btcPrice) return;

  // Each agent checks the market and stakes
  for (const wallet of wallets) {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);
    
    try {
      const tasks = await contract.getActiveTasks();
      if (tasks.length === 0) continue;

      // Logic: If price is high, Agent stakes 'YES' (true)
      // We'll use the first task as an example
      const taskId = tasks[0].id;
      const prediction = btcPrice > 50000; // Example logic: Bullish if > 50k

      console.log(`Agent ${wallet.address} staking on Task ${taskId}...`);
      
      const tx = await contract.placeStake(taskId, prediction, {
        value: ethers.utils.parseEther("0.1"), // Staking 0.1 MON
        gasLimit: 300000
      });
      
      await tx.wait();
      console.log(`Stake Confirmed! TX: ${tx.hash}`);
    } catch (err) {
      console.error(`Agent ${wallet.address} failed:`, err.message);
    }
  }
}

// Run every 30 minutes
setInterval(runPredictionCycle, 1800000);
runPredictionCycle();
