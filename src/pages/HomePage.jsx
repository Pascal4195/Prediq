import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import CreateAgentModal from '../components/CreateAgentModal';
import { useTaskManager } from '../hooks/useTaskManager';
import { useWallet } from '../context/WalletContext';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('Arena');
  const [showCreateAgentModal, setShowCreateAgentModal] = useState(false);
  
  const { tasks, loading } = useTaskManager();
  const { address, balance, isConnected, connect } = useWallet();

  const walletInfo = { 
    address: address || "NOT_CONNECTED", 
    balance: parseFloat(balance).toFixed(4) 
  };

  return (
    <div className="min-h-screen bg-[#050505] font-mono text-white relative">
      <div className="scanline" />
      
      <Navbar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        walletInfo={walletInfo}
        onConnect={connect}
        isConnected={isConnected}
      />

      {/* Hero Section */}
      <section className="border-b border-cyan-500/20 py-16 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="border border-cyan-500/30 px-3 py-1 mb-6 inline-flex items-center gap-2 bg-cyan-500/5">
            <span className="w-2 h-2 bg-cyan-500 animate-ping" />
            <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase italic">Node_Status: Online</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter uppercase italic">
            Predict<span className="text-cyan-500 text-outline">.Earn</span>
          </h1>

          <button 
            onClick={() => setShowCreateAgentModal(true)}
            className="bg-cyan-500 text-black font-black px-10 py-4 uppercase hover:bg-white transition-all skew-x-[-12deg] shadow-[4px_4px_0px_#008b8b]"
          >
            <span className="inline-block skew-x-[12deg]">Initialize Agent</span>
          </button>
        </div>
      </section>

      {/* Market Feed */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-end justify-between mb-10 border-b border-gray-800 pb-4">
          <h2 className="text-2xl font-black uppercase tracking-tight">Active_Market_Feeds</h2>
          <span className="text-[10px] text-cyan-500 font-bold mb-1 uppercase tracking-widest animate-pulse">
            {loading ? "Streaming_Data..." : "Live_Sync_Complete"}
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 4].map(i => <div key={i} className="h-48 bg-gray-900/50 border border-gray-800 animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tasks.map((task) => (
              <TaskCard 
                key={task.id} 
                taskQuestion={task.question}
                yesPercent={task.yesPercent}
                noPercent={task.noPercent}
                totalMonads={task.totalStaked}
                numAgents={task.agentCount || "0"}
                onViewTask={() => console.log("Task View:", task.id)}
              />
            ))}
          </div>
        )}
      </main>

      <CreateAgentModal isOpen={showCreateAgentModal} onClose={() => setShowCreateAgentModal(false)} />
    </div>
  );
};

export default HomePage;
