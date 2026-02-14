import { ethers } from "ethers";

export const CONTRACT_ADDRESSES = {
  REGISTRY: "0x09E1fB0E763A5a35926B637B09F3692348c41f77",
  ORACLE: "0x4013449080A6477e38383321477754B4B1842880",
  MARKET: "0x9816E8e88865616466907406a4891b6107567840"
};

export const ASSET_MAP = {
  "1": { name: "BTC", symbol: "₿" },
  "2": { name: "ETH", symbol: "Ξ" },
  "3": { name: "MON", symbol: "M" }
};

// This fixes the "getProvider is not exported" error from your logs
export const getProvider = () => {
  if (typeof window !== "undefined" && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  }
  return null;
};

export const getContract = async (address, abi) => {
  const provider = getProvider();
  if (!provider) return null;
  const signer = await provider.getSigner();
  return new ethers.Contract(address, abi, signer);
};
