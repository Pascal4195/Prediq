import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import HomePage from './pages/HomePage';
// import AgentRegistryPage from './pages/AgentRegistryPage'; // Uncomment when ready

function App() {
  return (
    <WalletProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* The HomePage now handles its own Navbar and Wallet state internally via hooks */}
            <Route path="/" element={<HomePage />} />
            
            {/* <Route path="/registry" element={<AgentRegistryPage />} /> 
            */}
          </Routes>
        </div>
      </Router>
    </WalletProvider>
  );
}

export default App;
