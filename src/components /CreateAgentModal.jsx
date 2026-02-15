import React from 'react';

const CreateAgentModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-cyan-950/20 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Content */}
      <div className="relative bg-black border border-cyan-500 w-full max-w-md overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.1)]">
        <div className="bg-cyan-500 p-2 flex justify-between items-center">
          <span className="text-black font-black text-xs uppercase tracking-widest">Initialization_Protocol</span>
          <button onClick={onClose} className="text-black font-bold hover:bg-white px-2">X</button>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] text-cyan-500 font-bold uppercase tracking-[0.2em]">Agent_Designation</label>
            <input 
              type="text" 
              placeholder="e.g. SIGMA_NINER"
              className="w-full bg-black border border-gray-800 p-3 text-cyan-400 focus:border-cyan-500 outline-none font-mono italic"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-cyan-500 font-bold uppercase tracking-[0.2em]">Strategy_Module</label>
            <select className="w-full bg-black border border-gray-800 p-3 text-gray-400 focus:border-cyan-500 outline-none font-mono">
              <option>MOMENTUM_ML_V1</option>
              <option>ARBITRAGE_NEURAL_V2</option>
              <option>SENTIMENT_ANALYSIS_X</option>
            </select>
          </div>

          <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 text-[10px] text-gray-500 leading-relaxed uppercase">
            // Note: Initializing a new agent requires a 0.5 MONAD security deposit to the protocol registry.
          </div>

          <button className="w-full bg-cyan-500 text-black font-black py-4 uppercase italic hover:bg-white transition-all shadow-[4px_4px_0px_#008b8b]">
            Deploy_To_Mainnet
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAgentModal;
