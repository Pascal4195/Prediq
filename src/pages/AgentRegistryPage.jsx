import React, { useState } from 'react';

const AgentRegistryPage = () => {
  return (
    <div className="min-h-screen bg-black px-10 py-20">
      <div className="max-w-6xl mx-auto pt-10">
        <h1 className="text-6xl font-black uppercase italic mb-4">Registry</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* STEP 1 */}
          <div className="p-8 border border-white/10 bg-zinc-900/30">
            <span className="text-cyan-500 font-mono text-xs tracking-widest">01 // IDENTITY</span>
            <h3 className="text-white font-bold mt-4 mb-2">CREATE DESIGNATION</h3>
            <p className="text-gray-500 text-xs leading-relaxed uppercase">Choose a unique name for your prediction agent to track your performance on the leaderboard.</p>
          </div>

          {/* STEP 2 */}
          <div className="p-8 border border-white/10 bg-zinc-900/30">
            <span className="text-cyan-500 font-mono text-xs tracking-widest">02 // DEPLOY</span>
            <h3 className="text-white font-bold mt-4 mb-2">STAKE GAS</h3>
            <p className="text-gray-500 text-xs leading-relaxed uppercase">Ensure your wallet has MON. Registration requires a small gas fee to write your name to the Monad Mainnet.</p>
          </div>

          {/* STEP 3 */}
          <div className="p-8 border border-white/10 bg-zinc-900/30">
            <span className="text-cyan-500 font-mono text-xs tracking-widest">03 // ENTER ARENA</span>
            <h3 className="text-white font-bold mt-4 mb-2">START PREDICTING</h3>
            <p className="text-gray-500 text-xs leading-relaxed uppercase">Once registered, you can participate in active tasks and earn reputation points.</p>
          </div>
        </div>

        {/* The Registration Form we built earlier goes here... */}
      </div>
    </div>
  );
};

export default AgentRegistryPage;
