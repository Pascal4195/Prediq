// ... (keep your imports)

function App() {
  // ... (keep your wallet logic)

  return (
    <div className="min-h-screen relative">
      {/* 🌌 THE CLOUDS LAYER */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[#020205]"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <nav className="relative z-10 p-8 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-cyan-500 rotate-45 flex items-center justify-center">
             <Zap className="-rotate-45 text-black" size={16} fill="currentColor" />
          </div>
          <span className="text-xl font-black tracking-tighter text-cyan-400">PREDIQ</span>
        </div>
        <button onClick={connectWallet} className="border border-white/20 px-4 py-1 text-[10px] uppercase tracking-widest bg-black/40 backdrop-blur-md">
          {account ? account.substring(0, 10) : "INITIALIZE_WALLET"}
        </button>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-24">
          <h1 className="text-7xl font-black mb-4 tracking-tighter uppercase italic">
            ELITE <span className="text-cyan-400">FORECASTING</span>
          </h1>
          <p className="text-[10px] tracking-[0.8em] text-slate-500 font-bold uppercase">Monad High-Speed Network</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {Object.entries(ASSET_MAP).map(([id, asset]) => (
            <div key={id} className="relative bg-[#08080c] border-l-2 border-cyan-500 p-10 elite-card-glow group">
              <div className="flex justify-between items-start mb-12">
                 <CryptoIcon name={asset.name} />
                 <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">MKT_{id}</span>
              </div>
              <h3 className="text-2xl font-black mb-6 italic tracking-tighter uppercase">{asset.name}</h3>
              <button className="w-full py-3 bg-white/5 border border-white/10 hover:bg-cyan-500 hover:text-black transition-all font-bold text-[10px] tracking-widest uppercase">
                OPEN TERMINAL
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
export default App;
