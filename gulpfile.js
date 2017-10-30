//load plugins
var gulp             = require('gulp'),
    $                = require('gulp-load-plugins')(),
    sass             = require('gulp-sass'),
    fs               = require('fs'),
    autoprefixer     = require('autoprefixer'),
    postcss          = require('gulp-postcss'),
    flatten          = require('gulp-flatten'),
    del              = require('del'),
    path             = require('path'),
    sassLint         = require('gulp-sass-lint'),
    eslint           = require('gulp-eslint'),
    browserify       = require('gulp-browserify-globs'),
    browserSync      = require('browser-sync'),
    minifyCSS        = require('gulp-minify-css'),
    matter           = require('gray-matter'),
    sassGlob         = require('gulp-sass-glob');

// Build styleguide.
gulp.task('styleguide', $.shell.task([
        // kss-node [source   folder of files to parse] [destination folder] --template [location of template files]
        'node_modules/.bin/kss <%= source %> <%= destination %> --builder <%= builder %> --namespace <%= namespace %> ' +
        '--css css/styles.css '
    ], {
        templateData: {
            source:       'components',
            destination:  'styleguide',
            builder:  'builder/twig',
            namespace: 'nueue:.'
        }
    }
));

// Static server
gulp.task('watch', ['styles', 'lint', 'styleguide', 'browserify'], function() {
    browserSync.init({
        server: {
            baseDir: ".",
            https: false
        },
        startPath: "/styleguide"
    });

    gulp.watch(['components/**/*.scss', 'scss/**/*.scss'], ['styles', 'lint']);

    gulp.watch(['components/**/*.{twig}', 'scss/**/*.{twig}'], ['styleguide', browserSync.reload]);

    gulp.watch(['templates/**/*.twig', 'components/**/*.twig', 'content/**/*.md'], [browserSync.reload])

    gulp.watch(['components/**/*.js'], ['browserify', browserSync.reload]);

});

gulp.task ('build', ['styles', 'browserify', 'styleguide', 'compile']);

gulp.task('styles', function() {
    return gulp.src('scss/styles.scss')
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(postcss([ autoprefixer({ browsers: ['last 4 versions'] }) ]))
        .pipe(minifyCSS())
        .pipe(gulp.dest('css')).pipe(browserSync.stream());
});

gulp.task('browserify', function () {
    return browserify(['components/**/*.js'], {
        debug: false,
        uglify: true
    })
        .pipe(gulp.dest('js'));
});

gulp.task('lint', function () {
    gulp.src('components/**/*.s+(a|c)ss')
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
});
