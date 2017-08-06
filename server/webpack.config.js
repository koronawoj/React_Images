module.exports = {
  entry: './index.js',
  target: 'node',
  output: {
    path: __dirname + '/dist',
    filename: 'app.js',
    libraryTarget: 'commonjs'
  },
    externals: [
        /^(?!\.|\/).+/i,
    ],
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        loader: 'babel-loader',
       }
    ],
  }
};
