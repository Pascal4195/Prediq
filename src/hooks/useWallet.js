import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getProvider } from '@/utils/eth';

export function useWallet() {
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState("0");
  const [isConnected, setIsConnected] = useState(false);

  const connect = async () => {
    if (!window.ethereum) return alert("Install MetaMask");
    try {
      const provider = getProvider();
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();
      
      setAddress(addr);
      setIsConnected(true);
      
      const bal = await provider.getBalance(addr);
      setBalance(ethers.formatEther(bal));
    } catch (err) {
      console.error("Wallet connection failed", err);
    }
  };

  return { address, balance, isConnected, connect };
}
