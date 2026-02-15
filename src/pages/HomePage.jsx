import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '../context/WalletContext';

// CONTRACT CONFIG
const MARKET_ADDRESS = "0xYour_Market_Contract_Address"; 
const MARKET_ABI = [
  "function getActiveTasks() public view returns (tuple(uint256 id, string question, uint256 yesVotes, uint256 noVotes, uint256 totalStaked)[])"
];

const HomePage = () => {
  const { isConnected, chainId, switchToMonad } = useWallet();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    if (!window.ethereum) return;
    
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      // Check if user is on Monad (143)
      if (chainId !== 143) {
        setTasks([]);
        setLoading(false);
        return;
      }

      const contract = new ethers.Contract(MARKET_ADDRESS, MARKET_ABI, provider);
      const data = await contract.getActiveTasks();
      
      console.log("Arena Data:", data);
      setTasks(data || []);
      setError(null);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to sync with Monad Mainnet");
    } finally {
      setLoading(false);
    }
  }, [chainId]);

  useEffect(() => {
    fetchTasks();
    const interval = setInterval(fetchTasks, 20000); // Auto-refresh every 20s
    return () => clearInterval(interval);
  }, [fetchTasks]);

  return (
    <div className="max-w-7xl mx-auto px-10 py-12">
      {/* Hero Section */}
      <div className="mb-16 border-l-2 border-cyan-500 pl-8">
        <h1 className="text-8xl font-black uppercase tracking-tighter italic leading-none">The Arena</h1>
        <p className="text-gray-500 font-mono text-xs tracking-[0.5em] uppercase mt-4">
          // Real-time Prediction Markets
        </p>
      </div>

      {/* Network Gatekeeper & Task Grid */}
      <div className="min-h-[400px] flex items-center justify-center">
        {!isConnected ? (
          <p className="text-gray-600 font-bold uppercase tracking-widest animate-pulse italic">
            -- INITIALIZE WALLET TO ENTER ARENA --
          </p>
        ) : chainId !== 143 ? (
          <div className="text-center p-12 border border-red-500/20 bg-red-500/5 max-w-xl">
            <h2 className="text-red-500 font-black text-2xl uppercase mb-4">Network Mismatch</h2>
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-8 leading-loose">
              This protocol is currently synchronized with Monad Mainnet. 
              Switch your uplink to access active tasks.
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
            <p className="text-gray-500 text-[10px] max-w-xs uppercase leading-relaxed mx-auto">
              Waiting for backend agents to initialize market positions. Ensure agents are funded with MON.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 w-full">
            {tasks.map((task) => (
              <div key={task.id} className="bg-zinc-950 border border-white/5 p-10 hover:bg-white hover:text-black transition-all group">
                <div className="flex justify-between items-start mb-10">
                  <span className="text-[10px] font-bold opacity-50 font-mono">TASK_00{task.id.toString()}</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-tighter mb-6">{task.question}</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-[10px] font-bold uppercase">
                    <span>Staked Volume</span>
                    <span className="text-cyan-500 group-hover:text-black">{ethers.utils.formatEther(task.totalStaked)} MON</span>
                  </div>
                  <div className="h-1 bg-zinc-900 w-full overflow-hidden">
                    <div className="h-full bg-cyan-500 transition-all duration-1000" style={{ width: '45%' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
