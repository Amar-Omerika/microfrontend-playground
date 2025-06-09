// components/SharedCounter.tsx
import React from 'react';
import { useSharedStore } from 'sharedStore/store';

export const SharedCounter = () => {
  const { count, increment, decrement, reset } = useSharedStore();

  return (
    <div className="bg-red-50 p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-2">Shared Counter</h3>
      <div className="text-xl mb-4">Count: {count}</div>
      <div className="flex justify-center space-x-2">
        <button
          onClick={decrement}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Decrease
        </button>
        <button
          onClick={increment}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Increase
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
      <div className="text-xs text-gray-500 mt-2">
        This counter shares state across all microfrontends
      </div>
    </div>
  );
};