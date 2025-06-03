import React, { useState } from 'react';
import './index.css';

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className="app1-wrapper bg-blue-50 min-h-[400px] p-6 rounded-lg shadow-lg">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">App 1 Microfrontend</h1>
        <p className="mb-4 text-lg text-gray-700">
          This is a standalone microfrontend application that has been loaded into the container.
        </p>
        
        <div className="bg-white p-6 rounded-lg shadow-md inline-block mb-6">
          <div className="text-xl font-semibold mb-2">Counter: {counter}</div>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => setCounter(prev => prev - 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Decrease
            </button>
            <button 
              onClick={() => setCounter(prev => prev + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Increase
            </button>
          </div>
        </div>
        
        <div className="text-sm text-gray-500 mt-4">
          App ID: app1 | Port: 3001
        </div>
      </div>
    </div>
  );
};

export default App;
