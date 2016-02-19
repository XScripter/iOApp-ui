var gulp = require('gulp');
var eslint = require('gulp-eslint');
var gulpIf = require('gulp-if');

function isFixed(file) {
	// Has ESLint fixed the file contents?
	return file.eslint != null && file.eslint.fixed;
}

gulp.task('eslint:src', function() {
	return gulp.src([
			'src/**'
		])
		// eslint() attaches the lint output to the eslint property
		// of the file object so it can be used by other modules.
		.pipe(eslint({
			fix: false
		}))
		// eslint.format() outputs the lint results to the console.
		// Alternatively use eslint.formatEach() (see Docs).
		.pipe(eslint.format())
		// To have the process exit with an error code (1) on
		// lint error, return the stream and pipe to failAfterError last.
		.pipe(eslint.failAfterError())
		.pipe(gulpIf(isFixed, gulp.dest('src')));
});

gulp.task('eslint:test', function() {
	return gulp.src([
			'test/**/*.{js,jsx}'
		])
		.pipe(eslint({
			fix: false
		}))
		.pipe(eslint.format())
		.pipe(eslint.failAfterError())
		.pipe(gulpIf(isFixed, gulp.dest('test')));
});
