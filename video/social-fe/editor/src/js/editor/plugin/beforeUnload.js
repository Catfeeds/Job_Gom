if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
    $(document).on("click", '[href^="javascript"]', function(e) {
        e.preventDefault();
    })
}

top.window.onbeforeunload = function(e) {
    if (!window.noAlertMessage) {
        return ' ';
    };
}
