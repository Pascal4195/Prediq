import React from 'react';
import Navbar from './Navbar'; // Changed from ../components/
import TaskCard from '..TaskCard';
// ... rest of imports

import { useTaskManager } from '../hooks/useTaskManager';
import { useWallet } from '../context/WalletContext';

const HomePage = () => {
  const { tasks, loading } = useTaskManager();
  const { address, balance, isConnected, connect } = useWallet();

  return (
    <div className="min-h-screen bg-[#050505] font-mono text-white relative">
      <div className="scanline" />
      
      <Navbar 
        walletInfo={{ address, balance: parseFloat(balance).toFixed(4) }} 
        onConnect={connect}
        isConnected={isConnected}
      />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-12 border-l-4 border-cyan-500 pl-6">
          <h1 className="text-6xl font-black italic uppercase tracking-tighter">
            Market_Arena
          </h1>
          <p className="text-cyan-500/60 text-sm font-bold tracking-[0.3em] uppercase mt-2">
            Live_Oracle_Feeds // Monad_Testnet_Alpha
          </p>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 border border-cyan-500/10 bg-cyan-500/5">
            <div className="w-12 h-12 border-2 border-cyan-500 border-t-transparent animate-spin mb-4" />
            <span className="text-xs font-black tracking-widest text-cyan-500 animate-pulse">
              SYNCING_WITH_BLOCKCHAIN...
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard 
                key={task.id}
                id={task.id}
                taskQuestion={task.question}
                yesPercent={task.yesPercent}
                noPercent={task.noPercent}
                numAgents="12"
                totalMonads={task.totalStaked}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
