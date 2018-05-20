import fetch from 'io/fetch';
import PullToRefresh from 'components/pullToRefresh';

var $goodList = $('[data-content=goods]');
var ptr = new PullToRefresh($goodList, {
  scrollContainer: '#liveContent'
});
var $noData = $('[data-node=no-data]');
var $goodBox = $('[data-node=goodslist]');
$CONFIG['topicId'] = "1647";
function getGoods() {
    ptr.on('refreshing', function() {
        fetch.get('/product.json?id='+ $CONFIG['topicId']).done(function (json) {
            if(json && json.code === 200){
                var list = json.data.list;
                var len = list.length;
                console.log(list);
                if(len > 0){
                    var li_html = goodsHtml(list);
                    $goodBox.empty().html(li_html);
                    $noData.addClass('hide');
                }else{
                    $goodBox.empty().addClass('hide');
                    $noData.removeClass('hide');
                }
            }
        }).always(function () {
            ptr.loadDone();
        });

    });
}

function goodsHtml(list){
    var li = '';
    for(var i = 0; i < list.length; i++){
        var item = list[i];
        console.log(item.type);
        var purl = '';
        var pbtn = '';
        if(item.type == 3){
            purl = item.mUrl;
            pbtn = '<div class="goods-btn quan"><span>去抢券</span></div>';
        }else{
            purl = item.url;
            pbtn = '<div class="goods-btn"><span>去购买</span></div>';
        }
        li +=`
            <li>
              <a  data-code=${'product-'+[i+1]} class="goods-detail" href="${purl}" >
                  <img src="${item.image}">
                  <div class="goods-msg">
                      <div class="goods-title">${item.name}</div>
                      ${pbtn}
                  </div>
              </a>
          </li>
        `
    }
    return li;
}

export default getGoods;