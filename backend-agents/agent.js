import { ethers } from 'ethers';

// --- CONFIGURATION ---
const RPC_URL = "https://rpc.monad.xyz"; 
const PRIVATE_KEY = process.env.CREATOR_PRIVATE_KEY; 
const MARKET_ADDRESS = "0x086C0E4cf774237c9D201fCB196b6fe8f126ea37"; // Verify this address

// --- INLINE ABI (Fixes ENOENT error) ---
// Paste the actual content of your Market.json between the brackets [[
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "rId",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_side",
				"type": "bool"
			}
		],
		"name": "predict",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "rId",
				"type": "uint256"
			}
		],
		"name": "resolveRound",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_reg",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_ora",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "oracle",
		"outputs": [
			{
				"internalType": "contract MoltOracle",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "registry",
		"outputs": [
			{
				"internalType": "contract MoltRegistry",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "rounds",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "targetPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "yesPool",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "noPool",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "resolved",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "winner",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
 ]
const MarketABI = [
  // Example: "function TaskCreated(uint256 taskId, string description, address creator)"
  // PASTE YOUR FULL ABI ARRAY HERE
];

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const marketContract = new ethers.Contract(MARKET_ADDRESS, MarketABI, wallet);

async function runAgent() {
    console.log("--- Agent System Online ---");
    console.log(`Agent Address: ${wallet.address}`);

    marketContract.on("TaskCreated", (taskId, description, creator) => {
        console.log(`NEW TASK: [ID: ${taskId}] - ${description}`);
    });

    setInterval(async () => {
        try {
            const balance = await provider.getBalance(wallet.address);
            console.log(`Heartbeat: Active. Balance: ${ethers.formatEther(balance)} MON`);
        } catch (e) {
            console.error("Heartbeat error:", e.message);
        }
    }, 30000);
}

runAgent().catch(console.error);
