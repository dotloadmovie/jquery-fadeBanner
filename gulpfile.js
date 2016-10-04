var gulp = require('gulp');
var replace = require('gulp-replace');
var ts = require('gulp-typescript');
var rename = require("gulp-rename");
var clean = require('gulp-clean');

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

    gulp.src('dist/fadeBanner.js').pipe(rename('jquery.fadeBanner.js')).pipe(gulp.dest('dist/'));

    return gulp.src('dist/fadeBanner.js')
        .pipe(clean({force: true}))
        .pipe(gulp.dest('dist/'));


});

