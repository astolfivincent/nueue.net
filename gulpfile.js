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
gulp.task('watch', ['styles', 'lint', 'styleguide', 'browserify', 'clearlisting', 'compile'], function() {
    browserSync.init({
        server: {
            baseDir: ".",
            https: false
        },
        startPath: "/styleguide"
    });

    gulp.watch(['components/**/*.scss', 'scss/**/*.scss'], ['styles', 'lint']);

    gulp.watch(['components/**/*.{twig}', 'scss/**/*.{twig}'], ['styleguide', browserSync.reload]);

    gulp.watch(['templates/**/*.twig', 'components/**/*.twig', 'content/**/*.md', 'gulpfile.js'], ['clearlisting', 'compile', browserSync.reload])

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

gulp.task('clearlisting', function() {
  fs.writeFile('content/content.json', '[]');
});

gulp.task('compile', function () {
  return gulp.src('content/**/*.md')
    .pipe(each(function(content, file, callback) {
      frontMatter = matter(content);
      frontMatter.data.content = marked(frontMatter.content);
      frontMatter.data.url = file.path.replace(/^.*[\\\/]/, '').replace('.md', '').replace('index','');
      console.log(file.path);
      fs.readFile('content/content.json', (err, json) => {
        let jsonArray = JSON.parse(json);
        jsonArray.push({
          data: frontMatter.data
        });
        fs.writeFile('content/content.json', JSON.stringify(jsonArray));
      });
      var page = gulp.src('templates/html.twig')
        .pipe(twig({
           data: frontMatter
         }))
         .pipe(rename({
            dirname: frontMatter.data.url,
            basename: 'index',
            extname: '.html'
         }))
         .pipe(gulp.dest('./'));
       callback(null, page);
    }));
});

gulp.task('lint', function () {
    gulp.src('components/**/*.s+(a|c)ss')
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
});
