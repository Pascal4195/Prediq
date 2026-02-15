import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// MUST BE THE SAME ADDRESS AS YOUR RENDER BACKEND
const CONTRACT_ADDRESS = "0xF8262596823a3c7fcd47F407138bcbbbdB4D5F18"; 

const ABI = [
  "function getActiveTasks() public view returns (tuple(uint256 id, string question, uint256 yesVotes, uint256 noVotes, uint256 totalStaked)[])"
];

export const useTaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      if (!window.ethereum) return;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      // Monad Mainnet Chain ID is 143 (Testnet is 10143)
      const network = await provider.getNetwork();
      if (network.chainId !== 143 && network.chainId !== 10143) {
        console.warn("Wrong Network Detected");
        return;
      }

      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
      const data = await contract.getActiveTasks();
      
      setTasks(data || []);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    const interval = setInterval(fetchTasks, 30000); // Auto-refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return { tasks, loading, refresh: fetchTasks };
};
