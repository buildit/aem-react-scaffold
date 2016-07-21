var path = require('path')
var webpack = require('webpack')

const jcrPath = path.join(__dirname, 'src', 'content', 'jcr_root', 'etc', 'designs', 'react-demo', 'js', 'react-demo');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

let serverJs = false;
for (const idx in process.argv) {
  let arg = process.argv[idx];
  if (arg === '--env=production') {
    process.env.NODE_ENV = 'production';
  } else if (arg === '--env=development') {
    process.env.NODE_ENV = 'development';
  }
  if (arg === '--server') {
    serverJs = true;
  }
}

const targetFileName = serverJs ? "server.js" : "app.js"

console.log("Webpack build for '" + process.env.NODE_ENV + "' -> " + targetFileName)

let entries = []
if (!serverJs) {
  entries.push('./aem/client.jsx')
} else {
  entries.push('./aem/server.jsx')
}

const config = {
  entry: entries,
  debug:true,
  output: {
    path: jcrPath,
    filename: targetFileName
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  resolve: {
    root: __dirname,
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
    modulesDirectories: [
      path.join(__dirname, 'node_modules'),
      path.join(__dirname, 'aem')
    ]
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)$/, exclude: [ /node_modules/, /vendor/ ], loader: 'babel' },
      { test: /\.(css)$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader') },
      { test: /\.(png|jpg|gif)$/, loader: 'file-loader' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"' + process.env.NODE_ENV + '"'
      }
    }),
    new ExtractTextPlugin('[name].css', { allChunks: true })
  ]
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin())
} else {
  config.devtool = 'inline-source-map'
}

module.exports = [
  config
]
