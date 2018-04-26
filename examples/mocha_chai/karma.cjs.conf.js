module.exports = function (config) {
  config.set({
    basePath: './',
    frameworks: ['mocha','chai','commonjs'],
    files: [
      {pattern: '*.temp.js', included: false},
      {pattern: 'node_modules/ramda/dist/ramda.js', included: true},
      {pattern: 'cjs/*.js', included: true},
      // {pattern: '*.js', included: true},
      {pattern: '*.test.js', included: true},
    ],
    preprocessors:{
      // '**/*.js': ['commonjs'],
      'cjs/*.js': ['commonjs'],
      // 'index.js': ['commonjs'],
      '*.test.js': ['commonjs']
    },
    commonjsPreprocessor: {
      modulesRoot: 'node_modules'  
    },
    exclude: ['karma.cjs.conf.js','karma.webpack.conf.js'],
    reporters: ['progress'],
    // reporters: ['mocha'],
    port: 9875,
    colors: true,
    // logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    captureTimeout: 60000,
    singleRun: false
  });
};