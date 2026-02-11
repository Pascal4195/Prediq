import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import AgentCard from '../components/AgentCard';

const AgentRegistryPage = () => {
  const [activeTab, setActiveTab] = useState('Agents');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStrategy, setFilterStrategy] = useState('All');
  const [apiKeys, setApiKeys] = useState([
    { id: 1, agentName: 'Agent_Alpha', key: 'pk_live_51Hx...3kL2', created: '2024-01-15', status: 'Active' },
    { id: 2, agentName: 'Agent_Sigma', key: 'pk_live_72Ky...9mN4', created: '2024-01-10', status: 'Active' },
    { id: 3, agentName: 'Agent_Beta', key: 'pk_live_93Pz...7qR8', created: '2024-01-05', status: 'Revoked' }
  ]);

  const walletInfo = {
    address: "0x742d...35a3",
    balance: 1250
  };

  const agents = [
    {
      id: 1,
      agentName: "Agent_Alpha",
      strategyType: "Momentum Trader",
      accuracy: 87.5,
      monadEarned: 15420,
      status: "Active"
    },
    {
      id: 2,
      agentName: "Agent_Sigma",
      strategyType: "Contrarian",
      accuracy: 82.3,
      monadEarned: 12340,
      status: "Active"
    },
    {
      id: 3,
      agentName: "Agent_Beta",
      strategyType: "Technical Analysis",
      accuracy: 79.8,
      monadEarned: 10850,
      status: "Idle"
    },
    {
      id: 4,
      agentName: "Agent_Omega",
      strategyType: "Sentiment Analysis",
      accuracy: 85.1,
      monadEarned: 13920,
      status: "Active"
    },
    {
      id: 5,
      agentName: "Agent_Gamma",
      strategyType: "Fundamental",
      accuracy: 76.4,
      monadEarned: 8650,
      status: "Active"
    },
    {
      id: 6,
      agentName: "Agent_Delta",
      strategyType: "Arbitrage",
      accuracy: 91.2,
      monadEarned: 18750,
      status: "Active"
    }
  ];

  const strategies = ['All', 'Momentum Trader', 'Contrarian', 'Technical Analysis', 'Sentiment Analysis', 'Fundamental', 'Arbitrage'];

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.agentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStrategy === 'All' || agent.strategyType === filterStrategy;
    return matchesSearch && matchesFilter;
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    console.log('Tab changed to:', tab);
  };

  const handleGenerateKey = (agentName) => {
    console.log('Generate key for:', agentName);
    const newKey = {
      id: apiKeys.length + 1,
      agentName,
      key: `pk_live_${Math.random().toString(36).substring(2, 10)}...${Math.random().toString(36).substring(2, 6)}`,
      created: new Date().toISOString().split('T')[0],
      status: 'Active'
    };
    setApiKeys([...apiKeys, newKey]);
  };

  const handleRevokeKey = (keyId) => {
    console.log('Revoke key:', keyId);
    setApiKeys(apiKeys.map(key => 
      key.id === keyId ? { ...key, status: 'Revoked' } : key
    ));
  };

  const handleViewActivity = (agentId) => {
    console.log('View activity for agent:', agentId);
  };

  const handleCopyKey = (key) => {
    navigator.clipboard.writeText(key);
    console.log('Copied key:', key);
  };

  const handleModalKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowCreateModal(false);
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

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Agent Registry</h1>
              <p className="text-gray-400">Manage your AI prediction agents and API keys</p>
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              aria-label="Create new agent"
              className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/50 transform hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create New Agent
            </button>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search agents by name..."
                aria-label="Search agents by name"
                className="w-full bg-[#111] border border-cyan-500/30 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 rounded-lg px-4 py-3 pl-12 text-white placeholder-gray-500 transition-all duration-300 outline-none"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <select
              value={filterStrategy}
              onChange={(e) => setFilterStrategy(e.target.value)}
              aria-label="Filter agents by strategy type"
              className="bg-[#111] border border-cyan-500/30 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 rounded-lg px-4 py-3 text-white outline-none transition-all duration-300 cursor-pointer"
            >
              {strategies.map(strategy => (
                <option key={strategy} value={strategy} className="bg-[#111]">
                  {strategy === 'All' ? 'All Strategies' : strategy}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8" role="group" aria-label="Agent statistics overview">
          <div className="bg-[#111] border border-cyan-500/20 rounded-xl p-4" role="status" aria-label={`Total agents: ${agents.length}`}>
            <div className="text-sm text-gray-400 mb-1">Total Agents</div>
            <div className="text-3xl font-bold text-cyan-400">{agents.length}</div>
          </div>
          <div className="bg-[#111] border border-cyan-500/20 rounded-xl p-4" role="status" aria-label={`Active agents: ${agents.filter(a => a.status === 'Active').length}`}>
            <div className="text-sm text-gray-400 mb-1">Active Agents</div>
            <div className="text-3xl font-bold text-green-400">
              {agents.filter(a => a.status === 'Active').length}
            </div>
          </div>
          <div className="bg-[#111] border border-cyan-500/20 rounded-xl p-4" role="status" aria-label={`Average accuracy: ${(agents.reduce((sum, a) => sum + a.accuracy, 0) / agents.length).toFixed(1)}%`}>
            <div className="text-sm text-gray-400 mb-1">Avg Accuracy</div>
            <div className="text-3xl font-bold text-cyan-400">
              {(agents.reduce((sum, a) => sum + a.accuracy, 0) / agents.length).toFixed(1)}%
            </div>
          </div>
          <div className="bg-[#111] border border-cyan-500/20 rounded-xl p-4" role="status" aria-label={`Total earned: ${agents.reduce((sum, a) => sum + a.monadEarned, 0).toLocaleString()} MONAD`}>
            <div className="text-sm text-gray-400 mb-1">Total Earned</div>
            <div className="text-3xl font-bold text-green-400">
              {agents.reduce((sum, a) => sum + a.monadEarned, 0).toLocaleString()}
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Your Agents</h2>
          
          {filteredAgents.length === 0 ? (
            <div className="bg-[#111] border border-cyan-500/30 rounded-xl p-12 text-center">
              <div className="text-6xl mb-4" role="img" aria-label="Search icon">🔍</div>
              <h3 className="text-xl font-bold text-white mb-2">No agents found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agentName={agent.agentName}
                  strategyType={agent.strategyType}
                  accuracy={agent.accuracy}
                  monadEarned={agent.monadEarned}
                  status={agent.status}
                  onGenerateKey={() => handleGenerateKey(agent.agentName)}
                  onRevokeKey={() => handleRevokeKey(agent.id)}
                  onViewActivity={() => handleViewActivity(agent.id)}
                />
              ))}
            </div>
          )}
        </div>

        <section className="bg-[#111] border border-cyan-500/30 rounded-2xl p-8" aria-labelledby="api-keys-heading">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 id="api-keys-heading" className="text-2xl font-bold text-white mb-2">API Keys</h2>
              <p className="text-gray-400">Manage your agent API keys for programmatic access</p>
            </div>

            <div className="relative group">
              <button aria-label="API keys information" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              
              <div className="absolute right-0 top-full mt-2 bg-[#0a0a0a] border border-cyan-400/50 rounded-lg p-4 shadow-xl min-w-[300px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10" role="tooltip">
                <div className="text-sm text-cyan-400 font-semibold mb-2">About API Keys</div>
                <div className="text-xs text-gray-300 leading-relaxed">
                  API keys allow your agents to interact with prediction markets programmatically. 
                  Keep your keys secure and never share them publicly. You can revoke keys at any time.
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {apiKeys.map((key) => (
              <div
                key={key.id}
                className="bg-[#0a0a0a] border border-cyan-500/20 rounded-lg p-5 hover:border-cyan-500/40 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-white font-semibold">{key.agentName}</div>
                      <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        key.status === 'Active' 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                      }`} role="status" aria-label={`Status: ${key.status}`}>
                        {key.status}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-2 bg-gray-800 rounded px-3 py-2 font-mono text-sm text-gray-300">
                        <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                        {key.key}
                      </div>

                      <button
                        onClick={() => handleCopyKey(key.key)}
                        aria-label={`Copy API key for ${key.agentName}`}
                        className="text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>

                    <div className="text-xs text-gray-500">Created: {key.created}</div>
                  </div>

                  {key.status === 'Active' && (
                    <button
                      onClick={() => handleRevokeKey(key.id)}
                      aria-label={`Revoke API key for ${key.agentName}`}
                      className="ml-4 bg-red-600/20 border border-red-500/30 hover:bg-red-600/30 hover:border-red-500/50 text-red-400 font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                    >
                      Revoke
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {apiKeys.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4" role="img" aria-label="Key icon">🔑</div>
              <h3 className="text-xl font-bold text-white mb-2">No API keys yet</h3>
              <p className="text-gray-400">Generate an API key from your agent cards above</p>
            </div>
          )}
        </section>
      </main>

      {showCreateModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 opacity-0 animate-[fadeIn_0.2s_ease-out_forwards]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-agent-title"
          onKeyDown={handleModalKeyDown}
        >
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowCreateModal(false)}
            aria-hidden="true"
          ></div>
          
          <div className="relative bg-[#111] border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20 max-w-2xl w-full p-8 opacity-0 scale-95 animate-[scaleIn_0.3s_ease-out_forwards]">
            <button
              onClick={() => setShowCreateModal(false)}
              aria-label="Close modal"
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 id="create-agent-title" className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 mb-4">
              Create New Agent
            </h2>
            <p className="text-gray-400 mb-6">
              Configure your AI agent's strategy and parameters
            </p>

            <div className="space-y-4">
              <div>
                <label htmlFor="agent-name" className="block text-sm font-semibold text-cyan-400 mb-2">Agent Name</label>
                <input
                  id="agent-name"
                  type="text"
                  placeholder="Enter agent name..."
                  aria-label="Agent name"
                  className="w-full bg-[#0a0a0a] border border-cyan-500/30 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 transition-all duration-300 outline-none"
                />
              </div>

              <div>
                <label htmlFor="strategy-type" className="block text-sm font-semibold text-cyan-400 mb-2">Strategy Type</label>
                <select 
                  id="strategy-type"
                  aria-label="Select strategy type"
                  className="w-full bg-[#0a0a0a] border border-cyan-500/30 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 rounded-lg px-4 py-3 text-white outline-none transition-all duration-300 cursor-pointer"
                >
                  <option value="">Select a strategy...</option>
                  {strategies.filter(s => s !== 'All').map(strategy => (
                    <option key={strategy} value={strategy} className="bg-[#0a0a0a]">{strategy}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="initial-stake" className="block text-sm font-semibold text-cyan-400 mb-2">Initial Stake (MONAD)</label>
                <input
                  id="initial-stake"
                  type="number"
                  placeholder="Enter initial stake..."
                  aria-label="Initial stake amount"
                  aria-valuemin="0"
                  aria-valuemax={walletInfo.balance}
                  className="w-full bg-[#0a0a0a] border border-cyan-500/30 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 transition-all duration-300 outline-none"
                  min="0"
                  max={walletInfo.balance}
                />
              </div>

              <div className="pt-6 flex gap-4" role="group" aria-label="Modal actions">
                <button
                  onClick={() => setShowCreateModal(false)}
                  aria-label="Cancel agent creation"
                  className="flex-1 bg-[#0a0a0a] border border-gray-700/50 hover:border-cyan-500/50 hover:bg-[#1a1a1a] text-gray-400 hover:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log('Create agent');
                    setShowCreateModal(false);
                  }}
                  aria-label="Confirm agent creation"
                  className="flex-1 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
                >
                  Create Agent
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentRegistryPage;
         
