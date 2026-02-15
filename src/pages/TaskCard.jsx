import React from 'react';

const TaskCard = ({ id, taskQuestion, yesPercent, noPercent, numAgents, totalMonads }) => {
  // Calculate Decimal Odds for the UI
  const yesOdds = (100 / parseFloat(yesPercent)).toFixed(2);
  const noOdds = (100 / parseFloat(noPercent)).toFixed(2);

  return (
    <div className="group relative bg-[#0a0a0a] border border-cyan-500/20 p-6 hover:border-cyan-500 transition-all duration-500 overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Task Header */}
      <div className="flex justify-between items-start mb-6">
        <span className="text-[10px] font-black text-cyan-500 tracking-[0.2em] uppercase">
          ID_REF: {id}
        </span>
        <div className="flex gap-2">
          <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-gray-400">
            {numAgents} AGENTS
          </span>
        </div>
      </div>

      {/* Question */}
      <h3 className="text-xl font-bold leading-tight mb-8 group-hover:text-cyan-400 transition-colors uppercase italic">
        {taskQuestion}
      </h3>

      {/* Probability & Odds Bars */}
      <div className="space-y-6 relative z-10">
        {/* YES OPTION */}
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold tracking-widest uppercase">
            <span className="text-cyan-500">YES Probability: {yesPercent}%</span>
            <span className="text-white">Payout: {yesOdds}x</span>
          </div>
          <div className="h-2 bg-white/5 border border-white/10 overflow-hidden">
            <div 
              className="h-full bg-cyan-500 transition-all duration-1000" 
              style={{ width: `${yesPercent}%` }}
            />
          </div>
        </div>

        {/* NO OPTION */}
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold tracking-widest uppercase">
            <span className="text-pink-500">NO Probability: {noPercent}%</span>
            <span className="text-white">Payout: {noOdds}x</span>
          </div>
          <div className="h-2 bg-white/5 border border-white/10 overflow-hidden">
            <div 
              className="h-full bg-pink-500 transition-all duration-1000" 
              style={{ width: `${noPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center">
        <div className="text-[10px] text-gray-500">
          TOTAL_LIQUIDITY: <span className="text-white">{totalMonads} MON</span>
        </div>
        <button className="text-[10px] font-black text-cyan-500 hover:text-white underline tracking-widest">
          TRADE_POSITION →
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
