"use strict";
let gulp = require("gulp");
let path = require("path");
let EventEmitter = require('events');
let colors = require('colors');
let taskEvt = new EventEmitter();
let config = require("./build/config");
let serverMiddleware = require("./build/server.middleware");
let getStaticVersion = require("./build/getversion");

// 引入组件
let imagemin = require("gulp-imagemin"),
    pug = require("gulp-pug"),
    sass = require("gulp-sass"),
    shell = require("gulp-shell"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    babel = require("gulp-babel"),
    webserver = require("gulp-server-livereload"),
    watch = require("gulp-watch"),
    replace = require("gulp-replace");

process.on("uncaughtException", function(err) {
    console.error("gulp Caught exception:", err);
});

let entryPath = path.resolve(__dirname, "./src/application/");
let outputPath = config.online ? path.resolve(__dirname, "./dist") : path.resolve(__dirname, "./debug");
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

function pug2html(e) {
    gulp.src(entryPath + "/**/pug/**/*.pug")
    .pipe(pug({
        pretty: true
    }))
    .pipe(rename(function(path){
        path.dirname = path.dirname.replace(/[\/\\]pug/, "/html")
    }))
    .pipe(gulp.dest(outputPath))
    .on("end", function(e) {
        console.log(colors.green("html have been built."));
        taskEvt.emit("pug");
    })
}
gulp.task("pug", pug2html)

function imageMin(e) {
    gulp.src(entryPath + "/**/images/**/*")
    .pipe(gulp.dest(outputPath))
    .on("end", function() {
        console.log(colors.green("image have been built."));
        taskEvt.emit("image");
    });
}
gulp.task("image", imageMin);

// sass解析
gulp.task("sass", function() {
    var rep = config.env == "build" ? "/$1?" + getStaticVersion().images + "$3)" : "/$1$3)";
    gulp.src(entryPath + "/**/sass/page/*.scss")
    .pipe(sass({
        outputStyle: config.online ? "compressed" : "nested"
    }))
    .pipe(replace(/\/([^\/]+\.(png|jpe?g|gif))\s*(['"])?\s*\)/g, rep))
    .pipe(rename(function(path){
        path.dirname = path.dirname.replace(/[\/\\]sass[\/\\]page/, "/css")
    }))
    .pipe(gulp.dest(outputPath))
    .on("end", function() {
        console.log(colors.green("css have been built."));
        taskEvt.emit("sass");
    });
});

gulp.task("js", function() {
  if(config.online){
    gulp.src(entryPath + "/**/js/page/*.js")
    .pipe(babel({presets:["env"]}))
    .pipe(uglify())
    .pipe(rename(function(path){
        path.dirname = path.dirname.replace(/[\/\\]page/, "")
    }))
    .pipe(gulp.dest(outputPath))
    .on("end", function() {
        console.log(colors.green("js have been built."));
        taskEvt.emit("js");
    });
  }else{
    gulp.src(entryPath + "/**/js/page/*.js")
    .pipe(babel({presets:["env"]}))
    .pipe(rename(function(path){
        path.dirname = path.dirname.replace(/[\/\\]page/, "")
    }))
    .pipe(gulp.dest(outputPath))
    .on("end", function() {
        console.log(colors.green("js have been built."));
        taskEvt.emit("js");
    });
  }
})

gulp.task("vendor", function() {
    gulp.src("./src/vendor/**/*")
    .pipe(gulp.dest(outputPath + "/vendor/"))
    .on("end", function() {
        console.log(colors.green("vendor task have been built."));
        taskEvt.emit("vendor");
    });
})

gulp.task("server", function() {
    gulp.src("./")
    .pipe(webserver({
        host: config.host,
        port: config.port,
        directoryListing: true,
        open: true,
        livereload: {
            enable: false
        },
        https: config.port == "443" ? true : false,
        fallback: "./build/404.html",
        fallbackLogic: serverMiddleware
    }))
    .on("end", function() {
        console.log(colors.green("server has started."));
        taskEvt.emit("server");
    });
});

gulp.task("watch", function() {
    watch("./src/**/pug/**", pug2html);
    watch("./src/**/images/**", imageMin);
    watch("./src/**/sass/**", function(e) {
        gulp.start("sass");
    });
    watch("./src/**/js/**", function(e) {
        gulp.start("js");
    });
    console.log(colors.green("pug, sass, image, js are watching."));
    taskEvt.emit("watch");
});

gulp.task("dev", ["clear"], function() {
    console.log("debug task is running.")
    let taskNum = 0;
    taskEvt.once("clear", function() {
        gulp.start(["pug", "image", "sass", "js", "vendor"]);
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
    taskEvt.once("vendor", function() {
        runServerAndWatch();
    });
    function runServerAndWatch() {
        if (++taskNum == 5) {
            gulp.start(["watch", "server"]);
            taskNum = 0;
        }
    }
});

gulp.task("dist", ["clear"], function() {
    taskEvt.once("clear", function() {
        gulp.start(["pug", "image", "sass", "js", "vendor"]);
    });
})

gulp.task("build", ["clear"], function() {
    taskEvt.once("clear", function() {
        gulp.start(["image", "sass", "js", "vendor"]);
    });
})
