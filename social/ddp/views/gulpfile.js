var gulp = require('gulp');
var ejs = require('gulp-ejs');
var htmlbeautify = require('gulp-html-beautify');

gulp.task('dev', function() {
	gulp.watch('./src/*', ['build'])
	gulp.watch('./component/*', ['build'])
})

gulp.task('build', function() {
	return gulp
		.src('./src/*.html')
		.pipe(ejs())
		.pipe(htmlbeautify({
			'allowed_file_extensions': ['htm', 'html', 'xhtml', 'shtml', 'xml', 'svg', 'vue'],
			'brace_style': 'collapse',
			'end_with_newline': false,
			'indent_char': ' ',
			'indent_handlebars': false,
			'indent_inner_html': false,
			'indent_with_tabs': true,
			'indent_scripts': 'keep',
			'indent_size': 4,
			'max_preserve_newlines': 0,
			'preserve_newlines': true,
			'unformatted': ['a', 'span', 'img', 'code', 'pre', 'sub', 'sup', 'em', 'strong', 'b', 'i', 'u', 'strike', 'big', 'small', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
			'wrap_line_length': 0
		}))
		.pipe(gulp.dest('./dist'))
})
