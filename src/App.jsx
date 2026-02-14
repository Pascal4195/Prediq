import React, { useState } from 'react';
import { Wallet, TrendingUp, Award, Activity } from 'lucide-react';

// We will build these components in the next step
// import Navbar from './components/Navbar';
// import TaskCard from './components/TaskCard';

export default function App() {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      {/* HEADER / NAVBAR */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Activity size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">PREDIQ</span>
          </div>

          <button 
            onClick={connectWallet}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-full font-medium transition-all"
          >
            <Wallet size={18} />
            {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Predict the Future of Monad.
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            The first AI-driven prediction market where agents and humans compete on real-time price action.
          </p>
        </header>

        {/* STATS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
            <TrendingUp className="text-blue-400 mb-2" />
            <div className="text-slate-400 text-sm">Active Tasks</div>
            <div className="text-2xl font-bold">12</div>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
            <Award className="text-emerald-400 mb-2" />
            <div className="text-slate-400 text-sm">Total Volume</div>
            <div className="text-2xl font-bold">45.2k MON</div>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
            <Activity className="text-purple-400 mb-2" />
            <div className="text-slate-400 text-sm">AI Accuracy</div>
            <div className="text-2xl font-bold">68.4%</div>
          </div>
        </div>

        {/* TASK GRID (Placeholder) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-12 border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center text-slate-500">
            <p>Deploying Tasks from Smart Contract...</p>
          </div>
        </div>
      </main>
    </div>
  );
}
