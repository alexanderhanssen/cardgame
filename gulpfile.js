var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify'); 
var concat = require('gulp-concat');
 
gulp.task('browserify', function() {
    bundleBrowserify(false);

/*
    return watcher
    .on('update', function () { // When any files update
        var updateStart = Date.now();
        console.log('Updating!');
        watcher.bundle() // Create new bundle that uses the cache for high performance
        .pipe(source('main.js'))
    // This is where you add uglifying etc.
        .pipe(gulp.dest('./public/build/'));
        console.log('Updated!', (Date.now() - updateStart) + 'ms');
    })
    .bundle() // Create the initial bundle when starting the task
    .pipe(source('main.js'))
    .pipe(gulp.dest('./public/build/'));
    */
});

gulp.task('watch', function(){
    bundleBrowserify(true);
});

// I added this so that you see how to run two watch tasks
gulp.task('css', function () {
    gulp.watch('styles/**/*.css', function () {
        return gulp.src('styles/**/*.css')
        .pipe(concat('main.css'))
        .pipe(gulp.dest('build/'));
    });
});


function bundleBrowserify(shouldWatch) {
   var bundle = browserify({
        entries: ['./public/scripts/main.js'], // Only need initial file, browserify finds the deps
        debug: true
    });
    bundle.transform(reactify);
   console.log(shouldWatch);
   if (shouldWatch) {
     bundle = watchify(bundle);
     bundle.on('update', doUpdate);
     return bundle;
   }
   // Ikke watching
   return doUpdate();

  function doUpdate(){
    return bundle.bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('./public/build'));
  }
}



// Just running the two tasks
gulp.task('default', ['browserify', 'css']);