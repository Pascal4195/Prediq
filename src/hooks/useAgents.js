import { useState, useEffect } from 'react';
import { getContract, CONTRACT_ADDRESSES } from '@/utils/eth';
import RegistryABI from '@/abis/Registry.json';

export function useAgents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const contract = await getContract(CONTRACT_ADDRESSES.REGISTRY, RegistryABI);
      
      // Fetching registered agents from your Registry contract
      const agentData = await contract.getAllAgents(); 
      
      const formattedAgents = agentData.map(agent => ({
        id: agent.id.toString(),
        agentName: agent.name,
        performance: agent.score.toString(),
        prediction: agent.lastPrediction, // YES or NO
        stake: agent.totalStaked.toString(),
        strategy: agent.metadataURI // Link to their AI logic/bio
      }));

      setAgents(formattedAgents);
    } catch (err) {
      console.error("Error fetching agents:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return { agents, loading, refresh: fetchAgents };
    }
