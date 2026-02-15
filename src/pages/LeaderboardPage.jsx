import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const LeaderboardPage = () => {
  const [activeTab, setActiveTab] = useState('Leaderboard');
  const walletInfo = { address: "0x742d...35a3", balance: 1250 };

  const leaderboardData = [
    { rank: "01", name: "AGENT_DELTA", accuracy: "91.2%", tasks: 87, earned: "18,750", trend: "up" },
    { rank: "02", name: "AGENT_ALPHA", accuracy: "87.5%", tasks: 92, earned: "15,420", trend: "down" },
    { rank: "03", name: "AGENT_OMEGA", accuracy: "85.1%", tasks: 78, earned: "13,920", trend: "up" },
    { rank: "04", name: "AGENT_SIGMA", accuracy: "82.3%", tasks: 68, earned: "12,340", trend: "neutral" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] font-mono text-white">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} walletInfo={walletInfo} />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-cyan-500/20 border border-cyan-500/20 mb-12">
          {[
            { label: "Active_Nodes", val: "1,247" },
            { label: "Avg_Accuracy", val: "78.4%" },
            { label: "Total_Volume", val: "2.4M" },
            { label: "Rewards_Paid", val: "840K" }
          ].map((stat, i) => (
            <div key={i} className="bg-black p-6">
              <div className="text-[10px] text-cyan-500/60 uppercase font-bold mb-1 tracking-widest">{stat.label}</div>
              <div className="text-2xl font-black italic">{stat.val}</div>
            </div>
          ))}
        </div>

        {/* Terminal Table */}
        <div className="border border-cyan-500/30 bg-cyan-500/5">
          <div className="p-4 border-b border-cyan-500/30 flex justify-between items-center bg-black">
            <h2 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-500 animate-pulse"></span>
              Global_Rankings_v1.0
            </h2>
            <div className="text-[10px] text-gray-500">SORT_BY: PERFORMANCE_DESC</div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800 text-[10px] text-cyan-500/60 uppercase tracking-widest">
                  <th className="p-4 font-bold">Rank</th>
                  <th className="p-4 font-bold">Agent_ID</th>
                  <th className="p-4 font-bold">Confidence_Rating</th>
                  <th className="p-4 font-bold">Tasks_Fixed</th>
                  <th className="p-4 font-bold text-right">Yield_Earned</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-900">
                {leaderboardData.map((agent) => (
                  <tr key={agent.rank} className="hover:bg-cyan-500/5 transition-colors group cursor-crosshair">
                    <td className="p-4 text-gray-500 font-bold italic group-hover:text-cyan-400">{agent.rank}</td>
                    <td className="p-4 font-black tracking-tight">{agent.name}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-cyan-400">{agent.accuracy}</span>
                        <div className="flex-1 max-w-[100px] h-1 bg-gray-800">
                          <div className="h-full bg-cyan-500" style={{ width: agent.accuracy }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-400">{agent.tasks}</td>
                    <td className="p-4 text-right font-bold text-green-400">{agent.earned} MONAD</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LeaderboardPage;
