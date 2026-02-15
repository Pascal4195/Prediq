import React, { useState, useEffect } from 'react';
import { getProvider, ASSET_MAP } from './utils/eth';
import { Zap, Wallet, Globe, Cpu } from 'lucide-react';

function App() {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      const provider = getProvider();
      if (provider) {
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) setAccount(accounts[0].address);
      }
      setLoading(false);
    };
    check();
  }, []);

  const connectWallet = async () => {
    const provider = getProvider();
    if (!provider) return alert("Open in MetaMask!");
    const signer = await provider.getSigner();
    setAccount(await signer.getAddress());
  };

  if (loading) return <div className="min-h-screen bg-[#020205] flex items-center justify-center text-cyan-400 font-['Orbitron']">INITIALIZING_TERMINAL...</div>;

  return (
    <div className="min-h-screen bg-[#020205] text-white font-['Orbitron'] p-6 md:p-10">
      
      {/* 1. TOP NAV: Exactly like the target screenshot */}
      <nav className="max-w-7xl mx-auto flex justify-between items-center mb-16">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 border border-cyan-400 flex items-center justify-center rotate-45">
            <Zap size={14} className="-rotate-45 text-cyan-400" fill="currentColor" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-cyan-400 italic">PREDIQ</span>
        </div>
        <button onClick={connectWallet} className="border border-white/20 px-4 py-1.5 text-[10px] uppercase tracking-widest bg-black/40 hover:bg-white hover:text-black transition-all font-bold">
          <div className="flex items-center gap-2">
            <Wallet size={12} />
            {account ? account.substring(0, 8).toUpperCase() : "INITIALIZE_WALLET"}
          </div>
        </button>
      </nav>

      {/* 2. HERO: Bold "Elite Forecasting" layout */}
      <header className="text-center mb-24">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 uppercase italic">
          ELITE <span className="text-cyan-400">FORECASTING</span>
        </h1>
        <p className="text-[10px] tracking-[0.8em] text-slate-500 uppercase font-bold">
          MONAD HIGH-SPEED NETWORK
        </p>
      </header>

      {/* 3. GRID: Uses the .terminal-card class to stop the squashing issue */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(ASSET_MAP).map(([id, asset]) => (
          <div key={id} className="terminal-card">
            <div className="flex justify-between items-start">
              <span className="text-4xl font-bold text-white/90">{asset.symbol}</span>
              <span className="text-[9px] text-slate-700 font-bold uppercase tracking-widest">MKT_{id}</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 italic tracking-tight">{asset.name}</h3>
              <button className="w-full py-3 bg-[#121218] border border-white/5 text-[9px] font-bold uppercase tracking-[0.3em] hover:border-cyan-500 hover:text-cyan-400 transition-all">
                OPEN TERMINAL
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 4. FOOTER: Status dots from the target screenshot */}
      <footer className="max-w-6xl mx-auto mt-24 flex gap-12 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
          <Globe size={10} className="mr-1"/> #MONAD_TEST
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
          <Cpu size={10} className="mr-1"/> SYSTEM_NOMINAL
        </div>
      </footer>
    </div>
  );
}

export default App;
