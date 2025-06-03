const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:3002/'
  },
  devServer: {
    port: 3002,
    historyApiFallback: true
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app2',
      filename: 'remoteEntry.js',
      exposes: {
        './App2Index': './src/bootstrap.tsx'
      },
      shared: {
        react: { 
          singleton: true, 
          requiredVersion: '^19.1.0', 
          eager: true 
        },
        'react-dom': { 
          singleton: true, 
          requiredVersion: '^19.1.0', 
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
