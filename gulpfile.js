var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var concat = require('gulp-concat');
var babelify = require('babelify');
 
gulp.task('watch', function () {
  var watcher = watchify(
    browserify({
      entries: ['./public/scripts/main.js'],
      debug: true,
      cache: {},
      packageCache: {},
    })
      .transform(babelify)
   );

  function bundle () {
    return watcher
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./public/build'));
  }

  function update () {
    var updateStart = Date.now();
    console.log('JavaScript changed - recomiling via Browserify');
    bundle();
    console.log('Done! ' + (Date.now() - updateStart) + ' ms');
  }

  watcher.on('update', update);

  return bundle();
}); 

gulp.task('build', function(){
    var bundle = browserify({
        entries: ['./public/scripts/main.js'], // Only need initial file, browserify finds the deps
        debug: true
    });
    bundle.transform(babelify);
       
    return bundle.bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./public/build'));
});

// I added this so that you see how to run two watch tasks
gulp.task('css', function () {
    gulp.watch('styles/**/*.css', function () {
        return gulp.src('styles/**/*.css')
        .pipe(concat('main.css'))
        .pipe(gulp.dest('build/'));
    });
});

// Just running the two tasks
gulp.task('default', ['watch', 'css']);