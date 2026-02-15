import React, { useState } from 'react';
import { getContract, CONTRACT_ADDRESSES } from '../utils/eth';
import RegistryABI from '../abis/Registry.json';
import { useWallet } from '../context/WalletContext';

const CreateAgentModal = ({ isOpen, onClose, onRefresh }) => {
  const { isConnected, connect } = useWallet();
  const [name, setName] = useState("");
  const [strategy, setStrategy] = useState("MOMENTUM_ML_V1");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleDeploy = async () => {
    if (!isConnected) return connect();
    if (!name) return alert("ENTER_AGENT_NAME");

    try {
      setLoading(true);
      const contract = await getContract(CONTRACT_ADDRESSES.REGISTRY, RegistryABI);
      
      // Replace 'registerAgent' with the exact function name in your Registry.json
      const tx = await contract.registerAgent(name, strategy); 
      
      console.log("Transaction Sent:", tx.hash);
      await tx.wait();
      
      alert("DEPLOYMENT_SUCCESSFUL");
      if (onRefresh) onRefresh(); // Triggers the Registry to reload
      onClose();
    } catch (err) {
      console.error("Deployment failed:", err);
      alert("DEPLOYMENT_CRITICAL_FAILURE");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-cyan-950/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-black border border-cyan-500 w-full max-w-md shadow-[0_0_50px_rgba(0,243,255,0.2)]">
        <div className="bg-cyan-500 p-2 flex justify-between items-center">
          <span className="text-black font-black text-xs uppercase tracking-widest">Initialization_Protocol</span>
          <button onClick={onClose} className="text-black font-bold hover:bg-white px-2">X</button>
        </div>

        <div className="p-8 space-y-6 font-mono">
          <div className="space-y-2">
            <label className="text-[10px] text-cyan-500 font-bold uppercase tracking-[0.2em]">Agent_Designation</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. SIGMA_NINER"
              className="w-full bg-black border border-gray-800 p-3 text-cyan-400 focus:border-cyan-500 outline-none italic"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-cyan-500 font-bold uppercase tracking-[0.2em]">Strategy_Module</label>
            <select 
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
              className="w-full bg-black border border-gray-800 p-3 text-gray-400 focus:border-cyan-500 outline-none"
            >
              <option value="MOMENTUM_ML_V1">MOMENTUM_ML_V1</option>
              <option value="ARBITRAGE_NEURAL_V2">ARBITRAGE_NEURAL_V2</option>
              <option value="SENTIMENT_X">SENTIMENT_ANALYSIS_X</option>
            </select>
          </div>

          <button 
            onClick={handleDeploy}
            disabled={loading}
            className="w-full bg-cyan-500 text-black font-black py-4 uppercase italic hover:bg-white transition-all disabled:opacity-50"
          >
            {loading ? "COMMITTING_TO_BLOCKCHAIN..." : "Deploy_To_Mainnet"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAgentModal;
