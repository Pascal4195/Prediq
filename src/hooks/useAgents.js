export function useAgents() {
  const [agents, setAgents] = useState([]); // This will hold your Task/Agent cards
  const [loading, setLoading] = useState(true);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      // 1. Change REGISTRY to MARKET (where the actual betting is happening)
      // 2. Ensure MarketABI matches the MasterArena/Market logic
      const contract = await getContract(CONTRACT_ADDRESSES.MARKET, MarketABI);
      
      if (!contract) return;

      // 3. Fetching the actual Tasks/Bets shown in your backend logs
      const taskData = await contract.getAllTasks(); 
      
      const formattedData = taskData.map(task => ({
        id: task.id.toString(),
        agentName: `Task #${task.id.toString()}`,
        performance: task.totalStaked ? ethers.formatEther(task.totalStaked) : "0",
        prediction: task.resolved ? (task.result ? "UP" : "DOWN") : "ACTIVE",
        stake: task.totalStaked ? ethers.formatEther(task.totalStaked) : "0.01",
        strategy: task.description || "Monad Prediction Task"
      }));

      setAgents(formattedData);
    } catch (err) {
      console.error("Error fetching tasks for frontend:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
    // CRITICAL: Refresh every 10 seconds so the website updates when agents bet
    const interval = setInterval(fetchAgents, 10000);
    return () => clearInterval(interval);
  }, []);

  return { agents, loading, refresh: fetchAgents };
}
