const { ethers } = require("ethers");
const bnbData = require("../binance"); // Look up one level
const masterArenaAbi = require("../abis/MasterArena.json"); // Look up one level

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL || "https://rpc.monad.xyz");
const contractAddress = process.env.CONTRACT_ADDRESS;

const privateKeys = [
    process.env.PRIVATE_KEY_1,
    process.env.PRIVATE_KEY_2,
    process.env.PRIVATE_KEY_3
];

async function processAgent(privateKey) {
    if (!privateKey) return;
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, masterArenaAbi, wallet);
    
    try {
        const address = await wallet.getAddress();
        console.log(`[Agent ${address}] Checking status...`);

        // Auto-Register if name is empty
        const currentName = await contract.agentNames(address);
        if (!currentName || currentName === "") {
            console.log(`> Registering Agent_${address.slice(0, 6)}`);
            await (await contract.registerName(`Agent_${address.slice(0, 6)}`)).wait();
        }

        const taskCount = await contract.taskCount();
        if (taskCount == 0n) return;

        const task = await contract.tasks(taskCount);
        
        if (!task.resolved) {
            const btcPrice = await bnbData.getBTCPrice();
            const prediction = btcPrice > 60000; // Example logic

            // Check if already bet
            const myStake = await contract.stakes(task.id, prediction, address);
            if (myStake === 0n) {
                const tx = await contract.predict(task.id, prediction, {
                    value: ethers.parseEther("0.1"),
                    gasLimit: 250000
                });
                await tx.wait();
                console.log(`> Bet placed on Task #${task.id}`);
            }
        } else {
            // Attempt to claim if task is resolved
            try {
                const claimTx = await contract.claimWinnings(task.id, { gasLimit: 200000 });
                await claimTx.wait();
                console.log("> Winnings claimed!");
            } catch (e) {
                // Silently skip if no winnings
            }
        }
    } catch (err) {
        console.error(`[Agent Error]: ${err.message}`);
    }
}

async function runAllAgents() {
    for (const key of privateKeys) await processAgent(key);
}

setInterval(runAllAgents, 15 * 60 * 1000);
runAllAgents();
