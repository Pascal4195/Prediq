import React, { useState, useEffect } from 'react';
import { getProvider, ASSET_MAP } from './utils/eth';
import { Wallet, Zap, Globe, Cpu, ChevronRight } from 'lucide-react';

// ICON COMPONENT - Glowing Official Symbols
const CryptoIcon = ({ symbol }) => {
  const icons = {
    "BTC": (
      <svg className="w-10 h-10 drop-shadow-[0_0_8px_rgba(247,147,26,0.6)]" viewBox="0 0 24 24" fill="none">
        <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z" fill="#F7931A"/>
        <path d="M16.64 12.883c.27-1.805-.11-2.775-3.04-3.418l.621-2.493-1.517-.378-.605 2.427c-.398-.1-.808-.195-1.21-.29l.61-2.443-1.517-.378-.621 2.492c-.33-.075-.653-.15-.966-.23l.001-.005-2.092-.522-.403 1.62s1.126.258 1.102.274c.615.154.726.56.708.882l-.71 2.844c.042.011.098.025.158.04l-.16-.04-.995 3.99c-.075.187-.266.467-.695.36.015.023-1.103-.275-1.103-.275l-.752 1.734 1.974.492c.367.092.727.188 1.082.278l-.625 2.51 1.516.378.622-2.495c.414.113.816.219 1.207.32l-.619 2.483 1.517.378.625-2.508c2.587.49 4.532.292 5.35-2.048.66-1.884.024-2.972-1.34-3.682 1.0-.23 1.75-.884 1.952-2.235zm-3.502 4.882c-.47 1.884-3.64.866-4.67.61l.833-3.34c1.03.257 4.343.764 3.837 2.73zm.47-4.908c-.427 1.716-3.07.844-3.927.632l.755-3.03c.857.21 3.633.6 3.172 2.398z" fill="white"/>
      </svg>
    ),
    "ETH": (
      <svg className="w-10 h-10 drop-shadow-[0_0_8px_rgba(98,126,234,0.6)]" viewBox="0 0 24 24" fill="none">
        <path d="M11.999 24c6.627 0 12-5.373 12-12S18.626 0 11.999 0 0 5.373 0 12s5.372 12 11.999 12z" fill="#627EEA"/>
        <path d="M12 18.273l-4.5-2.659L12 22l4.5-6.386-4.5 2.659z" fill="#C0CBF6" fillOpacity=".6"/>
        <path d="M12 2l-4.5 7.455L12 11.636l4.5-2.181L12 2z" fill="white"/>
        <path d="M12 11.636l-4.5-2.181L12 16l4.5-6.545-4.5 2.181z" fill="white" fillOpacity=".6"/>
      </svg>
    ),
    "MON": (
      <svg className="w-10 h-10 drop-shadow-[0_0_10px_rgba(168,85,247,0.7)]" viewBox="0 0 24 24" fill="none">
        <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z" fill="#A855F7"/>
        <path d="M7 16V8l5 4 5-4v8l-5-4-5 4z" fill="white" fillRule="evenodd"/>
      </svg>
    )
  };
  return icons[symbol] || <span>?</span>;
};

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

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center text-cyan-500 font-['Orbitron'] tracking-[0.5em]">
      BOOTING_SYSTEM...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020205] text-white font-['Orbitron'] relative overflow-hidden">
      
      {/* ANIMATED CLOUDS (Mesh Gradient) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Cyan Cloud */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-cyan-500/10 blur-[140px] rounded-full animate-[pulse_8s_infinite] transition-transform duration-[10s]"></div>
        {/* Purple Cloud */}
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-600/10 blur-[140px] rounded-full animate-[pulse_10s_infinite_reverse] transition-transform duration-[10s]"></div>
        {/* Subtle Cyber Grid */}
        <div className="absolute inset-0 opacity-[0.05]" style={{backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
      </div>

      <nav className="relative z-10 p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="p-2 border-2 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <Zap className="text-cyan-400" size={20} fill="currentColor" />
          </div>
          <span className="text-2xl font-black tracking-tight italic bg-gradient-to-r from-white to-cyan-500 bg-clip-text text-transparent">PREDIQ</span>
        </div>
        
        <button onClick={connectWallet} className="border border-cyan-500/50 px-6 py-2 rounded-sm skew-x-[-12deg] hover:bg-cyan-500 hover:text-black transition-all group">
          <div className="skew-x-[12deg] flex items-center gap-2 font-bold text-[10px] tracking-widest">
            <Wallet size={14} />
            {account ? account.substring(0, 10) : "SYNC_TERMINAL"}
          </div>
        </button>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-8xl font-black mb-4 tracking-tighter uppercase leading-[0.9]">
            NEXT GEN <br/> <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>MARKETS</span>
          </h1>
          <p className="text-[10px] tracking-[0.5em] text-cyan-500/80 font-bold">MONAD TESTNET // PHASE 1.0</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(ASSET_MAP).map(([id, asset]) => (
            <div key={id} className="relative group bg-black/40 border border-white/5 p-8 overflow-hidden transition-all hover:border-cyan-500/50">
              {/* Scanline Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-24 -top-24 group-hover:animate-[scan_2s_linear_infinite] pointer-events-none"></div>
              
              <div className="flex justify-between items-start mb-8">
                <CryptoIcon symbol={asset.name} />
                <span className="text-[9px] font-bold text-slate-500 border border-slate-800 px-2 py-1">SYS_{id}</span>
              </div>
              
              <h3 className="text-2xl font-black mb-1">{asset.name}</h3>
              <p className="text-[10px] text-slate-500 tracking-widest uppercase mb-8">Real-time Oracle Feed</p>
              
              <button className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all font-black text-[10px] tracking-[0.3em]">
                OPEN_MARKET
              </button>
            </div>
          ))}
        </div>

        {/* DATA STRIP */}
        <div className="mt-20 border-t border-white/10 pt-8 flex flex-wrap gap-8 justify-center opacity-60">
          <div className="flex items-center gap-2 text-[10px] tracking-widest"><Globe size={14}/> NETWORK: MONAD</div>
          <div className="flex items-center gap-2 text-[10px] tracking-widest"><Cpu size={14}/> STATUS: CONNECTED</div>
          <div className="flex items-center gap-2 text-[10px] tracking-widest text-cyan-400 animate-pulse"><TrendingUp size={14}/> DATA: LIVE_STREAM</div>
        </div>
      </main>

      <style jsx>{`
        @keyframes scan {
          from { top: -100%; }
          to { top: 100%; }
        }
        .stroke-text {
          paint-order: stroke fill;
        }
      `}</style>
    </div>
  );
}

export default App;
