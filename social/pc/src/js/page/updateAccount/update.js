var fetch = require('io/fetch');
var url = require('io/url');
var alert = require('module/popup/alert');
var confirmPopUp = require('./popup');

var firing = false;

function update($userForm) {
    var $loginDom = $userForm.find('[data-node=userLogin]');

    if (firing) {
        return;
    }
    firing = true;

    $loginDom.text("升级中...");

    fetch
        .get(url.get('accountUpgrade'))
        //fetch.get('1.json')
        .done(function(json) {
            if (json && json.success) {
                if (json.code == 200) {
                    confirmPopUp('升级成功');
                } else {
                    alert(json.message);
                }
            } else {
                alert(json.message);
            }
        })
        .fail(function(json) {
            alert(json.message);
        })
        .always(function() {
            $loginDom.text("升级一账通账户");
            firing = false;
        })
}
module.exports = update;