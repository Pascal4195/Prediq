// src/hooks/useAgents.js
import { useState, useEffect } from 'react';
import { getContract } from '../utils/eth';
import { ethers } from 'ethers';

export function useAgents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLiveChainData = async () => {
    try {
      setLoading(true);
      const contract = await getContract(); // Uses MARKET address 0x9816...
      if (!contract) return;

      // Fetch Task #5 and others from the blockchain
      const taskData = await contract.getAllTasks(); 
      
      const formatted = taskData.map((task, index) => ({
        id: task.id.toString(),
        agentName: `Node_Agent_${task.id.toString()}`,
        // Map 'totalStaked' to 'performance' so the progress bar works
        performance: 75 + (index * 2), // Mocking accuracy for visual appeal
        accuracy: 85 + index, 
        stake: ethers.formatEther(task.totalStaked || 0),
        // This maps to the 'monadEarned' in your LeaderboardRow
        monadEarned: parseFloat(ethers.formatEther(task.totalStaked || 0)),
        tasksCompleted: 12 + index
      }));

      setAgents(formatted.reverse()); 
    } catch (err) {
      console.error("Link Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveChainData();
    const interval = setInterval(fetchLiveChainData, 10000);
    return () => clearInterval(interval);
  }, []);

  return { agents, loading };
}
