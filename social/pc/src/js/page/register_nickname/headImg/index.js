var cropper = require('module/cropper');
var dialog = require('dialog');

var facePop = require('./editFace.tpl');

var faceBox = $('[data-node=faceBox]');
var faceImg = faceBox.find('[data-node=faceImg]');
var faceBtn = faceBox.find('[data-action=faceBtn]');

var showPop = function() {
    var data = {
        faceSrc: faceImg.attr('src')
    };
    var faceHtml = facePop(data);
    var d = dialog({
        width: 800,
        fixed: true,
        title: '头像照片',
        modal: true,
        autofocus: false,
        content: faceHtml,
        className: 'pop-box',
        onshow: function() {
            cropper.init(function(src) {
                faceImg.attr('src', src);
                d.remove();
            });
        },
        onclose: function() {
            cropper.destroy();
        }
    });
    d.show();
};
var initEvent = function() {
    faceBtn.on('click', showPop);
};
module.exports = {
    init: initEvent
};