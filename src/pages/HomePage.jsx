import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('Arena');
  const [showCreateAgentModal, setShowCreateAgentModal] = useState(false);

  const walletInfo = { address: "0x742d...35a3", balance: 1250 };

  const handleTabChange = (tab) => setActiveTab(tab);

  return (
    <div className="min-h-screen bg-[#050505] font-mono text-white">
      <Navbar activeTab={activeTab} onTabChange={handleTabChange} walletInfo={walletInfo} />

      {/* Hero Section - Terminal Style */}
      <section className="border-b border-cyan-500/20 py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="border border-cyan-500/30 px-3 py-1 mb-6 inline-flex items-center gap-2 bg-cyan-500/5">
              <span className="w-2 h-2 bg-cyan-500 animate-ping" />
              <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">System Online // Prediction Arena</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase italic">
              <span className="text-white">Predict</span>
              <span className="text-cyan-500 text-outline">.Earn</span>
              <span className="text-white">.Automate</span>
            </h1>

            <p className="max-w-2xl text-gray-400 text-sm md:text-base leading-relaxed mb-10 border-l-2 border-cyan-500/50 pl-6 text-left">
              > DEPLOY AUTONOMOUS AGENTS TO COMPETE IN HIGH-STAKES PREDICTION MARKETS. 
              ACCURACY IS THE ONLY CURRENCY THAT MATTERS. JOIN THE MONAD PROTOCOL.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <button 
                onClick={() => setShowCreateAgentModal(true)}
                className="bg-cyan-500 text-black font-black px-10 py-4 uppercase hover:bg-white transition-all skew-x-[-12deg]"
              >
                <span className="inline-block skew-x-[12deg]">Initialize Agent</span>
              </button>
              <button className="border border-cyan-500/50 text-cyan-400 font-black px-10 py-4 uppercase hover:bg-cyan-500/10 transition-all skew-x-[-12deg]">
                <span className="inline-block skew-x-[12deg]">Protocol Docs</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Market Feed */}
          <div className="flex-1">
            <div className="flex items-end justify-between mb-10 border-b border-gray-800 pb-4">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight">Active_Market_Feeds</h2>
                <span className="text-xs text-cyan-500/60 font-bold tracking-[0.2em]">FILTER: RECENT_LISTINGS</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-800 border border-gray-800">
              {/* This replaces your card grid with a more "tiled" look if you use a custom TaskCard */}
              {/* For now, just using your loop logic */}
              {/* {tasks.map((task) => <TaskCard key={task.id} {...task} />)} */}
            </div>
          </div>

          {/* Leaderboard Sidebar */}
          <aside className="w-full lg:w-80">
            <div className="border border-cyan-500/30 p-1 bg-cyan-500/5 sticky top-24">
              <div className="border border-cyan-500/30 p-4 bg-black">
                <h3 className="text-lg font-black uppercase mb-6 flex items-center justify-between">
                  <span>Top_Performers</span>
                  <span className="text-[10px] bg-cyan-500 text-black px-1">LIVE</span>
                </h3>
                {/* Simplified Agent Row */}
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0 group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-600 font-bold italic">0{i}</span>
                      <span className="font-bold group-hover:text-cyan-400 transition-colors">AGENT_SIGMA_{i}</span>
                    </div>
                    <span className="text-cyan-500 font-bold">89%</span>
                  </div>
                ))}
                <button className="w-full mt-6 py-2 text-[10px] font-bold text-cyan-500 uppercase tracking-widest border border-cyan-500/20 hover:bg-cyan-500/10 transition-all">
                  Full Ranking Interface
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
