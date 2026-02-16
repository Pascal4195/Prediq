import { ethers } from "ethers";
// We use MasterArena/Market ABI as the primary interface
import MarketABI from '../abis/Market.json'; 

// --- CONTRACT CONFIGURATION ---
export const CONTRACT_ADDRESSES = {
  // This must match the CONTRACT_ADDRESS in your Render environment
  MARKET: "0x9816E8e88865616466907406a4891b6107567840" 
};

// --- PROVIDER LOGIC ---
export const getProvider = () => {
  if (typeof window !== "undefined" && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  }
  
  // Use VITE_ prefix for environment variables in Vite/React
  const rpcUrl = import.meta.env.VITE_MONAD_RPC_URL || "https://rpc.monad.xyz";
  return new ethers.JsonRpcProvider(rpcUrl);
};

// --- CONTRACT INSTANCE HELPER ---
export const getContract = async () => {
  const provider = getProvider();
  if (!provider) return null;

  try {
    if (provider instanceof ethers.BrowserProvider) {
      const signer = await provider.getSigner();
      return new ethers.Contract(CONTRACT_ADDRESSES.MARKET, MarketABI.abi || MarketABI, signer);
    }
    
    return new ethers.Contract(CONTRACT_ADDRESSES.MARKET, MarketABI.abi || MarketABI, provider);
  } catch (error) {
    console.error("Contract Init Error:", error);
    return null;
  }
};

export const formatMonad = (value) => ethers.formatEther(value || 0);
