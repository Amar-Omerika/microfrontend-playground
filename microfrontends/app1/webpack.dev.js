const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:3001/'
  },
  devServer: {
    port: 3001,
    historyApiFallback: true
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app1',
      filename: 'remoteEntry.js',
      exposes: {
        './App1Index': './src/bootstrap.tsx'
      },
      shared: {
        react: { 
          singleton: true, 
          requiredVersion: '^18.2.0', 
          eager: true 
        },
        'react-dom': { 
          singleton: true, 
          requiredVersion: '^18.2.0', 
          eager: true 
        },
        'react-router-dom': { 
          singleton: true, 
          requiredVersion: '^6.2.1' 
        }
      }
    })
  ]
};

module.exports = merge(commonConfig, devConfig);
