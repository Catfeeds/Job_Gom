'use strict';
var gulp = require('gulp');
var webpack = require('webpack');
var gulpWebpack = require('webpack-stream');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var header = require('gulp-header');
var clean = require('gulp-clean');
var gulpIf = require('gulp-if');
var rename = require('gulp-rename');
var minimist = require('minimist');
var rev = require('gulp-rev-hash');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');

var pwd = __dirname;

var argv = require('minimist')(process.argv.slice(2));
var config = require('./config.json');

var vendorPlugin = new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.min.js',
    minChunks: Infinity
});

var targetDist = 'dist';
if (process.env.NODE_ENV === 'localdev' || process.env.NODE_ENV === 'localtest') {
    targetDist = 'dist';
} else {
    targetDist = process.env.NODE_ENV + '/dist';
}

var webpackConfig = {
    entry: {
        csp: ['./src/js/app.js', './src/js/debug.js'],
        vendor: [
            'vue',
            'vuex',
            'vue-router',
            './src/js/vendors/jquery.datetimepicker.min.js',
            'vue-resource',
            'vue-async-computed',
            'jquery'
        ]
    },
    watch: true,
    devtool: '#eval-source-map',
    output: {
        filename: '[name].min.js'
    },
    module: {
        loaders: [{
            test: /.js$/,
            loader: 'babel-loader',
            include: [path.join(pwd, './src')]
        }, {
            test: /.vue$/,
            loader: 'vue-loader'
        }, {
            test: /.css$/,
            loader: 'style-loader'
        }, {
            test: /\.json$/i,
            loader: 'json-loader'
        }]
    },
    vue: {
        sass: 'css!sass'
    },
    plugins: [vendorPlugin],
    resolve: {
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            utils: path.join(pwd, './src/js/util/index.js'),
            store: path.join(pwd, './src/js/store/index.js'),
            actions: path.join(pwd, './src/js/store/actions/index.js'),
            env: path.join(pwd, './src/js/config/env/' + process.env.NODE_ENV + '.js')
        }
    }
};

// 公共头部
var banner = ['/*',
    ' * <%= config.name %> - <%= config.desc %>',
    ' */',
    ''
].join('\n');

gulp.task('clean', function() {
    return gulp
        .src(['./development/*', './test/*', './pre-production/*', './production/*', './dist/*'], { read: false })
        .pipe(clean({ force: true }))
});

gulp.task('js', function() {
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'pre-production' || process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
        webpackConfig.watch = false;
        delete webpackConfig.devtool;
        webpackConfig.entry.csp.pop();
    }
    if (process.env.NODE_ENV === 'production') {
        webpackConfig.plugins.push(new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }))
        webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            }
        }))
    }
    return gulp
        .src('./src/js/app.js')
        .pipe(gulpWebpack(webpackConfig))
        .on('error', function(err) {})
        .pipe(gulp.dest('./' + targetDist + '/js/'))
        .pipe(gulp.dest('./dist/js/'))
})

gulp.task('jscopy', function() {
    return gulp
        .src('./src/js/vendors/amrnb.js')
        .pipe(gulp.dest('./' + targetDist + '/js/'))
        .pipe(gulp.dest('./dist/js'))
})

gulp.task('css', function() {
    return gulp
        .src('./src/css/app.scss')
        .pipe(sass({
            paths: [path.join(pwd, './src/css')]
        }))
        .pipe(gulpIf(process.env.NODE_ENV === 'production', minifyCss()))
        .pipe(gulpIf(process.env.NODE_ENV === 'production', header(banner, { config: config })))
        .pipe(rename('csp.min.css'))
        .pipe(gulp.dest('./' + targetDist + '/css/'))
        .pipe(gulp.dest('./dist/css/'))
})

gulp.task('img', function() {
    return gulp
        .src('./src/img/**/*')
        .pipe(gulp.dest('./' + targetDist + '/img/'))
        .pipe(gulp.dest('./dist/img/'))
})

gulp.task('font', function() {
    return gulp
        .src('./src/font/*')
        .pipe(gulp.dest('./' + targetDist + '/font/'))
        .pipe(gulp.dest('./dist/font/'))
})

gulp.task('rev', function() {
    return gulp
        .src('./index.html')
        .pipe(gulpIf(process.env.NODE_ENV === 'production', rev({
            assetsDir: path.join(pwd)
        })))
        .pipe(gulp.dest('./' + targetDist === 'dist' ? '' : targetDist.replace('/dist', '')));
})

gulp.task('watch', function() {
    gulp.start(['js', 'img', 'css', 'font', 'jscopy']);
    gulp.watch('./src/css/**/*', ['css']);
    gulp.watch('./src/img/**/*', ['img']);
    gulp.watch('./src/font/*', ['font']);
})

gulp.task('build', ['js', 'css', 'img', 'font']);

gulp.task('default', ['build'], function() {
    gulp.start('jscopy');
    gulp.start('rev');
});
