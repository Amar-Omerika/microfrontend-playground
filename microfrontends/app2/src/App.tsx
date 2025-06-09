import React from 'react';
import './index.css';
import Feature from './components/Feature';
import { SharedCounter } from './components/SharedCounter';

const App = () => {
  return (
    <div className="app2-wrapper bg-purple-50 min-h-[400px] p-6 rounded-lg shadow-lg">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-purple-600 mb-6">App 2 Microfrontend</h1>
        <p className="mb-4 text-lg text-gray-700">
          This is a standalone microfrontend application that has been loaded into the container.
        </p>
        
        <Feature />
        
        {/* Use the SharedCounter component that connects to the Zustand store */}
        <div className="bg-white p-6 rounded-lg shadow-md inline-block mb-6 items-center justify-center">   
          <SharedCounter />
        </div>
        <div className="text-sm text-gray-500 mt-4">
          App ID: app2 | Port: 3002
        </div>
      </div>
    </div>
  );
};

export default App;
