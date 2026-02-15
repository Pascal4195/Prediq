import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const WalletContext = createContext();

// OFFICIAL MONAD MAINNET SPECS
const MONAD_MAINNET = {
  chainId: '0x8f', // 143 in Hex
  chainName: 'Monad Mainnet',
  nativeCurrency: { name: 'MONAD', symbol: 'MON', decimals: 18 },
  rpcUrls: ['https://rpc.monad.xyz'], 
  blockExplorerUrls: ['https://monadvision.com']
};

export const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('0');
  const [isConnected, setIsConnected] = useState(false);

  // Function to switch or add the Monad network
  const switchNetwork = async () => {
    if (!window.ethereum) return;
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: MONAD_MAINNET.chainId }],
      });
    } catch (error) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [MONAD_MAINNET],
          });
        } catch (addError) {
          console.error("Failed to add network");
        }
      }
    }
  };

  // Main connection logic
  const connect = async () => {
    if (window.ethereum) {
      try {
        // 1. Trigger the wallet selection/login
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        
        // 2. Force switch to Monad Mainnet
        await switchNetwork();
        
        // 3. Setup Provider and fetch fresh data
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const network = await provider.getNetwork();
        
        // Only update state if we are on the correct chain
        if (network.chainId === 143 || network.chainId === parseInt(MONAD_MAINNET.chainId, 16)) {
          const userBalance = await provider.getBalance(accounts[0]);
          
          setAddress(accounts[0]);
          setBalance(ethers.utils.formatEther(userBalance));
          setIsConnected(true);
        }
      } catch (err) {
        console.error("Connection process failed:", err);
      }
    } else {
      // Mobile deep-link fallback
      const dappUrl = window.location.href.split('//')[1];
      window.location.href = `https://metamask.app.link/dapp/${dappUrl}`;
    }
  };

  // Listen for account or network changes while the app is open
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          // Re-fetch balance if account changes
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          provider.getBalance(accounts[0]).then(bal => {
            setBalance(ethers.utils.formatEther(bal));
          });
        } else {
          setAddress('');
          setIsConnected(false);
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
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
