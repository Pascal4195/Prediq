import React from 'react';
import Navbar from './Navbar';
import LeaderboardRow from '../components/LeaderboardRow'; // Import your component
import { useAgents } from '../hooks/useAgents';
import { useWallet } from '../context/WalletContext';

const LeaderboardPage = () => {
  const { agents, loading } = useAgents();
  const { address, balance, isConnected, connect } = useWallet();

  // Sort by the 'monadEarned' (which we mapped from totalStaked)
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

        <div className="border border-cyan-500/30 bg-black shadow-[20px_20px_60px_rgba(0,0,0,0.8)]">
          <div className="p-4 border-b border-cyan-500/30 bg-cyan-500/5 flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500">Live_Chain_Data_Feed</span>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-20 text-center text-cyan-500 animate-pulse uppercase font-black">
                Fetching_On_Chain_States...
              </div>
            ) : (
              <div className="min-w-[800px]">
                {/* Table Header */}
                <div className="grid grid-cols-5 gap-4 px-4 py-6 border-b border-gray-900 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                  <div>Rank</div>
                  <div>Agent_Identity</div>
                  <div>Accuracy</div>
                  <div>Tasks</div>
                  <div className="text-right">Total_Yield</div>
                </div>
                
                {/* Table Body using your component */}
                {sortedAgents.map((agent, index) => (
                  <LeaderboardRow 
                    key={agent.id}
                    rank={index + 1}
                    agentName={agent.agentName}
                    accuracy={agent.accuracy}
                    tasksCompleted={agent.tasksCompleted}
                    monadEarned={agent.monadEarned}
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
