import React, { useState } from 'react';
import { getProvider } from '@/utils/eth';
import { Wallet, Activity } from 'lucide-react';

export default function Navbar({ activeTab, onTabChange }) {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    try {
      const provider = getProvider();
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      setAccount(accounts[0]);
    } catch (err) {
      console.error("Connection failed", err);
    }
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-[#0a0a0a] border-b border-cyan-500/20 sticky top-0 z-50">
      {/* BRAND */}
      <div className="flex items-center gap-2">
        <Activity className="text-cyan-400" size={24} />
        <span className="font-black text-xl tracking-tighter text-white">PREDIQ</span>
      </div>

      {/* NAVIGATION TABS (Using your existing props) */}
      <div className="hidden md:flex gap-6">
        {['Arena', 'Leaderboard', 'Registry'].map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`text-sm font-bold uppercase tracking-widest transition-colors ${
              activeTab === tab ? 'text-cyan-400' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* WALLET BUTTON */}
      <button 
        onClick={connectWallet}
        className="flex items-center gap-2 bg-transparent border border-cyan-500/50 hover:bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-lg font-mono text-sm transition-all shadow-[0_0_15px_rgba(6,182,212,0.1)]"
      >
        <Wallet size={16} />
        {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "CONNECT WALLET"}
      </button>
    </nav>
  );
}
