import React, { useState, useEffect } from 'react';
import { getProvider, CONTRACT_ADDRESSES, ASSET_MAP } from './utils/eth';
import { Wallet, Zap, TrendingUp, Cpu, Globe } from 'lucide-react';

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

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-cyan-500 font-['Orbitron'] tracking-widest">LOADING_SYSTEM...</div>;

  return (
    // We added font-['Orbitron'] here to force the sci-fi look
    <div className="min-h-screen bg-[#020205] text-white font-['Orbitron'] overflow-x-hidden">
      
      {/* ANIMATED BACKGROUND (The "Competitor Killer") */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-600/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        {/* Subtle Grid Overlay like ClawMate */}
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90px, #fff 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
      </div>

      <nav className="relative z-10 p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border-2 border-cyan-500 flex items-center justify-center rotate-45 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            <Zap className="-rotate-45 text-cyan-400" size={20} fill="currentColor" />
          </div>
          <span className="text-2xl font-black tracking-tighter italic bg-gradient-to-r from-white to-cyan-500 bg-clip-text text-transparent">PREDIQ</span>
        </div>
        
        <button onClick={connectWallet} className="border border-cyan-500/50 px-6 py-2 rounded-sm skew-x-[-12deg] hover:bg-cyan-500 hover:text-black transition-all font-bold text-xs">
          <div className="skew-x-[12deg] flex items-center gap-2">
            <Wallet size={14} />
            {account ? account.substring(0, 8) : "INITIALIZE_WALLET"}
          </div>
        </button>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-10 pb-20">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-7xl font-black mb-4 tracking-tight uppercase leading-none">
            Elite <span className="text-cyan-500 shadow-cyan-500/50">Forecasting</span> <br/> 
            <span className="text-xs tracking-[0.8em] text-slate-500">Monad High-Speed Network</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(ASSET_MAP).map(([id, asset]) => (
            <div key={id} className="group relative bg-black/40 border-l-4 border-cyan-500 p-8 clip-path-polygon transition-all hover:bg-cyan-950/20">
              <div className="absolute top-2 right-4 text-[10px] text-cyan-500/50">MKT_{id}</div>
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{asset.symbol}</div>
              <h3 className="text-2xl font-bold mb-1">{asset.name}</h3>
              <div className="w-12 h-1 bg-cyan-500 mb-6"></div>
              <button className="w-full py-3 border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all text-[10px] font-bold tracking-widest uppercase">
                Open Terminal
              </button>
            </div>
          ))}
        </div>

        {/* System Stats Footer */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-500 uppercase">Network</span>
            <span className="text-xs text-cyan-400 flex items-center gap-2"><Globe size={12}/> MONAD_TEST</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-500 uppercase">Status</span>
            <span className="text-xs text-green-400 flex items-center gap-2"><Cpu size={12}/> OPERATIONAL</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
