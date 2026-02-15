import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ walletInfo, onConnect, isConnected }) => {
  const location = useLocation();
  
  // Define tabs and their paths
  const tabs = [
    { name: 'Arena', path: '/' },
    { name: 'Leaderboard', path: '/leaderboard' },
    { name: 'Registry', path: '/registry' }
  ];

  const truncateAddress = (addr) => {
    if (!addr || addr === "NOT_CONNECTED") return "0x000...000";
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <nav className="border-b border-cyan-500/30 bg-black/80 backdrop-blur-md sticky top-0 z-50 font-mono">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Left Side: Logo & Tabs */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-cyan-500 flex items-center justify-center rotate-45">
              <span className="text-black font-black -rotate-45 text-xl">P</span>
            </div>
            <span className="text-2xl font-black tracking-tighter text-white uppercase hidden sm:block">
              Prediq
            </span>
          </Link>

          <div className="hidden md:flex items-center">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                to={tab.path}
                className={`px-6 h-16 flex items-center text-sm font-bold transition-all border-b-2 ${
                  location.pathname === tab.path 
                    ? 'border-cyan-500 text-cyan-400 bg-cyan-500/5' 
                    : 'border-transparent text-gray-500 hover:text-cyan-300'
                }`}
              >
                {tab.name.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Side: Status & Wallet */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-4 px-4 py-1 border-x border-cyan-500/20">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-gray-500 leading-none uppercase tracking-tighter">System_Status</span>
              <span className="text-[10px] text-green-400 flex items-center gap-1 font-bold tracking-widest">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> 
                MONAD_MAINNET
              </span>
            </div>
          </div>
          
          <button 
            onClick={isConnected ? null : onConnect}
            className={`flex items-center gap-3 bg-black border px-4 py-2 transition-all group ${
              isConnected ? 'border-cyan-500/30' : 'border-cyan-500 hover:bg-cyan-500/10 shadow-[0_0_15px_rgba(0,243,255,0.1)]'
            }`}
          >
            <div className="text-right hidden sm:block">
              <div className="text-[10px] text-gray-500 uppercase leading-none">
                {isConnected ? truncateAddress(walletInfo.address) : "Access_Point"}
              </div>
              <div className="text-sm font-bold text-cyan-400 uppercase">
                {isConnected ? `${walletInfo.balance} MON` : "Initialize_Wallet"}
              </div>
            </div>
            
            <div className={`w-8 h-8 flex items-center justify-center border transition-all ${
              isConnected 
                ? 'bg-cyan-500/20 border-cyan-500/30' 
                : 'bg-cyan-500 text-black border-cyan-500 group-hover:bg-white group-hover:border-white'
            }`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
