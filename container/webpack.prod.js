const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('./package.json');

const domain = process.env.PRODUCTION_DOMAIN || '';

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/container/'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        app1: `app1@${domain}/app1/remoteEntry.js`,
        app2: `app2@${domain}/app2/remoteEntry.js`
      },
      shared: packageJson.dependencies
    })
  ]
};

module.exports = merge(commonConfig, prodConfig);
