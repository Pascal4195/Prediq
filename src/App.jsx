import React, { useState, useEffect } from 'react';
import { getProvider, ASSET_MAP } from './utils/eth';
import { Zap } from 'lucide-react';

const CryptoIcon = ({ name }) => {
  const icons = {
    "BTC": (
      <svg className="w-10 h-10 drop-shadow-[0_0_15px_rgba(247,147,26,0.6)]" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="12" fill="#F7931A"/>
        <path d="M16.64 12.883c.27-1.805-.11-2.775-3.04-3.418l.621-2.493-1.517-.378-.605 2.427c-.398-.1-.808-.195-1.21-.29l.61-2.443-1.517-.378-.621 2.492c-.33-.075-.653-.15-.966-.23l.001-.005-2.092-.522-.403 1.62s1.126.258 1.102.274c.615.154.726.56.708.882l-.71 2.844c.042.011.098.025.158.04l-.16-.04-.995 3.99c-.075.187-.266.467-.695.36.015.023-1.103-.275-1.103-.275l-.752 1.734 1.974.492c.367.092.727.188 1.082.278l-.625 2.51 1.516.378.622-2.495c.414.113.816.219 1.207.32l-.619 2.483 1.517.378.625-2.508c2.587.49 4.532.292 5.35-2.048.66-1.884.024-2.972-1.34-3.682 1.0-.23 1.75-.884 1.952-2.235zm-3.502 4.882c-.47 1.884-3.64.866-4.67.61l.833-3.34c1.03.257 4.343.764 3.837 2.73zm.47-4.908c-.427 1.716-3.07.844-3.927.632l.755-3.03c.857.21 3.633.6 3.172 2.398z" fill="white"/>
      </svg>
    ),
    "ETH": (
      <svg className="w-10 h-10 drop-shadow-[0_0_15px_rgba(98,126,234,0.6)]" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="12" fill="#627EEA"/>
        <path d="M12 18.273l-4.5-2.659L12 22l4.5-6.386-4.5 2.659z" fill="#C0CBF6" fillOpacity=".6"/>
        <path d="M12 2l-4.5 7.455L12 11.636l4.5-2.181L12 2z" fill="white"/>
        <path d="M12 11.636l-4.5-2.181L12 16l4.5-6.545-4.5 2.181z" fill="white" fillOpacity=".6"/>
      </svg>
    ),
    "MON": (
      <svg className="w-10 h-10 drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]" viewBox="0 0 24 24" fill="none">
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
    if (!provider) return;
    const signer = await provider.getSigner();
    setAccount(await signer.getAddress());
  };

  if (loading) return <div className="min-h-screen bg-[#020205] flex items-center justify-center font-['Orbitron'] text-cyan-400">INITIALIZING_TERMINAL...</div>;

  return (
    <div className="min-h-screen bg-[#020205] text-white font-['Orbitron'] relative overflow-x-hidden">
      
      {/* 🌌 BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-5%] left-[-5%] w-[60%] h-[50%] bg-cyan-500/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[60%] h-[50%] bg-purple-600/10 blur-[100px] rounded-full"></div>
        <div className="absolute inset-0 opacity-[0.05]" 
             style={{
               backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
               backgroundSize: '40px 40px',
               transform: 'perspective(500px) rotateX(60deg) translateY(0%)',
               animation: 'gridMove 15s linear infinite'
             }}>
        </div>
      </div>

      {/* NAV */}
      <nav className="relative z-10 p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="p-1 border border-cyan-400">
            <Zap className="text-cyan-400" size={18} fill="currentColor" />
          </div>
          <span className="text-lg font-black tracking-tighter italic">PREDIQ</span>
        </div>
        <button onClick={connectWallet} className="border border-white/20 px-4 py-1 text-[9px] font-bold uppercase tracking-widest bg-black/40 hover:bg-cyan-500 hover:text-black transition-all">
          {account ? account.substring(0, 10).toUpperCase() : "INITIALIZE_WALLET"}
        </button>
      </nav>

      {/* HERO */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-black mb-2 tracking-tighter uppercase italic">
            ELITE <span className="text-cyan-400">FORECASTING</span>
          </h1>
          <p className="text-[9px] tracking-[0.8em] text-slate-500 font-bold uppercase">Monad High-Speed Network</p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(ASSET_MAP).map(([id, asset]) => (
            <div key={id} className="group relative bg-[#08080c]/90 border-l-2 border-cyan-500 p-10 transition-all hover:bg-[#0c0c14]">
              <div className="flex justify-between items-start mb-10">
                <CryptoIcon name={asset.name} />
                <span className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.2em]">MKT_{id}</span>
              </div>
              <h3 className="text-2xl font-black mb-1 italic uppercase">{asset.name}</h3>
              <p className="text-[9px] text-slate-500 mb-10 font-bold tracking-widest">STABLE_FEED</p>
              <button className="w-full py-3 bg-transparent border border-white/10 hover:border-cyan-400 hover:text-cyan-400 transition-all font-bold text-[10px] tracking-[0.3em] uppercase">
                OPEN TERMINAL
              </button>
            </div>
          ))}
        </div>
      </main>

      <style>{`
        @keyframes gridMove {
          0% { transform: perspective(500px) rotateX(60deg) translateY(0%); }
          100% { transform: perspective(500px) rotateX(60deg) translateY(40px); }
        }
      `}</style>
    </div>
  );
}

export default App;
