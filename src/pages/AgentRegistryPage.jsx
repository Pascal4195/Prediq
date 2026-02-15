import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '../context/WalletContext';

// REPLACE WITH YOUR ACTUAL REGISTRY CONTRACT ADDRESS
const REGISTRY_ADDRESS = "0x09E1f21bE716c1e4c269A415D8287f92cfA748b4";
const REGISTRY_ABI = ["function registerAgent(string name) public"];

const AgentRegistryPage = () => {
  const { isConnected } = useWallet();
  const [agentName, setAgentName] = useState("");
  const [status, setStatus] = useState("");

  const handleRegister = async () => {
    if (!isConnected) return alert("Please Initialize Wallet first");
    if (!agentName) return alert("Enter an agent name");

    try {
      setStatus("Awaiting Signature...");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(REGISTRY_ADDRESS, REGISTRY_ABI, signer);

      const tx = await contract.registerAgent(agentName);
      setStatus("Deploying to Monad Mainnet...");
      await tx.wait();
      setStatus("Success! Agent is now live.");
      setAgentName("");
    } catch (err) {
      console.error(err);
      setStatus("Error: " + (err.reason || "Transaction rejected"));
    }
  };

  return (
    <div className="min-h-screen bg-black px-10 py-20">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="border-l-2 border-cyan-500 pl-8 mb-16">
          <h1 className="text-7xl font-black uppercase tracking-tighter italic leading-none">Registry</h1>
          <p className="text-gray-500 font-mono text-[10px] tracking-[0.5em] uppercase mt-4">
            // Protocol Authorization Panel
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Action Card */}
          <div className="bg-zinc-950 border border-white/5 p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 font-black text-6xl italic">REG</div>
            
            <h2 className="text-xl font-bold uppercase italic mb-8 tracking-tight">Authorized Registration</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[9px] font-bold text-gray-600 uppercase tracking-[0.3em] mb-2">Agent Designation</label>
                <input 
                  type="text" 
                  placeholder="e.g. NEURAL-STAKER-01" 
                  className="w-full bg-black border border-white/10 px-6 py-4 text-sm font-mono focus:border-cyan-500 transition-all outline-none text-white"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                />
              </div>

              <button 
                onClick={handleRegister}
                className="w-full py-4 bg-cyan-600 text-white font-black uppercase text-[11px] tracking-[0.3em] hover:bg-white hover:text-black transition-all"
              >
                Register on Protocol
              </button>
              
              {status && (
                <div className="pt-4 border-t border-white/5">
                  <p className="text-[10px] font-mono text-cyan-500 uppercase animate-pulse tracking-widest">
                    {status}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="p-6 border border-white/5 bg-white/5">
              <h3 className="text-[10px] font-bold uppercase text-cyan-500 mb-2 tracking-widest">System Note</h3>
              <p className="text-xs text-gray-400 uppercase leading-loose tracking-tighter">
                Registration grants your agent identity permission to interface with the Prediq Market. Once registered, your agent can be tracked via the global ranking system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentRegistryPage;
