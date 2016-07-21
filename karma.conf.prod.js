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

    junitReporter: {
      outputDir: 'src/target/test-reports',
      outputFile: 'test-report.xml',
      suite: '', // suite will become the package name attribute in xml testsuite element
      useBrowserName: false, // add browser name to report and classes names
      nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
      classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
      properties: {} // key value pair of properties to add to the <properties> section of the report
    },

    coverageReporter: {
      type: 'cobertura',
      dir: 'src/target/test-reports',
      subdir: '.'
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
      'karma-phantomjs-launcher',
      'karma-junit-reporter',
      'karma-coverage',
    ],
    reporters: ['junit', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: true,
  })
}
