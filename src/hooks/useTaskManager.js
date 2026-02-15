import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { getContract, CONTRACT_ADDRESSES, getProvider } from '@/utils/eth';
import MarketABI from '@/abis/Market.json';

// Pyth Hermes endpoint for live price proofs
const PYTH_HERMES_URL = "https://hermes.pyth.network/v2/updates/price/latest";

export function useTaskManager() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const contract = await getContract(CONTRACT_ADDRESSES.MARKET, MarketABI);
      if (!contract) return;

      // Assuming your contract has a function to get all active tasks
      const allTasks = await contract.getActiveTasks();
      
      const formattedTasks = allTasks.map(task => {
        const total = Number(task.yesVotes) + Number(task.noVotes);
        return {
          id: task.id.toString(),
          question: task.question,
          totalStaked: ethers.formatEther(task.totalStaked),
          yesPercent: total > 0 ? (Number(task.yesVotes) / total * 100).toFixed(1) : "50",
          noPercent: total > 0 ? (Number(task.noVotes) / total * 100).toFixed(1) : "50",
          category: task.category || "MARKET",
          expiry: task.endTime.toString(),
          agentCount: task.agentCount?.toString() || "0"
        };
      });

      setTasks(formattedTasks);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetches the latest price update data from Pyth Hermes.
   * This is required by many Monad/Pyth contracts to verify the price on-chain.
   */
  const getPythUpdateData = async (priceId) => {
    try {
      const response = await fetch(`${PYTH_HERMES_URL}?ids[]=${priceId}`);
      const data = await response.json();
      // Pyth returns a hex string that the contract expects
      return data.binary.data.map(d => "0x" + d);
    } catch (err) {
      console.error("Failed to fetch Pyth data:", err);
      return [];
    }
  };

  /**
   * Execution function to place a bet
   * @param {string} taskId 
   * @param {string} prediction - 'YES' or 'NO'
   * @param {string} amount - Amount in MON
   * @param {string} priceId - The Pyth Price ID for the asset involved
   */
  const placeBet = async (taskId, prediction, amount, priceId = null) => {
    try {
      const contract = await getContract(CONTRACT_ADDRESSES.MARKET, MarketABI);
      
      let tx;
      const value = ethers.parseEther(amount.toString());

      if (priceId) {
        // If your contract requires Pyth data to verify price during the bet
        const pythData = await getPythUpdateData(priceId);
        tx = await contract.placeBet(taskId, prediction === 'YES', pythData, { value });
      } else {
        // Standard bet without immediate Pyth verification
        tx = await contract.placeBet(taskId, prediction === 'YES', { value });
      }

      const receipt = await tx.wait();
      fetchTasks(); // Refresh UI data
      return { success: true, hash: receipt.hash };
    } catch (err) {
      console.error("Betting execution failed:", err);
      return { success: false, error: err };
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, loading, placeBet, refresh: fetchTasks };
}
