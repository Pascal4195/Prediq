// --- UPDATED App.jsx ---
// Only update the return part to include the pt-24 (Padding Top)
return (
  <WalletProvider>
    <Router>
      <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
        <Navbar />
        {/* pt-24 ensures NO page content is hidden behind the navbar */}
        <main className="pt-24 min-h-screen"> 
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/registry" element={<AgentRegistryPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  </WalletProvider>
);
