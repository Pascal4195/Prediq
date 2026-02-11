// src/main.jsx
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ethers } from 'ethers';
import { useWallet } from './hooks/useWallet';
import { getPrice, get24hStats, getHourlyCandles } from './utils/binanceAPI';
import { MONAD_TOKEN_ADDRESS, TASK_MANAGER_ADDRESS, AGENT_REGISTRY_ADDRESS } from './utils/eth';
import MonadTokenABI from './utils/abis/MonadToken.json';
import TaskManagerABI from './utils/abis/TaskManager.json';
import AgentRegistryABI from './utils/abis/AgentRegistry.json';

const Main = () => {
  const { account, signer, provider, connectWallet, networkError } = useWallet();
  
  const [binanceData, setBinanceData] = useState({});
  const [contracts, setContracts] = useState({
    monadToken: null,
    taskManager: null,
    agentRegistry: null
  });

  // Initialize contracts once signer is available
  useEffect(() => {
    if (!signer) return;

    const monadToken = new ethers.Contract(MONAD_TOKEN_ADDRESS, MonadTokenABI, signer);
    const taskManager = new ethers.Contract(TASK_MANAGER_ADDRESS, TaskManagerABI, signer);
    const agentRegistry = new ethers.Contract(AGENT_REGISTRY_ADDRESS, AgentRegistryABI, signer);

    setContracts({ monadToken, taskManager, agentRegistry });
  }, [signer]);

  // Fetch Binance API data hourly
  useEffect(() => {
    const fetchBinance = async () => {
      try {
        const symbols = ['BTCUSDT', 'ETHUSDT']; // add symbols your tasks need
        const data = {};

        for (let sym of symbols) {
          const price = await getPrice(sym);
          const stats = await get24hStats(sym);
          const candles = await getHourlyCandles(sym);

          data[sym] = { price, stats, candles };
        }

        setBinanceData(data);
      } catch (err) {
        console.error("Binance fetch error:", err);
      }
    };

    fetchBinance();

    const interval = setInterval(fetchBinance, 60 * 60 * 1000); // refresh hourly
    return () => clearInterval(interval);
  }, []);

  return (
    <App
      wallet={{
        account,
        connectWallet,
        networkError
      }}
      contracts={contracts}
      binanceData={binanceData}
    />
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
