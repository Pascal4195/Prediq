import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // If using routing
import Navbar from '../components/Navbar';
import { useTaskManager } from '../hooks/useTaskManager';
import { useWallet } from '../hooks/useWallet';

const TaskViewPage = () => {
  const { tasks, placeBet, loading } = useTaskManager();
  const { address, balance, isConnected, connect } = useWallet();
  const [betAmount, setBetAmount] = useState("");
  const [isPending, setIsPending] = useState(false);

  // For this example, we'll grab the first task or find by ID
  const task = tasks[0] || { question: "Loading...", yesPercent: 50, noPercent: 50, totalStaked: "0" };

  const handleBet = async (prediction) => {
    if (!betAmount || parseFloat(betAmount) <= 0) return alert("Enter amount");
    
    setIsPending(true);
    const result = await placeBet(task.id, prediction, betAmount);
    
    if (result.success) {
      alert("PREDICTION_RECORDED_ON_CHAIN");
      setBetAmount("");
    } else {
      alert("TRANSACTION_FAILED");
    }
    setIsPending(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] font-mono text-white">
      <Navbar 
        activeTab="Arena" 
        walletInfo={{ address, balance: parseFloat(balance).toFixed(4) }} 
        onConnect={connect}
        isConnected={isConnected}
      />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left: Market Info */}
          <div className="lg:col-span-2">
            <div className="border-l-2 border-cyan-500 pl-6 mb-8">
              <span className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest">Active_Market // {task.id}</span>
              <h1 className="text-4xl font-black uppercase italic leading-tight">{task.question}</h1>
            </div>

            <div className="bg-cyan-500/5 border border-cyan-500/20 p-8 mb-8">
              <div className="flex justify-between mb-4 font-black italic">
                <span className="text-green-400">YES {task.yesPercent}%</span>
                <span className="text-red-500">NO {task.noPercent}%</span>
              </div>
              <div className="h-4 w-full bg-gray-900 flex overflow-hidden border border-gray-800">
                <div className="h-full bg-green-500 transition-all duration-1000" style={{ width: `${task.yesPercent}%` }} />
                <div className="h-full bg-red-600 transition-all duration-1000" style={{ width: `${task.noPercent}%` }} />
              </div>
            </div>
          </div>

          {/* Right: Betting Terminal */}
          <aside>
            <div className="border border-cyan-500/30 p-6 bg-black sticky top-24">
              <h3 className="text-sm font-black uppercase mb-6 tracking-widest border-b border-cyan-500/30 pb-2">Execution_Terminal</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] text-gray-500 uppercase font-bold">Stake_Amount (MON)</label>
                  <input 
                    type="number" 
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-gray-900 border border-gray-800 p-3 text-cyan-400 focus:border-cyan-500 outline-none mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    disabled={isPending || !isConnected}
                    onClick={() => handleBet('YES')}
                    className="bg-green-600/20 border border-green-500 text-green-500 font-black py-4 uppercase hover:bg-green-500 hover:text-black transition-all disabled:opacity-50"
                  >
                    {isPending ? "..." : "Vote_Yes"}
                  </button>
                  <button 
                    disabled={isPending || !isConnected}
                    onClick={() => handleBet('NO')}
                    className="bg-red-600/20 border border-red-500 text-red-500 font-black py-4 uppercase hover:bg-red-500 hover:text-black transition-all disabled:opacity-50"
                  >
                    {isPending ? "..." : "Vote_No"}
                  </button>
                </div>
                
                {!isConnected && (
                  <p className="text-[9px] text-amber-500 text-center uppercase font-bold animate-pulse">
                    ! Wallet_Not_Initialized
                  </p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default TaskViewPage;
