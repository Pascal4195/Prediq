import React, { useState, useEffect } from 'react';
import { getProvider, CONTRACT_ADDRESSES, ASSET_MAP } from './utils/eth';
import { Wallet, LayoutDashboard, Activity, Zap, TrendingUp, AlertCircle } from 'lucide-react';

// Path check: 'abis' folder must be lowercase
import MarketABI from './abis/Market.json';

function App() {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      const provider = getProvider();
      if (provider) {
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) setAccount(accounts[0].address);
      }
      setLoading(false);
    };
    check();
  }, []);

  const connectWallet = async () => {
    const provider = getProvider();
    if (!provider) return alert("Open in MetaMask!");
    const signer = await provider.getSigner();
    setAccount(await signer.getAddress());
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-200 font-sans">
      {/* Top Navigation */}
      <nav className="border-b border-slate-800 bg-[#0a0a0b]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]">P</div>
            <span className="text-xl font-bold tracking-tight text-white">PREDIQ <span className="text-blue-500 text-xs ml-1 px-1.5 py-0.5 border border-blue-500/30 rounded uppercase tracking-widest">Monad</span></span>
          </div>
          
          <button 
            onClick={connectWallet}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl transition-all active:scale-95"
          >
            <Wallet size={18} className={account ? "text-green-400" : "text-blue-400"} />
            <span className="text-sm font-medium">
              {account ? `${account.substring(0, 6)}...${account.substring(38)}` : "Connect"}
            </span>
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar/Stats - Hidden on small mobile to save space */}
        <aside className="lg:col-span-3 space-y-4 hidden md:block">
          <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl">
            <div className="flex items-center gap-3 text-slate-400 mb-6 px-2">
              <LayoutDashboard size={20} />
              <span className="font-medium">Overview</span>
            </div>
            <div className="space-y-1">
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-blue-600/10 text-blue-400 font-medium">
                <div className="flex items-center gap-3"><Activity size={18}/> Markets</div>
                <span className="text-xs bg-blue-500/20 px-2 py-0.5 rounded-full">3</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-xl text-slate-500 hover:bg-slate-800 transition-colors">
                <TrendingUp size={18}/> Activity
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-9 space-y-6">
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-2">Predict the Future.</h2>
              <p className="text-blue-100 max-w-md">Deentralized prediction markets powered by Monad speed. Choose an asset and place your bet.</p>
            </div>
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(ASSET_MAP).map(([id, asset]) => (
              <div key={id} className="group bg-slate-900/40 border border-slate-800 hover:border-blue-500/50 p-6 rounded-2xl transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.1)]">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {asset.symbol}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-slate-500 border border-slate-800 px-2 py-1 rounded">ID: {id}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{asset.name}</h3>
                <p className="text-sm text-slate-500 mb-6">Prediction Market for {asset.name}/USD price action.</p>
                <button className="w-full py-3 bg-slate-800 hover:bg-blue-600 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                  <Zap size={16} fill="currentColor" /> View Market
                </button>
              </div>
            ))}
          </div>

          {/* Backend Status Info */}
          <div className="flex items-start gap-4 p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl text-amber-200/80 text-sm">
            <AlertCircle className="shrink-0 text-amber-500" size={20} />
            <p>Backend synchronization in progress. Market liquidity and real-time tasks will be available shortly after agent deployment.</p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
