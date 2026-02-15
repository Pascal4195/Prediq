import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const MONAD_PARAMS = {
    chainId: '0x8F', // 143
    chainName: 'Monad Mainnet',
    nativeCurrency: { name: 'MON', symbol: 'MON', decimals: 18 },
    rpcUrls: ['https://rpc.monad.xyz'],
    blockExplorerUrls: ['https://monadscan.com']
  };

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Install MetaMask");
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const network = await window.ethereum.request({ method: 'eth_chainId' });
      setAddress(accounts[0]);
      setChainId(parseInt(network, 16));
      setIsConnected(true);
    } catch (error) {
      console.error("Connection failed", error);
    }
  };

  const switchToMonad = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x8F' }],
      });
    } catch (err) {
      if (err.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [MONAD_PARAMS],
        });
      }
    }
  };

  // Listen for account or network changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', (chain) => setChainId(parseInt(chain, 16)));
      window.ethereum.on('accountsChanged', (accs) => setAddress(accs[0]));
    }
  }, []);

  return (
    <WalletContext.Provider value={{ address, isConnected, chainId, connectWallet, switchToMonad }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
