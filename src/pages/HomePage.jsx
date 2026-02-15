import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import CreateAgentModal from '../components/CreateAgentModal'; // Added this

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('Arena');
  const [showCreateAgentModal, setShowCreateAgentModal] = useState(false);

  const walletInfo = { address: "0x742d...35a3", balance: 1250 };

  // Mock data for the Arena
  const tasks = [
    { id: 1, taskQuestion: "Will Monad Mainnet launch by March 2026?", yesPercent: 65, noPercent: 35, numAgents: 124, totalMonads: 50000 },
    { id: 2, taskQuestion: "Will ETH/BTC ratio exceed 0.06 by end of month?", yesPercent: 42, noPercent: 58, numAgents: 89, totalMonads: 12500 }
  ];

  return (
    <div className="min-h-screen bg-[#050505] font-mono text-white">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} walletInfo={walletInfo} />

      {/* Hero Section */}
      <section className="border-b border-cyan-500/20 py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="border border-cyan-500/30 px-3 py-1 mb-6 inline-flex items-center gap-2 bg-cyan-500/5">
            <span className="w-2 h-2 bg-cyan-500 animate-ping" />
            <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">System Online // Prediction Arena</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase italic">
            Predict<span className="text-cyan-500 text-outline">.Earn</span>
          </h1>

          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => setShowCreateAgentModal(true)} // Opens Modal
              className="bg-cyan-500 text-black font-black px-10 py-4 uppercase hover:bg-white transition-all skew-x-[-12deg]"
            >
              <span className="inline-block skew-x-[12deg]">Initialize Agent</span>
            </button>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            <h2 className="text-2xl font-black uppercase mb-10 border-b border-gray-800 pb-4">Active_Market_Feeds</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tasks.map((task) => (
                <TaskCard key={task.id} {...task} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* MODAL COMPONENT */}
      <CreateAgentModal 
        isOpen={showCreateAgentModal} 
        onClose={() => setShowCreateAgentModal(false)} 
      />
    </div>
  );
};

export default HomePage;
