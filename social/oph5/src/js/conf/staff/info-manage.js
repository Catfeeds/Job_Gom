/**
 * Created by tianguangyu on 2016/9/1.
 */
define('conf/staff/info-manage.js', function (require) {
    var $ = require('$');
    var base64 = require('utils/base64.js');
    var urlP = location.protocol + '//';
    var urlH = urlP + location.hostname;
    var editUrl = urlH + '/' + $('#edit-info').attr('data-value');
    var missionUrl = urlH + '/' + $('#do-mission').attr('data-value');

    //修改资料
    $('#edit-info').click(function(){
        window.location.href = editUrl;
    });

    //怎么做任务
    $('#do-mission').click(function(){
        window.location.href = missionUrl;
    });

});