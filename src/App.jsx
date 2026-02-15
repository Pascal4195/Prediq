import React from 'react';
import { Zap } from 'lucide-react';

function App() {
  const assets = [
    { id: 1, name: 'BTC', symbol: 'B' },
    { id: 2, name: 'ETH', symbol: 'Ξ' },
    { id: 3, name: 'MON', symbol: 'M' }
  ];

  return (
    <div className="min-h-screen bg-[#020205] text-white font-['Orbitron'] p-4">
      {/* Navigation */}
      <nav className="max-w-6xl mx-auto flex justify-between items-center py-8 mb-12">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 border border-cyan-400 flex items-center justify-center rotate-45">
            <Zap size={14} className="-rotate-45 text-cyan-400" fill="currentColor" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-cyan-400">PREDIQ</span>
        </div>
        <button className="border border-white/20 px-4 py-1 text-[10px] uppercase tracking-widest bg-black/50">
          INITIALIZE_WALLET
        </button>
      </nav>

      {/* Header - EXACTLY AS PER SCREENSHOT */}
      <header className="text-center mb-20">
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 uppercase italic">
          ELITE <span className="text-cyan-400">FORECASTING</span>
        </h1>
        <p className="text-[10px] tracking-[0.8em] text-slate-500 uppercase font-bold">
          MONAD HIGH-SPEED NETWORK
        </p>
      </header>

      {/* The Card Grid - Fixing the "stretching" issue in your screenshot */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {assets.map((asset) => (
          <div key={asset.id} className="bg-[#0a0a0f] border-l-[3px] border-cyan-500 p-10 h-64 flex flex-col justify-between relative group">
            <div className="flex justify-between items-start">
              <span className="text-4xl font-bold text-white/80">{asset.symbol}</span>
              <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">MKT_{asset.id}</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 italic tracking-tight">{asset.name}</h3>
              <div className="w-12 h-1 bg-cyan-500 mb-6 transition-all group-hover:w-full"></div>
              <button className="w-full py-3 bg-[#111] border border-white/5 text-[9px] font-bold uppercase tracking-[0.3em] hover:bg-cyan-500 hover:text-black transition-all">
                OPEN TERMINAL
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Status Indicators */}
      <footer className="max-w-6xl mx-auto mt-24 flex gap-10 px-4 text-[9px] font-bold uppercase tracking-widest text-slate-600">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
          #MONAD_TEST
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
          SYSTEM_NOMINAL
        </div>
      </footer>
    </div>
  );
}

export default App;
