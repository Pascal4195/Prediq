import React from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';

const Navbar = () => {
  const { isConnected, address, connectWallet } = useWallet();

  return (
    <nav className="flex justify-between items-center p-6 border-b border-gray-800">
      <Link to="/" className="text-2xl font-bold tracking-tighter text-cyan-500">PREDIQ</Link>
      
      <div className="hidden md:flex gap-8 text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">
        <Link to="/" className="hover:text-white transition-colors">Arena</Link>
        <Link to="/registry" className="hover:text-white transition-colors">Registry</Link>
        <Link to="/leaderboard" className="hover:text-white transition-colors">Leaderboard</Link>
      </div>

      <button 
        onClick={connectWallet}
        className="px-4 py-2 bg-white text-black text-[10px] font-bold uppercase hover:bg-cyan-500 transition-all"
      >
        {isConnected ? `${address.substring(0,6)}...${address.slice(-4)}` : "Connect Wallet"}
      </button>
    </nav>
  );
};

export default Navbar;
