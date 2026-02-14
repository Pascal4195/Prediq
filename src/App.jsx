import React, { useState, useEffect } from 'react';
import { getProvider, ASSET_MAP } from './utils/eth';
import { Wallet, Zap, Globe, Cpu } from 'lucide-react';

// ICON COMPONENT - Locked at 48px so they don't grow too large
const CryptoIcon = ({ name }) => {
  const icons = {
    "BTC": (
      <svg className="w-12 h-12 drop-shadow-[0_0_15px_rgba(247,147,26,0.8)]" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="12" fill="#F7931A"/>
        <path d="M16.64 12.883c.27-1.805-.11-2.775-3.04-3.418l.621-2.493-1.517-.378-.605 2.427c-.398-.1-.808-.195-1.21-.29l.61-2.443-1.517-.378-.621 2.492c-.33-.075-.653-.15-.966-.23l.001-.005-2.092-.522-.403 1.62s1.126.258 1.102.274c.615.154.726.56.708.882l-.71 2.844c.042.011.098.025.158.04l-.16-.04-.995 3.99c-.075.187-.266.467-.695.36.015.023-1.103-.275-1.103-.275l-.752 1.734 1.974.492c.367.092.727.188 1.082.278l-.625 2.51 1.516.378.622-2.495c.414.113.816.219 1.207.32l-.619 2.483 1.517.378.625-2.508c2.587.49 4.532.292 5.35-2.048.66-1.884.024-2.972-1.34-3.682 1.0-.23 1.75-.884 1.952-2.235zm-3.502 4.882c-.47 1.884-3.64.866-4.67.61l.833-3.34c1.03.257 4.343.764 3.837 2.73zm.47-4.908c-.427 1.716-3.07.844-3.927.632l.755-3.03c.857.21 3.633.6 3.172 2.398z" fill="white"/>
      </svg>
    ),
    "ETH": (
      <svg className="w-12 h-12 drop-shadow-[0_0_15px_rgba(98,126,234,0.8)]" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="12" fill="#627EEA"/>
        <path d="M12 18.273l-4.5-2.659L12 22l4.5-6.386-4.5 2.659z" fill="#C0CBF6" fillOpacity=".6"/>
        <path d="M12 2l-4.5 7.455L12 11.636l4.5-2.181L12 2z" fill="white"/>
        <path d="M12 11.636l-4.5-2.181L12 16l4.5-6.545-4.5 2.181z" fill="white" fillOpacity=".6"/>
      </svg>
    ),
    "MON": (
      <svg className="w-12 h-12 drop-shadow-[0_0_20px_rgba(168,85,247,1)]" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="12" fill="#A855F7"/>
        <path d="M12 6l5 10H7l5-10z" fill="white" />
      </svg>
    )
  };
  return icons[name] || <div className="text-white">{name}</div>;
};

function App() {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      try {
        const provider = getProvider();
        if (provider) {
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) setAccount(accounts[0].address);
        }
      } catch (e) {}
      setLoading(false);
    };
    check();
  }, []);

  const connectWallet = async () => {
    const provider = getProvider();
    if (!provider) {
        window.location.href = "https://metamask.app.link/dapp/" + window.location.href.replace(/^https?:\/\//, '');
        return;
    }
    const signer = await provider.getSigner();
    setAccount(await signer.getAddress());
  };

  if (loading) return <div className="min-h-screen bg-[#020205] flex items-center justify-center font-['Orbitron'] text-cyan-400">SYNCING_CORE...</div>;

  return (
    <div className="min-h-screen bg-black text-white font-['Orbitron'] relative">
      
      {/* THE CLOUDS LAYER - Fixed to the background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[100%] h-[100%] bg-cyan-600/20 blur-[140px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[100%] h-[100%] bg-purple-700/20 blur-[140px] rounded-full animate-pulse"></div>
        <div className="absolute inset-0 opacity-[0.05]" style={{backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
      </div>

      <nav className="relative z-10 p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Zap className="text-cyan-400" size={24} fill="currentColor" />
          <span className="text-2xl font-black italic tracking-tighter uppercase">PREDIQ</span>
        </div>
        <button onClick={connectWallet} className="border-2 border-cyan-500/50 px-6 py-2 bg-cyan-500/10 backdrop-blur-md font-bold text-[10px] tracking-widest uppercase">
            {account ? account.substring(0, 8) + "..." : "CONNECT_WALLET"}
        </button>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black mb-2 tracking-tighter uppercase italic">PREDICT <span className="text-cyan-400">MONAD</span></h1>
          <p className="text-[10px] tracking-[0.6em] text-slate-400 font-bold uppercase">Decentralized Prediction Terminal</p>
        </div>

        {/* ASSET GRID - Restored to 3-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(ASSET_MAP).map(([id, asset]) => (
            <div key={id} className="relative bg-white/[0.05] border border-white/10 p-10 backdrop-blur-xl flex flex-col items-center hover:border-cyan-500/50 transition-all">
              <div className="mb-10">
                <CryptoIcon name={asset.name} />
              </div>
              <h3 className="text-3xl font-black mb-1 italic">{asset.name}</h3>
              <p className="text-[10px] text-slate-500 tracking-widest uppercase mb-10">Real-time Oracle Feed</p>
              <button className="w-full py-4 bg-white/5 border border-white/20 hover:bg-cyan-500 hover:text-black transition-all font-black text-[10px] tracking-[0.4em] uppercase">
                OPEN_TERMINAL
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
