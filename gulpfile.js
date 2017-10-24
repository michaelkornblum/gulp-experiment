var gulp = require('gulp');
var del = require('del');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');

gulp.task('default', function(){
    return gulp.src('./*.html')
    .pipe(gulp.dest('./build'));
});

gulp.task('clean', function(){
    return del('./build');
});

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
        imagemin.svgo({ plugins: [{ removeViewbox: true}]})
    ]))
    .pipe(gulp.dest('build/images/'));
});

gulp.task('styles', function(){
    gulp.src('styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/styles'));
});
