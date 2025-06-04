// Bootstrap file for properly initializing Module Federation
import App from './App';
import React from 'react';
import { createRoot } from 'react-dom/client';

// Initialize the shared scope properly
window.__webpack_share_scopes__ = window.__webpack_share_scopes__ || {};
window.__webpack_share_scopes__.default = window.__webpack_share_scopes__.default || {};

// Function to mount the app
const mount = () => {
  const container = document.getElementById('root');
  if (!container) {
    throw new Error('Root container not found');
  }
  
  const root = createRoot(container);
  root.render(React.createElement(App));
  console.log('Container application bootstrapped successfully');
};

// Mount the app when ready
mount();
