function gotoPage(obj) {
    if (!obj.length) {
        return;
    }

    var n = parseInt(obj.text());
    var t = setInterval(function() {
        if (n <= 0) {
            clearInterval(t);
            window.location.href = $GLOBAL_CONFIG['main_domain'];
            return;
        } else {
            obj.text(--n);
        }
    }, 1000)
}

module.exports = gotoPage;