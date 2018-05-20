var alert = require('module/popup/alert');

function popUp(content) {
    alert(content, {
        okValue: "回到首页",
        cancel: false,
        ok: function() {
            window.location.href = $_CONFIG['main_domain'];
        }
    });
}

module.exports = popUp;