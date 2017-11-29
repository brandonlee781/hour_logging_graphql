var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('default', function() {
  return gulp.src(['./src/**/*', '!./**/*.ts'])
    .pipe(gulp.dest('dist'));
})