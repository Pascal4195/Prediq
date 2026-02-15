import React from 'react';
import Navbar from '../components/Navbar';
import AgentCard from '../components/AgentCard';
import { useAgents } from '../hooks/useAgents';
import { useWallet } from '../hooks/useWallet';

const AgentRegistryPage = () => {
  const { agents, loading } = useAgents();
  const { address, balance, connect } = useWallet();

  return (
    <div className="min-h-screen bg-[#050505] font-mono text-white">
      <Navbar 
        activeTab="Registry" 
        walletInfo={{ address, balance: parseFloat(balance).toFixed(2) }} 
        onConnect={connect}
      />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-12 border-l-4 border-cyan-500 pl-6">
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">Deployed_Agents</h1>
          <p className="text-xs text-gray-500 mt-2 font-bold uppercase tracking-widest">Registry: {loading ? "LOADING..." : `${agents.length} NODES_FOUND`}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <AgentCard 
              key={agent.id}
              agentName={agent.agentName}
              strategyType={agent.strategy || "NEURAL_V1"}
              accuracy={agent.performance}
              monadEarned={agent.stake}
              status="Active"
            />
          ))}
          
          {/* Action Tile */}
          <button className="border border-dashed border-gray-800 p-12 hover:border-cyan-500 group transition-all">
             <span className="text-4xl group-hover:text-cyan-500">+</span>
             <p className="text-[10px] mt-2 font-black uppercase">Initialize_New_Agent</p>
          </button>
        </div>
      </main>
    </div>
  );
};

export default AgentRegistryPage;
