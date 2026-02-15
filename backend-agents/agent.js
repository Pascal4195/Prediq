const { ethers } = require("ethers");
const axios = require("axios");
// Jumps out of backend-agents to find the ABI
const MasterArena = require("../src/abis/MasterArena.json"); 
const Binance = require("./binance.js"); 

async function startAgent() {
    console.log("Agent (Player) is starting...");
    // Your existing logic for checking prices and betting goes here
}

startAgent().catch((error) => {
    console.error("Agent Error:", error);
    process.exit(1);
});
