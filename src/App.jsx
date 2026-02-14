import React, { useState, useEffect } from 'react';
import { getProvider, CONTRACT_ADDRESSES, ASSET_MAP } from './utils/eth';
import { Wallet, Zap, BarChart3, Shield, Info, ChevronRight } from 'lucide-react';

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
    if (!provider) return alert("Open in MetaMask Browser!");
    const signer = await provider.getSigner();
    setAccount(await signer.getAddress());
  };

  if (loading) return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050508] text-white font-mono selection:bg-cyan-500/30">
      {/* GLOW BACKGROUND EFFECT */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-900/20 blur-[120px] rounded-full"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full"></div>

      {/* NAV */}
      <nav className="relative z-10 border-b border-white/5 bg-black/40 backdrop-blur-xl px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.5)]">
              <Zap size={20} fill="white" />
            </div>
            <span className="text-2xl font-black tracking-tighter italic">PREDIQ</span>
          </div>
          
          <button 
            onClick={connectWallet}
            className="group relative px-6 py-2 bg-cyan-500/10 border border-cyan-500/50 rounded-full overflow-hidden transition-all hover:bg-cyan-500 hover:text-black"
          >
            <span className="relative z-10 flex items-center gap-2 font-bold text-xs">
              <Wallet size={14} />
              {account ? `${account.substring(0, 6)}...${account.substring(38)}` : "CONNECT TERMINAL"}
            </span>
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <div className="mb-16 text-center">
          <div className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-[10px] font-bold tracking-[0.2em] mb-4">
            POWERED BY MONAD L1
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent uppercase">
            Predict. Win. <br/> <span className="text-cyan-400">Evolve.</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            The next generation of high-frequency prediction markets. 
            Deployed on Monad for sub-second settlement.
          </p>
        </div>

        {/* MARKET GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {Object.entries(ASSET_MAP).map(([id, asset]) => (
            <div key={id} className="group relative p-1 rounded-3xl transition-all hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-[#0d0d12] border border-white/10 p-6 rounded-3xl h-full flex flex-col">
                <div className="flex justify-between items-center mb-8">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-3xl">
                    {asset.symbol}
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Market Status</div>
                    <div className="text-xs text-cyan-400 flex items-center gap-1 justify-end">
                      <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div> LIVE
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-black mb-1">{asset.name}</h3>
                <p className="text-slate-500 text-xs mb-8 uppercase tracking-widest font-bold">Predict {asset.name} Price</p>
                
                <button className="mt-auto w-full bg-white text-black py-3 rounded-2xl font-black text-xs tracking-widest transition-all hover:bg-cyan-400">
                  ENTER MARKET
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* STATS STRIP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400"><BarChart3 size={20}/></div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-bold">Active Agents</div>
              <div className="text-sm font-bold">SYNCHRONIZING...</div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-cyan-500/20 rounded-xl text-cyan-400"><Shield size={20}/></div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-bold">Security</div>
              <div className="text-sm font-bold">MONAD TESTNET SECURE</div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER BAR */}
      <footer className="relative z-10 border-t border-white/5 p-8 text-center mt-20">
        <p className="text-[10px] text-slate-600 font-bold tracking-[0.5em] uppercase">
          &copy; 2026 PREDIQ TERMINAL // ALL RIGHTS RESERVED
        </p>
      </footer>
    </div>
  );
}

export default App;
