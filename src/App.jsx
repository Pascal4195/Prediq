import React, { useState, useEffect } from 'react';
import { getProvider, ASSET_MAP } from './utils/eth';
import { Wallet, Zap, Globe, Cpu, TrendingUp } from 'lucide-react';

const CryptoIcon = ({ name }) => {
  const icons = {
    "BTC": (
      <svg className="w-14 h-14 drop-shadow-[0_0_15px_rgba(247,147,26,0.9)]" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="12" fill="#F7931A"/>
        <path d="M16.64 12.883c.27-1.805-.11-2.775-3.04-3.418l.621-2.493-1.517-.378-.605 2.427c-.398-.1-.808-.195-1.21-.29l.61-2.443-1.517-.378-.621 2.492c-.33-.075-.653-.15-.966-.23l.001-.005-2.092-.522-.403 1.62s1.126.258 1.102.274c.615.154.726.56.708.882l-.71 2.844c.042.011.098.025.158.04l-.16-.04-.995 3.99c-.075.187-.266.467-.695.36.015.023-1.103-.275-1.103-.275l-.752 1.734 1.974.492c.367.092.727.188 1.082.278l-.625 2.51 1.516.378.622-2.495c.414.113.816.219 1.207.32l-.619 2.483 1.517.378.625-2.508c2.587.49 4.532.292 5.35-2.048.66-1.884.024-2.972-1.34-3.682 1.0-.23 1.75-.884 1.952-2.235zm-3.502 4.882c-.47 1.884-3.64.866-4.67.61l.833-3.34c1.03.257 4.343.764 3.837 2.73zm.47-4.908c-.427 1.716-3.07.844-3.927.632l.755-3.03c.857.21 3.633.6 3.172 2.398z" fill="white"/>
      </svg>
    ),
    "ETH": (
      <svg className="w-14 h-14 drop-shadow-[0_0_15px_rgba(98,126,234,0.9)]" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="12" fill="#627EEA"/>
        <path d="M12 18.273l-4.5-2.659L12 22l4.5-6.386-4.5 2.659z" fill="#C0CBF6" fillOpacity=".6"/>
        <path d="M12 2l-4.5 7.455L12 11.636l4.5-2.181L12 2z" fill="white"/>
        <path d="M12 11.636l-4.5-2.181L12 16l4.5-6.545-4.5 2.181z" fill="white" fillOpacity=".6"/>
      </svg>
    ),
    "MON": (
      <svg className="w-14 h-14 drop-shadow-[0_0_20px_rgba(168,85,247,1)]" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="12" fill="#A855F7"/>
        <path d="M12 5l6 11H6l6-11z" fill="white" />
      </svg>
    )
  };
  return icons[name] || <div className="text-white font-bold">{name}</div>;
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
      } catch (e) { console.error(e); }
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
    try {
        const signer = await provider.getSigner();
        setAccount(await signer.getAddress());
    } catch (err) { alert("Connect failed!"); }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#020205] flex items-center justify-center text-cyan-400 font-['Orbitron'] animate-pulse tracking-[0.8em]">
      SYS_BOOT...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020205] text-white font-['Orbitron'] relative overflow-hidden">
      
      {/* --- THE CLOUDS & GRID LAYER --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Glowing Cyan Cloud */}
        <div className="absolute top-[-15%] left-[-10%] w-[80%] h-[70%] bg-cyan-500/30 blur-[120px] rounded-full animate-pulse"></div>
        
        {/* Glowing Purple Cloud */}
        <div className="absolute bottom-[-15%] right-[-10%] w-[80%] h-[70%] bg-purple-600/30 blur-[120px] rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Moving Cyber Grid */}
        <div className="absolute inset-0 opacity-[0.1]" 
             style={{
               backgroundImage: 'linear-gradient(#0ff 1px, transparent 1px), linear-gradient(90deg, #0ff 1px, transparent 1px)', 
               backgroundSize: '80px 80px',
               transform: 'perspective(500px) rotateX(60deg) translateY(0%)',
               animation: 'gridMove 20s linear infinite'
             }}>
        </div>
      </div>

      <nav className="relative z-10 p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Zap className="text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,1)]" size={24} fill="currentColor" />
          <span className="text-2xl font-black italic bg-gradient-to-r from-white via-cyan-300 to-cyan-600 bg-clip-text text-transparent uppercase tracking-tighter">PREDIQ</span>
        </div>
        
        <button onClick={connectWallet} className="border-2 border-cyan-500/50 px-6 py-2 bg-black/50 backdrop-blur-md hover:bg-cyan-500 hover:text-black transition-all font-bold text-[10px] tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            {account ? account.substring(0, 12).toUpperCase() : "SYNC_TERMINAL"}
        </button>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-24">
          <h1 className="text-6xl md:text-9xl font-black mb-4 tracking-tighter uppercase leading-[0.8] drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            PURE <br/> <span className="text-cyan-400">SPEED</span>
          </h1>
          <p className="text-[12px] tracking-[1em] text-cyan-500/60 font-bold uppercase mt-4">Automated Monad Prediction Markets</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(ASSET_MAP).map(([id, asset]) => (
            <div key={id} className="group relative bg-black/60 border border-white/10 p-12 backdrop-blur-xl transition-all hover:border-cyan-400 shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500"></div>
              
              <div className="flex justify-between items-start mb-12">
                <CryptoIcon name={asset.name} />
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">MARKET_REF</span>
                  <span className="text-xs text-cyan-400 font-bold tracking-widest">{id}00X</span>
                </div>
              </div>
              
              <h3 className="text-3xl font-black mb-2 tracking-tighter">{asset.name}</h3>
              <p className="text-[10px] text-slate-400 tracking-[0.3em] uppercase mb-12">Oracle Status: Active</p>
              
              <button className="w-full py-4 bg-transparent border-2 border-white/20 hover:border-cyan-400 hover:bg-cyan-400 hover:text-black transition-all font-black text-[10px] tracking-[0.5em] uppercase">
                Predict_Now
              </button>
            </div>
          ))}
        </div>
      </main>

      <style>{`
        @keyframes gridMove {
          0% { transform: perspective(500px) rotateX(60deg) translateY(0%); }
          100% { transform: perspective(500px) rotateX(60deg) translateY(80px); }
        }
      `}</style>
    </div>
  );
}

export default App;
