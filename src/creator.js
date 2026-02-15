const fs = require('fs');
const path = require('path');
const TARGETS_FILE = path.join(__dirname, 'targets.json');

// Helper: Save a target price
function saveTarget(taskId, targetPrice) {
    let data = {};
    if (fs.existsSync(TARGETS_FILE)) {
        data = JSON.parse(fs.readFileSync(TARGETS_FILE));
    }
    data[taskId.toString()] = targetPrice;
    fs.writeFileSync(TARGETS_FILE, JSON.stringify(data, null, 2));
}

// Helper: Get a target price
function getTarget(taskId) {
    if (!fs.existsSync(TARGETS_FILE)) return null;
    const data = JSON.parse(fs.readFileSync(TARGETS_FILE));
    return data[taskId.toString()];
}

async function manageMarkets() {
    try {
        const taskCount = await contract.taskCount();
        const currentId = taskCount + 1n;

        // 1. CREATE TASK
        const btcPrice = await bnbData.getBTCPrice();
        const target = btcPrice + 10; // Target is $10 higher
        
        console.log(`Creating Task #${currentId}: Target $${target}`);
        const tx = await contract.createTask(`Will BTC hit $${target}?`);
        await tx.wait();

        // Save the target price to our "memory" file
        saveTarget(currentId, target);

        // 2. RESOLVE PREVIOUS TASK
        if (taskCount > 0n) {
            const lastId = taskCount;
            const task = await contract.tasks(lastId);
            
            if (!task.resolved) {
                const savedTarget = getTarget(lastId);
                const finalPrice = await bnbData.getBTCPrice();
                
                // If we don't have the target saved, we use a fallback or skip
                if (savedTarget) {
                    const winner = finalPrice >= savedTarget;
                    console.log(`Resolving #${lastId}: Final $${finalPrice} vs Target $${savedTarget}`);
                    await (await contract.resolveTask(lastId, winner)).wait();
                }
            }
        }
    } catch (err) {
        console.error("Creator error:", err.message);
    }
}
