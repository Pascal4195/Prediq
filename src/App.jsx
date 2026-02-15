import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import LeaderboardPage from './pages/LeaderboardPage';
import AgentRegistryPage from './pages/AgentRegistry';

function App() {
  const [activeTab, setActiveTab] = useState('Arena');

  const renderPage = () => {
    switch (activeTab) {
      case 'Arena': return <HomePage />;
      case 'Leaderboard': return <LeaderboardPage />;
      case 'Registry': return <AgentRegistryPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="relative min-h-screen bg-black">
      {/* Global Terminal FX */}
      <div className="scanline" />
      
      {renderPage()}
    </div>
  );
}

export default App;
