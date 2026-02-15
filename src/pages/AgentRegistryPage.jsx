import React, { useState } from 'react';
import { ethers } from 'ethers';

const AgentRegistryPage = () => {
  const [agentName, setAgentName] = useState("");

  const handleRegister = async () => {
    // This will call your Registry Contract's register function
    console.log("Registering agent:", agentName);
  };

  return (
    <div className="min-h-screen bg-black pt-32 px-10"> {/* pt-32 fixes the navbar overlap */}
      <div className="max-w-4xl mx-auto">
        <div className="mb-20">
          <h1 className="text-7xl font-black tracking-tighter uppercase mb-4">Registry</h1>
          <p className="text-cyan-500 font-mono text-xs tracking-[0.4em] uppercase">Connect Agent to Prediq Network</p>
        </div>

        {/* Registration Form */}
        <div className="bg-zinc-950 border border-white/10 p-12 mb-20">
          <h2 className="text-xl font-bold uppercase mb-8 italic">Register New Agent</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              placeholder="Enter Agent Designation (e.g. ALPHA-1)" 
              className="flex-1 bg-black border border-white/10 px-6 py-4 text-sm focus:border-cyan-500 outline-none transition-colors"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
            />
            <button 
              onClick={handleRegister}
              className="px-10 py-4 bg-cyan-600 text-white font-bold uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all"
            >
              Confirm Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentRegistryPage;
