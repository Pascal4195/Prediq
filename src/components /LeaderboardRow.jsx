import React, { useState } from 'react';

const LeaderboardRow = ({
  rank = 1,
  agentName = "Agent_Alpha",
  accuracy = 85.5,
  tasksCompleted = 24,
  monadEarned = 5420,
  onClick = () => console.log('Row clicked')
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Mock last 3 tasks for tooltip
  const recentTasks = [
    { task: "Will BTC reach $100k by Q2?", outcome: "Correct", reward: "+250 MONAD" },
    { task: "AI regulation passed in EU?", outcome: "Correct", reward: "+180 MONAD" },
    { task: "Tesla stock above $300?", outcome: "Wrong", reward: "-50 MONAD" }
  ];

  const isTopThree = rank <= 3;

  const rankBadgeColors = {
    1: 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black',
    2: 'bg-gradient-to-r from-gray-300 to-gray-400 text-black',
    3: 'bg-gradient-to-r from-orange-600 to-orange-700 text-white'
  };

  const rankIcons = {
    1: '👑',
    2: '🥈',
    3: '🥉'
  };

  const rankLabels = {
    1: 'First place',
    2: 'Second place',
    3: 'Third place'
  };

  const tooltipId = `tooltip-${agentName.replace(/\s+/g, '-').toLowerCase()}-${rank}`;

  const handleToggleTooltip = () => {
    setShowTooltip(prev => !prev);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div
        onClick={onClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`${agentName}, rank ${rank}, ${accuracy}% accuracy, ${tasksCompleted} tasks completed, ${monadEarned} MONAD earned`}
        aria-describedby={showTooltip ? tooltipId : undefined}
        className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 items-center p-3 sm:p-4 rounded-lg cursor-pointer transition-all duration-300 ${
          isTopThree
            ? 'bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/30 hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-cyan-500/50'
            : 'bg-[#111] border border-gray-700/30 hover:border-cyan-500/40 hover:bg-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-cyan-500/30'
        }`}
      >
        {/* Rank */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isTopThree ? (
            <div 
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${rankBadgeColors[rank]} flex items-center justify-center font-bold text-base sm:text-lg shadow-lg`}
              aria-label={rankLabels[rank]}
              role="img"
            >
              {rankIcons[rank]}
            </div>
          ) : (
            <div 
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center font-bold text-sm sm:text-base text-gray-400"
              aria-label={`Rank ${rank}`}
            >
              {rank}
            </div>
          )}
        </div>

        {/* Agent Name */}
        <div className="col-span-1">
          <div className={`font-bold text-sm sm:text-base md:text-lg ${isTopThree ? 'text-cyan-400' : 'text-white'}`}>
            {agentName}
          </div>
          {isTopThree && (
            <div className="text-[10px] sm:text-xs text-cyan-500/70">Top Performer</div>
          )}
        </div>

        {/* Accuracy */}
        <div className="col-span-2 sm:col-span-1">
          <div className="text-xs sm:text-sm text-gray-400 mb-1">Accuracy</div>
          <div className="flex items-center gap-2">
            <div className={`text-base sm:text-lg font-bold ${isTopThree ? 'text-cyan-400' : 'text-green-400'}`}>
              {accuracy}%
            </div>
            <div className="flex-1 max-w-[60px] sm:max-w-[80px]">
              <div className="w-full bg-gray-800 rounded-full h-1.5 sm:h-2 overflow-hidden">
                <div
                  className={`h-full ${isTopThree ? 'bg-gradient-to-r from-cyan-500 to-teal-500' : 'bg-green-500'} transition-all duration-1000`}
                  style={{ width: `${accuracy}%` }}
                  role="progressbar"
                  aria-valuenow={accuracy}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-label={`${accuracy}% accuracy`}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Completed */}
        <div>
          <div className="text-xs sm:text-sm text-gray-400 mb-1">Tasks</div>
          <div className={`text-base sm:text-lg font-bold ${isTopThree ? 'text-cyan-400' : 'text-white'}`}>
            {tasksCompleted}
          </div>
        </div>

        {/* MONAD Earned */}
        <div className="text-right">
          <div className="text-xs sm:text-sm text-gray-400 mb-1">Earned</div>
          <div className={`text-sm sm:text-base md:text-lg font-bold ${isTopThree ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400' : 'text-green-400'}`}>
            <span className="hidden sm:inline">{monadEarned.toLocaleString()} MONAD</span>
            <span className="sm:hidden">{monadEarned.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div 
          id={tooltipId}
          role="tooltip"
          className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-[#0a0a0a] border border-cyan-400/50 rounded-lg p-3 sm:p-4 shadow-xl z-10 w-[90vw] sm:w-auto sm:min-w-[400px] max-w-[500px] opacity-0 animate-[fadeIn_0.2s_ease-out_forwards]"
        >
          <div className="text-xs sm:text-sm text-cyan-400 font-semibold mb-2 sm:mb-3">Recent Activity</div>
          <div className="space-y-2">
            {recentTasks.map((task, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 p-2 bg-[#111] rounded border border-gray-700/50">
                <div className="flex-1 w-full sm:w-auto">
                  <div className="text-xs text-gray-300 mb-1">{task.task}</div>
                  <div className={`text-xs font-semibold ${task.outcome === 'Correct' ? 'text-green-400' : 'text-red-400'}`}>
                    {task.outcome}
                  </div>
                </div>
                <div className={`text-sm font-bold ${task.reward.startsWith('+') ? 'text-green-400' : 'text-red-400'} self-end sm:self-auto`}>
                  {task.reward}
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-cyan-400/50"></div>
        </div>
      )}
    </div>
  );
};

export default LeaderboardRow;
    
