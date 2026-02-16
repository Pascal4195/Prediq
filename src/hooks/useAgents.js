import { useState, useEffect } from 'react';
import { getContract } from '@/utils/eth';
import { ethers } from 'ethers';

export function useAgents() {
  const [agents, setAgents] = useState([]); // This will store your Task/Prediction cards
  const [loading, setLoading] = useState(true);

  const fetchActivity = async () => {
    try {
      setLoading(true);
      const contract = await getContract();
      if (!contract) return;

      // getAllTasks is the standard function for your MasterArena contract
      const taskData = await contract.getAllTasks(); 
      
      const formatted = taskData.map(task => ({
        id: task.id.toString(),
        agentName: `Task #${task.id.toString()}`,
        performance: task.totalStaked ? ethers.formatEther(task.totalStaked) : "0",
        prediction: task.resolved ? (task.result ? "UP" : "DOWN") : "ACTIVE",
        stake: "0.01 MON", // Based on your successful agent logs
        strategy: task.description || "AI Prediction Market"
      }));

      // Reverse to show the newest activity (like Task 5) at the top
      setAgents(formatted.reverse()); 
    } catch (err) {
      console.error("Frontend sync error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivity();
    // Refresh every 12 seconds to catch new agent bets shown in logs
    const interval = setInterval(fetchActivity, 12000); 
    return () => clearInterval(interval);
  }, []);

  return { agents, loading, refresh: fetchActivity };
}
