import React from 'react';

const Home = () => {
  return (
    <div className="text-center py-10">
      <h1 className="text-4xl font-bold text-slate-800 mb-6">Welcome to Microfrontend Demo</h1>
      <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
        This container application demonstrates microfrontends using Module Federation.
        Navigate using the links in the header to load different microfrontend applications.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-blue-600 mb-3">App 1</h2>
          <p className="mb-4">Example microfrontend application with its own state and UI.</p>
          <a href="/app1" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Visit App 1
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-purple-600 mb-3">App 2</h2>
          <p className="mb-4">Another microfrontend application that can be loaded independently.</p>
          <a href="/app2" className="inline-block bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors">
            Visit App 2
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
