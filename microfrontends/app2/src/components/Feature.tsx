import React from 'react';

const Feature: React.FC = () => {
  return (
    <div className="bg-purple-100 p-4 rounded-lg shadow mb-4">
      <h2 className="text-xl font-semibold text-purple-700 mb-2">App2 Feature</h2>
      <p className="text-gray-700">
        This is a component from the App2 microfrontend. It demonstrates that components 
        can be organized in separate files and imported into the main App.
      </p>
    </div>
  );
};

export default Feature;
