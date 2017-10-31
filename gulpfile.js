// node packages
var gulp = require('gulp');
var del = require('del');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var webpack = require('webpack-stream');

// default gulp task
gulp.task('default', function(){
    return gulp.src('./*.html')
    .pipe(gulp.dest('./build'));
});

// clean build directory
gulp.task('clean', function(){
    return del('./build');
});

// minimize images
gulp.task('images',function(){
    return gulp.src(
        [
            './images/**/*.jpg',
            './images/**/*.jpeg',
            './images/**/*.gif',
            './images/**/*.png',
            './images/**/*.svg,'
        ])
    .pipe(imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({ packages: [{ removeViewbox: true}]})
    ]))
    .pipe(gulp.dest('build/images/'));
});

// process sass files
gulp.task('styles', function(){
    gulp.src('styles/*.scss')
    .pipe(sass({ outputStyle: 'compressed' })
        .on('error', sass.logError))
    .pipe(gulp.dest('./build/styles'));
});

// manage javascript bundles
gulp.task('scripts', function(){
    gulp.src('./scripts/main.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./build/scripts'));
});
