(function () {
    let speed = 3; //图片切换速度，单位：秒
    var imgs = ['1.jpg', '2.jpg']; // 图片文件名

    var index = 0;
    var isChrome = navigator.userAgent.indexOf('Chrome') > -1

    // 图片预加载
    var images = new Array()
    for (var i = 1; i < imgs.length; i++) {
        images[i] = new Image();
        images[i].src = "images/" + imgs[i];
    }
    // load
    document.body.onload = function () {
        var login = document.getElementsByClassName('login-con')[0];
        setInterval(function () {
            index = (index + 1) == imgs.length ? 0 : index + 1;
            
            if (!isChrome) {
                login.classList.add('opacityStart');
                setTimeout(function() {
                    login.style.backgroundImage = 'url(images/' + imgs[index] + ')';
                }, 500)
                setTimeout(function () {
                    login.classList.remove('opacityStart');
                }, 1500)
            } else {
                login.style.backgroundImage = 'url(images/' + imgs[index] + ')';
            }
        }, speed * 1000)
    };
})();