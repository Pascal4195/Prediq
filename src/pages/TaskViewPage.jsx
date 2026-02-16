import React, { useState } from 'react';
import Navbar from './Navbar';
import { useAgents } from '../hooks/useAgents'; // Unified hook
import { useWallet } from '../context/WalletContext';
import { getContract } from '../utils/eth';
import { ethers } from 'ethers';

const TaskViewPage = () => {
  const { agents: tasks, loading } = useAgents();
  const { address, balance, isConnected, connect } = useWallet();
  const [betAmount, setBetAmount] = useState("0.01");
  const [isPending, setIsPending] = useState(false);

  // Get the latest task from the array (first element due to .reverse() in hook)
  const task = tasks[0] || { 
    id: "0", 
    agentName: "LOADING...", 
    monadEarned: 0,
    accuracy: 50
  };

  const handleExecute = async (prediction) => {
    if (!isConnected) return connect();
    try {
      setIsPending(true);
      const contract = await getContract();
      const val = ethers.parseEther(betAmount);
      
      // prediction === 'YES' maps to true
      const tx = await contract.predict(task.id, prediction === 'YES', { value: val });
      await tx.wait();
      alert("PREDICTION_COMMITTED");
    } catch (err) {
      console.error(err);
      alert("TX_FAILED");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] font-mono text-white relative">
      <Navbar 
        activeTab="Arena" 
        walletInfo={{ address, balance: parseFloat(balance || 0).toFixed(4) }} 
        onConnect={connect}
        isConnected={isConnected}
      />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="border-l-4 border-cyan-500 pl-8 py-2">
              <h1 className="text-5xl font-black uppercase italic tracking-tighter">
                {task.agentName}
              </h1>
              <p className="text-cyan-500 mt-2 text-xs font-bold">STATUS: ACTIVE_MARKET</p>
            </div>

            <div className="bg-black border border-gray-900 p-10">
              <div className="flex justify-between mb-6 font-black italic uppercase tracking-widest text-xl">
                <span className="text-green-500">Staked: {task.monadEarned} MON</span>
              </div>
              <div className="h-4 w-full bg-gray-900 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 shadow-[0_0_15px_cyan]" style={{ width: `${task.accuracy}%` }} />
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="border border-cyan-500/40 bg-cyan-500/5 p-6 backdrop-blur-sm">
              <h3 className="text-xs font-black uppercase mb-8 tracking-[0.4em] text-cyan-500 text-center">Execution_Terminal</h3>
              <input 
                type="number" 
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                className="w-full bg-black border border-gray-800 p-4 text-cyan-400 mb-4"
              />
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => handleExecute('YES')} className="bg-green-600 p-4 font-black">VOTE_YES</button>
                <button onClick={() => handleExecute('NO')} className="bg-red-700 p-4 font-black">VOTE_NO</button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default TaskViewPage;
