import React, { useState, useEffect } from 'react';
import { useWallet } from '../hooks/useWallet';
import { ethers } from 'ethers';
import { useMonadToken } from '../hooks/useMonadToken'; // Hook to get MONAD balance

const Navbar = ({ activeTab = "Arena", onTabChange = () => {}, userAvatar = null, onAvatarClick = () => {} }) => {
  const { account, networkError, connectWallet, disconnectWallet, provider } = useWallet();
  const { balance, fetchBalance } = useMonadToken(account); // fetch MONAD balance
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const [showWalletTooltip, setShowWalletTooltip] = useState(false);

  const tabs = ["Arena", "Agents", "Leaderboard"];
  
  // Truncated address
  const truncatedAddress = account ? `${account.slice(0, 6)}...${account.slice(-4)}` : null;

  // Fetch balance when account changes
  useEffect(() => {
    if (account) fetchBalance();
  }, [account]);

  return (
    <nav className="bg-black/80 border-b border-cyan-500/20 px-4 sm:px-6 py-3 sm:py-4 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black" aria-label="Prediq home">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </button>
          <span className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">Prediq</span>
        </div>

        {/* Tabs */}
        <div className="hidden md:flex items-center gap-1 bg-[#0a0a0a] rounded-xl p-1 border border-cyan-500/10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              aria-label={`Navigate to ${tab}`}
              aria-current={activeTab === tab ? 'page' : undefined}
              className={`px-4 lg:px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg shadow-cyan-500/40'
                  : 'text-gray-400 hover:text-cyan-400 hover:bg-[#1a1a1a]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Wallet + Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Wallet */}
          <div
            className="relative"
            onMouseEnter={() => setShowWalletTooltip(true)}
            onMouseLeave={() => setShowWalletTooltip(false)}
          >
            <button
              onClick={account ? disconnectWallet : connectWallet}
              aria-label={account ? "Disconnect wallet" : "Connect wallet"}
              className="flex items-center gap-2 sm:gap-3 bg-[#0a0a0a] border border-cyan-500/20 rounded-xl px-2 sm:px-3 lg:px-4 py-2 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black"
            >
              <div className={`w-2 h-2 rounded-full ${account ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}></div>
              <span className="hidden sm:inline text-cyan-400 font-mono text-xs lg:text-sm">{truncatedAddress || 'Connect Wallet'}</span>
              {account && (
                <div className="text-white font-semibold text-xs lg:text-sm whitespace-nowrap">
                  {balance ? `${balance} MONAD` : '...'}
                </div>
              )}
              {networkError && <div className="ml-1 px-2 py-0.5 bg-red-600 rounded-md text-[10px] text-white">{networkError}</div>}
            </button>

            {showWalletTooltip && account && (
              <div className="absolute top-full mt-3 right-0 bg-[#0a0a0a] border border-cyan-400/40 rounded-xl p-4 shadow-2xl min-w-[220px] opacity-0 -translate-y-2 animate-[fadeIn_0.2s_ease-out_forwards] z-50">
                <div className="text-xs text-cyan-400 font-semibold mb-3">Wallet Details</div>
                <div className="text-xs text-gray-300 mb-2"><span className="text-gray-500">Address:</span> {truncatedAddress}</div>
                <div className="text-xs text-gray-300"><span className="text-gray-500">Balance:</span> {balance || '...'} MONAD</div>
              </div>
            )}
          </div>

          {/* Avatar */}
          {userAvatar && (
            <div className="relative">
              <button
                onClick={() => setShowAvatarMenu(!showAvatarMenu)}
                aria-label="User menu"
                aria-expanded={showAvatarMenu}
                aria-haspopup="true"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-cyan-500/50 hover:border-cyan-400 transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black"
              >
                <img src={userAvatar} alt="User Avatar" className="w-full h-full object-cover" />
              </button>

              {showAvatarMenu && (
                <div className="absolute top-full mt-3 right-0 bg-[#0a0a0a] border border-cyan-400/40 rounded-xl shadow-2xl min-w-[180px] opacity-0 -translate-y-2 animate-[fadeIn_0.2s_ease-out_forwards] overflow-hidden z-50">
                  <button onClick={onAvatarClick} className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400">Profile</button>
                  <button className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400">Settings</button>
                  <button onClick={disconnectWallet} className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10">Disconnect Wallet</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
