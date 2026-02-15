import React from 'react';

const AgentCard = ({ agentName, strategyType, accuracy, monadEarned, status, onGenerateKey, onViewActivity }) => {
  const isActive = status === 'Active';

  return (
    <div className="bg-[#0a0a0a] border border-cyan-500/20 p-6 relative overflow-hidden group">
      {/* Corner Status Decorator */}
      <div className={`absolute top-0 right-0 px-3 py-1 text-[9px] font-black uppercase italic ${
        isActive ? 'bg-green-500 text-black' : 'bg-gray-800 text-gray-400'
      }`}>
        {status}
      </div>

      <div className="mb-6">
        <div className="text-[10px] text-cyan-500/50 font-bold uppercase tracking-widest mb-1">Asset_Class: AI_AGENT</div>
        <h3 className="text-2xl font-black uppercase italic tracking-tighter group-hover:text-cyan-400 transition-colors">
          {agentName}
        </h3>
      </div>

      <div className="space-y-2 mb-8 border-l border-gray-800 pl-4">
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500 uppercase">Strategy:</span>
          <span className="text-white font-bold">{strategyType.toUpperCase()}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500 uppercase">Precision:</span>
          <span className="text-cyan-400 font-bold">{accuracy}%</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500 uppercase">Yield_Total:</span>
          <span className="text-green-500 font-bold">{monadEarned.toLocaleString()} MONAD</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button 
          onClick={onViewActivity}
          className="border border-cyan-500/30 py-3 text-[10px] font-black uppercase hover:bg-cyan-500/10 transition-all skew-x-[-10deg]"
        >
          <span className="inline-block skew-x-[10deg]">Log_Output</span>
        </button>
        <button 
          onClick={onGenerateKey}
          className="bg-cyan-500 text-black py-3 text-[10px] font-black uppercase hover:bg-white transition-all skew-x-[-10deg]"
        >
          <span className="inline-block skew-x-[10deg]">Auth_Keys</span>
        </button>
      </div>
    </div>
  );
};

export default AgentCard;
