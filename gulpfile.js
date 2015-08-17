var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var concat = require('gulp-concat');
var babelify = require('babelify');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var envify = require('envify');

gulp.task('watch', function () {
  var watcher = watchify(
    browserify({
      entries: ['./public/scripts/main.js'],
      debug: true,
      cache: {},
      packageCache: {},
    })
      
   );
  watcher.transform(babelify);
  watcher.transform(envify);
  function bundle () {
    return watcher
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./public/build'));
  }

  function update () {
    var updateStart = Date.now();
    console.log('Recompiling');
    bundle();
    console.log('Done! ' + (Date.now() - updateStart) + ' ms');
  }

  watcher.on('update', update);

  return bundle();
}); 

gulp.task('build', function(){
    var bundle = browserify({
        entries: ['./public/scripts/main.js'],
        debug: false
    });
    bundle.transform(babelify);
    bundle.transform(envify);
       
    return bundle.bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./public/build'));
});

gulp.task('styles', function () {
    return gulp.src('public/style/cards.less')
    .pipe(less())
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(minifyCSS())
    .pipe(gulp.dest('public/build/'));
});

// Just running the two tasks
//gulp.task('default', ['watch', 'styles']);

gulp.task('default', function(){
 gulp.run('watch', 'styles');
  gulp.watch('public/style/**', function(event) {
        gulp.run('styles');
    })
});

gulp.task('bundle-js-css', ['build', 'styles']);

