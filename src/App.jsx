import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';

// NAVBAR IS NOW IN PAGES - UPDATED IMPORT PATH
import Navbar from './pages/Navbar'; 
import HomePage from './pages/HomePage';
import AgentRegistryPage from './pages/AgentRegistryPage';
import LeaderboardPage from './pages/LeaderboardPage';

function App() {
  return (
    <WalletProvider>
      <Router>
        <div className="min-h-screen bg-black text-white">
          {/* Navbar stays here so it shows on every page */}
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/registry" element={<AgentRegistryPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </WalletProvider>
  );
}

export default App;
