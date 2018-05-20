//安装gulp	npm install gulp cli jshint gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del gulp-sourcemaps gulp-jade --save-dev

// 安装gulp npm install gulp-ruby-sass

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    // cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    jade = require('gulp-jade'),
    del = require('del');
    
//sass编译 添加前缀 保存到目录下 压缩 添加.min在输出压缩文件到指定目录，最后提示任务完成
gulp.task('sass', function() {
  return sass('sass/**/*.scss',{ sourcemap: true })
    .on('error', sass.logError)
	.pipe(gulp.dest('../../../ui-html/app/css'))
    .pipe(notify({ message: '编译已完成' }));
});


//压缩图片
gulp.task('img', function() {
  return gulp.src('images/**/*')
//  .pipe(imagemin({ optimizationLevel: 0, progressive: true, interlaced: true }))
    .pipe(gulp.dest('../../../ui-html/app/images'))
    //.pipe(notify({ message: '老大，您的图片压缩旨意已完成' }));
});

//jade解析
gulp.task('pug', function() {
	gulp.src('pug/**/*.pug')
    .pipe(jade({
    	pretty:true
    }))
    .pipe(gulp.dest('../../../ui-html/app/html'))
});


//在任务执行前，最好先清除之前生成的文件
gulp.task('del', function() {
    del([
		'../../../ui-html/app/css',
		'../../../ui-html/app/html',
		'../../../ui-html/app/images'
	],{force:true})
});


//我们在命令行下输入 gulp执行的就是默认任务，现在我们为默认任务指定执行上面写好的2个任务
gulp.task('default',['del'], function() {
    gulp.start('sass', 'pug');
});

//监听文件的是否修改以便执行相应的任务
gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch('sass/**/*.scss', ['sass']);
//gulp.watch('src/sass/module/*.scss', ['styles2']);
  // Watch image files
  gulp.watch('src/images/*', ['img']);
 // Watch image files
  gulp.watch('pug/**/*', ['pug']);
  // Create LiveReload server
  livereload.listen();
  // Watch any files in dist/, reload on change
  gulp.watch(['../../../ui-html/app/css/**','../../../ui-html/app/html/**','../../../ui-html/app/images']).on('del', livereload.changed);

});



