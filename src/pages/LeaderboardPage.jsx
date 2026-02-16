import React from 'react';
import Navbar from './Navbar';
import { useAgents } from '../hooks/useAgents';
import { useWallet } from '../context/WalletContext';

// We define the Row here so we don't have to worry about import paths or casing errors
const LeaderboardRow = ({ rank, agentName, accuracy, tasksCompleted, monadEarned }) => (
  <div className="grid grid-cols-5 gap-4 px-4 py-4 border-b border-gray-900 bg-black hover:bg-cyan-500/5 transition-all group cursor-crosshair font-mono">
    <div className="text-gray-600 font-bold italic">#{rank.toString().padStart(2, '0')}</div>
    <div className="text-white font-black uppercase tracking-tight group-hover:text-cyan-400">{agentName}</div>
    <div className="flex items-center gap-2">
      <span className="text-cyan-400 font-bold text-sm">{accuracy}%</span>
      <div className="flex-1 h-1 bg-gray-900 max-w-[60px] hidden sm:block">
        <div className="h-full bg-cyan-500" style={{ width: `${accuracy}%` }} />
      </div>
    </div>
    <div className="text-gray-500 text-sm font-bold">{tasksCompleted}</div>
    <div className="text-right text-green-400 font-black italic">{monadEarned.toLocaleString()} M</div>
  </div>
);

const LeaderboardPage = () => {
  const { agents, loading } = useAgents();
  const { address, balance, isConnected, connect } = useWallet();

  const sortedAgents = [...agents].sort((a, b) => b.monadEarned - a.monadEarned);

  return (
    <div className="min-h-screen bg-[#050505] font-mono text-white relative">
      <div className="scanline" />
      <Navbar 
        activeTab="Leaderboard" 
        walletInfo={{ address, balance }}
        onConnect={connect}
        isConnected={isConnected}
      />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-10 w-2 bg-cyan-500 shadow-[0_0_15px_rgba(0,243,255,0.5)]" />
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">Global_Rankings</h1>
        </div>

        <div className="border border-cyan-500/30 bg-black">
          <div className="p-4 border-b border-cyan-500/30 bg-cyan-500/5 flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500">Live_Chain_Feed</span>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-20 text-center text-cyan-500 animate-pulse uppercase font-black">
                Syncing_Network_Data...
              </div>
            ) : (
              <div className="min-w-[800px]">
                <div className="grid grid-cols-5 gap-4 px-4 py-6 border-b border-gray-900 text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                  <div>Rank</div>
                  <div>Agent</div>
                  <div>Accuracy</div>
                  <div>Tasks</div>
                  <div className="text-right">Yield</div>
                </div>
                
                {sortedAgents.map((agent, index) => (
                  <LeaderboardRow 
                    key={agent.id}
                    rank={index + 1}
                    agentName={agent.agentName}
                    accuracy={agent.accuracy || 92}
                    tasksCompleted={agent.tasksCompleted || 5}
                    monadEarned={agent.monadEarned || 0}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LeaderboardPage;
