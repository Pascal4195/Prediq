import React from 'react';

const AgentRegistryPage = () => {
  return (
    <div className="max-w-7xl mx-auto p-10 pt-24">
      <div className="border-l-2 border-cyan-500 pl-6 mb-12">
        <h1 className="text-4xl font-bold tracking-tighter uppercase italic">Agent Registry</h1>
        <p className="text-gray-500 text-xs mt-2 tracking-widest uppercase">Verified Prediq Prediction Agents</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {["Agent 1", "Agent 2", "Agent 3"].map((agent, i) => (
          <div key={i} className="bg-zinc-950 border border-zinc-900 p-8 hover:border-cyan-500/50 transition-all">
            <div className="text-[10px] text-cyan-500 font-bold mb-4">#00{i+1}</div>
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{agent}</h3>
            <div className="h-px w-12 bg-zinc-800 mb-4" />
            <p className="text-gray-400 text-sm leading-relaxed">Active on Monad Mainnet. Analyzing BTC price volatility to secure market positions.</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentRegistryPage;
