var tips = require('module/i18n');
var editBox = $('[data-node=editBox]').eq(0);
var birTip = editBox.find('[data-node=birTip]');
var hideCls = 'hide';

var dateClick = function() {
    editBox.on('click', '[data-node=showDate]', function() {
        var dateDefault = $(this).attr('data-default');
        if (dateDefault) {
            birTip.removeClass(hideCls).text(tips.birthTip.tip);
            return false;
        }
    });
    var eTime = +$_CONFIG['curr_time'];
    var option = {
        endTime: eTime
    };
    require('module/date').initDate(option);
};
module.exports = {
    init: dateClick
};