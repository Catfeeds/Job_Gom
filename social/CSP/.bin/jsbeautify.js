var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;


var beautify_js = require('js-beautify');
var beautify_css = require('js-beautify').css;
var beautify_html = require('js-beautify').html;
var rd = require('rd');
var minimist = require('minimist');
var commentRegex = require('comment-regex');

var argv = require('minimist')(process.argv.slice(2));


var isTypeAllowed = function(type, path) {
    var allowedFileExtensions = {
        "html": ["htm", "html", "xhtml", "shtml", "xml", "svg", "vue"],
        "css": ["css", "scss", "sass", "less"],
        "js": ["js", "json", "jshintrc", "jsbeautifyrc"]
    }[type];
    for (var i = 0, len = allowedFileExtensions.length; i < len; i++) {
        if (path.match(new RegExp("\\." + allowedFileExtensions[i] + "$", "i"))) {
            return true;
        }
    }
    return false;
}

var isCSS = function(path, data) {
    if (path == "?") {
        return false;
    }
    return isTypeAllowed("css", path);
}

var isHTML = function(path, data) {
    if (path == "?") {
        return data.match(/^\s*</);
    }
    return isTypeAllowed("html", path);
}

var isJS = function(path, data) {
    if (path == "?") {
        return !data.match(/^\s*</);
    }
    return isTypeAllowed("js", path);
}

var parseJSON = function(file) {
    try {
        return JSON.parse(fs.readFileSync(file, "utf8").replace(commentRegex(), ''));
    } catch (e) {
        console.log("Could not parse JSON at: " + file);
        return {};
    }
}

var options = {};
if (fs.existsSync(path.join(__dirname, './.jsbeautifyrc'))) {
    options = parseJSON(path.join(__dirname, './.jsbeautifyrc'));
}

var formatMain = function(filePath) {
    fs.readFile(filePath, "utf8", function(err, data) {
        if (err) {
            return;
        }
        if (isCSS(filePath, data)) {
            fs.writeFileSync(filePath, beautify_css(data, options['css']), 'utf-8');
        } else if (isHTML(filePath, data)) {
            fs.writeFileSync(filePath, beautify_html(data, options['html']), 'utf-8');
        } else if (isJS(filePath, data)) {
            fs.writeFileSync(filePath, beautify_js(data, options['js']), 'utf-8');
        }
    });
}

if (argv.all) {
    console.log('Format all file ing');
    var files = rd.readSync('./src/');
    files.forEach(function(item, index) {
        formatMain(item);
    })
    return;
}

exec('git diff HEAD --name-only --diff-filter=ACMR -- src/', function(err, stdout, stderr){
    if(err){
        console.log(err);
        process.exit(1);
        return;
    }
    console.log('\nFormat modifify file\n');
    var array = stdout.split('\n');
    array.pop();
    array.forEach(function(item, index){
        formatMain(item);
    })
    process.exit(0);
})
