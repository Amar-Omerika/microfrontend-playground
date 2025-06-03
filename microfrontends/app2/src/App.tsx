import React, { useState } from 'react';
import './index.css';
import Feature from './components/Feature';

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className="app2-wrapper bg-purple-50 min-h-[400px] p-6 rounded-lg shadow-lg">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-purple-600 mb-6">App 2 Microfrontend</h1>
        <p className="mb-4 text-lg text-gray-700">
          This is a standalone microfrontend application that has been loaded into the container.
        </p>
        
        <Feature />
        
        <div className="bg-white p-6 rounded-lg shadow-md inline-block mb-6">
          <div className="text-xl font-semibold mb-2">Counter: {counter}</div>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => setCounter(prev => prev - 1)}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
            >
              Decrease
            </button>
            <button 
              onClick={() => setCounter(prev => prev + 1)}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
            >
              Increase
            </button>
          </div>
        </div>
        
        <div className="text-sm text-gray-500 mt-4">
          App ID: app2 | Port: 3002
        </div>
      </div>
    </div>
  );
};

export default App;
