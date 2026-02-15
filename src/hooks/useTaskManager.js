import { useState, useEffect, useCallback } from 'react';
import { getContract, CONTRACT_ADDRESSES } from '../utils/eth';
import MarketABI from '../abis/Market.json';

export const useTaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    try {
      const contract = await getContract(CONTRACT_ADDRESSES.MARKET, MarketABI);
      if (!contract) return;

      const data = await contract.getAllTasks();
      // We only return the raw data, no HTML/JSX here!
      const formatted = data.map(task => ({
        id: task.id.toString(),
        question: task.question,
        yesPercent: task.yesVotes.toString(),
        noPercent: task.noVotes.toString(),
        totalStaked: task.totalAmount.toString(),
        category: task.category || "GENERAL"
      }));
      
      setTasks(formatted);
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const placeBet = async (id, side, amount) => {
    try {
      const contract = await getContract(CONTRACT_ADDRESSES.MARKET, MarketABI);
      const tx = await contract.vote(id, side === 'YES', { value: amount });
      await tx.wait();
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  };

  return { tasks, loading, placeBet, refresh: fetchTasks };
};
