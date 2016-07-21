var path = require('path')

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon'],
    files: [
      'src/**/*.spec.js'
    ],

    preprocessors: {
      'src/**/*.spec.js': ['webpack', 'sourcemap'],
      'src/**/*.jsx': ['webpack', 'sourcemap', 'coverage']
    },

    webpack: {
      devtool: 'inline-source-map',
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
          { test: /\.(css)$/, loader: 'style-loader!css-loader!postcss-loader' },
          { test: /\.(png|jpg|gif)$/, loader: 'ignore-loader' },
          { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'ignore-loader' },
          { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'ignore-loader' },
        ],
        postLoaders: [
          { test: /\.(jsx)$/, exclude: [ /test/, /node_modules/, /vendor/ ], loader: 'istanbul-instrumenter' },
        ]
      },
      externals: {
        'cheerio': 'window',
        'sinon': true,
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      },
    },

    coverageReporter: {
      reporters: [
        { type: 'html', dir: 'coverage/' },
        { type: 'text-summary' }
      ]
    },

    webpackServer: {
      noInfo: true,
      stats: 'errors-only'
    },

    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-chai',
      'karma-sinon',
      'karma-sourcemap-loader',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-mocha-reporter',
      'karma-coverage'
    ],
    reporters: ['mocha', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
  })
}
