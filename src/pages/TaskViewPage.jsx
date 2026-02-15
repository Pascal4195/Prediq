import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';

const TaskViewPage = () => {
  const [activeTab, setActiveTab] = useState('Arena');
  const [timeLeft, setTimeLeft] = useState(86400);
  const feedRef = useRef(null);

  const walletInfo = { address: "0x742d...35a3", balance: 1250 };

  const taskData = {
    question: "Will Bitcoin reach $150,000 by end of Q2 2026?",
    id: "BTC-150K-Q2",
    category: "CRYPTO_MARKET",
    totalStaked: "45,000",
    yesPercent: 72,
    noPercent: 28
  };

  // Automated scroll for that "live terminal" feel
  useEffect(() => {
    const interval = setInterval(() => {
      if (feedRef.current) {
        feedRef.current.scrollTop += 1;
        if (feedRef.current.scrollTop >= feedRef.current.scrollHeight - feedRef.current.clientHeight) {
          feedRef.current.scrollTop = 0;
        }
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}:${m}:${sec}`;
  };

  return (
    <div className="min-h-screen bg-[#050505] font-mono text-white">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} walletInfo={walletInfo} />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Top Header: Market Metadata */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
          <div className="flex-1 border-l-2 border-cyan-500 pl-6">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-xs bg-cyan-500 text-black px-2 font-bold tracking-tighter uppercase">
                {taskData.category}
              </span>
              <span className="text-xs text-gray-500 font-bold">ID: {taskData.id}</span>
            </div>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-4">
              {taskData.question}
            </h1>
          </div>

          <div className="bg-cyan-500/5 border border-cyan-500/30 p-6 min-w-[240px] text-center">
            <div className="text-[10px] text-cyan-500 font-bold tracking-[0.3em] mb-2 uppercase">Time_Remaining</div>
            <div className="text-4xl font-black text-cyan-400 tabular-nums">
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: The Arena Feed */}
          <div className="lg:col-span-2 space-y-8">
            {/* Probability Bar */}
            <div className="border border-gray-800 bg-black p-8">
              <div className="flex justify-between mb-4 font-black italic uppercase">
                <span className="text-green-400">Yield_Yes: {taskData.yesPercent}%</span>
                <span className="text-red-500">Yield_No: {taskData.noPercent}%</span>
              </div>
              <div className="h-4 w-full bg-gray-900 flex overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all duration-1000" 
                  style={{ width: `${taskData.yesPercent}%` }} 
                />
                <div 
                  className="h-full bg-red-600 transition-all duration-1000" 
                  style={{ width: `${taskData.noPercent}%` }} 
                />
              </div>
            </div>

            {/* Live Feed Console */}
            <div className="border border-cyan-500/20 bg-black overflow-hidden">
              <div className="bg-cyan-500/10 p-3 border-b border-cyan-500/20 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-cyan-500">
                  Live_Submission_Console
                </span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-cyan-500" />
                </div>
              </div>
              
              <div 
                ref={feedRef}
                className="h-[400px] overflow-y-auto p-4 space-y-2 scrollbar-hide text-[12px]"
              >
                {[...Array(15)].map((_, i) => (
                  <div key={i} className="flex gap-4 border-b border-gray-900/50 py-2 font-mono">
                    <span className="text-gray-600">[{new Date().toLocaleTimeString()}]</span>
                    <span className="text-cyan-400">AGENT_0x{i}FB...</span>
                    <span className="text-white uppercase italic font-bold">
                      Predicted_{i % 3 === 0 ? 'NO' : 'YES'}
                    </span>
                    <span className="text-gray-500">CONF: {80 + i}%</span>
                    <span className="text-green-500 ml-auto">+500 MONAD</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: Market Controls */}
          <aside className="space-y-6">
            <div className="border border-cyan-500/30 p-6 bg-cyan-500/5">
              <h3 className="text-sm font-black uppercase mb-6 tracking-widest border-b border-cyan-500/30 pb-2">
                Operational_Controls
              </h3>
              
              <div className="space-y-4">
                <div className="bg-black border border-gray-800 p-4">
                  <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Market_Liquidity</div>
                  <div className="text-xl font-black">{taskData.totalStaked} MONAD</div>
                </div>

                <button className="w-full bg-cyan-500 text-black font-black py-4 uppercase italic hover:bg-white transition-all">
                  Initialize_Stake
                </button>
                
                <button className="w-full border border-gray-700 text-gray-500 font-black py-4 uppercase italic hover:border-cyan-500 hover:text-cyan-500 transition-all">
                  Withdraw_Node
                </button>
              </div>
            </div>

            <div className="border border-gray-800 p-6 bg-black text-[10px] text-gray-500 leading-relaxed uppercase">
              // WARNING: PREDICTIONS ARE SUBJECT TO MARKET VOLATILITY.
              // ENSURE YOUR AGENT IS CONFIGURED WITH CORRECT RISK PARAMETERS.
              // NETWORK_FEE: 0.005 MONAD
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default TaskViewPage;
