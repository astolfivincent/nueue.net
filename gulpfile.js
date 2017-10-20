//load plugins
var gulp             = require('gulp'),
    $                = require('gulp-load-plugins')(),
    sass             = require('gulp-sass'),
    autoprefixer     = require('autoprefixer'),
    postcss          = require('gulp-postcss'),
    flatten          = require('gulp-flatten'),
    del              = require('del'),
    path             = require('path'),
    rename           = require('gulp-rename'),
    sassLint         = require('gulp-sass-lint'),
    eslint           = require('gulp-eslint'),
    browserify       = require('gulp-browserify-globs'),
    browserSync      = require('browser-sync'),
    minifyCSS        = require('gulp-minify-css'),
    twig             = require('gulp-twig'),
    marked           = require('marked'),
    replace          = require('gulp-replace-path'),
    matter           = require('gray-matter'),
    each             = require('gulp-each'),
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
gulp.task('watch', ['styles', 'lint', 'styleguide', 'browserify', 'compile'], function() {
    browserSync.init({
        server: {
            baseDir: ".",
            https: false
        },
        startPath: "/styleguide"
    });

    gulp.watch(['components/**/*.scss', 'scss/**/*.scss'], ['styles', 'lint']);

    gulp.watch(['components/**/*.{twig}', 'scss/**/*.{twig}'], ['styleguide', browserSync.reload]);

    gulp.watch(['templates/**/*.twig', 'pages/**/*.twig', 'components/**/*.twig', 'content/**/*.md'], ['compile', browserSync.reload])

    gulp.watch(['components/**/*.js'], ['browserify', browserSync.reload]);

});

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

gulp.task('default', function(){
    gulp.start('styleguide', 'styles');
});

gulp.task('compile', function () {
  return gulp.src('content/**/*.md')
       .pipe(each(function(content, file, callback) {
           vars = matter(content);
           vars.data.content = marked(vars.content);
           name = file.path.replace(/^.*[\\\/]/, '').replace('.md', '').replace('index','');
           var newContent = gulp.src('templates/html.twig')
            .pipe(twig({
               data: vars
             }))
             .pipe(rename({
                dirname: name,
                basename: 'index',
                extname: '.html'
             }))
             .pipe(gulp.dest('./'));
             callback(null, newContent);
       }));
});

gulp.task('lint', function () {
    gulp.src('components/**/*.s+(a|c)ss')
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
});
