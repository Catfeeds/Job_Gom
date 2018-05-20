/**
 * Created by tianguangyu on 2016/9/1.
 */
define('conf/staff/mission.js', function (require) {
    var $ = require('$');
    var base64 = require('utils/base64.js');
    var AppInterface = require('utils/appInterface.js');

    //œ¬‘ÿπ˙√¿+
    $('#download-btn').click(function(){
        AppInterface.call('/common/open_app');
        setTimeout(function(){
            window.location.href = 'https://m.gomeplus.com/state/appdownload';
        },3000);
    });

});