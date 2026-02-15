import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import Navbar from './pages/Navbar'; // Import from pages
import HomePage from './pages/HomePage';
import AgentRegistryPage from './pages/AgentRegistryPage';
import LeaderboardPage from './pages/LeaderboardPage';

function App() {
  return (
    <WalletProvider>
      <Router>
        <div className="min-h-screen bg-black text-white">
          {/* Centralized Navbar: Now you MUST remove <Navbar /> from HomePage, Registry, and Leaderboard files */}
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
