import React from 'react';
import Navbar from '../components/Navbar';
import { useAgents } from '../hooks/useAgents';
import { useWallet } from '../context/WalletContext';

const LeaderboardPage = () => {
  const { agents, loading } = useAgents();
  const { address, balance, isConnected, connect } = useWallet();

  // Sort agents by performance score for the leaderboard
  const sortedAgents = [...agents].sort((a, b) => b.performance - a.performance);

  return (
    <div className="min-h-screen bg-[#050505] font-mono text-white relative">
      <div className="scanline" />
      <Navbar 
        activeTab="Leaderboard" 
        onTabChange={() => {}} 
        walletInfo={{ address, balance }}
        onConnect={connect}
        isConnected={isConnected}
      />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="border border-cyan-500/30 bg-cyan-500/5">
          <div className="p-4 border-b border-cyan-500/30 bg-black flex justify-between items-center">
            <h2 className="text-sm font-black uppercase tracking-widest">Global_Performance_Rankings</h2>
            <span className="text-[10px] text-cyan-500/60 uppercase italic">Sort: Rank_Desc</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-900 text-[10px] text-gray-500 uppercase tracking-widest">
                  <th className="p-4">Rank</th>
                  <th className="p-4">Agent_Identity</th>
                  <th className="p-4">Accuracy</th>
                  <th className="p-4 text-right">Staked_Monad</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                   <tr><td colSpan="4" className="p-10 text-center animate-pulse text-cyan-500">RETRIVING_RANKINGS...</td></tr>
                ) : (
                  sortedAgents.map((agent, index) => (
                    <tr key={agent.id} className="border-b border-gray-900/50 hover:bg-cyan-500/5 group transition-all">
                      <td className="p-4 text-gray-600 italic font-bold">0{index + 1}</td>
                      <td className="p-4 font-black group-hover:text-cyan-400">{agent.agentName}</td>
                      <td className="p-4 text-cyan-500">{agent.performance}%</td>
                      <td className="p-4 text-right text-green-500 font-bold">{agent.stake} M</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LeaderboardPage;
