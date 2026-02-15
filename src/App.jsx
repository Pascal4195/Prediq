import React, { useState, useEffect } from 'react';
import { Zap, Wallet, Globe, Cpu } from 'lucide-react';
import { getProvider, ASSET_MAP } from './utils/eth';

function App() {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      const provider = getProvider();
      if (provider) {
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) setAccount(accounts[0].address);
      }
      setLoading(false);
    };
    check();
  }, []);

  const connectWallet = async () => {
    const provider = getProvider();
    if (!provider) return alert("Please use a Web3 browser!");
    const signer = await provider.getSigner();
    setAccount(await signer.getAddress());
  };

  if (loading) return <div style={{backgroundColor:'#020205', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', color:'#06b6d4', fontFamily:"'Orbitron', sans-serif"}}>LOADING_TERMINAL...</div>;

  return (
    <div style={{
      backgroundColor: '#020205',
      backgroundImage: 'radial-gradient(circle at center, #0c0c1e 0%, #020205 100%)', // Added the depth you see in 1000223437.jpg
      minHeight: '100vh',
      color: 'white',
      fontFamily: "'Orbitron', sans-serif",
      padding: '20px'
    }}>
      
      {/* NAV: Diamond Glow Logo */}
      <nav style={{maxWidth:'1200px', margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'20px 0'}}>
        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
          <div style={{width:'30px', height:'30px', border:'1.5px solid #06b6d4', display:'flex', alignItems:'center', justifyContent:'center', transform:'rotate(45deg)', boxShadow:'0 0 15px rgba(6,182,212,0.5)'}}>
            <Zap style={{transform:'rotate(-45deg)', color:'#06b6d4'}} size={16} fill="#06b6d4" />
          </div>
          <span style={{fontSize:'18px', fontWeight:'900', fontStyle:'italic', color:'#06b6d4', letterSpacing:'-1px'}}>PREDIQ</span>
        </div>
        <button onClick={connectWallet} style={{border:'1px solid rgba(255,255,255,0.2)', padding:'6px 14px', fontSize:'10px', fontWeight:'900', backgroundColor:'rgba(0,0,0,0.4)', color:'white', letterSpacing:'1px'}}>
          {account ? account.substring(0, 10).toUpperCase() : 'INITIALIZE_WALLET'}
        </button>
      </nav>

      {/* HEADER: Massive Styled Text */}
      <header style={{textAlign:'center', marginTop:'60px', marginBottom:'80px'}}>
        <h1 style={{fontSize:'clamp(40px, 8vw, 70px)', fontWeight:'900', fontStyle:'italic', margin:0, letterSpacing:'-2px', lineHeight:'1'}}>
          ELITE <span style={{
            background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>FORECASTING</span>
        </h1>
        <p style={{fontSize:'10px', letterSpacing:'0.7em', color:'#475569', fontWeight:'bold', marginTop:'15px'}}>MONAD HIGH-SPEED NETWORK</p>
      </header>

      {/* GRID: Horizontal, Solid, and Correct Spacing */}
      <div style={{display:'flex', gap:'25px', justifyContent:'center', overflowX:'auto', padding:'20px', scrollbarWidth:'none'}}>
        {Object.entries(ASSET_MAP).map(([id, asset]) => (
          <div key={id} style={{
            flexShrink:0, width:'320px', height:'220px', backgroundColor:'#0a0a0f', borderLeft:'4px solid #06b6d4', padding:'25px',
            display:'flex', flexDirection:'column', justifyContent:'space-between', boxShadow:'0 15px 40px rgba(0,0,0,0.6)'
          }}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              {/* STYLIZED ICON PATHS TO MATCH 1000223437.jpg */}
              <div style={{fontSize:'32px', fontWeight:'bold', color:'white'}}>
                {asset.symbol === 'BTC' ? '₿' : asset.symbol === 'ETH' ? 'Ξ' : 'M'}
              </div>
              <span style={{fontSize:'9px', color:'#334155', fontWeight:'bold'}}>MKT_{id}</span>
            </div>
            
            <div>
              <h3 style={{fontSize:'22px', fontWeight:'900', fontStyle:'italic', margin:'0 0 8px 0'}}>{asset.name}</h3>
              {/* THE CYAN BAR - SOLID AND VIBRANT */}
              <div style={{width:'45px', height:'3px', backgroundColor:'#06b6d4', marginBottom:'20px'}}></div>
              <button style={{
                width:'100%', padding:'12px', backgroundColor:'#121218', border:'1px solid rgba(255,255,255,0.05)',
                color:'white', fontSize:'9px', fontWeight:'900', letterSpacing:'3px', cursor:'pointer',
                transition:'0.3s'
              }}>OPEN TERMINAL</button>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER: Fixed Alignment */}
      <footer style={{maxWidth:'1200px', margin:'60px auto 0', display:'flex', gap:'30px', color:'#475569', fontWeight:'900', fontSize:'10px', letterSpacing:'1px'}}>
        <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
          <div style={{width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#06b6d4', boxShadow:'0 0 8px #06b6d4'}}></div>
          <Globe size={12}/> #MONAD_TEST
        </div>
        <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
          <div style={{width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#22c55e', boxShadow:'0 0 8px #22c55e'}}></div>
          <Cpu size={12}/> SYSTEM_NOMINAL
        </div>
      </footer>
    </div>
  );
}

export default App;
