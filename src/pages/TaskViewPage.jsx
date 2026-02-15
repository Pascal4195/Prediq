import React, { useState } from 'react';
import Navbar from './Navbar';
import { useTaskManager } from '../hooks/useTaskManager';
import { useWallet } from '../context/WalletContext';

const TaskViewPage = () => {
  const { tasks, placeBet, loading } = useTaskManager();
  const { address, balance, isConnected, connect } = useWallet();
  const [betAmount, setBetAmount] = useState("");
  const [isPending, setIsPending] = useState(false);

  // For this view, we'll focus on the first task or find by a route ID
  const task = tasks[0] || { 
    id: "0", 
    question: "FETCHING_DATA...", 
    yesPercent: 50, 
    noPercent: 50, 
    totalStaked: "0",
    category: "SYNCING" 
  };

  const handleExecute = async (prediction) => {
    if (!isConnected) return connect();
    if (!betAmount || parseFloat(betAmount) <= 0) return alert("SPECIFY_STAKE_AMOUNT");

    setIsPending(true);
    const result = await placeBet(task.id, prediction, betAmount);
    
    if (result.success) {
      alert("ON_CHAIN_EXECUTION_COMPLETE");
      setBetAmount("");
    } else {
      alert("EXECUTION_FAILED_CHECK_LOGS");
    }
    setIsPending(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] font-mono text-white relative">
      <div className="scanline" />
      <Navbar 
        activeTab="Arena" 
        walletInfo={{ address, balance: parseFloat(balance).toFixed(4) }} 
        onConnect={connect}
        isConnected={isConnected}
      />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Display */}
          <div className="lg:col-span-2 space-y-8">
            <div className="border-l-4 border-cyan-500 pl-8 py-2">
              <div className="flex gap-4 mb-4">
                <span className="bg-cyan-500 text-black text-[10px] font-black px-2 py-0.5 uppercase tracking-tighter">
                  {task.category}
                </span>
                <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                  ID: {task.id}
                </span>
              </div>
              <h1 className="text-5xl font-black uppercase italic tracking-tighter leading-none">
                {task.question}
              </h1>
            </div>

            <div className="bg-black border border-gray-900 p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl italic group-hover:opacity-20 transition-opacity">
                ARENA_v1
              </div>
              
              <div className="flex justify-between mb-6 font-black italic uppercase tracking-widest">
                <span className="text-green-500 text-xl">Yield_Yes: {task.yesPercent}%</span>
                <span className="text-red-600 text-xl">Yield_No: {task.noPercent}%</span>
              </div>
              
              <div className="h-6 w-full bg-gray-900 flex border border-gray-800 p-1">
                <div className="h-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)] transition-all duration-1000" style={{ width: `${task.yesPercent}%` }} />
                <div className="h-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all duration-1000" style={{ width: `${task.noPercent}%` }} />
              </div>
            </div>
          </div>

          {/* Execution Sidebar */}
          <aside className="space-y-6">
            <div className="border border-cyan-500/40 bg-cyan-500/5 p-6 backdrop-blur-sm">
              <h3 className="text-xs font-black uppercase mb-8 tracking-[0.4em] text-cyan-500 text-center">
                Execution_Terminal
              </h3>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-bold uppercase">Input_Stake (MON)</label>
                  <input 
                    type="number" 
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-black border border-gray-800 p-4 text-cyan-400 focus:border-cyan-500 outline-none font-bold text-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    disabled={isPending}
                    onClick={() => handleExecute('YES')}
                    className="bg-green-600 text-black font-black py-4 uppercase italic hover:bg-green-400 transition-all disabled:opacity-20"
                  >
                    {isPending ? "..." : "Vote_Yes"}
                  </button>
                  <button 
                    disabled={isPending}
                    onClick={() => handleExecute('NO')}
                    className="bg-red-700 text-white font-black py-4 uppercase italic hover:bg-red-500 transition-all disabled:opacity-20"
                  >
                    {isPending ? "..." : "Vote_No"}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-black border border-gray-900 p-6">
              <div className="text-[10px] text-gray-600 font-bold uppercase mb-2">Total_Liquidity_Pool</div>
              <div className="text-2xl font-black italic">{parseFloat(task.totalStaked).toLocaleString()} MON</div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default TaskViewPage;
