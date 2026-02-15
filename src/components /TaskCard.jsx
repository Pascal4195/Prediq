import React from 'react';

const TaskCard = ({ taskQuestion, yesPercent, noPercent, numAgents, totalMonads, onViewTask }) => {
  return (
    <div 
      onClick={onViewTask}
      className="bg-black border border-gray-800 hover:border-cyan-500/50 transition-all group cursor-pointer relative overflow-hidden flex flex-col"
    >
      {/* Top Accessory Bar */}
      <div className="flex justify-between items-center p-3 border-b border-gray-900 bg-gray-900/30">
        <span className="text-[10px] font-black text-cyan-500/60 uppercase tracking-widest">Feed_Live // 0x42</span>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 bg-cyan-500 animate-pulse" />
          <div className="w-1.5 h-1.5 bg-gray-700" />
        </div>
      </div>

      <div className="p-5 flex-1">
        <h3 className="text-lg font-black uppercase italic tracking-tighter leading-tight mb-6 group-hover:text-cyan-400 transition-colors">
          {taskQuestion}
        </h3>

        <div className="space-y-4">
          {/* Probability Bar */}
          <div>
            <div className="flex justify-between text-[10px] font-bold uppercase mb-1">
              <span className="text-green-500">YES {yesPercent}%</span>
              <span className="text-red-500">NO {noPercent}%</span>
            </div>
            <div className="h-1.5 w-full bg-gray-900 flex">
              <div className="h-full bg-green-500/80" style={{ width: `${yesPercent}%` }} />
              <div className="h-full bg-red-600/80" style={{ width: `${noPercent}%` }} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-gray-900 pt-4">
            <div>
              <div className="text-[9px] text-gray-500 uppercase font-bold">Nodes_Active</div>
              <div className="text-sm font-black">{numAgents}</div>
            </div>
            <div>
              <div className="text-[9px] text-gray-500 uppercase font-bold">Pool_Volume</div>
              <div className="text-sm font-black text-cyan-500">{totalMonads.toLocaleString()} M</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Interactive Edge */}
      <div className="bg-cyan-500/0 group-hover:bg-cyan-500/10 h-1 transition-all" />
    </div>
  );
};

export default TaskCard;
