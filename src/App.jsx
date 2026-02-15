import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AgentRegistryPage from './pages/AgentRegistryPage'; // Match your actual filename
import LeaderboardPage from './pages/LeaderboardPage';
import TaskViewPage from './pages/TaskViewPage';
import { WalletProvider } from './context/WalletContext';

function App() {
  return (
    <Router>
      <WalletProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/arena" element={<HomePage />} />
          <Route path="/registry" element={<AgentRegistryPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/task/:id" element={<TaskViewPage />} />
        </Routes>
      </WalletProvider>
    </Router>
  );
}

export default App;
