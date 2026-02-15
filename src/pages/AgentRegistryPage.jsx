import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import AgentCard from '../components/AgentCard';
import CreateAgentModal from '../components/CreateAgentModal';
import { useAgents } from '../hooks/useAgents';
import { useWallet } from '../context/WalletContext';

const AgentRegistryPage = () => {
  const [showModal, setShowModal] = useState(false);
  
  // LIVE DATA & WALLET CONTEXT
  const { agents, loading, refresh } = useAgents();
  const { address, balance, isConnected, connect } = useWallet();

  const walletInfo = { 
    address: address || "NOT_CONNECTED", 
    balance: parseFloat(balance).toFixed(4) 
  };

  return (
    <div className="min-h-screen bg-[#050505] font-mono text-white relative">
      {/* Global Terminal FX */}
      <div className="scanline" />
      
      <Navbar 
        activeTab="Registry" 
        onTabChange={() => {}} // Navigation handled by App.jsx
        walletInfo={walletInfo}
        onConnect={connect}
        isConnected={isConnected}
      />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="border-l-4 border-cyan-500 pl-6">
            <h1 className="text-4xl font-black uppercase italic tracking-tighter">Node_Registry</h1>
            <p className="text-xs text-cyan-500/60 font-bold uppercase tracking-widest mt-1">
              {loading ? "Syncing_With_Monad_Mainnet..." : `Active_Nodes_Detected: ${agents.length}`}
            </p>
          </div>
          
          <button 
            onClick={() => setShowModal(true)}
            className="bg-white text-black font-black px-8 py-3 uppercase hover:bg-cyan-400 transition-all flex items-center gap-2 group skew-x-[-12deg]"
          >
            <span className="inline-block skew-x-[12deg]">+ Deploy_New_Agent</span>
          </button>
        </div>

        {/* Agent Asset Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Loading Skeletons
            [1, 2, 3].map((i) => (
              <div key={i} className="border border-gray-900 bg-black/40 h-64 animate-pulse" />
            ))
          ) : (
            <>
              {agents.map((agent) => (
                <AgentCard 
                  key={agent.id}
                  agentName={agent.agentName}
                  strategyType={agent.strategy || "NEURAL_V1"}
                  accuracy={agent.performance}
                  monadEarned={agent.stake}
                  status="Active"
                  onViewActivity={() => console.log(`Viewing logs for ${agent.id}`)}
                />
              ))}

              {/* Empty Slot / CTA */}
              <div 
                onClick={() => setShowModal(true)}
                className="border border-dashed border-gray-800 flex flex-col items-center justify-center p-12 text-gray-700 hover:border-cyan-500/50 hover:text-cyan-500 cursor-pointer transition-all group"
              >
                 <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">+</div>
                 <div className="text-[10px] font-bold uppercase tracking-widest">Initialize_Available_Slot</div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Deployment Modal */}
      <CreateAgentModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onRefresh={refresh} 
      />
    </div>
  );
};

export default AgentRegistryPage;
