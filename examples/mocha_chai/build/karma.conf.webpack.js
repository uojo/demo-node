module.exports = function (config) {
  config.set({
    basePath: '../test',
    frameworks: ['mocha','chai'],
    files: [
      // {pattern: '*.temp.js', included: false},
      // {pattern: 'cjs/*.js', included: true},
      {pattern: '*.js', included: true},
      // {pattern: '*.test.js', included: true},
    ],
    preprocessors:{
      '*.test.js': ['webpack'],
      'utils/*.js': ['webpack']
    },
    webpack:{
      mode:'development'
    },
    exclude: [],
    reporters: ['progress'],
    // reporters: ['mocha'],
    port: 9875,
    colors: true,
    // logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    // browsers: ['PhantomJS'],
    // browsers: ['jsdom'],
    captureTimeout: 60000,
    singleRun: false
  });
};