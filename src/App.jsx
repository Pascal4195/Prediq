import React, { useState, useEffect } from 'react';
import { getProvider, getContract, CONTRACT_ADDRESSES, ASSET_MAP } from './utils/eth';

// These match your 'abis' folder name exactly
import MarketABI from './abis/Market.json';
import OracleABI from './abis/Oracle.json';
import RegistryABI from './abis/Registry.json';

function App() {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("Initializing...");

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      const provider = getProvider();
      if (provider) {
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0].address);
        }
      }
      setLoading(false);
    } catch (err) {
      console.error("Setup error:", err);
      setLoading(false);
    }
  };

  const connectWallet = async () => {
    try {
      const provider = getProvider();
      if (!provider) {
        alert("Please open this site inside the MetaMask App browser!");
        return;
      }
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
    } catch (err) {
      alert("Connection failed. Make sure you are on Monad Testnet.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p className="animate-pulse">Loading Prediq...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter text-blue-500">PREDIQ</h1>
        <button 
          onClick={connectWallet}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full font-medium transition-all"
        >
          {account ? `${account.substring(0, 6)}...${account.substring(38)}` : "Connect Wallet"}
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-8">
          <h2 className="text-xl mb-4">Welcome to Monad Prediction Markets</h2>
          <p className="text-gray-400 mb-6">
            {!account 
              ? "Connect your wallet to start predicting asset prices." 
              : "Your wallet is connected. The agents are currently processing market data."}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(ASSET_MAP).map(([id, asset]) => (
              <div key={id} className="bg-black p-4 rounded-xl border border-gray-800">
                <span className="text-2xl mb-2 block">{asset.symbol}</span>
                <h3 className="font-bold">{asset.name}</h3>
                <p className="text-sm text-gray-500">Market ID: {id}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Backend Status Notice */}
        <div className="text-center p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
          <p className="text-sm text-blue-300">
            <strong>Note:</strong> Backend agents are being deployed. Live market tasks will appear here soon.
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
