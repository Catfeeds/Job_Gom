// Karma configuration
// Generated on Fri Apr 21 2017 14:44:07 GMT+0800 (中国标准时间)
module.exports = function(config) {
	config.set({
		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '..',
		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine'],
		// plugins: ['karma-mocha', 'karma-chai', 'karma-rollup-preprocessor', 'karma-chrome-launcher', 'karma-chai-as-promised'],
		// list of files / patterns to load in the browser
		files: [
			'*.spec.js'
		],
		// list of files to exclude
		exclude: [],
		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'*.spec.js': ['rollup']
		},
		rollupPreprocessor: {
			plugins: [
				require('rollup-plugin-node-resolve')({
					browser: true
				}),
				require('rollup-plugin-commonjs')(),
				require('rollup-plugin-babel')({
					babelrc: false,
					"presets": [
						["latest", {
							"es2015": {
								"modules": false
							}
						}]
					]
				}),
			],
			format: 'iife', // Helps prevent naming collisions.
			moduleName: 'UBA-SDK', // Required for 'iife' format.
			sourceMap: 'inline', // Sensible for testing.
			useStrict: false
		},
		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress', 'coverage'],
		// web server port
		port: 9876,
		// enable / disable colors in the output (reporters and logs)
		colors: true,
		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,
		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,
		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		// browsers: ['PhantomJS'],
		browsers: ['Chrome', 'IE9'],
        // IE8 not work temporarily
        // https://github.com/karma-runner/karma/issues/2556
		customLaunchers: {
			IE8: {
				base: 'IE',
				'x-ua-compatible': 'IE=EmulateIE8'
			},
			IE9: {
				base: 'IE',
				'x-ua-compatible': 'IE=EmulateIE9'
			}
		},
		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false,
		// Concurrency level
		// how many browser should be started simultaneous
		concurrency: Infinity
	})
}
