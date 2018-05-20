var upLoad = require('module/upload');

var init = function() {

    upLoad.init({
        maxlength: 5
    });
}

module.exports = {
    init: init
}