import React, { useState, useEffect } from 'react';
import { Zap, Wallet, Globe, Cpu } from 'lucide-react';
import { getProvider, ASSET_MAP } from './utils/eth';

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
    if (!provider) return alert("Please open in a mobile browser with a wallet (like MetaMask)!");
    const signer = await provider.getSigner();
    setAccount(await signer.getAddress());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020205] flex items-center justify-center text-cyan-400 font-['Orbitron'] tracking-widest">
        INITIALIZING_SYSTEM...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020205] text-white font-['Orbitron'] overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      
      {/* 1. TOP NAVIGATION */}
      <nav className="relative z-10 p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border border-cyan-500 flex items-center justify-center rotate-45 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <Zap className="-rotate-45 text-cyan-400" size={16} fill="currentColor" />
          </div>
          <span className="text-xl font-black tracking-tighter italic text-cyan-400">PREDIQ</span>
        </div>
        
        <button 
          onClick={connectWallet} 
          className="border border-white/20 px-4 py-1.5 text-[10px] uppercase tracking-widest bg-black/40 hover:bg-white hover:text-black transition-all font-bold"
        >
          <div className="flex items-center gap-2">
            <Wallet size={12} />
            {account ? account.substring(0, 8).toUpperCase() : "INITIALIZE_WALLET"}
          </div>
        </button>
      </nav>

      {/* 2. HERO HEADER - EXACTLY AS PER SCREENSHOT */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-20">
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter uppercase italic">
            ELITE <span className="text-cyan-400">FORECASTING</span>
          </h1>
          <p className="text-[10px] tracking-[0.8em] text-slate-500 uppercase font-bold opacity-80">
            MONAD HIGH-SPEED NETWORK
          </p>
        </div>

        {/* 3. THE HORIZONTAL GRID - FIXING THE VERTICAL STACK ISSUE */}
        <div className="w-full overflow-x-auto pb-10 scrollbar-hide">
          <div className="flex flex-row justify-center gap-6 min-w-max px-4">
            {Object.entries(ASSET_MAP).map(([id, asset]) => (
              <div 
                key={id} 
                className="bg-[#08080c] border-l-[3px] border-cyan-500 p-8 w-[300px] h-[220px] flex flex-col justify-between shadow-2xl hover:bg-[#0c0c14] transition-colors"
              >
                <div className="flex justify-between items-start">
                  <span className="text-3xl font-bold text-white/90">{asset.symbol}</span>
                  <span className="text-[9px] text-slate-700 font-bold uppercase tracking-widest">MKT_{id}</span>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4 italic tracking-tight uppercase">{asset.name}</h3>
                  <div className="w-12 h-[2px] bg-cyan-500/50 mb-6"></div>
                  <button className="w-full py-3 bg-[#111] border border-white/5 text-[9px] font-bold uppercase tracking-[0.3em] hover:border-cyan-500 hover:text-cyan-400 transition-all">
                    OPEN TERMINAL
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. SYSTEM STATUS FOOTER */}
        <div className="mt-16 flex flex-row gap-10 px-4 text-[9px] font-bold uppercase tracking-widest text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse"></div>
            <Globe size={12} className="opacity-50" /> #MONAD_TEST
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
            <Cpu size={12} className="opacity-50" /> SYSTEM_NOMINAL
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
