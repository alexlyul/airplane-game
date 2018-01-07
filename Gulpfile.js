const gulp = require('gulp'),
      jade = require('gulp-jade'),
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      browserSync = require('browser-sync'),
      reload = browserSync.reload;



//JADE
gulp.task('buildhtml', function() {
    const SET_LOCALS = {};
    gulp.src('./jade/*.jade')
        .pipe(jade({
            locals: SET_LOCALS
        }))
        .pipe(gulp.dest('./'))
        .pipe(reload({
            stream: true
        }));
});

//SASS
gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css'))
        .pipe(reload({
            stream: true
        }));
});

//JS
gulp.task('js', function () {
    gulp.src('./js/*.js')
        .pipe(reload({
            stream: true
        }));
});


gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: '.'
        },
        open: 'external'
    })
});


gulp.task('watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./jade/*.jade', ['buildhtml']);
    gulp.watch('./js/*.js', ['js']);
});


gulp.task('default', ['sass', 'buildhtml', 'js', 'browser-sync', 'watch']);

