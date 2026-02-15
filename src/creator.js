const { ethers } = require("ethers");
// Looks inside the same src folder for abis
const MasterArena = require("./abis/MasterArena.json"); 

async function startCreator() {
    console.log("Creator (Boss) is starting...");
    // Your existing logic for creating rounds goes here
}

startCreator().catch((error) => {
    console.error("Creator Error:", error);
    process.exit(1);
});
