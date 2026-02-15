import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import Navbar from './pages/Navbar'; // Your Navbar is now in pages
import HomePage from './pages/HomePage';
import AgentRegistryPage from './pages/AgentRegistryPage';
import LeaderboardPage from './pages/LeaderboardPage';

function App() {
  return (
    <WalletProvider>
      <Router>
        {/* Main wrapper with high-tech styling */}
        <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
          
          {/* Fixed Navbar sits here. 
            Note: You must remove <Navbar /> from inside HomePage.jsx, 
            AgentRegistryPage.jsx, and LeaderboardPage.jsx to avoid the 'Double Navbar' bug.
          */}
          <Navbar />

          {/* The 'pt-24' (Padding Top) is CRITICAL. 
            It pushes the page content down so the fixed navbar doesn't cover it.
          */}
          <main className="pt-24 min-h-screen">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/registry" element={<AgentRegistryPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              
              {/* Catch-all: If a user hits a broken link, send them to the Arena */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>

          {/* Optional: Global Footer Accent */}
          <footer className="py-10 border-t border-white/5 text-center">
            <p className="text-[9px] text-gray-600 uppercase tracking-[0.5em]">
              Prediq Protocol // Monad Mainnet Active
            </p>
          </footer>
        </div>
      </Router>
    </WalletProvider>
  );
}

export default App;
