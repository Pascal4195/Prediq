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
    if (!provider) return alert("Please use a Web3 browser like MetaMask!");
    const signer = await provider.getSigner();
    setAccount(await signer.getAddress());
  };

  if (loading) {
    return (
      <div style={{backgroundColor: '#020205', color: '#06b6d4'}} className="min-h-screen flex items-center justify-center font-['Orbitron']">
        INITIALIZING_SYSTEM...
      </div>
    );
  }

  return (
    <div style={{backgroundColor: '#020205'}} className="min-h-screen text-white font-['Orbitron'] overflow-x-hidden">
      
      {/* 1. TOP NAV: Forced Cyan Logo and Border */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div style={{borderColor: '#06b6d4', boxShadow: '0 0 10px rgba(6,182,212,0.2)'}} className="w-8 h-8 border flex items-center justify-center rotate-45">
            <Zap style={{color: '#06b6d4'}} className="-rotate-45" size={16} fill="currentColor" />
          </div>
          <span style={{color: '#06b6d4'}} className="text-xl font-black italic tracking-tighter">PREDIQ</span>
        </div>
        
        <button 
          onClick={connectWallet} 
          style={{backgroundColor: 'rgba(0,0,0,0.5)', borderColor: 'rgba(255,255,255,0.2)'}}
          className="border px-4 py-1.5 text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all"
        >
          <div className="flex items-center gap-2">
            <Wallet size={12} />
            {account ? account.substring(0, 8).toUpperCase() : "INITIALIZE_WALLET"}
          </div>
        </button>
      </nav>

      {/* 2. HERO HEADER: Bold Italic Style */}
      <header className="text-center mt-12 mb-20 px-4">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 uppercase italic">
          ELITE <span style={{color: '#06b6d4'}}>FORECASTING</span>
        </h1>
        <p className="text-[10px] tracking-[0.8em] text-slate-500 uppercase font-bold opacity-80">
          MONAD HIGH-SPEED NETWORK
        </p>
      </header>

      {/* 3. THE HORIZONTAL GRID: Forced Solid Colors & Box Shapes */}
      <div className="w-full overflow-x-auto pb-12 px-6 scrollbar-hide">
        <div className="flex flex-row gap-8 min-w-max mx-auto justify-start md:justify-center">
          {Object.entries(ASSET_MAP).map(([id, asset]) => (
            <div 
              key={id} 
              style={{
                backgroundColor: '#0a0a0f', 
                borderLeft: '4px solid #06b6d4',
                boxShadow: '20px 20px 60px rgba(0,0,0,0.5)'
              }} 
              className="flex-shrink-0 w-[320px] h-[240px] p-8 flex flex-col justify-between transition-transform hover:scale-[1.02]"
            >
              <div className="flex justify-between items-start">
                <span className="text-4xl font-bold text-white/90">{asset.symbol}</span>
                <span className="text-[10px] text-slate-700 font-bold uppercase tracking-widest">MKT_{id}</span>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-4 italic tracking-tight uppercase">{asset.name}</h3>
                {/* THE ACCENT BAR: This was missing color in your screenshot */}
                <div style={{backgroundColor: '#06b6d4'}} className="w-14 h-[3px] mb-6"></div>
                <button 
                  style={{backgroundColor: '#121218', borderColor: 'rgba(255,255,255,0.05)'}}
                  className="w-full py-3 border text-[10px] font-black uppercase tracking-[0.3em] hover:text-cyan-400 transition-all"
                >
                  OPEN TERMINAL
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. FOOTER: Status Indicators with Glow */}
      <footer className="max-w-7xl mx-auto mt-12 flex gap-10 px-8 text-[10px] font-black uppercase tracking-widest text-slate-600">
        <div className="flex items-center gap-2">
          <div style={{backgroundColor: '#06b6d4', boxShadow: '0 0 10px #06b6d4'}} className="w-2 h-2 rounded-full animate-pulse"></div>
          <Globe size={12}/> #MONAD_TEST
        </div>
        <div className="flex items-center gap-2">
          <div style={{backgroundColor: '#22c55e', boxShadow: '0 0 10px #22c55e'}} className="w-2 h-2 rounded-full"></div>
          <Cpu size={12}/> SYSTEM_NOMINAL
        </div>
      </footer>
    </div>
  );
}

export default App;
