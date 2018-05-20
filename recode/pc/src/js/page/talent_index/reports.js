var fetch = require('io/fetch');
var urlLib = require('io/url');
var alert = require('module/popup/alert');
var popupCss = require('./popupCss');
var tplReports = require('./reportList.tpl');

exports.init = function (){
    var totalPage = parseInt($('.total-back').text().substring(1));
    var curPage = parseInt($('.cur').text());
    //console.log(totalPage);
    $('.page').on('click', '[data-current]', function (){
        var cur = $(this).attr('data-current');
        getReports(cur);
    });
    $('.page-count').off('click').on('click', '.btn', function (){
        var val = $('[name="pageNum"]').val();
        $('[name="pageNum"]').val('');
        if(val.match(/^-?\d+$/)){
            console.log('正则匹配通过');
            if(val == curPage){
                // console.log('就是这一页');
            }else if(val > totalPage){
                // console.log('大于最大页码');
                getReports(totalPage);
            }else if(val < 1){
                // console.log('小于1');
                getReports(1);
            }else{
                // console.log('yes');
                getReports(val);
            }
        }else{
            alert('请输入正确的页码');
            popupCss();
        }
    });
    function getReports(page){
        curPage = page;
        fetch.get(urlLib.get('expertNotice'),{
            data: {
                "page" : page
            },
            async: true
        }).done(function(data) {
            if(!data.success || data.code != 200){
                alert("数据请求失败 请稍后尝试");
                popupCss();
                return;
            }
            data.data.notifications.forEach( function (v){
                //这里取更新时间 没有更新时间 就拿创建时间
                var createDate = new Date(v.createTime);
                v.createTime = beDou((createDate.getMonth()+1)) + '-' + beDou(createDate.getDate()) + '  ' + beDou(createDate.getHours()) + ':' + beDou(createDate.getMinutes())
            });
            $('.report-list').html(tplReports({
                list: data.data.notifications
            }));
            $('.page-list .page').html(data.data.linkUrl);
            $('.page-count .cur').html(data.data.page);
            $('.page-count .total-back').html('/' + data.data.sumPage);
        }).fail(function() {
            alert("数据请求失败 请稍后尝试");
            popupCss();
        });
    }
}
function beDou(n){
    return n > 10 ? '' + n  : '0' + n;
}