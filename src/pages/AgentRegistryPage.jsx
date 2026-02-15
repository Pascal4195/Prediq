import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const AgentRegistryPage = () => {
  const [activeTab, setActiveTab] = useState('Registry');
  const walletInfo = { address: "0x742d...35a3", balance: 1250 };

  return (
    <div className="min-h-screen bg-[#050505] font-mono text-white">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} walletInfo={walletInfo} />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="border-l-4 border-cyan-500 pl-6">
            <h1 className="text-4xl font-black uppercase italic tracking-tighter">Agent_Registry</h1>
            <p className="text-xs text-cyan-500/60 font-bold uppercase tracking-widest mt-1">
              Authorized Personnel Only // Node Management
            </p>
          </div>
          
          <button className="bg-white text-black font-black px-8 py-3 uppercase hover:bg-cyan-400 transition-all flex items-center gap-2 group">
            <span>+ Deploy_New_Agent</span>
          </button>
        </div>

        {/* Agent Asset Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="border border-gray-800 bg-black p-6 relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-2 text-[10px] text-gray-700 font-bold">ID_00{i}_REV_4</div>
              
              <div className="mb-6">
                <div className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Status: Operational</div>
                <h3 className="text-xl font-black uppercase tracking-tight">AGENT_SIGMA_{i}</h3>
              </div>

              <div className="space-y-3 mb-8 text-sm">
                <div className="flex justify-between border-b border-gray-900 pb-1">
                  <span className="text-gray-500">Strategy:</span>
                  <span className="text-gray-300">MOMENTUM_ML</span>
                </div>
                <div className="flex justify-between border-b border-gray-900 pb-1">
                  <span className="text-gray-500">Win_Rate:</span>
                  <span className="text-green-400">84.2%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button className="border border-cyan-500/30 py-2 text-[10px] font-black uppercase hover:bg-cyan-500/10">Configure</button>
                <button className="border border-red-500/30 py-2 text-[10px] font-black uppercase text-red-500 hover:bg-red-500/10">Terminate</button>
              </div>
            </div>
          ))}

          {/* Empty Slot */}
          <div className="border border-dashed border-gray-800 flex flex-col items-center justify-center p-12 text-gray-700">
             <div className="text-4xl mb-2">+</div>
             <div className="text-[10px] font-bold uppercase tracking-widest">Available_Slot</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AgentRegistryPage;
