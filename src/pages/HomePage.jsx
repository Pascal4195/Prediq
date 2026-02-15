import React from 'react';
import Navbar from './Navbar';
import TaskCard from './TaskCard';
import { useTaskManager } from '../hooks/useTaskManager';
import { useWallet } from '../context/WalletContext';

const HomePage = () => {
  const { tasks, loading } = useTaskManager();
  const { address, balance, isConnected, connect } = useWallet();

  return (
    <div className="min-h-screen bg-[#050505] font-mono text-white relative overflow-x-hidden">
      {/* 1. The Animation Layer */}
      <div className="scanline" />
      
      {/* 2. Navigation */}
      <Navbar 
        walletInfo={{ address, balance: parseFloat(balance || 0).toFixed(4) }} 
        onConnect={connect}
        isConnected={isConnected}
      />

      {/* 3. Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        
        {/* Header Section */}
        <header className="mb-12 border-l-4 border-cyan-500 pl-6">
          <h1 className="text-6xl font-black italic uppercase tracking-tighter glitch-text">
            Market_Arena
          </h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="bg-cyan-500 text-black text-[10px] font-bold px-2 py-0.5">LIVE</span>
            <p className="text-cyan-500/60 text-xs font-bold tracking-[0.3em] uppercase">
              Oracle_Feeds // Monad_Testnet_Alpha
            </p>
          </div>
        </header>

        {/* 4. Task Grid Logic */}
        {loading ? (
          /* Loading State */
          <div className="flex flex-col items-center justify-center h-64 border border-cyan-500/10 bg-cyan-500/5 rounded-lg">
            <div className="w-12 h-12 border-2 border-cyan-500 border-t-transparent animate-spin mb-4" />
            <span className="text-xs font-black tracking-widest text-cyan-500 animate-pulse uppercase">
              Syncing_With_Monad_Blockchain...
            </span>
          </div>
        ) : tasks.length === 0 ? (
          /* Empty State - If no tasks are returned from the contract */
          <div className="text-center p-20 border border-dashed border-white/10 bg-white/5 rounded-xl">
            <div className="text-4xl mb-4">📡</div>
            <h3 className="text-xl font-bold uppercase mb-2">No Active Tasks</h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              The Prediction Market is currently waiting for new Oracle data. Check back shortly or connect your wallet to refresh.
            </p>
          </div>
        ) : (
          /* Active Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tasks.map((task) => (
              <TaskCard 
                key={task.id}
                id={task.id}
                taskQuestion={task.question}
                yesPercent={task.yesPercent}
                noPercent={task.noPercent}
                numAgents="12" // Placeholder or from task data
                totalMonads={task.totalStaked}
              />
            ))}
          </div>
        )}
      </main>

      {/* Background Decor */}
      <div className="fixed bottom-0 right-0 p-8 opacity-10 pointer-events-none">
        <pre className="text-[10px] text-cyan-500">
          {`// SYSTEM_READY
// LATENCY: 12ms
// AUTH_LEVEL: USER_MONAD`}
        </pre>
      </div>
    </div>
  );
};

export default HomePage;
