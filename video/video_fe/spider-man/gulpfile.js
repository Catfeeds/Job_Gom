//安装gulp	npm install gulp cli gulp-ruby-sass gulp-autoprefixer gulp-minify-css jshint gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del gulp-sourcemaps gulp-ejs gulp-base64 gulp-file-copy --save-dev
var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifyCss = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	gulpCopy = require('gulp-file-copy'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	cache = require('gulp-cache'),
	livereload = require('gulp-livereload'),
	sourcemaps = require('gulp-sourcemaps'),
	ejs = require("gulp-ejs"),
	/*spritesmith = require('gulp.spritesmith'),
	config      = require('../../config').sprites,*/
	del = require('del');

//sass编译 添加前缀 保存到目录下 压缩 添加.min在输出压缩文件到指定目录，最后提示任务完成
gulp.task('styles', function() {
	return sass('./src/css/**/*.scss', {
			sourcemap: true
		})
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'Android >= 4.0', 'ios 6', 'android 4'],
			cascade: true, //是否美化属性值 默认：true 像这样：
			//-webkit-transform: rotate(45deg);
			//        transform: rotate(45deg);
			remove: true //是否去掉不必要的前缀 默认：true
		}))
		.on('error', sass.logError)

		// For inline sourcemaps 
		//  .pipe(sourcemaps.write())

		// For file sourcemaps 
		//  .pipe(sourcemaps.write('maps', {
		//    includeContent: false,
		//    sourceRoot: 'source'
		//  }))
		//.pipe(concat('common.css'))
		.pipe(gulp.dest('./dist/css'))
		.pipe(notify({
			message: '老大，您的sass旨意已完成'
		}));
});

//压缩图片
gulp.task('images', function() {
	return gulp.src('./src/imgs/**/*')
		//  .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
		.pipe(gulp.dest('./dist/imgs'))
	//.pipe(notify({ message: '老大，您的图片压缩旨意已完成' }));
});

//copy字体文件
gulp.task('copy', function() {
	return gulp.src('./src/fonts/*')
		.pipe(gulp.dest('./dist/fonts'))
});

//ejs解析
gulp.task('ejs', function() {
	gulp.src('./src/ejs/**/*')
		.pipe(ejs({}, {}, {
			ext: '.html'
		}))
		.pipe(gulp.dest('./dist/html'))
});

//js解析
gulp.task('js', function() {
	gulp.src('./src/js/**/*')
		.pipe(jshint())
		.pipe(gulp.dest('./dist/js'))
});

//在任务执行前，最好先清除之前生成的文件
gulp.task('clean', function() {
	del(['./dist/css', './dist/fonts', './dist/html', './dist/js', './dist/imgs'], {
		force: true
	})
});

//我们在命令行下输入 gulp执行的就是默认任务
gulp.task('default', ['clean'], function() {
	gulp.start('styles', 'images', 'copy', 'ejs', 'js');
});

//监听文件的是否修改以便执行相应的任务
gulp.task('watch', function() {
	gulp.watch('./src/css/**/*.scss', ['styles']);
	gulp.watch('./src/imgs/**/*', ['images']);
	gulp.watch('./src/ejs/**/*', ['ejs']);
	gulp.watch('./src/js/**/*', ['js']);
	gulp.watch('./src/fonts', ['copy']);
	livereload.listen();
	// Watch any files in dist/, reload on change
	gulp.watch(['./dist/css', './dist/html', './dist/js', './dist/imgs', './dist/fonts']).on('change', livereload.changed);

});