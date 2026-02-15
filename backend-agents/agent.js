const { ethers } = require('ethers');
const { getPrice } = require('./binance');

// MONAD MAINNET CONFIG
const PROVIDER_URL = "https://rpc.monad.xyz"; 
const CONTRACT_ADDRESS = "0xYour_New_Mainnet_Address"; // MUST MATCH YOUR DEPLOYMENT
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// Updated ABI to include initial percentage data
const ABI = [
  "function createPredictionTask(string question, uint256 initialYes, uint256 initialNo, uint256 deadline) public",
  "function getActiveTasks() public view returns (tuple(uint256 id, string question, uint256 yesVotes, uint256 noVotes, uint256 totalStaked)[])"
];

const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

async function startAgent() {
  console.log("Prediq Agent Live: Monitoring Markets...");

  // Run immediately on start, then every hour
  const runTask = async () => {
    const btcPrice = await getPrice('BTC');
    
    if (btcPrice) {
      const question = `Will BTC stay above $${(btcPrice).toFixed(0)}?`;
      
      // We set the initial state to 50/50 probability
      // This will make your Frontend show "50% Yes" and "2.00x Payout"
      const initialYes = 50; 
      const initialNo = 50;
      const deadline = Math.floor(Date.now() / 1000) + 3600;

      try {
        const tx = await contract.createPredictionTask(question, initialYes, initialNo, deadline, {
            gasLimit: 500000 // Added safety gas limit for Mainnet
        });
        await tx.wait();
        console.log(`Mainnet Success: ${question}`);
      } catch (err) {
        console.error("Mainnet Transaction Failed:", err.message);
      }
    }
  };

  runTask();
  setInterval(runTask, 3600000); 
}

startAgent();
