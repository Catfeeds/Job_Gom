
<div class="search-box" data-node="addTopBox">
  <input type="text" placeholder="搜索商品" data-action="addSearchInput">
  <em class="iconn-3" data-action="addSearchBtn"></em>
</div>       
<div class="ui-dialog-title" data-node="title">我收藏的商品</div>
<p class="no-saving-txt" style="display:none;" data-node="searchNormal">暂无收藏的商品，可以搜索查找！</p>
<div class="loading" data-node="searchLoading"><img src="{{imgSrc}}/images/public/loading.gif" alt=""></div>
<p class="failed-txt"  style="display:none;" data-node="searchFail">数据获取失败，点击重新加载！</p>
<div  style="display:{{(returnList.length === 0 ? 'none':'')}};" data-node="searchResultBox">
  <div class="merchant-list clearfix" >
    <div class="clearfix" data-node="searchResultList"></div>
    <div class="more-comments pop-more-com" data-action="moreItem" style="display:none;">
      
        <span><img src="{{imgSrc}}/images/public/loading.gif">正在加载...</span>
    
    </div>
  </div>
  <div class="chosed-merchants" data-node="changedBox" style="display:{{(returnList.length>0?'':'none')}}">
    <ul class="merchants-list clearfix" data-node="searchChangeList">
      {{ each returnList }}
        <li data-pid="{{$value.PId}}">
          <img src="{{$value.img}}" alt="">
            <a href="javascript:;" data-action="delChanged">
              <em class="iconn-66"></em>
            </a>
          </li>
        {{/each}}
    </ul>
  </div>
  <div class="num-pics">您可以添加 <span class="link-hover-red" data-node="searchChangeNum">{{maxlength}}</span><span class="deep-gray">/{{maxlength}} </span>个商品</div>
</div>