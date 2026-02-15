const { ethers } = require('ethers');
const http = require('http');
const { getPrice } = require('./binance');

const PROVIDER_URL = "https://rpc.monad.xyz"; 
const MARKET_ADDRESS = process.env.MARKET_CONTRACT_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);

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

async function startAgents() {
  console.log("Prediq Agents: Loop Started.");

  const runCycle = async () => {
    try {
      const btcPrice = await getPrice('BTC');
      const marketContract = new ethers.Contract(MARKET_ADDRESS, MARKET_ABI, provider);
      
      // Checking if contract actually exists at this address
      const code = await provider.getCode(MARKET_ADDRESS);
      if (code === "0x") {
        console.error("CRITICAL: No contract found at the provided address!");
        return;
      }

      const activeTasks = await marketContract.getActiveTasks();
      if (activeTasks.length === 0) {
        console.log("Arena is empty. No tasks to stake on.");
        return;
      }

      for (const wallet of agentWallets) {
        const agentWithSigner = marketContract.connect(wallet);
        const prediction = btcPrice > 50000; 

        console.log(`Agent ${wallet.address.substring(0,6)} staking...`);
        const tx = await agentWithSigner.placeStake(activeTasks[0].id, prediction, {
          value: ethers.utils.parseEther("0.01"),
          gasLimit: 500000 
        });
        await tx.wait();
        console.log(`STAKE SUCCESS: ${tx.hash}`);
      }
    } catch (err) {
      console.error("AGENT_ERROR:", err.reason || err.message);
    }
  };

  runCycle();
  setInterval(runCycle, 1800000); 
}

// FIX FOR RENDER: PORT BINDING
const port = process.env.PORT || 10000;
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Prediq Backend Online');
}).listen(port, "0.0.0.0", () => {
  console.log(`Render Health Check live on port ${port}`);
  startAgents();
});
