import React from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';

const Navbar = () => {
  const { isConnected, address, connectWallet, chainId, switchToMonad } = useWallet();

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

      <button 
        onClick={isConnected && chainId !== 143 ? switchToMonad : connectWallet}
        style={{ backgroundColor: isConnected && chainId !== 143 ? '#ef4444' : '#06b6d4', color: isConnected && chainId !== 143 ? 'white' : 'black' }}
        className="px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 border-none shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-105 active:scale-95"
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
