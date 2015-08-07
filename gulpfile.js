var gulp = require('gulp');
var browserify = require('browserify');
var source = require("vinyl-source-stream");
var watchify = require('watchify');
var reactify = require('reactify');

gulp.task('browserify', function(){
  browserifyShare();
});

function browserifyShare(){
  // you need to pass these three config option to browserify
  var b = browserify({
    cache: {},
    packageCache: {},
    fullPaths: true,
    transform: [reactify]
  });
  b = watchify(b);
  b.on('update', function(){
    console.log("Updated");
    bundleShare(b);
  });
  
  b.add('./public/scripts/main.js');
  bundleShare(b);
}

function bundleShare(b) {
  b.bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./dist'));
}