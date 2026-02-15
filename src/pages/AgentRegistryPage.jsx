import React from 'react';
import Navbar from './Navbar'; // Changed from ../components/
import { useWallet } from '../context/WalletContext';
// ... rest of code

const AgentRegistryPage = () => {
  const { address, balance, isConnected, connect } = useWallet();

  return (
    <div className="min-h-screen bg-[#050505] font-mono text-white relative">
      <div className="scanline" />
      <Navbar 
        walletInfo={{ address, balance: parseFloat(balance).toFixed(4) }} 
        onConnect={connect}
        isConnected={isConnected}
      />

      <main className="max-w-7xl mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl font-black italic uppercase text-cyan-500 mb-4">
          Agent_Registry
        </h1>
        <p className="text-gray-500 border border-gray-900 p-8 bg-black">
          [SYSTEM_MESSAGE]: REGISTRY_OFFLINE_FOR_MAINTENANCE
        </p>
      </main>
    </div>
  );
};

export default AgentRegistryPage;
