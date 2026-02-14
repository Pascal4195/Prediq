import { ethers } from 'ethers';

export const CONTRACT_ADDRESSES = {
  MARKET: "0x...", 
  REGISTRY: "0x...",
  ORACLE: "0x..."
};

// Mapping IDs to Assets for the UI
export const ASSET_MAP = {
  0: { name: "Bitcoin", symbol: "BTC", icon: "₿" },
  1: { name: "Ethereum", symbol: "ETH", icon: "Ξ" },
  2: { name: "Solana", symbol: "SOL", icon: "S" }
};

export const getProvider = () => {
  if (!window.ethereum) throw new Error("No wallet found");
  return new ethers.BrowserProvider(window.ethereum);
};

export const getMarketContract = async (abi) => {
  const provider = getProvider();
  const signer = await provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESSES.MARKET, abi, signer);
};
  
