import React, { createContext, useContext, useState } from 'react';
import { ethers } from 'ethers';

const WalletContext = createContext();

const MONAD_MAINNET_PARAMS = {
  chainId: '0x2710', // Example ChainID for Monad - replace with actual when live
  chainName: 'Monad Mainnet',
  nativeCurrency: { name: 'MONAD', symbol: 'MON', decimals: 18 },
  rpcUrls: ['https://rpc-mainnet.monad.xyz'], // Replace with actual RPC
  blockExplorerUrls: ['https://monadexplorer.com']
};

export const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('0');
  const [isConnected, setIsConnected] = useState(false);

  const switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: MONAD_MAINNET_PARAMS.chainId }],
      });
    } catch (error) {
      if (error.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [MONAD_MAINNET_PARAMS],
        });
      }
    }
  };

  const connect = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        await switchNetwork(); // Forces switch to Monad Mainnet
        
        const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
        const userBalance = await ethProvider.getBalance(accounts[0]);
        
        setAddress(accounts[0]);
        setBalance(ethers.utils.formatEther(userBalance));
        setIsConnected(true);
      } catch (error) {
        console.error("Connection failed", error);
      }
    } else {
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
