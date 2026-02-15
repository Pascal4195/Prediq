import React from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';

const Navbar = () => {
  const { isConnected, address, connectWallet, chainId } = useWallet();
  const MONAD_CHAIN_ID = 143; 

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-10 py-6 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <Link to="/" className="text-2xl font-black tracking-tighter text-white">
        PREDIQ<span className="text-cyan-500">.</span>
      </Link>
      
      <div className="hidden md:flex gap-10 text-[10px] font-bold tracking-[0.3em] uppercase text-gray-500">
        <Link to="/" className="hover:text-white transition-colors">Arena</Link>
        <Link to="/registry" className="hover:text-white transition-colors">Registry</Link>
        <Link to="/leaderboard" className="hover:text-white transition-colors">Ranking</Link>
      </div>

      <button 
        onClick={connectWallet}
        className="px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-cyan-500 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-cyan-500/20"
      >
        {isConnected ? (
          chainId !== MONAD_CHAIN_ID ? "Switch to Monad" : `${address.substring(0,6)}...${address.slice(-4)}`
        ) : (
          "Initialize Wallet"
        )}
      </button>
    </nav>
  );
};

export default Navbar;
