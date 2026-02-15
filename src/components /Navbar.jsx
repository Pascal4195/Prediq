import React from 'react';

const Navbar = ({ activeTab, onTabChange, walletInfo }) => {
  const tabs = ['Arena', 'Leaderboard', 'Registry'];

  return (
    <nav className="border-b border-cyan-500/30 bg-black/80 backdrop-blur-md sticky top-0 z-50 font-mono">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-cyan-500 flex items-center justify-center rotate-45">
              <span className="text-black font-black -rotate-45 text-xl">P</span>
            </div>
            <span className="text-2xl font-black tracking-tighter text-white uppercase">Prediq</span>
          </div>

          <div className="hidden md:flex items-center">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`px-6 h-16 flex items-center text-sm font-bold transition-all border-b-2 ${
                  activeTab === tab 
                    ? 'border-cyan-500 text-cyan-400 bg-cyan-500/5' 
                    : 'border-transparent text-gray-500 hover:text-cyan-300'
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-4 px-4 py-1 border-x border-cyan-500/20">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-gray-500 leading-none uppercase">Network Status</span>
              <span className="text-[10px] text-green-400 flex items-center gap-1 font-bold">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> MONAD_MAINNET
              </span>
            </div>
          </div>
          
          <button className="flex items-center gap-3 bg-black border border-cyan-500/50 px-4 py-2 hover:bg-cyan-500/10 transition-all group">
            <div className="text-right hidden sm:block">
              <div className="text-[10px] text-gray-500 uppercase leading-none">Balance</div>
              <div className="text-sm font-bold text-cyan-400">{walletInfo.balance} MONAD</div>
            </div>
            <div className="w-8 h-8 bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30 group-hover:border-cyan-500">
              <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M21 12V7a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2h14a2 2 0 002-2v-5M11 10h6" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
