import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// THIS MUST MATCH YOUR RENDER BACKEND ENV VARIABLE
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
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
      
      const data = await contract.getActiveTasks();
      console.log("Tasks fetched:", data); // Check your browser console for this!
      setTasks(data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    const interval = setInterval(fetchTasks, 30000); 
    return () => clearInterval(interval);
  }, []);

  return { tasks, loading, refresh: fetchTasks };
};
