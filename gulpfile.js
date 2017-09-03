'use strict';
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    uncss = require("gulp-uncss"),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'public/',
        js: 'public/js/',
        css: 'public/css/',
        img: 'public/img/',
        fonts: 'public/fonts/'
    },
    assets: {
        html: 'assets/template/*.html',
        js: 'assets/js/app.js',
        style: 'assets/css/app.scss',
        img: 'assets/img/**/*.*',
        fonts: 'assets/fonts/**/*.*'
    },
    watch: {
        html: 'assets/**/*.html',
        js: 'assets/js/**/*.js',
        style: 'assets/css/**/*.scss',
        img: 'assets/img/**/*.*',
        fonts: 'assets/fonts/**/*.*'
    },
    clean: './public'
};

var config = {
    server: {
        baseDir: "./public"
    },
    tunnel: true,
    host: 'localhost',
    port: 8000,
    logPrefix: "fr"
};

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});
gulp.task('html_b', function () {
    gulp.src(path.assets.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});
gulp.task('js_b', function () {
    gulp.src(path.assets.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});
gulp.task('css_b', function () {
    gulp.src(path.assets.style)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        // .pipe(uncss({
        //     html: [path.assets.html]
        // }))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});
gulp.task('image_b', function () {
    gulp.src(path.assets.img)
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});
gulp.task('fonts_b', function() {
    gulp.src(path.assets.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(reload({stream: true}));
});
gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html_b');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('css_b');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js_b');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image_b');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts_b');
    });
});
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});
gulp.task('build', [
    'html_b',
    'js_b',
    'css_b',
    'fonts_b',
    'image_b'
]);

gulp.task('runserver', function () {
    browserSync(config);
});

gulp.task('start', ['build', 'runserver', 'watch']);
