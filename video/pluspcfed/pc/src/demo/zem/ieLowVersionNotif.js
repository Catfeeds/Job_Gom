(function() {

    var isIEFirstTime =
        (localStorage.getItem('isIEFirstTime') === null)
        ? true
        : false;

    if (isIEFirstTime) {
        var ieUpdPopup = $('#ie-upd-popup');
        ieUpdPopup
            .fadeIn()
            .children('.close')
            .click(function() {
                ieUpdPopup.fadeOut();
            });
    } else {
        $(window).animate(
            {
                'paddintTop': 60
            },
            400
        );
        $('#ie-upd-top-bar').slideDown(400);
    }

    localStorage.setItem('isIEFirstTime', false);

})();
