(function() {
    function setFont() {
        var __rootrem;
        var clientWidth = (document.documentElement || document.body.parentNode).clientWidth;
        if ( clientWidth > 769) {
            clientWidth = 750;
        }
        // 375尺寸的比例，换算成@1x设计稿后1px=0.01rem
        __rootrem = Math.floor(clientWidth * 100 / 750);
        (document.documentElement || document.body.parentNode).style.fontSize = __rootrem + "px";
    }
    setFont();
    window.addEventListener("resize", function() {
        setFont();
    });
})();