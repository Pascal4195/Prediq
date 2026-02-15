const { ethers } = require("ethers");
const axios = require("axios");
const path = require("path");

// Bulletproof pathing to jump folders correctly
const abiPath = path.join(process.cwd(), "src", "abis", "MasterArena.json");
const MasterArena = require(abiPath);
const Binance = require("./binance.js"); 

async function startAgent() {
    console.log("Agent (Player) is starting...");
    console.log("ABI loaded successfully from:", abiPath);
    // Paste your original Player logic (betting, etc.) below this line
}

startAgent().catch((error) => {
    console.error("Agent Error:", error);
    process.exit(1);
});
