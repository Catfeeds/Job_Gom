var hint = require('module/hint');
var url = require('io/url');
var fetch = require('io/fetch');
var init = function(){
    var ticketId;
    $(document).on('click', '[data-action="getRed"]', function(){
        ticketId = $(this).attr('data-redid');

        var noRefreshFetch = function(){
            fetch.post( url.get( 'getTicket' ), {
                validate:true,
                data : {
                    batchSn: ticketId,
                    userId: $GLOBAL_CONFIG.userId
                },
                onLogin: noRefreshFetch
            }).done(function( data ){
                
                if( data&&data.success&&data.code === 200 ){

                    hint.init('领取成功');

                }else{

                    hint.init(data.message);

                }
                
                
                
            }).fail(function(){

                

            });
        }
        noRefreshFetch();
            
        return false;

    });
}

module.exports = {
    init : init
}