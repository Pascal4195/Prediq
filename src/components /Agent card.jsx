import React, { useState } from 'react';

const AgentCard = ({
  agentName = "Agent_Alpha",
  strategyType = "Contrarian",
  accuracy = 78.5,
  monadEarned = 3420,
  status = "Active",
  onGenerateKey = () => console.log('Generate key clicked'),
  onRevokeKey = () => console.log('Revoke key clicked'),
  onViewActivity = () => console.log('View activity clicked')
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const statusColors = {
    Active: 'bg-green-500',
    Idle: 'bg-gray-500'
  };

  const statusTextColors = {
    Active: 'text-green-400',
    Idle: 'text-gray-400'
  };

  const tooltipId = `tooltip-${agentName.replace(/\s+/g, '-').toLowerCase()}`;

  const handleToggleTooltip = () => {
    setShowTooltip(prev => !prev);
  };

  return (
    <div className="relative bg-[#111] border border-cyan-500/30 rounded-xl p-6 shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1 transition-all duration-300">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-white">{agentName}</h3>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 ${statusColors[status]} rounded-full animate-pulse`}></div>
            <span className={`text-sm font-semibold ${statusTextColors[status]}`}>
              {status}
            </span>
          </div>
        </div>
        <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 rounded-full px-3 py-1">
          <span className="text-sm text-cyan-400 font-semibold">{strategyType}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6 bg-[#0a0a0a] rounded-lg p-4 border border-cyan-500/10">
        <div>
          <div className="text-xs text-gray-500 mb-1">ACCURACY</div>
          <div className="text-2xl font-bold text-cyan-400">{accuracy}%</div>
          <div className="w-full bg-gray-800 rounded-full h-2 mt-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 transition-all duration-1000"
              style={{ width: `${accuracy}%` }}
            ></div>
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">MONAD EARNED</div>
          <div className="text-2xl font-bold text-green-400">{monadEarned.toLocaleString()}</div>
          <div className="text-xs text-gray-400 mt-2">Total rewards</div>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-3">
        <div className="relative">
          <button
            onClick={(e) => {
              handleToggleTooltip();
              onGenerateKey();
            }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onFocus={() => setShowTooltip(true)}
            onBlur={() => setShowTooltip(false)}
            aria-describedby={showTooltip ? tooltipId : undefined}
            className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            Generate API Key
          </button>

          {/* Tooltip */}
          {showTooltip && (
            <div 
              id={tooltipId}
              role="tooltip"
              className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-[#0a0a0a] border border-cyan-400/50 rounded-lg p-3 shadow-xl z-10 min-w-[240px] animate-fadeIn opacity-100"
            >
              <div className="text-xs text-cyan-400 font-semibold mb-1">API Key Usage</div>
              <div className="text-xs text-gray-300">
                Generate a unique API key to allow this agent to interact with prediction markets programmatically.
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-cyan-400/50"></div>
            </div>
          )}
        </div>

        <button
          onClick={onRevokeKey}
          aria-label={`Revoke API key for ${agentName}`}
          className="w-full bg-red-600/20 border border-red-500/30 hover:bg-red-600/30 hover:border-red-500/50 text-red-400 font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
          Revoke API Key
        </button>

        <button
          onClick={onViewActivity}
          aria-label={`View activity and stats for ${agentName}`}
          className="w-full bg-[#0a0a0a] border border-cyan-500/30 hover:border-cyan-500/60 hover:bg-cyan-500/10 text-cyan-400 font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          View Activity
        </button>
      </div>
    </div>
  );
};

export default AgentCard;
        
