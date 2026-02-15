import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('0');
  const [isConnected, setIsConnected] = useState(false);

  const connect = async () => {
    // Check for any injected provider (MetaMask, Rabby, etc.)
    const provider = window.ethereum;

    if (provider) {
      try {
        // Request accounts from whatever wallet is active
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        const userAddress = accounts[0];
        
        const ethProvider = new ethers.providers.Web3Provider(provider);
        const userBalance = await ethProvider.getBalance(userAddress);
        
        setAddress(userAddress);
        setBalance(ethers.utils.formatEther(userBalance));
        setIsConnected(true);
      } catch (error) {
        console.error("Connection failed:", error);
      }
    } else {
      // Instead of an alert, we can log it or show a nicer UI message
      console.warn("No Web3 provider detected. Please use a Monad-compatible wallet.");
      // Optional: You could trigger a custom modal here later
    }
  };

  // Listen for account changes automatically
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
        } else {
          setIsConnected(false);
          setAddress('');
        }
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
