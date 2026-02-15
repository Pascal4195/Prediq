import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './pages/index.css'; // Updated path to find the CSS in the pages folder

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
