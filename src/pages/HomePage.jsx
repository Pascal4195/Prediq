import React from 'react';
import { useWallet } from '../context/WalletContext';
import { useAgents } from '../hooks/useAgents'; // Use our unified hook

const HomePage = () => {
  const { isConnected, chainId, switchToMonad } = useWallet();
  const { agents: tasks, loading } = useAgents(); // Re-use the hook data

  return (
    <div className="max-w-7xl mx-auto px-10 py-12 font-mono">
      {/* Hero Section */}
      <div className="mb-16 border-l-2 border-cyan-500 pl-8">
        <h1 className="text-8xl font-black uppercase tracking-tighter italic leading-none text-white">The Arena</h1>
        <p className="text-cyan-500 font-mono text-xs tracking-[0.5em] uppercase mt-4">
          // Real-time Prediction Markets
        </p>
      </div>

      {/* Network Gatekeeper & Task Grid */}
      <div className="min-h-[400px] flex items-center justify-center">
        {!isConnected ? (
          <p className="text-gray-600 font-bold uppercase tracking-widest animate-pulse italic">
            -- INITIALIZE WALLET TO ENTER ARENA --
          </p>
        ) : Number(chainId) !== 143 ? (
          <div className="text-center p-12 border border-red-500/20 bg-red-500/5 max-w-xl">
            <h2 className="text-red-500 font-black text-2xl uppercase mb-4">Network Mismatch</h2>
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-8 leading-loose">
              Switch your uplink to Monad Mainnet (Chain 143) to access active tasks.
            </p>
            <button 
              onClick={switchToMonad}
              className="px-10 py-4 bg-red-600 text-white font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all"
            >
              Switch to Monad
            </button>
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
            <p className="text-[10px] text-cyan-500 uppercase tracking-[0.3em]">Syncing Chain Data...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 uppercase text-[10px] tracking-[0.5em] mb-4">// No Active Tasks Found //</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {tasks.map((task) => (
              <div key={task.id} className="bg-black border border-cyan-500/20 p-10 hover:border-cyan-500 transition-all group relative overflow-hidden">
                <div className="flex justify-between items-start mb-10">
                  <span className="text-[10px] font-bold text-cyan-500/50">TASK_00{task.id}</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_green]" />
                </div>
                
                <h3 className="text-2xl font-bold uppercase tracking-tighter mb-6 text-white group-hover:text-cyan-400 transition-colors">
                  {task.agentName}
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between text-[10px] font-bold uppercase">
                    <span className="text-gray-500">Staked Volume</span>
                    <span className="text-green-400">{task.monadEarned} MON</span>
                  </div>
                  <div className="h-1 bg-gray-900 w-full overflow-hidden">
                    {/* The accuracy bar from our hook */}
                    <div className="h-full bg-cyan-500 shadow-[0_0_8px_cyan]" style={{ width: `${task.accuracy}%` }} />
                  </div>
                </div>
                
                <a href="/arena" className="mt-8 block text-center py-3 border border-cyan-500/30 text-[10px] font-black uppercase hover:bg-cyan-500 hover:text-black transition-all">
                  Enter_Market
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
