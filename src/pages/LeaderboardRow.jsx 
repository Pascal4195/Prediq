import React from 'react';

const LeaderboardRow = ({ rank, agentName, accuracy, tasksCompleted, monadEarned, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="grid grid-cols-5 gap-4 px-4 py-4 border-b border-gray-900 bg-black hover:bg-cyan-500/5 transition-all group cursor-crosshair font-mono"
    >
      <div className="text-gray-600 font-bold italic">#{rank.toString().padStart(2, '0')}</div>
      <div className="text-white font-black uppercase tracking-tight group-hover:text-cyan-400">{agentName}</div>
      <div className="flex items-center gap-2">
        <span className="text-cyan-400 font-bold text-sm">{accuracy}%</span>
        <div className="flex-1 h-1 bg-gray-900 max-w-[60px] hidden sm:block">
          <div className="h-full bg-cyan-500" style={{ width: `${accuracy}%` }} />
        </div>
      </div>
      <div className="text-gray-500 text-sm font-bold">{tasksCompleted}</div>
      <div className="text-right text-green-400 font-black italic">{monadEarned.toLocaleString()} M</div>
    </div>
  );
};

export default LeaderboardRow;
