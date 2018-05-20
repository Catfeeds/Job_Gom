var resize = function() {
    var status = '';
    var $document = $(document.body);
    var wrapBoxS = 'w1000';
    if (window.screen.width <= 1024) {
        $document.addClass(wrapBoxS);
        status = 'small';
    } else {
        $document.removeClass(wrapBoxS);
        status = 'big';
    }
    return status;
}
module.exports = resize;
