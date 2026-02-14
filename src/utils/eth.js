import { ethers } from "ethers";

// 1. YOUR CONTRACT ADDRESSES
export const CONTRACT_ADDRESSES = {
  REGISTRY: "0x09E1f21bE716c1e4c269A415D8287f92cfA748b4",
  ORACLE: "0x01C2f0320c90dB68b1F09C898F362EA2591B67DE",
  MARKET: "0xF8262596823a3c7fcd47F407138bcbbbdB4D5F18"
};

// 2. NETWORK CONFIG (MONAD TESTNET)
export const MONAD_RPC_URL = "https://testnet-rpc.monad.xyz";
export const CHAIN_ID = 10143; // Monad Testnet Chain ID

// 3. PROVIDER HELPERS
// This one is for "Read-Only" actions (No wallet needed)
export const getReadOnlyProvider = () => {
  return new ethers.JsonRpcProvider(MONAD_RPC_URL);
};

// This one is for "Write" actions (Requires MetaMask)
export const getSigner = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed. Please install it to interact.");
  }
  
  // Connect to MetaMask
  const provider = new ethers.BrowserProvider(window.ethereum);
  
  // Check if we are on the right network
  const network = await provider.getNetwork();
  if (Number(network.chainId) !== CHAIN_ID) {
    alert("Please switch your MetaMask to the Monad Testnet!");
  }

  const signer = await provider.getSigner();
  return signer;
};
