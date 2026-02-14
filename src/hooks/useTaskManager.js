import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getContract, CONTRACT_ADDRESSES } from '@/utils/eth';
import MarketABI from '@/abis/Market.json'; 

export function useTaskManager() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all tasks from the Smart Contract
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const contract = await getContract(CONTRACT_ADDRESSES.MARKET, MarketABI);
      
      // Assuming your contract has a function to get all active tasks
      const allTasks = await contract.getActiveTasks(); 
      
      // Formatting the blockchain data to match your UI variable names
      const formattedTasks = allTasks.map(task => ({
        id: task.id.toString(),
        question: task.question,
        totalStaked: ethers.formatEther(task.totalStaked),
        yesPercent: task.yesVotes.toString(), // Simplified for example
        noPercent: task.noVotes.toString(),
        category: task.category,
        expiry: task.endTime.toString()
      }));

      setTasks(formattedTasks);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to place a bet
  const placeBet = async (taskId, prediction, amount) => {
    try {
      const contract = await getContract(CONTRACT_ADDRESSES.MARKET, MarketABI);
      const tx = await contract.placeBet(taskId, prediction === 'YES', {
        value: ethers.parseEther(amount.toString())
      });
      await tx.wait();
      fetchTasks(); // Refresh data after bet
      return { success: true };
    } catch (err) {
      console.error("Betting failed:", err);
      return { success: false, error: err };
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, loading, placeBet, refresh: fetchTasks };
}
