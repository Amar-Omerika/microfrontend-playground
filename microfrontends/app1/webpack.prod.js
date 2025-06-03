const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/app1/'
  },
  plugins: [
    new CleanWebpackPlugin(),
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

module.exports = merge(commonConfig, prodConfig);
