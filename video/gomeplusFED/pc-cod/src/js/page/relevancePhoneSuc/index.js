/**
 * Created by dongyukuan on 2016/5/24.
 */
var CountDown = require('utils/countdown');
var $node = $('[data-node=countdown]');
new CountDown(5, {
    onChange: function(num){
        $node.text(num + ' ');
    },
    onFinish: function(){
        location.href = $GLOBAL_CONFIG['redirect'];
    }
});
