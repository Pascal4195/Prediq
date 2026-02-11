import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black/80 border-t border-cyan-500/20 text-gray-400 text-sm py-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
      <div>
        <span>© {new Date().getFullYear()} Prediq. All rights reserved.</span>
      </div>
      <div className="flex gap-4">
        <a href="https://github.com/yourproject" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors" aria-label="GitHub repository">GitHub</a>
        <a href="#" className="hover:text-cyan-400 transition-colors" aria-label="Terms of Service">Terms</a>
        <a href="#" className="hover:text-cyan-400 transition-colors" aria-label="Privacy Policy">Privacy</a>
      </div>
    </footer>
  );
};

export default Footer;
