const gulp = require("gulp");

gulp.task("lint", function () {
	const eslint = require("gulp-eslint");
	return gulp.src("*.js")
		.pipe(eslint())
		.pipe(eslint.format());
});
