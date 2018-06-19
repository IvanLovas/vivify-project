'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var watch = require('gulp-watch');

gulp.task('browser-sync', function() {
    browserSync.init({
         server: {
            baseDir: "./"
        }
    });
});

gulp.task('sass', function () {
    return gulp.src('./sass/main.scss')
        .pipe(sass({
            sourceComments: 'map',
            sourceMap: 'scss',
            outputStyle: "expanded"
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 5%'],
            cascade: false
        }))
        .pipe(gulp.dest('./'))
        .pipe(reload({stream:true}));
});

gulp.task('watch', ['browser-sync', 'sass'], function () {
    watch('./style/**/*.scss', function(){
        gulp.start('sass');
    });
    gulp.watch("./*.html").on('change', reload);
});

 //gulp.task( 'default', [ 'serve' ] )
