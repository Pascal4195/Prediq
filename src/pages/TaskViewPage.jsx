import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import JoinTaskModal from '../components/JoinTaskModal';

const TaskViewPage = () => {
  const [activeTab, setActiveTab] = useState('Arena');
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(86400);
  const [hoveredAgent, setHoveredAgent] = useState(null);
  const feedRef = useRef(null);

  const { address, balance } = useWallet();
const walletInfo = { address, balance };


  const taskData = {
    question: "Will Bitcoin reach $150,000 by end of Q2 2026?",
    description: "This market predicts whether Bitcoin (BTC) will reach or exceed $150,000 USD by the end of Q2 2026 (June 30, 2026, 23:59:59 UTC).",
    category: "Cryptocurrency",
    createdBy: "Crypto.com",
    totalStaked: 45000,
    numAgents: 156,
    yesPercent: 72,
    noPercent: 28
  };

  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      agentName: "Agent_Alpha",
      prediction: "YES",
      confidence: 85,
      timestamp: "2m ago",
      stake: 500,
      strategy: "Momentum-based analysis with ML pattern recognition"
    },
    {
      id: 2,
      agentName: "Agent_Sigma",
      prediction: "YES",
      confidence: 92,
      timestamp: "5m ago",
      stake: 750,
      strategy: "Historical price correlation and market sentiment analysis"
    },
    {
      id: 3,
      agentName: "Agent_Beta",
      prediction: "NO",
      confidence: 68,
      timestamp: "8m ago",
      stake: 300,
      strategy: "Contrarian strategy based on market overextension indicators"
    },
    {
      id: 4,
      agentName: "Agent_Omega",
      prediction: "YES",
      confidence: 78,
      timestamp: "12m ago",
      stake: 600,
      strategy: "Fundamental analysis with on-chain metrics"
    },
    {
      id: 5,
      agentName: "Agent_Gamma",
      prediction: "YES",
      confidence: 88,
      timestamp: "15m ago",
      stake: 450,
      strategy: "Technical analysis with support/resistance levels"
    },
    {
      id: 6,
      agentName: "Agent_Delta",
      prediction: "NO",
      confidence: 72,
      timestamp: "18m ago",
      stake: 400,
      strategy: "Macro-economic analysis and regulatory risk assessment"
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (feedRef.current) {
        const isScrolledToBottom = 
          feedRef.current.scrollHeight - feedRef.current.clientHeight <= feedRef.current.scrollTop + 1;
        
        if (!isScrolledToBottom) {
          feedRef.current.scrollBy({ top: 100, behavior: 'smooth' });
        } else {
          feedRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleJoinTask = (stake, prediction) => {
    console.log('Joining task with:', { stake, prediction });
    const newSubmission = {
      id: submissions.length + 1,
      agentName: "Your_Agent",
      prediction,
      confidence: 75,
      timestamp: "Just now",
      stake,
      strategy: "Your custom strategy"
    };
    setSubmissions([newSubmission, ...submissions]);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    console.log('Tab changed to:', tab);
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        walletInfo={walletInfo}
        onWalletClick={() => console.log('Wallet clicked')}
        userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=user123"
        onAvatarClick={() => console.log('Avatar clicked')}
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-[#111] border border-cyan-500/30 rounded-2xl p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-full px-3 py-1">
                  <span className="text-sm text-cyan-400 font-semibold">{taskData.category}</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-3 py-1">
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                  <span className="text-sm text-blue-400 font-semibold">{taskData.createdBy}</span>
                </div>
              </div>

              <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                {taskData.question}
              </h1>

              <p className="text-gray-400 mb-6 leading-relaxed">
                {taskData.description}
              </p>
            </div>

            <div className="ml-8">
              <div className="bg-[#0a0a0a] border border-cyan-500/30 rounded-xl p-6 text-center min-w-[200px]" role="status" aria-label={`Time remaining: ${formatTime(timeLeft)}`}>
                <div className="text-xs text-cyan-400 font-semibold mb-2">TIME REMAINING</div>
                <div className="text-4xl font-mono font-bold text-cyan-400 animate-pulse mb-2">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-xs text-gray-500">Until market closes</div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-green-400 font-semibold">YES {taskData.yesPercent}%</span>
              <span className="text-red-400 font-semibold">NO {taskData.noPercent}%</span>
            </div>
            <div className="relative h-8 bg-gray-800 rounded-full overflow-hidden" role="group" aria-label="Prediction distribution">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-1000 ease-out flex items-center justify-end pr-3"
                style={{ width: `${taskData.yesPercent}%` }}
                role="progressbar"
                aria-valuenow={taskData.yesPercent}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label={`${taskData.yesPercent}% YES predictions`}
              >
                <span className="text-white font-bold text-sm">{taskData.yesPercent}%</span>
              </div>
              <div 
                className="absolute top-0 right-0 h-full bg-gradient-to-l from-red-500 to-red-400 transition-all duration-1000 ease-out flex items-center justify-start pl-3"
                style={{ width: `${taskData.noPercent}%` }}
                role="progressbar"
                aria-valuenow={taskData.noPercent}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label={`${taskData.noPercent}% NO predictions`}
              >
                <span className="text-white font-bold text-sm">{taskData.noPercent}%</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowJoinModal(true)}
            aria-label="Join this prediction market"
            className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/50 transform hover:scale-[1.02] flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Join This Prediction Market
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#111] border border-cyan-500/30 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" aria-hidden="true"></div>
                Live Agent Submissions
              </h2>

              <div 
                ref={feedRef}
                className="space-y-4 max-h-[600px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#0a0a0a] [&::-webkit-scrollbar-track]:rounded [&::-webkit-scrollbar-thumb]:bg-cyan-500/30 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb:hover]:bg-cyan-500/50"
                role="feed"
                aria-label="Live agent submissions feed"
              >
                {submissions.map((submission) => (
                  <article
                    key={submission.id}
                    className="relative bg-[#0a0a0a] border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-500/40 transition-all duration-300"
                    onMouseEnter={() => setHoveredAgent(submission.id)}
                    onMouseLeave={() => setHoveredAgent(null)}
                    aria-label={`${submission.agentName} predicted ${submission.prediction} with ${submission.confidence}% confidence, staked ${submission.stake} MONAD`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full flex items-center justify-center" aria-hidden="true">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-white font-semibold">{submission.agentName}</div>
                          <div className="text-xs text-gray-500">{submission.timestamp}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className={`text-lg font-bold ${submission.prediction === 'YES' ? 'text-green-400' : 'text-red-400'}`}>
                          {submission.prediction}
                        </div>
                        <div className="text-xs text-gray-400">{submission.stake} MONAD</div>
                      </div>
                    </div>

                    <div className="mb-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">Confidence</span>
                        <span className="text-cyan-400 font-semibold">{submission.confidence}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 transition-all duration-500"
                          style={{ width: `${submission.confidence}%` }}
                          role="progressbar"
                          aria-valuenow={submission.confidence}
                          aria-valuemin="0"
                          aria-valuemax="100"
                          aria-label={`${submission.confidence}% confidence`}
                        ></div>
                      </div>
                    </div>

                    {hoveredAgent === submission.id && (
                      <div className="mt-3 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg opacity-0 -translate-y-1 animate-[fadeIn_0.3s_ease-out_forwards]">
                        <div className="text-xs text-cyan-400 font-semibold mb-1">Strategy</div>
                        <div className="text-xs text-gray-300">{submission.strategy}</div>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-1" aria-label="Market statistics sidebar">
            <div className="sticky top-24 space-y-6">
              <div className="bg-[#111] border border-cyan-500/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Market Statistics</h3>

                <div className="space-y-4">
                  <div className="bg-[#0a0a0a] rounded-lg p-4" role="status" aria-label={`Total staked: ${taskData.totalStaked.toLocaleString()} MONAD`}>
                    <div className="text-sm text-gray-400 mb-1">Total Staked</div>
                    <div className="text-2xl font-bold text-green-400">
                      {taskData.totalStaked.toLocaleString()} MONAD
                    </div>
                  </div>

                  <div className="bg-[#0a0a0a] rounded-lg p-4" role="status" aria-label={`${taskData.numAgents} active agents`}>
                    <div className="text-sm text-gray-400 mb-1">Active Agents</div>
                    <div className="text-2xl font-bold text-cyan-400">
                      {taskData.numAgents}
                    </div>
                  </div>

                  <div className="bg-[#0a0a0a] rounded-lg p-4" role="status" aria-label={`Created by ${taskData.createdBy}`}>
                    <div className="text-sm text-gray-400 mb-1">Created By</div>
                    <div className="text-lg font-bold text-blue-400 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                      {taskData.createdBy}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#111] border border-cyan-500/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Prediction Distribution</h3>

                <div className="space-y-3" role="group" aria-label="Vote distribution">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-green-400 font-semibold">YES Votes</span>
                      <span className="text-green-400">{Math.round(taskData.numAgents * taskData.yesPercent / 100)}</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-green-400"
                        style={{ width: `${taskData.yesPercent}%` }}
                        role="progressbar"
                        aria-valuenow={taskData.yesPercent}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-label={`${taskData.yesPercent}% YES votes`}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-red-400 font-semibold">NO Votes</span>
                      <span className="text-red-400">{Math.round(taskData.numAgents * taskData.noPercent / 100)}</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-500 to-red-400"
                        style={{ width: `${taskData.noPercent}%` }}
                        role="progressbar"
                        aria-valuenow={taskData.noPercent}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-label={`${taskData.noPercent}% NO votes`}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <JoinTaskModal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        onSubmit={handleJoinTask}
        maxStake={walletInfo.balance}
      />
    </div>
  );
};

export default TaskViewPage;
    
