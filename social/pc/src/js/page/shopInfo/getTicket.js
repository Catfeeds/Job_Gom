var alert = require('module/popup/alert');
var url = require('io/url');
var fetch = require('io/fetch');
var init = function() {
    var ticketId;
    var allowGet = true;
    $(document).on('click', '[data-action="getRed"]', function() {
        if( allowGet ){
            allowGet = false;
            ticketId = $(this).attr('data-redid');

            var noRefreshFetch = function() {
                fetch.post(url.get('getTicket'), {
                    validate: true,
                    data: {
                        batchSn: ticketId,
                        userId: $_CONFIG.userId
                    },
                    onLogin: noRefreshFetch
                }).done(function(data) {

                    var surplus = 0;
                    var msg = '';

                    if (data && data.success && data.code === 200) {
                        surplus = data.data.userRemainingAvailableQuantity;
                        msg = '还可以领取' + surplus + '张';

                        if (surplus < 1) {
                            msg = '领取次数已达上限';
                        }
                        alert('领取成功，' + msg);
                    } else {

                        alert(data.message);

                    }
                    allowGet = true;
                }).fail(function() {
                    alert('网络可能出问题了，请稍后重试');
                    allowGet =  true;
                });
            }
            noRefreshFetch();

            return false;
        }
        

    });
}

module.exports = {
    init: init
}