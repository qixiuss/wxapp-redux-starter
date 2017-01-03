const fs = require('fs')
const path = require('path')

const gulp = require('gulp')
const gulpLoadPlugins = require('gulp-load-plugins')
const plumber = require('gulp-plumber');
const notify = require("gulp-notify")
const del = require('del')
const runSequence = require('run-sequence')
const inquirer = require('inquirer')
const generatePage = require('generate-weapp-page')

// load all gulp plugins
const plugins = gulpLoadPlugins()
const env = process.env.NODE_ENV || 'development'
const isProduction = () => env === 'production'

function handleErrors(errorObject, callback) {
    notify.onError(errorObject.toString().split(': ').join(':\n')).apply(this, arguments);
    // Keep gulp from hanging on this task
    if (typeof this.emit === 'function') {
        this.emit('end');
    }
}

/**
 * Clean distribution directory
 */
gulp.task('clean', del.bind(null, ['dist/*']))


/**
 * Compile js source to distribution directory
 */
gulp.task('compile:js', () => {
    return gulp.src(['src/**/*.js'])
        .pipe(plumber(handleErrors))
        // .pipe(plugins.sourcemaps.init())
        .pipe(plugins.babel({
            presets: ['es2015']
        }))
        .pipe(plugins.if(isProduction, plugins.uglify()))
        // .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
})

/**
 * Compile xml source to distribution directory
 */
gulp.task('compile:xml', () => {
    return gulp.src(['src/**/*.xml'])
        .pipe(plumber(handleErrors))
        // .pipe(plugins.sourcemaps.init())
        .pipe(plugins.if(isProduction, plugins.htmlmin({
            collapseWhitespace: true,
            keepClosingSlash: true, // xml
            removeComments: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        })))
        .pipe(plugins.rename({ extname: '.wxml' }))
        // .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
})

/**
 * Compile less source to distribution directory
 */
gulp.task('compile:less', () => {
    return gulp.src(['src/**/*.less'])
        .pipe(plumber(handleErrors))
        // .pipe(plugins.sourcemaps.init())
        .pipe(plugins.less())
        .pipe(plugins.if(isProduction, plugins.cssnano({ compatibility: '*' })))
        .pipe(plugins.rename({ extname: '.wxss' }))
        // .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
})

/**
 * Compile json source to distribution directory
 */
gulp.task('compile:json', () => {
    return gulp.src(['src/**/*.json'])
        .pipe(plumber(handleErrors))
        // .pipe(plugins.sourcemaps.init())
        .pipe(plugins.jsonminify())
        // .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
})

/**
 * Compile img source to distribution directory
 */
gulp.task('compile:img', () => {
    return gulp.src(['src/**/*.{jpg,jpeg,png,gif}'])
        .pipe(plumber(handleErrors))
        .pipe(plugins.imagemin())
        .pipe(gulp.dest('dist'))
})

/**
 * Compile source to distribution directory
 */
gulp.task('compile', ['clean'], next => {
    runSequence([
        'compile:js',
        'compile:xml',
        'compile:less',
        'compile:json',
        'compile:img'
    ], next)
})

/**
 * Copy extras to distribution directory
 */
gulp.task('extras', [], () => {
    return gulp.src([
            'src/**/*.*',
            '!src/**/*.js',
            '!src/**/*.xml',
            '!src/**/*.less',
            '!src/**/*.json',
            '!src/**/*.{jpe?g,png,gif}'
        ])
        .pipe(gulp.dest('dist'))
})

/**
 * Build
 */
gulp.task('build', next => runSequence(['compile', 'extras'], next))

/**
 * Watch source change
 */
gulp.task('watch', ['build'], () => {
    gulp.watch('src/**/*.js', ['compile:js'])
    gulp.watch('src/**/*.xml', ['compile:xml'])
    gulp.watch('src/**/*.less', ['compile:less'])
    gulp.watch('src/**/*.json', ['compile:json'])
    gulp.watch('src/**/*.{jpe?g,png,gif}', ['compile:img'])
})

/**
 * Default task
 */
gulp.task('default', ['watch'])
