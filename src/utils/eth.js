import { ethers } from "ethers";
import MarketABI from '../abis/Market.json'; 

export const CONTRACT_ADDRESSES = {
  // Use the address from your successful 2:23 AM logs
  MARKET: "0x9816E8e88865616466907406a4891b6107567840" 
};

export const getProvider = () => {
  if (typeof window !== "undefined" && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  }
  
  // HARDCODED FALLBACK (No env variable needed)
  return new ethers.JsonRpcProvider("https://rpc.monad.xyz");
};

export const getContract = async () => {
  const provider = getProvider();
  try {
    const address = CONTRACT_ADDRESSES.MARKET;
    const abi = MarketABI.abi || MarketABI;
    
    if (provider instanceof ethers.BrowserProvider) {
      const signer = await provider.getSigner();
      return new ethers.Contract(address, abi, signer);
    }
    return new ethers.Contract(address, abi, provider);
  } catch (error) {
    console.error("Contract Init Error:", error);
    return null;
  }
};
