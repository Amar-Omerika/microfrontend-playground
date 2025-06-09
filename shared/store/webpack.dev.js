// container/webpack.dev.js
module.exports = {
    // ... existing config
    plugins: [
      new ModuleFederationPlugin({
        // ... existing config
        remotes: {
          sharedStore: 'sharedStore@http://localhost:3003/remoteEntry.js',
        },
        shared: {
          react: { singleton: true, requiredVersion: '^18.2.0' },
          'react-dom': { singleton: true, requiredVersion: '^18.2.0' },
          zustand: { singleton: true, requiredVersion: '^4.3.8' },
        },
      }),
    ],
  };