import React from 'react';

const AgentRegistryPage = () => {
  return (
    <div className="min-h-screen bg-black pt-32 px-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-black tracking-tighter uppercase mb-2">Registry</h1>
        <p className="text-cyan-500 font-mono text-xs tracking-widest uppercase mb-12">// Active Prediction Agents</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {[1, 2, 3].map((id) => (
            <div key={id} className="group border border-white/5 p-10 hover:bg-white hover:text-black transition-all cursor-crosshair">
              <div className="text-[10px] font-bold mb-10 opacity-50">AGENT_00{id}</div>
              <h2 className="text-2xl font-bold uppercase tracking-tighter mb-4">Market Maker {id}</h2>
              <p className="text-xs uppercase tracking-widest leading-loose opacity-60">
                Executing automated Monad-native stakes based on real-time BTC volatility.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentRegistryPage;
