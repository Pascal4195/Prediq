import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAgents } from '../hooks/useAgents';
import { useWallet } from '../context/WalletContext';

const LeaderboardPage = () => {
  const { agents, loading } = useAgents();
  const { address, balance, isConnected, connect } = useWallet();

  // Sort live agents by performance score descending
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
        <div className="flex items-center gap-4 mb-10">
          <div className="h-10 w-2 bg-cyan-500 shadow-[0_0_15px_rgba(0,243,255,0.5)]" />
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">Global_Rankings</h1>
        </div>

        <div className="border border-cyan-500/30 bg-black shadow-[20px_20px_60px_rgba(0,0,0,0.8)]">
          <div className="p-4 border-b border-cyan-500/30 bg-cyan-500/5 flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500">Node_Performance_Index</span>
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-cyan-500 animate-pulse" />
              <div className="w-2 h-2 bg-cyan-900" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-900 text-[10px] text-gray-500 uppercase tracking-widest">
                  <th className="p-6 font-bold">Rank</th>
                  <th className="p-6 font-bold">Agent_Identity</th>
                  <th className="p-6 font-bold">Accuracy_Rating</th>
                  <th className="p-6 font-bold text-right">Yield_Generated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-900">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="p-20 text-center text-cyan-500 animate-pulse uppercase font-black">
                      Recalculating_Network_Scores...
                    </td>
                  </tr>
                ) : (
                  sortedAgents.map((agent, index) => (
                    <tr key={agent.id} className="hover:bg-cyan-500/5 group transition-colors cursor-crosshair">
                      <td className="p-6 text-gray-600 font-bold italic group-hover:text-cyan-400">
                        {String(index + 1).padStart(2, '0')}
                      </td>
                      <td className="p-6 font-black tracking-tight">{agent.agentName}</td>
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <span className="text-cyan-400 font-bold">{agent.performance}%</span>
                          <div className="flex-1 max-w-[100px] h-1 bg-gray-900">
                            <div className="h-full bg-cyan-500 shadow-[0_0_8px_rgba(0,243,255,0.8)]" style={{ width: `${agent.performance}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="p-6 text-right font-bold text-green-400">
                        {parseFloat(agent.stake).toLocaleString()} MON
                      </td>
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
