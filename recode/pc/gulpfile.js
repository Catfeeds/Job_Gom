"use strict";
let gulp = require("gulp");
let path = require("path");
let EventEmitter = require('events');
let colors = require('colors');
let taskEvt = new EventEmitter();
let env = require("./bin/env");
let serverMiddleware = require("./bin/server.middleware");
let getStaticVersion = require("./bin/version");
let staticVersion = getStaticVersion().images;

// 引入组件
let imagemin = require("gulp-imagemin"),
    pug = require("gulp-pug"),
    sass = require("gulp-sass"),
    shell = require("gulp-shell"),
    uglify = require("gulp-uglify"),
    webserver = require("gulp-server-livereload"),
    watch = require("gulp-watch"),
    replace = require("gulp-replace"),
    webpack = require("webpack");

process.on("uncaughtException", function(err) {
    console.error("gulp Caught exception:", err);
});

let outputPath = env.online ? "./dist" : "./debug";
// clear
gulp.task("clear", function() {
    gulp.src(outputPath)
        .pipe(shell([
            "rm -rf <%= file.path %>"
        ]))
        .on("end", function() {
            console.log(colors.green("directory has been clear."));
            taskEvt.emit("clear");
        })
});

// put to html
gulp.task("pug", function(e) {
    gulp.src("./src/pug/**/*.pug")
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(outputPath + "/html/"))
        .on("end", function(e) {
            console.log(colors.green("html have been built."));
            taskEvt.emit("pug");
        })
})

// 压缩图片
gulp.task("image", function(e) {
    gulp.src("./src/images/**/*")
        .pipe(gulp.dest(outputPath + "/images/"))
        .on("end", function() {
            console.log(colors.green("image have been built."));
            taskEvt.emit("image");
        });
});

// sass解析
gulp.task("sass", function() {
    var rep = env.online ? "/$1?" + staticVersion + "$3)" : "/$1$3)";
    gulp.src(["./src/sass/**/*", "!./src/sass/core/**"])
        .pipe(sass({
            outputStyle: env.online ? "compressed" : "nested"
        }))
        .pipe(replace(/\/([^\/]+\.(png|jpe?g|gif))\s*(['"])?\s*\)/g, rep))
        .pipe(gulp.dest(outputPath + "/css/"))
        .on("end", function() {
            console.log(colors.green("css have been built."));
            taskEvt.emit("sass");
        });
});

// 压缩js
gulp.task("js", function() {
    let webpackConfig = require("./bin/webpack.config.js");

    function handleFatalError(err) {
        console.log(colors.red("Error:webpack issue with" + path + err));
    }

    function handleSoftErrors(errors) {
        console.log(colors.red("Error:js build error:\n" + errors.join('\n')));
    }

    function handleWarnings(warnings) {
        console.log(colors.yellow("Warnings:" + warnings.join('\n')));
    }
    webpack(webpackConfig, function(err, stats) {
        if (err) {
            return handleFatalError(err);
        }
        var jsonStats = stats.toJson();
        if (jsonStats.errors.length > 0) {
            return handleSoftErrors(jsonStats.errors);
        }
        if (jsonStats.warnings.length > 0) {
            handleWarnings(jsonStats.warnings);
        }

        function jsEndCb(){
			gulp.src("./src/js/shim/**/*")
			.pipe(gulp.dest(outputPath + "/js/conf/"))
			.on("end", function(e){
			  console.log(colors.green("js have been built."))
			  taskEvt.emit("js");
			});
        }
        if(env.online){
        	gulp.src(outputPath + "/js/conf/vendor.js")
	        .pipe(shell([
	            "cp <%= file.path %> " + outputPath + "/js/conf/vendor-ltie9.js"
	        ]))
	        .pipe(uglify())
	        .pipe(gulp.dest(outputPath + "/js/conf/"))
	        .on("end", jsEndCb);
        }else{
        	gulp.src(outputPath + "/js/conf/vendor.js")
	        .pipe(shell([
	            "cp <%= file.path %> " + outputPath + "/js/conf/vendor-ltie9.js"
	        ]))
	        .on("end", jsEndCb);
        }

    });
});

gulp.task("sdk", function(){
    gulp.src("./src/sdk/*.js")
    	//.pipe(replace(/var version = 0;/m, "var version = "+ staticVersion +";"))
        .pipe(uglify())
        .pipe(gulp.dest(outputPath + "/js/sdk/"))
})
gulp.task("component", function(){
	var taskNum = 0;
    var rep = env.online ? "/$1?" + staticVersion + "$3)" : "/$1$3)";
    gulp.src("./widget/**/*.css")
        .pipe(sass({
            outputStyle: env.online ? "compressed" : "nested"
        }))
        .pipe(replace(/\/([^\/]+\.(png|jpe?g|gif))\s*(['"])?\s*\)/mg, rep))
        .pipe(gulp.dest(outputPath + "/widget/"))
        .on("end", function(){
        	cb();
        })
    if(env.online){
    	gulp.src("./widget/**/*.js")
	        .pipe(uglify())
	        .pipe(gulp.dest(outputPath + "/widget/"))
	        .on("end", function(){
	        	cb();
	        })
	}else{
		gulp.src("./widget/**/*.js")
	        .pipe(gulp.dest(outputPath + "/widget/"))
	        .on("end", function(){
	        	cb();
	        })
	}
    gulp.src([env.build ? "" : "./widget/**/*.html", "./widget/**/images/**/*"])
        .pipe(gulp.dest(outputPath + "/widget/"))
        .on("end", function(){
        	cb();
        });
    function cb(){
    	if(++taskNum == 3){
    		taskEvt.emit("component");
    	}
    }
});

gulp.task("widget", function(){
    gulp.start(["sdk", "component"]);
    taskEvt.on("component", function(){
    	console.log("widget have been built.");
    	taskEvt.emit("widget");
    })
})

gulp.task("external", function(){
	var babel =  require("gulp-babel");
	var taskNum = 0;
	var rep = env.online ? "/$1?" + staticVersion + "$3)" : "/$1$3)";
    gulp.src("./external/**/*.css")
        .pipe(sass({
            outputStyle: env.online ? "compressed" : "nested"
        }))
        .pipe(replace(/\/([^\/]+\.(png|jpe?g|gif))\s*(['"])?\s*\)/mg, rep))
        .pipe(gulp.dest(outputPath + "/external/"))
        .on("end", function(){
        	externalCallback();
        })
    if(env.online){
    	gulp.src("./external/**/*.js")
    	.pipe(babel({presets:["latest"]}))
        .pipe(uglify())
        .pipe(replace(/([^\/]+?\.(png|jpe?g|gif))(['"])/mg, "$1?" + staticVersion + "$3"))
        .pipe(gulp.dest(outputPath + "/external/"))
        .on("end", function(){
        	externalCallback();
        })
    }else{
    	gulp.src("./external/**/*.js")
        .pipe(gulp.dest(outputPath + "/external/"))
        .on("end", function(){
        	externalCallback();
        })
    }

    gulp.src([env.build ? "" : "./external/**/*.html", "./external/**/images/**/*"])
        .pipe(gulp.dest(outputPath + "/external/"))
        .on("end", function(){
        	externalCallback();
        })
    function externalCallback(){
    	if(++taskNum == 3){
    		console.log("external task completed.");
    		taskEvt.emit("external");
    	}
    }

})

//webserver及自动刷新
gulp.task("server", function() {
    gulp.src("./")
        .pipe(webserver({
            host: env.host,
            port: env.port,
            directoryListing: true,
            open: true,
            livereload: {
                enable: false
            },
            https: env.port == 443 ? true : false,
            fallback: "./bin/404.html",
            fallbackLogic: serverMiddleware
        }))
        .on("end", function() {
            console.log(colors.green("server has started."));
            taskEvt.emit("server");
        });
});

// watching task
gulp.task("watch", function() {
    watch("./src/pug/**", function(e) {
        gulp.src("./src/pug/**/*.pug")
            .pipe(pug({
                pretty: true
            }))
            .pipe(gulp.dest(outputPath + "/html/"))
            .on("end", function(e) {
                console.log(colors.green("html have been built."));
            })
    });
    watch("./src/images/**", function(e) {
        gulp.src("./src/images/**/*")
            .pipe(gulp.dest(outputPath + "/images/"))
            .on("end", function() {
                console.log(colors.green("image have been built."));
            });
    });
    watch("./src/sass/**", function(e) {
        gulp.start("sass");
    });
    watch("./src/sdk/*.js", function(e) {
        gulp.start("sdk");
    });
    watch("./widget/**/*", function(e) {
        gulp.start("component");
    });
    watch("./external/**/*", function(e) {
        gulp.start("external");
    });
    console.log(colors.green("pug, sass, image, sdk, widget, external are watching."));
    taskEvt.emit("watch");
});

gulp.task("dev", ["clear"], function() {
    console.log("debug task is running.")
    let taskNum = 0;
    taskEvt.once("clear", function() {
        gulp.start(["pug", "image", "sass", "js", "widget", "external"]);
    });
    taskEvt.once("pug", function() {
        runServerAndWatch();
    });
    taskEvt.once("image", function() {
        runServerAndWatch();
    });
    taskEvt.once("sass", function() {
        runServerAndWatch();
    });
    taskEvt.once("js", function() {
        runServerAndWatch();
    });
    taskEvt.once("widget", function() {
        runServerAndWatch();
    });
    taskEvt.once("external", function() {
        runServerAndWatch();
    });

    function runServerAndWatch() {
        if (++taskNum == 6) {
            gulp.start(["watch", "server"]);
            taskNum = 0;
        }
    }
});

gulp.task("debugjs", function() {
    console.log("debugjs task is running.");
    gulp.start("js");
    taskEvt.once("js", function() {
        gulp.start(["server"]);
    });
});

gulp.task("dist", ["clear"], function(e) {
    console.log("dist task is running.")
    taskEvt.once("clear", function() {
        gulp.start(["pug", "image", "sass", "js", "widget", "external"]);
    });
});

gulp.task("build", ["clear"], function(e) {
    console.log("build task is running.")
    taskEvt.once("clear", function() {
        gulp.start(["image", "sass", "js", "widget", "external"]);
    });
});
