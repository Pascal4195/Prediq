import React, { useState, useEffect } from 'react';

const JoinTaskModal = ({
  isOpen = false,
  onClose = () => console.log('Modal closed'),
  onSubmit = (stake, prediction) => console.log('Submitted:', stake, prediction),
  maxStake = 10000
}) => {
  const [stakeAmount, setStakeAmount] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStakeAmount('');
      setError('');
    }
  }, [isOpen]);

  const handleStakeChange = (e) => {
    const value = e.target.value;
    setStakeAmount(value);
    
    if (value && (parseFloat(value) <= 0 || parseFloat(value) > maxStake)) {
      setError(`Stake must be between 1 and ${maxStake} MONAD`);
    } else {
      setError('');
    }
  };

  const handleSubmit = (prediction) => {
    const stake = parseFloat(stakeAmount);
    
    if (!stakeAmount || stake <= 0) {
      setError('Please enter a valid stake amount');
      return;
    }
    
    if (stake > maxStake) {
      setError(`Maximum stake is ${maxStake} MONAD`);
      return;
    }
    
    onSubmit(stake, prediction);
    onClose();
  };

  const setQuickAmount = (amount) => {
    setStakeAmount(amount.toString());
    setError('');
  };

  const handleBackdropKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 opacity-0 animate-[fadeIn_0.2s_ease-out_forwards]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onKeyDown={handleBackdropKeyDown}
    >
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      <div className="relative bg-[#111] border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20 max-w-md w-full p-8 opacity-0 scale-95 animate-[scaleIn_0.3s_ease-out_forwards]">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-6">
          <h2 id="modal-title" className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 mb-2">
            Join Task
          </h2>
          <p className="text-gray-400 text-sm">
            Place your stake and make your prediction
          </p>
        </div>

        <div className="mb-6">
          <label htmlFor="stake-input" className="block text-sm font-semibold text-cyan-400 mb-2">
            Stake Amount
          </label>
          <div className="relative">
            <input
              id="stake-input"
              type="number"
              value={stakeAmount}
              onChange={handleStakeChange}
              placeholder="Enter amount"
              aria-label="Stake amount in MONAD"
              aria-describedby={error ? "stake-error" : undefined}
              aria-invalid={error ? "true" : "false"}
              className="w-full bg-[#0a0a0a] border border-cyan-500/30 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 transition-all duration-300 outline-none"
              min="1"
              max={maxStake}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400 font-semibold text-sm" aria-hidden="true">
              MONAD
            </div>
          </div>
          
          {error && (
            <div id="stake-error" role="alert" className="mt-2 text-red-400 text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <div className="mt-3 flex gap-2" role="group" aria-label="Quick stake amount buttons">
            {[100, 500, 1000, maxStake].map((amount) => (
              <button
                key={amount}
                onClick={() => setQuickAmount(amount)}
                aria-label={`Set stake to ${amount === maxStake ? 'maximum' : amount} MONAD`}
                className="flex-1 bg-[#0a0a0a] border border-gray-700/50 hover:border-cyan-500/50 hover:bg-cyan-500/10 text-gray-400 hover:text-cyan-400 text-xs font-semibold py-2 rounded-lg transition-all duration-300"
              >
                {amount === maxStake ? 'MAX' : amount}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 p-3 bg-[#0a0a0a] rounded-lg border border-gray-700/30" role="status" aria-label="Available balance">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Available Balance:</span>
            <span className="text-cyan-400 font-semibold">{maxStake.toLocaleString()} MONAD</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3" role="group" aria-label="Prediction buttons">
            <button
              onClick={() => handleSubmit('YES')}
              disabled={!stakeAmount || error}
              aria-label="Submit YES prediction"
              className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 disabled:from-gray-700 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-green-500/50 disabled:shadow-none transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              YES
            </button>

            <button
              onClick={() => handleSubmit('NO')}
              disabled={!stakeAmount || error}
              aria-label="Submit NO prediction"
              className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 disabled:from-gray-700 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-500/50 disabled:shadow-none transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
              NO
            </button>
          </div>

          <button
            onClick={onClose}
            aria-label="Cancel and close modal"
            className="w-full bg-[#0a0a0a] border border-gray-700/50 hover:border-cyan-500/50 hover:bg-[#1a1a1a] text-gray-400 hover:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinTaskModal;
    
