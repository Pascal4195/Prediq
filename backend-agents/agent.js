const { ethers } = require("ethers");
const MasterArena = require("../src/abis/MasterArena.json");

async function startAgent() {
    console.log("--- Monad Agent: Force Mode ---");
    try {
        const provider = new ethers.JsonRpcProvider(process.env.RPC_URL, { name: 'monad', chainId: 143 });
        const wallet = new ethers.Wallet(process.env.AGENT_KEY_1, provider);
        const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, MasterArena.abi || MasterArena, wallet);

        console.log("Executing force transaction: placeBet...");
        // Bypassing Binance check. Sending 0.01 MON bet.
        // Replace 'placeBet' and arguments (0 for Up, etc.) with your actual function logic
        const tx = await contract.placeBet(0, { value: ethers.parseEther("0.01") }); 
        console.log("Tx Sent! Hash:", tx.hash);

        await tx.wait();
        console.log("CONFIRMED: Agent bet placed on Monad Mainnet.");

    } catch (error) {
        console.error("Agent Force Error:", error.message);
    }
    // Keep alive loop
    setInterval(() => console.log("Agents heartbeat..."), 60000);
}
startAgent();
