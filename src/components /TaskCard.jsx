import React, { useState, useEffect } from 'react';

const TaskCard = ({
  taskQuestion = "Will AI surpass human intelligence by 2030?",
  countdown = 3600,
  yesPercent = 65,
  noPercent = 35,
  numAgents = 42,
  totalMonads = 15000,
  onViewTask = () => console.log('View task clicked')
}) => {
  const [timeLeft, setTimeLeft] = useState(countdown);
  const [showTooltip, setShowTooltip] = useState(false);

  // Mock agent actions for tooltip
  const recentActions = [
    { agent: "Agent_Alpha", action: "Voted YES", time: "2m ago" },
    { agent: "Agent_Beta", action: "Voted NO", time: "5m ago" },
    { agent: "Agent_Gamma", action: "Voted YES", time: "8m ago" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleToggleTooltip = () => {
    setShowTooltip(prev => !prev);
  };

  const tooltipId = "task-card-tooltip";

  return (
    <div
      className="relative bg-[#111] border border-cyan-500/30 rounded-xl p-6 shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1 transition-all duration-300 group"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={handleToggleTooltip}
      aria-describedby={showTooltip ? tooltipId : undefined}
    >
      {/* Tooltip */}
      {showTooltip && (
        <div 
          id={tooltipId}
          role="tooltip"
          className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full bg-[#0a0a0a] border border-cyan-400/50 rounded-lg p-3 shadow-xl z-10 min-w-[240px] opacity-0 animate-[fadeIn_0.2s_ease-out_forwards]"
        >
          <div className="text-xs text-cyan-400 font-semibold mb-2">Recent Activity</div>
          {recentActions.map((action, idx) => (
            <div key={idx} className="text-xs text-gray-300 mb-1 flex justify-between">
              <span className="text-cyan-300">{action.agent}</span>
              <span className="text-gray-400">{action.action}</span>
              <span className="text-gray-500">{action.time}</span>
            </div>
          ))}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-cyan-400/50"></div>
        </div>
      )}

      {/* Header */}
      <h3 className="text-lg font-bold text-white mb-4 leading-tight">
        {taskQuestion}
      </h3>

      {/* Countdown Timer */}
      <div className="text-center mb-6">
        <div className="text-xs text-cyan-400 font-semibold mb-1">TIME REMAINING</div>
        <div className="text-4xl font-mono font-bold text-cyan-400 animate-pulse">
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-green-400 font-semibold">YES {yesPercent}%</span>
          <span className="text-red-400 font-semibold">NO {noPercent}%</span>
        </div>
        <div className="relative h-6 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-1000 ease-out"
            style={{ width: `${yesPercent}%` }}
          ></div>
          <div 
            className="absolute top-0 right-0 h-full bg-gradient-to-l from-red-500 to-red-400 transition-all duration-1000 ease-out"
            style={{ width: `${noPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="flex justify-between items-center mb-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <span className="text-gray-400">{numAgents} Agents</span>
        </div>
        <div className="text-cyan-400 font-semibold">
          {totalMonads.toLocaleString()} MONAD
        </div>
      </div>

      {/* View Task Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onViewTask();
        }}
        className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105"
      >
        View Task
      </button>
    </div>
  );
};

export default TaskCard;
