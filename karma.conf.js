module.exports = function(config) {
    config.set({
        basePath: './',
        files: [
            'static/bower_components/angular/angular.js',
            'static/bower_components/angular-route/angular-route.js',
            'static/bower_components/angular-aria/angular-aria.js',
            'static/bower_components/angular-mocks/angular-mocks.js',
            'static/bower_components/angular-animate/angular-animate.js',
            'static/bower_components/angular-material/angular-material.js',
            'static/bower_components/angular-resource/angular-resource.js',
            'static/bower_components/angular-route/angular-route.js',
            'static/bower_components/underscore/underscore.js',
            'static/scripts/app.js',
            'static/scripts/**/*.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['PhantomJS'],

        plugins: [
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-coverage'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },

        //karma-coverage configuration

        // coverage reporter generates the coverage
        reporters: ['progress', 'coverage'],

        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'static/scripts/**/*.js': ['coverage']
        },
        // optionally, configure the reporter
        coverageReporter: {
            reporters: [{
                type: 'html',
                dir: 'coverage/'
            }, {type: 'text-summary'}]
        }

    });
};