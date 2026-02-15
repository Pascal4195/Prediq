import React from 'react';
import { Zap } from 'lucide-react';

function App() {
  const assets = [
    { id: 1, name: 'BTC', symbol: 'B' },
    { id: 2, name: 'ETH', symbol: 'Ξ' },
    { id: 3, name: 'MON', symbol: 'M' }
  ];

  return (
    <div className="min-h-screen bg-[#020205] text-white font-['Orbitron'] p-6">
      {/* Top Navigation */}
      <nav className="max-w-7xl mx-auto flex justify-between items-center mb-24">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 border border-cyan-400 flex items-center justify-center rotate-45">
            <Zap size={14} className="-rotate-45 text-cyan-400" fill="currentColor" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-cyan-400">PREDIQ</span>
        </div>
        <button className="border border-white/20 px-4 py-1 text-[10px] uppercase tracking-widest bg-black">
          INITIALIZE_WALLET
        </button>
      </nav>

      {/* Hero Header */}
      <header className="text-center mb-24">
        <h1 className="text-6xl font-black tracking-tighter mb-4 uppercase">
          ELITE <span className="text-cyan-400">FORECASTING</span>
        </h1>
        <p className="text-[10px] tracking-[0.8em] text-slate-500 uppercase font-bold">
          MONAD HIGH-SPEED NETWORK
        </p>
      </header>

      {/* Card Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {assets.map((asset) => (
          <div key={asset.id} className="bg-[#08080c] border-l-2 border-cyan-500 p-10 flex flex-col justify-between h-52">
            <div className="flex justify-between items-start">
              <span className="text-3xl font-bold">{asset.symbol}</span>
              <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">MKT_{asset.id}</span>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 italic">{asset.name}</h3>
              <button className="w-full py-2 bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-[0.3em] hover:bg-cyan-500 hover:text-black transition-all">
                OPEN TERMINAL
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Status Indicators */}
      <footer className="max-w-6xl mx-auto flex gap-12 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
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
