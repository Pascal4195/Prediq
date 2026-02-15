import React, { createContext, useContext, useState } from 'react';
import { ethers } from 'ethers';

const WalletContext = createContext();

// OFFICIAL MONAD MAINNET SPECS (2026)
const MONAD_MAINNET = {
  chainId: '0x8f', // 143 in Hex
  chainName: 'Monad Mainnet', // This is what the user sees in the wallet
  nativeCurrency: { name: 'MONAD', symbol: 'MON', decimals: 18 },
  rpcUrls: ['https://rpc.monad.xyz'], 
  blockExplorerUrls: ['https://monadvision.com']
};

export const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('0');
  const [isConnected, setIsConnected] = useState(false);

  const switchNetwork = async () => {
    if (!window.ethereum) return;
    try {
      // Prompt user to switch to Monad Mainnet
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: MONAD_MAINNET.chainId }],
      });
    } catch (error) {
      // Error code 4902 means the network hasn't been added to their wallet yet
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [MONAD_MAINNET],
          });
        } catch (addError) {
          console.error("User cancelled adding the network.");
        }
      }
    }
  };

  const connect = async () => {
    if (window.ethereum) {
      try {
        // 1. Request Account Access (The "Connect" popup)
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // 2. Immediately ask to switch to Monad Mainnet
        await switchNetwork();
        
        // 3. Update UI with details
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const userBalance = await provider.getBalance(accounts[0]);
        
        setAddress(accounts[0]);
        setBalance(ethers.utils.formatEther(userBalance));
        setIsConnected(true);
      } catch (err) {
        console.error("Connection failed:", err.message);
      }
    } else {
      // Mobile fallback if no wallet is found
      const dappUrl = window.location.href.split('//')[1];
      window.location.href = `https://metamask.app.link/dapp/${dappUrl}`;
    }
  };

  return (
    <WalletContext.Provider value={{ address, balance, isConnected, connect }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
