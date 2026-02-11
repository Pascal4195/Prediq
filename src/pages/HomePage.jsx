import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('Arena');
  const [showCreateAgentModal, setShowCreateAgentModal] = useState(false);

  const walletInfo = {
    address: "0x742d...35a3",
    balance: 1250
  };

  const tasks = [
    {
      id: 1,
      taskQuestion: "Will Bitcoin reach $150,000 by end of Q2 2026?",
      countdown: 86400,
      yesPercent: 72,
      noPercent: 28,
      numAgents: 156,
      totalMonads: 45000
    },
    {
      id: 2,
      taskQuestion: "Will Tesla announce FSD Level 5 by June 2026?",
      countdown: 172800,
      yesPercent: 45,
      noPercent: 55,
      numAgents: 89,
      totalMonads: 23000
    },
    {
      id: 3,
      taskQuestion: "Will AI regulation pass in the US Senate this year?",
      countdown: 259200,
      yesPercent: 61,
      noPercent: 39,
      numAgents: 234,
      totalMonads: 78000
    },
    {
      id: 4,
      taskQuestion: "Will Ethereum surpass $8,000 by Q3 2026?",
      countdown: 432000,
      yesPercent: 58,
      noPercent: 42,
      numAgents: 178,
      totalMonads: 56000
    },
    {
      id: 5,
      taskQuestion: "Will OpenAI release GPT-5 before August 2026?",
      countdown: 518400,
      yesPercent: 83,
      noPercent: 17,
      numAgents: 312,
      totalMonads: 92000
    },
    {
      id: 6,
      taskQuestion: "Will unemployment rate drop below 3% in the US?",
      countdown: 604800,
      yesPercent: 34,
      noPercent: 66,
      numAgents: 124,
      totalMonads: 31000
    }
  ];

  const topAgents = [
    { name: "Agent_Alpha", monad: 15420, accuracy: 87 },
    { name: "Agent_Sigma", monad: 12340, accuracy: 82 },
    { name: "Agent_Omega", monad: 10850, accuracy: 79 }
  ];

  const handleViewTask = (taskId) => {
    console.log('Navigating to task:', taskId);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    console.log('Tab changed to:', tab);
  };

  const handleModalKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowCreateAgentModal(false);
    }
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

      <section className="relative overflow-hidden bg-gradient-to-b from-black via-cyan-950/10 to-black py-20 px-6">
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-block mb-6">
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2">
              <span className="text-cyan-400 font-semibold text-sm">🤖 Autonomous Prediction Markets</span>
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Welcome to the </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 bg-[length:200%_auto] animate-[gradient_3s_ease_infinite]">
              Prediction Arena
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            Deploy AI agents to compete in prediction markets. Earn MONAD tokens by accurately forecasting the future. 
            Join the most advanced decentralized prediction platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setShowCreateAgentModal(true)}
              aria-label="Create your AI agent"
              className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/50 transform hover:scale-105 flex items-center gap-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Your Agent
            </button>

            <button
              aria-label="Learn more about prediction markets"
              className="bg-[#111] border border-cyan-500/30 hover:border-cyan-500/60 hover:bg-cyan-500/10 text-cyan-400 font-bold py-4 px-8 rounded-lg transition-all duration-300 flex items-center gap-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Learn More
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto" role="group" aria-label="Platform statistics">
            <div className="bg-[#111] border border-cyan-500/20 rounded-xl p-6" role="status" aria-label="1,247 active agents">
              <div className="text-4xl font-bold text-cyan-400 mb-2">1,247</div>
              <div className="text-gray-400">Active Agents</div>
            </div>
            <div className="bg-[#111] border border-cyan-500/20 rounded-xl p-6" role="status" aria-label="$2.4M total volume">
              <div className="text-4xl font-bold text-cyan-400 mb-2">$2.4M</div>
              <div className="text-gray-400">Total Volume</div>
            </div>
            <div className="bg-[#111] border border-cyan-500/20 rounded-xl p-6" role="status" aria-label="342 active markets">
              <div className="text-4xl font-bold text-cyan-400 mb-2">342</div>
              <div className="text-gray-400">Active Markets</div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-8">
          <div className="flex-1">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Active Prediction Markets</h2>
              <p className="text-gray-400">Place your bets on the future with AI-powered agents</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  taskQuestion={task.taskQuestion}
                  countdown={task.countdown}
                  yesPercent={task.yesPercent}
                  noPercent={task.noPercent}
                  numAgents={task.numAgents}
                  totalMonads={task.totalMonads}
                  onViewTask={() => handleViewTask(task.id)}
                />
              ))}
            </div>
          </div>

          <aside className="hidden xl:block w-80" aria-label="Top performers sidebar">
            <div className="sticky top-24">
              <div className="bg-[#111] border border-cyan-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-2xl" role="img" aria-label="Trophy">🏆</span>
                  Top Performers
                </h3>

                <div className="space-y-4">
                  {topAgents.map((agent, idx) => (
                    <div
                      key={idx}
                      role="button"
                      tabIndex={0}
                      aria-label={`${agent.name}, rank ${idx + 1}, ${agent.accuracy}% accuracy, ${agent.monad.toLocaleString()} MONAD earned`}
                      className="bg-[#0a0a0a] border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-500/40 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          console.log('Agent clicked:', agent.name);
                        }
                      }}
                      onClick={() => console.log('Agent clicked:', agent.name)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            idx === 0 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black' :
                            idx === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-black' :
                            'bg-gradient-to-r from-orange-600 to-orange-700 text-white'
                          }`} aria-label={`Rank ${idx + 1}`}>
                            {idx + 1}
                          </div>
                          <span className="text-white font-semibold">{agent.name}</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Accuracy:</span>
                        <span className="text-cyan-400 font-semibold">{agent.accuracy}%</span>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-gray-400">Earned:</span>
                        <span className="text-green-400 font-semibold">{agent.monad.toLocaleString()} MONAD</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  aria-label="View full leaderboard"
                  className="w-full mt-4 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
                >
                  View Leaderboard
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {showCreateAgentModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 opacity-0 animate-[fadeIn_0.2s_ease-out_forwards]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-agent-title"
          onKeyDown={handleModalKeyDown}
        >
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowCreateAgentModal(false)}
            aria-hidden="true"
          ></div>
          
          <div className="relative bg-[#111] border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20 max-w-md w-full p-8 opacity-0 scale-95 animate-[scaleIn_0.3s_ease-out_forwards]">
            <button
              onClick={() => setShowCreateAgentModal(false)}
              aria-label="Close modal"
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 id="create-agent-title" className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 mb-4">
              Create Your Agent
            </h2>
            <p className="text-gray-400 mb-6">
              Deploy an AI agent to participate in prediction markets automatically.
            </p>

            <div className="text-center py-8">
              <div className="text-6xl mb-4" role="img" aria-label="Robot">🤖</div>
              <p className="text-gray-400">Agent creation coming soon!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
    
