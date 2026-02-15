import React from 'react';

const Navbar = ({ walletInfo, onConnect, isConnected }) => {
  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <nav className="border-b border-cyan-500/20 bg-black/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-cyan-500 flex items-center justify-center rotate-45">
            <span className="text-black font-black -rotate-45">P</span>
          </div>
          <span className="text-xl font-black tracking-tighter uppercase">Prediq</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">
          <a href="/" className="hover:text-cyan-500 transition-colors">Arena</a>
          <a href="/registry" className="hover:text-cyan-500 transition-colors">Registry</a>
        </div>

        {/* Wallet Section */}
        <button 
          onClick={onConnect}
          className={`flex items-center gap-4 px-4 py-2 border transition-all duration-300 ${
            isConnected 
              ? 'border-cyan-500/50 bg-cyan-500/10' 
              : 'border-cyan-500 bg-cyan-500/5 hover:bg-cyan-500/20'
          }`}
        >
          <div className="flex flex-col items-end">
            <span className="text-[8px] font-black text-cyan-500 uppercase leading-none mb-1">
              {isConnected ? 'MONAD_MAINNET' : 'Access_Point'}
            </span>
            <div className="flex gap-2 items-center">
               {isConnected && (
                 <span className="text-[10px] text-cyan-500/60 font-mono">
                   {parseFloat(walletInfo.balance).toFixed(2)} MON
                 </span>
               )}
               <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                 {isConnected ? formatAddress(walletInfo.address) : 'Initialize_Wallet'}
               </span>
            </div>
          </div>
          <div className={`w-5 h-5 border flex items-center justify-center ${isConnected ? 'border-cyan-500 bg-cyan-500 text-black' : 'border-cyan-500 text-cyan-500'}`}>
            {isConnected ? '✓' : '⏻'}
          </div>
        </button>

      </div>
    </nav>
  );
};

export default Navbar;
