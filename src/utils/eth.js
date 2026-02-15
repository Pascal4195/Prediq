import { ethers } from "ethers";
import MarketABI from '../abis/Market.json';
import RegistryABI from '../abis/Registry.json';
import OracleABI from '../abis/Oracle.json';

// --- CONTRACT CONFIGURATION ---
export const CONTRACT_ADDRESSES = {
  REGISTRY: "0x09E1fB0E763A5a35926B637B09F3692348c41f77",
  ORACLE: "0x4013449080A6477e38383321477754B4B1842880",
  MARKET: "0x9816E8e88865616466907406a4891b6107567840"
};

// --- ASSET CONFIGURATION (Pyth Price IDs) ---
// These are the IDs your AI agents and UI will use to track real-time truth
export const ASSET_MAP = {
  "BTC": "0xe62df6c8b4a94ed613c30c980374ed7375f9fd5a9e7c0187762484d3d6051095",
  "ETH": "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
  "MON": "0x3347101e4dfad011e03f0b240509a265691456ca715d962c96c56f8f7bc2217c" // Placeholder if needed
};

// --- PROVIDER LOGIC ---
export const getProvider = () => {
  // Check if browser wallet (MetaMask) is available
  if (typeof window !== "undefined" && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  }
  
  // FALLBACK: Use the Environment Variable set in Render
  // Note: Vite requires the VITE_ prefix to expose variables to the frontend
  const rpcUrl = import.meta.env.VITE_MONAD_RPC_URL || "https://rpc.monad.xyz";
  return new ethers.JsonRpcProvider(rpcUrl);
};

// --- CONTRACT INSTANCE HELPER ---
export const getContract = async (address, abi) => {
  const provider = getProvider();
  if (!provider) return null;

  try {
    // If it's a BrowserProvider, we use the Signer (for write transactions)
    if (provider instanceof ethers.BrowserProvider) {
      const signer = await provider.getSigner();
      return new ethers.Contract(address, abi, signer);
    }
    
    // Otherwise, use the Provider (for read-only calls like fetching tasks)
    return new ethers.Contract(address, abi, provider);
  } catch (error) {
    console.error("Failed to initialize contract instance:", error);
    return null;
  }
};

/**
 * Utility to format Large numbers or MON balances
 */
export const formatMonad = (value) => ethers.formatEther(value || 0);

/**
 * Utility to parse MON inputs for transactions
 */
export const parseMonad = (value) => ethers.parseEther(value.toString() || "0");
