/*
*  Filename: Gulpfile.js
*  Author: SaifKeralite
*/

const gulp = require('gulp');
var sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    injectPartials = require('gulp-inject-partials'),
    browserSync = require("browser-sync").create();

/* Paths */
var paths = {
    scripts: {
        src: './app/scripts/*js',
        dest: './app/js/'
    },
    styles: {
        src: './app/sass/*.scss',
        dest: './app/css/'
    },
    html: {
        src: './app/templates/*.html',
        dest: './app/'
    }
}

function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest))
}

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest(paths.styles.dest))
}

function index() {
    return gulp.src(paths.html.src)
        .pipe(injectPartials())
        .pipe(gulp.dest(paths.html.dest));
}


gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
});


gulp.task('watch', gulp.parallel(['browser-sync'], function () {
    gulp.watch(paths.styles.src, { ignoreInitial: false }, gulp.parallel(styles))
    gulp.watch(paths.scripts.src, { ignoreInitial: false }, gulp.parallel(scripts))
    gulp.watch(paths.html.src, { ignoreInitial: false }, gulp.parallel(index))
    gulp.watch('./app/*.html').on('change', browserSync.reload)
}));
