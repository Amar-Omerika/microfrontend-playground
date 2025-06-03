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
        './App1Index': './src/bootstrap'
      },
      shared: {
        react: { 
          singleton: true, 
          requiredVersion: '^19.1.0' 
        },
        'react-dom': { 
          singleton: true, 
          requiredVersion: '^19.1.0' 
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
