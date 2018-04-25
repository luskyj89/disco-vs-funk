var gulp 			= require('gulp'),
    sass 			= require('gulp-sass'),
	autoprefixer	= require('gulp-autoprefixer'),
    uglify 			= require('gulp-uglify'),
    rename 			= require('gulp-rename'),
    concat 			= require('gulp-concat'),
	dest 			= require('gulp-dest'),
    notify 			= require('gulp-notify');
    plumber 		= require('gulp-plumber');

gulp.task('styles', function () {
    return gulp.src('../_dev/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass({
			includePaths: [
			],
			outputStyle: 'nested',
			errLogToConsole: false
		}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('../_prod/css/'))
		.pipe(notify({ message: 'Sass compiled 😎' }));
});

gulp.task('scripts', function() {
  return gulp.src('../_dev/js/**/*.js')
    .pipe(plumber())
    .pipe(concat('app.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('../_prod/js/'))
    .pipe(notify({ message: 'Scripts Compiled 😎' }));
});

gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('../_dev/scss/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('../_dev/js/**/*.js', ['scripts']);

});

gulp.task('default', function() {
    gulp.start('styles', 'scripts', 'watch');
});
