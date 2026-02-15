import React from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';

const Navbar = () => {
  const { isConnected, address, connectWallet, chainId } = useWallet();
  const MONAD_CHAIN_ID_HEX = '0x8F'; // 143 in Hex

  const handleNetworkSwitch = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: MONAD_CHAIN_ID_HEX }],
      });
    } catch (switchError) {
      // If the network is not added to MetaMask, add it
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: MONAD_CHAIN_ID_HEX,
              chainName: 'Monad Mainnet',
              nativeCurrency: { name: 'MON', symbol: 'MON', decimals: 18 },
              rpcUrls: ['https://rpc.monad.xyz'],
              blockExplorerUrls: ['https://monadscan.com']
            }],
          });
        } catch (addError) {
          console.error("User denied network addition");
        }
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-10 py-6 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <Link to="/" className="text-2xl font-black tracking-tighter text-white !no-underline">
        PREDIQ<span className="text-cyan-500">.</span>
      </Link>
      
      <div className="hidden md:flex gap-10 text-[10px] font-bold tracking-[0.3em] uppercase text-gray-500">
        <Link to="/" className="hover:text-white transition-colors !no-underline">Arena</Link>
        <Link to="/registry" className="hover:text-white transition-colors !no-underline">Registry</Link>
        <Link to="/leaderboard" className="hover:text-white transition-colors !no-underline">Ranking</Link>
      </div>

      {/* FIXED BUTTON DESIGN */}
      <button 
        onClick={isConnected && chainId !== 143 ? handleNetworkSwitch : connectWallet}
        className={`px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 border !border-solid ${
          isConnected && chainId !== 143 
            ? "!bg-red-600 !text-white !border-red-600 animate-pulse" 
            : "!bg-cyan-500 !text-black !border-cyan-500 hover:!bg-white hover:!text-black"
        }`}
      >
        {isConnected ? (
          chainId !== 143 ? "Switch to Monad" : `${address.substring(0,6)}...${address.slice(-4)}`
        ) : (
          "Initialize Wallet"
        )}
      </button>
    </nav>
  );
};

export default Navbar;
