import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getProvider } from '../utils/eth';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState("0");
  const [isConnected, setIsConnected] = useState(false);

  const connect = async () => {
    if (!window.ethereum) return alert("Please install MetaMask");
    try {
      const provider = getProvider();
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();
      
      setAddress(addr);
      setIsConnected(true);
      
      const bal = await provider.getBalance(addr);
      setBalance(ethers.formatUnits(bal, 18));
    } catch (err) {
      console.error("Connection failed:", err);
    }
  };

  // Auto-reconnect if already authorized
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) connect();
        else setIsConnected(false);
      });
    }
  }, []);

  return (
    <WalletContext.Provider value={{ address, balance, isConnected, connect }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
