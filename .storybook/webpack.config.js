const path = require('path')

function postcss () {
  return [
    require('postcss-import')(),
    require('postcss-custom-properties')(),
    require('postcss-custom-media')(),
    require('postcss-calc')(),
    require('postcss-nested')(),
    require('autoprefixer')({ browsers: ['last 2 version'] })
  ]
}

module.exports = {
  module: {
    loaders: [
      { test: /\.(js|jsx)$/, exclude: [ /node_modules/, /vendor/ ], loader: 'babel' },
      { test: /\.css$/, loader: 'style!css?modules&importLoaders=1&localIdentName=[local]&name=styles/[name].[ext]!postcss', include: path.resolve(__dirname, '../') },
      { test: /\.(jpg|png|svg)$/, loader: 'file?name=images/[name].[ext]' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,   loader: 'url-loader?limit=10000&mimetype=application/font-eot&name=./fonts/[hash].[ext]' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,  loader: 'url-loader?limit=10000&mimetype=application/font-ttf&name=./fonts/[hash].[ext]' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,  loader: 'url-loader?limit=10000&mimetype=application/font-svg&name=./fonts/[hash].[ext]' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=./fonts/[hash].[ext]' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,  loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=./fonts/[hash].[ext]' }
    ]
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
    modulesDirectories: ['node_modules', 'aem']
  },
  devtool: 'source-map',
  postcss: postcss
}
