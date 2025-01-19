const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production', // Use 'development' for development builds
  entry: './server.js', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  target: 'node', // Target Node.js runtime
  externals: [nodeExternals()], // Exclude node_modules from bundling
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
