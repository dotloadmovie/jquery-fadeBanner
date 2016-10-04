var gulp = require('gulp');
var replace = require('gulp-replace');
var ts = require('gulp-typescript');

gulp.task('default', function() {
    //no-op
});

gulp.task('build', function(){

    gulp.src(['src/fadeBanner.ts'])
        .pipe(replace('export module Banner', 'module Banner')).pipe(gulp.dest('src/'))
        .pipe(ts({module: 'commonjs'})).pipe(gulp.dest('dist/'));

});

gulp.task('reset', function(){

    gulp.src(['src/fadeBanner.ts']).pipe(replace('module Banner', 'export module Banner')).pipe(gulp.dest('src/'));

});