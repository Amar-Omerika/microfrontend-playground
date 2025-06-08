// Bootstrap file for Module Federation
// This file ensures all remote modules are loaded before rendering the app
import './index.css';

// Import the shared dependencies
// The dynamic imports ensure webpack doesn't bundle these with the main chunk
const mount = () => {
  Promise.all([
    import('./App'),
    import('react'),
    import('react-dom/client'),
    // Add other shared dependencies here as needed
  ])
    .then(([{ default: App }, { createElement }, { createRoot }]) => {
      const container = document.getElementById('root');
      if (!container) {
        throw new Error('Root container not found');
      }
      
      const root = createRoot(container);
      root.render(createElement(App));

      console.log('Container application successfully mounted');
    })
    .catch(err => {
      console.error('Failed to mount container application:', err);
    });
};

// Execute the mount function
mount();
