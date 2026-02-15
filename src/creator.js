const { ethers } = require("ethers");
const path = require("path");

// Bulletproof pathing for Render
const abiPath = path.join(process.cwd(), "src", "abis", "MasterArena.json");
const MasterArena = require(abiPath);

async function startCreator() {
    console.log("Creator (Boss) is starting...");
    console.log("ABI loaded successfully from:", abiPath);
    // Paste your original Boss logic (rounds, etc.) below this line
}

startCreator().catch((error) => {
    console.error("Creator Error:", error);
    process.exit(1);
});
