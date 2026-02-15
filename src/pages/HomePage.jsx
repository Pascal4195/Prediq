import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import CreateAgentModal from '../components/CreateAgentModal';
import { useTaskManager } from '../hooks/useTaskManager';
import { useWallet } from '../hooks/useWallet';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('Arena');
  const [showCreateAgentModal, setShowCreateAgentModal] = useState(false);
  
  // LIVE HOOKS
  const { tasks, loading } = useTaskManager();
  const { address, balance, isConnected, connect } = useWallet();

  const walletInfo = { 
    address: address || "NOT_CONNECTED", 
    balance: parseFloat(balance).toFixed(2) 
  };

  return (
    <div className="min-h-screen bg-[#050505] font-mono text-white">
      <Navbar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        walletInfo={walletInfo}
        onConnect={connect}
        isConnected={isConnected}
      />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            <div className="flex items-end justify-between mb-10 border-b border-gray-800 pb-4">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight">Active_Market_Feeds</h2>
                <span className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest">
                  {loading ? ">>> SYNCING_WITH_MONAD_NODE..." : ">>> SYSTEM_NOMINAL"}
                </span>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-50">
                {[1, 2, 3, 4].map(i => <div key={i} className="h-48 bg-gray-900 animate-pulse border border-gray-800" />)}
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
                    numAgents="--" // Update hook if contract tracks this
                    onViewTask={() => console.log("Navigate to task", task.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <CreateAgentModal isOpen={showCreateAgentModal} onClose={() => setShowCreateAgentModal(false)} />
    </div>
  );
};

export default HomePage;
