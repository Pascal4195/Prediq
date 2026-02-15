const { ethers } = require("ethers");

// Relative path to the corrected filename inside src/abis/
const MasterArena = require("./abis/MasterArena.json");

async function startCreator() {
    console.log("Boss (Creator) is starting...");
    console.log("Found MasterArena.json successfully.");
    // YOUR BOSS LOGIC GOES HERE
}

startCreator().catch((error) => {
    console.error("Creator Error:", error);
    process.exit(1);
});
