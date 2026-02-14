import React, { useState, useEffect } from 'react';
import { Wallet, Activity, RefreshCw } from 'lucide-react';
import { getProvider, getContract, CONTRACT_ADDRESSES, ASSET_MAP } from './utils/eth';
// import MARKET_ABI from './abis/Market.json'; // You'll add this later

export default function App() {
  const [account, setAccount] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1. Connect Wallet Logic
  const connectWallet = async () => {
    try {
      const provider = getProvider();
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    } catch (err) {
      alert("Please install MetaMask!");
    }
  };

  // 2. Fetch Tasks from Blockchain
  const fetchTasks = async () => {
    setLoading(true);
    try {
      // In a real dApp, we'd fetch from your Market contract here:
      // const contract = await getContract(CONTRACT_ADDRESSES.MARKET, MARKET_ABI);
      // const data = await contract.getActiveTasks();
      
      // FOR NOW: Simulating the data the contract will provide
      const mockTasks = [
        { id: 0, assetId: 0, targetPrice: "96400", expiry: "1h 20m" },
        { id: 1, assetId: 1, targetPrice: "2750", expiry: "45m" },
        { id: 2, assetId: 2, targetPrice: "145", expiry: "12m" }
      ];
      setTasks(mockTasks);
    } catch (err) {
      console.error("Failed to load tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
      {/* NAVBAR */}
      <nav className="border-b border-white/5 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-blue-400 p-2 rounded-xl shadow-lg shadow-blue-500/20">
              <Activity size={22} className="text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter">PREDIQ</span>
          </div>

          <button 
            onClick={connectWallet}
            className="flex items-center gap-2 bg-white text-slate-950 hover:bg-slate-200 px-5 py-2.5 rounded-full font-bold transition-all active:scale-95 shadow-lg shadow-white/5"
          >
            <Wallet size={18} />
            {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Connect"}
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* HEADER */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-5xl font-black mb-4 tracking-tight">Active Markets</h1>
            <p className="text-slate-400 text-lg">Predict the trend. Earn MON.</p>
          </div>
          <button onClick={fetchTasks} className="p-3 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors">
            <RefreshCw size={20} className={`${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* DYNAMIC TASK GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => {
            const asset = ASSET_MAP[task.assetId];
            return (
              <div key={task.id} className="bg-slate-900 border border-white/5 p-6 rounded-3xl hover:border-blue-500/50 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl bg-slate-800 w-12 h-12 flex items-center justify-center rounded-2xl group-hover:bg-blue-500/10 transition-colors">
                      {asset.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">{asset.name}</h3>
                      <p className="text-slate-500 text-sm font-medium">{asset.symbol} / USD</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Target</span>
                    <p className="font-mono text-lg text-emerald-400">${task.targetPrice}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-8">
                  <button className="bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white py-3 rounded-2xl font-bold transition-all border border-emerald-500/20">
                    UP
                  </button>
                  <button className="bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white py-3 rounded-2xl font-bold transition-all border border-rose-500/20">
                    DOWN
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
