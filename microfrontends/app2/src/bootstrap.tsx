import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Mount function to start the app
const mount = (el: Element) => {
  const root = createRoot(el);
  
  root.render(<App />);
  
  return {
    // Unmount function to cleanup when the microfrontend is removed
    unmount: () => {
      root.unmount();
    }
  };
};

// If in development and running in isolation, mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.getElementById('app');
  
  if (devRoot) {
    mount(devRoot);
  }
}

// Export the mount function so the container can use it
export { mount };
