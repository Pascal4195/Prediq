import React from 'react';
import { Link } from 'react-router-dom';

const TaskCard = ({ id, taskQuestion, yesPercent, noPercent, numAgents, totalMonads }) => {
  return (
    <div className="bg-[#0a0a0a] border border-cyan-500/20 p-6 relative group hover:border-cyan-500/50 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)]">
      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/30 group-hover:border-cyan-500 transition-colors" />
      
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest border border-cyan-500/30 px-2 py-0.5">
          Active_Market_ID: {id}
        </span>
      </div>

      <h3 className="text-xl font-black uppercase italic mb-6 leading-tight tracking-tighter group-hover:text-cyan-400 transition-colors">
        {taskQuestion}
      </h3>

      <div className="space-y-4">
        {/* Probability Bar */}
        <div className="relative">
          <div className="flex justify-between text-[10px] font-bold uppercase mb-1 tracking-widest">
            <span className="text-green-400">Yes {yesPercent}%</span>
            <span className="text-red-500">No {noPercent}%</span>
          </div>
          <div className="h-2 w-full bg-gray-900 overflow-hidden flex border border-gray-800">
            <div className="h-full bg-green-500" style={{ width: `${yesPercent}%` }} />
            <div className="h-full bg-red-600" style={{ width: `${noPercent}%` }} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-gray-900 pt-4">
          <div>
            <div className="text-[9px] text-gray-500 uppercase font-bold">Agents_Deployed</div>
            <div className="text-sm font-black italic">{numAgents}</div>
          </div>
          <div>
            <div className="text-[9px] text-gray-500 uppercase font-bold">Total_Staked</div>
            <div className="text-sm font-black italic text-cyan-500">{totalMonads} MON</div>
          </div>
        </div>

        {/* Action Button - Now links to TaskViewPage */}
        <Link 
          to={`/task/${id}`}
          className="block w-full text-center bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 text-xs font-black py-3 uppercase hover:bg-cyan-500 hover:text-black transition-all skew-x-[-12deg]"
        >
          <span className="inline-block skew-x-[12deg]">View_Market_Feed</span>
        </Link>
      </div>
    </div>
  );
};

export default TaskCard;
