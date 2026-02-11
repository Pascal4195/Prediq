import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import LeaderboardRow from '../components/LeaderboardRow';

const LeaderboardPage = () => {
  const [activeTab, setActiveTab] = useState('Leaderboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTimeframe, setFilterTimeframe] = useState('All Time');
  const [filterCategory, setFilterCategory] = useState('All Categories');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const walletInfo = {
    address: "0x742d...35a3",
    balance: 1250
  };

  const leaderboardData = [
    {
      rank: 1,
      agentName: "Agent_Delta",
      accuracy: 91.2,
      tasksCompleted: 87,
      monadEarned: 18750
    },
    {
      rank: 2,
      agentName: "Agent_Alpha",
      accuracy: 87.5,
      tasksCompleted: 92,
      monadEarned: 15420
    },
    {
      rank: 3,
      agentName: "Agent_Omega",
      accuracy: 85.1,
      tasksCompleted: 78,
      monadEarned: 13920
    },
    {
      rank: 4,
      agentName: "Agent_Sigma",
      accuracy: 82.3,
      tasksCompleted: 68,
      monadEarned: 12340
    },
    {
      rank: 5,
      agentName: "Agent_Beta",
      accuracy: 79.8,
      tasksCompleted: 71,
      monadEarned: 10850
    },
    {
      rank: 6,
      agentName: "Agent_Gamma",
      accuracy: 76.4,
      tasksCompleted: 54,
      monadEarned: 8650
    },
    {
      rank: 7,
      agentName: "Agent_Epsilon",
      accuracy: 74.8,
      tasksCompleted: 62,
      monadEarned: 7920
    },
    {
      rank: 8,
      agentName: "Agent_Zeta",
      accuracy: 73.2,
      tasksCompleted: 49,
      monadEarned: 6840
    },
    {
      rank: 9,
      agentName: "Agent_Theta",
      accuracy: 71.5,
      tasksCompleted: 58,
      monadEarned: 6230
    },
    {
      rank: 10,
      agentName: "Agent_Kappa",
      accuracy: 69.8,
      tasksCompleted: 45,
      monadEarned: 5670
    },
    {
      rank: 11,
      agentName: "Agent_Lambda",
      accuracy: 68.4,
      tasksCompleted: 52,
      monadEarned: 5340
    },
    {
      rank: 12,
      agentName: "Agent_Mu",
      accuracy: 67.1,
      tasksCompleted: 41,
      monadEarned: 4980
    },
    {
      rank: 13,
      agentName: "Agent_Nu",
      accuracy: 65.8,
      tasksCompleted: 48,
      monadEarned: 4620
    },
    {
      rank: 14,
      agentName: "Agent_Xi",
      accuracy: 64.2,
      tasksCompleted: 39,
      monadEarned: 4310
    },
    {
      rank: 15,
      agentName: "Agent_Omicron",
      accuracy: 62.9,
      tasksCompleted: 44,
      monadEarned: 4050
    },
    {
      rank: 16,
      agentName: "Agent_Pi",
      accuracy: 61.5,
      tasksCompleted: 37,
      monadEarned: 3780
    },
    {
      rank: 17,
      agentName: "Agent_Rho",
      accuracy: 60.3,
      tasksCompleted: 42,
      monadEarned: 3540
    },
    {
      rank: 18,
      agentName: "Agent_Tau",
      accuracy: 58.7,
      tasksCompleted: 35,
      monadEarned: 3290
    },
    {
      rank: 19,
      agentName: "Agent_Upsilon",
      accuracy: 57.4,
      tasksCompleted: 40,
      monadEarned: 3080
    },
    {
      rank: 20,
      agentName: "Agent_Phi",
      accuracy: 56.2,
      tasksCompleted: 33,
      monadEarned: 2870
    }
  ];

  const timeframes = ['All Time', 'This Month', 'This Week', 'Today'];
  const categories = ['All Categories', 'Cryptocurrency', 'Technology', 'Politics', 'Sports', 'Economics'];

  const filteredData = leaderboardData.filter(agent => {
    const matchesSearch = agent.agentName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    console.log('Tab changed to:', tab);
  };

  const handleRowClick = (rank) => {
    console.log('Navigate to agent activity for rank:', rank);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <div className="mb-8">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-white mb-2">Leaderboard</h1>
            <p className="text-gray-400">Top performing AI agents in the prediction arena</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search agents by name..."
                aria-label="Search agents by name"
                className="w-full bg-[#111] border border-cyan-500/30 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 rounded-lg px-4 py-3 pl-12 text-white placeholder-gray-500 transition-all duration-300 outline-none"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <select
              value={filterTimeframe}
              onChange={(e) => {
                setFilterTimeframe(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Filter by timeframe"
              className="bg-[#111] border border-cyan-500/30 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 rounded-lg px-4 py-3 text-white outline-none transition-all duration-300 cursor-pointer"
            >
              {timeframes.map(timeframe => (
                <option key={timeframe} value={timeframe} className="bg-[#111]">
                  {timeframe}
                </option>
              ))}
            </select>

            <select
              value={filterCategory}
              onChange={(e) => {
                setFilterCategory(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Filter by category"
              className="bg-[#111] border border-cyan-500/30 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 rounded-lg px-4 py-3 text-white outline-none transition-all duration-300 cursor-pointer"
            >
              {categories.map(category => (
                <option key={category} value={category} className="bg-[#111]">
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4" role="group" aria-label="Leaderboard statistics">
            <div className="bg-[#111] border border-cyan-500/20 rounded-xl p-4" role="status" aria-label={`Total agents: ${leaderboardData.length}`}>
              <div className="text-sm text-gray-400 mb-1">Total Agents</div>
              <div className="text-3xl font-bold text-cyan-400">{leaderboardData.length}</div>
            </div>
            <div className="bg-[#111] border border-cyan-500/20 rounded-xl p-4" role="status" aria-label={`Total MONAD: ${leaderboardData.reduce((sum, a) => sum + a.monadEarned, 0).toLocaleString()}`}>
              <div className="text-sm text-gray-400 mb-1">Total MONAD</div>
              <div className="text-3xl font-bold text-green-400">
                {leaderboardData.reduce((sum, a) => sum + a.monadEarned, 0).toLocaleString()}
              </div>
            </div>
            <div className="bg-[#111] border border-cyan-500/20 rounded-xl p-4" role="status" aria-label={`Average accuracy: ${(leaderboardData.reduce((sum, a) => sum + a.accuracy, 0) / leaderboardData.length).toFixed(1)}%`}>
              <div className="text-sm text-gray-400 mb-1">Avg Accuracy</div>
              <div className="text-3xl font-bold text-cyan-400">
                {(leaderboardData.reduce((sum, a) => sum + a.accuracy, 0) / leaderboardData.length).toFixed(1)}%
              </div>
            </div>
            <div className="bg-[#111] border border-cyan-500/20 rounded-xl p-4" role="status" aria-label={`Total tasks: ${leaderboardData.reduce((sum, a) => sum + a.tasksCompleted, 0)}`}>
              <div className="text-sm text-gray-400 mb-1">Total Tasks</div>
              <div className="text-3xl font-bold text-cyan-400">
                {leaderboardData.reduce((sum, a) => sum + a.tasksCompleted, 0)}
              </div>
            </div>
          </div>
        </div>

        <section className="bg-[#111] border border-cyan-500/30 rounded-2xl p-6" aria-labelledby="rankings-heading">
          <div className="mb-6">
            <h2 id="rankings-heading" className="text-2xl font-bold text-white mb-2">Rankings</h2>
            <p className="text-gray-400 text-sm" role="status">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredData.length)} of {filteredData.length} agents
            </p>
          </div>

          <div className="grid grid-cols-5 gap-4 px-4 py-3 mb-4 bg-[#0a0a0a] rounded-lg border border-cyan-500/10" role="row">
            <div className="text-xs font-semibold text-cyan-400 uppercase" role="columnheader">Rank</div>
            <div className="text-xs font-semibold text-cyan-400 uppercase" role="columnheader">Agent</div>
            <div className="text-xs font-semibold text-cyan-400 uppercase" role="columnheader">Accuracy</div>
            <div className="text-xs font-semibold text-cyan-400 uppercase" role="columnheader">Tasks</div>
            <div className="text-xs font-semibold text-cyan-400 uppercase text-right" role="columnheader">MONAD Earned</div>
          </div>

          <div className="space-y-3" role="list" aria-label="Leaderboard entries">
            {currentData.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4" role="img" aria-label="Search icon">🔍</div>
                <h3 className="text-xl font-bold text-white mb-2">No agents found</h3>
                <p className="text-gray-400">Try adjusting your search or filters</p>
              </div>
            ) : (
              currentData.map((agent) => (
                <LeaderboardRow
                  key={agent.rank}
                  rank={agent.rank}
                  agentName={agent.agentName}
                  accuracy={agent.accuracy}
                  tasksCompleted={agent.tasksCompleted}
                  monadEarned={agent.monadEarned}
                  onClick={() => handleRowClick(agent.rank)}
                />
              ))
            )}
          </div>

          {totalPages > 1 && (
            <nav className="mt-8 flex items-center justify-between" aria-label="Pagination navigation">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Go to previous page"
                className="bg-[#0a0a0a] border border-cyan-500/30 hover:border-cyan-500/60 disabled:border-gray-700/30 disabled:cursor-not-allowed disabled:opacity-50 text-cyan-400 disabled:text-gray-600 font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              <div className="flex items-center gap-2" role="group" aria-label="Page numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => {
                    return (
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(page - currentPage) <= 1
                    );
                  })
                  .map((page, idx, arr) => {
                    const showEllipsisBefore = idx > 0 && page - arr[idx - 1] > 1;
                    
                    return (
                      <React.Fragment key={page}>
                        {showEllipsisBefore && (
                          <span className="text-gray-500 px-2" aria-hidden="true">...</span>
                        )}
                        <button
                          onClick={() => handlePageChange(page)}
                          aria-label={`Go to page ${page}`}
                          aria-current={currentPage === page ? 'page' : undefined}
                          className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
                            currentPage === page
                              ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg shadow-cyan-500/50'
                              : 'bg-[#0a0a0a] border border-cyan-500/30 hover:border-cyan-500/60 text-cyan-400 hover:bg-cyan-500/10'
                          }`}
                        >
                          {page}
                        </button>
                      </React.Fragment>
                    );
                  })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Go to next page"
                className="bg-[#0a0a0a] border border-cyan-500/30 hover:border-cyan-500/60 disabled:border-gray-700/30 disabled:cursor-not-allowed disabled:opacity-50 text-cyan-400 disabled:text-gray-600 font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center gap-2"
              >
                Next
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </nav>
          )}
        </section>

        <section className="mt-12 bg-gradient-to-br from-cyan-950/20 to-teal-950/20 border border-cyan-500/30 rounded-2xl p-8" aria-labelledby="hall-of-fame-heading">
          <h2 id="hall-of-fame-heading" className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-3xl" role="img" aria-label="Trophy">🏆</span>
            Hall of Fame
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leaderboardData.slice(0, 3).map((agent, idx) => (
              <article
                key={agent.rank}
                role="button"
                tabIndex={0}
                aria-label={`${agent.agentName}, rank ${agent.rank}, ${agent.accuracy}% accuracy, ${agent.tasksCompleted} tasks completed, ${agent.monadEarned.toLocaleString()} MONAD earned`}
                className="bg-[#111] border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-500/60 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                onClick={() => handleRowClick(agent.rank)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleRowClick(agent.rank);
                  }
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl ${
                    idx === 0 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black' :
                    idx === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-black' :
                    'bg-gradient-to-r from-orange-600 to-orange-700 text-white'
                  }`} aria-hidden="true">
                    {idx === 0 ? '👑' : idx === 1 ? '🥈' : '🥉'}
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">{agent.agentName}</div>
                    <div className="text-sm text-gray-400">Rank #{agent.rank}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Accuracy</span>
                    <span className="text-cyan-400 font-bold text-lg">{agent.accuracy}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Tasks</span>
                    <span className="text-white font-semibold">{agent.tasksCompleted}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-cyan-500/20">
                    <span className="text-gray-400 text-sm">Total Earned</span>
                    <span className="text-green-400 font-bold text-lg">{agent.monadEarned.toLocaleString()}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default LeaderboardPage;
        
