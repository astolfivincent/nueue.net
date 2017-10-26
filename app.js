var gulp             = require('gulp'),
    fs               = require('fs'),
    path             = require('path'),
    rename           = require('gulp-rename'),
    twig             = require('gulp-twig'),
    marked           = require('marked'),
    replace          = require('gulp-replace-path'),
    matter           = require('gray-matter'),
    each             = require('gulp-each'),
    contentPath      = 'content'; // folder where content lives

function parse_JSON(json) {
  if (!json || json == "") {
    return [];
  } else {
    return JSON.parse(json);
  }
}

function clear_listings(callback) {
  return gulp.src([contentPath+'/**/*.json'])
    .pipe(each(function(content, file, callback) {
      var jsonFile = fs.writeFile(contentPath+'/'+file.relative, '[]');
      callback(null, jsonFile);
    }));
    callback();
}

function listing_readwrite(path, data) {
  fs.readFile(path, (err, json) => {
    arr = parse_JSON(json);
    arr.push(data);
    fs.writeFile(path, JSON.stringify(arr));
  });
}

function get_page_path(rel) {
  return rel.replace(/^.*[\\\/]/, '').replace('.md', '').replace('index','');
}

function get_json_path(type) {
  return contentPath+'/'+type+'/'+type+'.json';
}

function get_page_type(rel, url) {
  rel = rel.replace('/'+url, '').replace('.md', '');
  if (rel == 'index') {
    rel = 'pages';
  }
  return rel;
}

function compile_template(template, data, dirname, basename = 'index', extname = '.html', dest = './') {
  return gulp.src(template)
    .pipe(twig({
       data: data
     }))
     .pipe(rename({
        dirname: dirname,
        basename: basename,
        extname: extname
     }))
     .pipe(gulp.dest(dest));
}

function compile_each(paths, func) {
  return gulp.src(paths)
    .pipe(each(function(content, file, callback) {
      frontMatter = matter(content);
      item = func(content, file, frontMatter);
      callback(null, item);
    }));
}

function compile_all() {
  compile_each([contentPath+'/**/*.md', '!'+contentPath+'/listings{,/**}'], function(content, file, frontMatter) {
    frontMatter.data.url = get_page_path(file.relative);
    frontMatter.data.type = get_page_type(file.relative, frontMatter.data.url);
    frontMatter.data.content = marked(frontMatter.content);
    path = get_json_path(frontMatter.data.type);
    listing_readwrite(path, frontMatter.data);
    return compile_template('templates/html.twig', frontMatter, frontMatter.data.url);
  });

  compile_each(contentPath+'/listings/*.md', function(content, file, frontMatter) {
    frontMatter.data.type = 'listing';
    frontMatter.data.masthead = 'false';
    path = get_json_path(frontMatter.data.content_type);
    fs.readFile(path, (err, json) => {
      var jsonArray = parse_JSON(json);
      var templateData = {
        data: {
          listing: frontMatter.data,
          items: jsonArray
        }
      };
      return compile_template('templates/html.twig', templateData, frontMatter.data.url);
    });
  });
}

clear_listings(compile_all());
