<?php
    $csspath = 'gomesearch.css';
    $jspath = '/js/conf/goodSearch.js';
?>

<include file="Home@Front/Public/header" />
<style>
  body{
    background: #fff;
  }
</style>
<script>
$GLOBAL_CONFIG['query_string'] = '<{$query_string}>';
$GLOBAL_CONFIG['csid'] = '<{$sourceCode}>';
</script>
    <div class="gome-search">
      <div class="wrap-box">
		<div class="totop" data-node="top" style="display:none"><a href="javascript:;"><em class="icon iconn-1"></em><span>返回顶部</span></a></div>
    <!--面包屑开始-->
    <div class="search-crumbs">
    <a href="javascript:;">全部商品</a>
    <notempty name="search_crumbs.cate">
    <em>></em><a href="<{$search_crumbs.cate.url}>" class="active">分类：<em><{$search_crumbs.cate.name}></em><span>&times;</span></a>
    </notempty>
    <notempty name="search_crumbs.brand">
    <em>></em><a href="<{$search_crumbs.brand.url}>" class="active">品牌：<em><{$search_crumbs.brand.name}></em><span>&times;</span></a>
    </notempty>
    <notempty name="search_crumbs.keyword">
    <em>></em><a href="javascript:;"><{$search_crumbs.keyword}></a>
    </notempty>
    </div>
	  <!--面包屑结束-->
		<notempty name="search_data.spellcheck.type">
    <!--纠错部分开始-->
		<div class="search-warning" data-node='search-warning'>为您显示“<span><{$search_data['spellcheck']['suggestWord']}></span>”相关商品，仍然搜索“<a href="<{$search_data['spellcheck']['originWordUrl']}>"><span><{$search_data['spellcheck']['originWord']}></span></a>”<em class="iconn-7" data-node='warning-icon'></em></div>
    <!--纠错部分结束-->
		</notempty>
		    <notempty name="search_data.count">
		    <div class="search-val">
          <empty name="search_params.brandIds">
          <!--品牌列表开始-->
          <!--添加active隐藏多余选项-->
          <div class="val-kind active" data-node="wrap" data-brands="<{$search_data.firstBrandStr}>">
            <div class="kind-name">品牌</div>
            <div class="kind-val">
              <?php if( count($search_data['facet']['brands'] ) > 14 ):?>
              <a href="javascript:;" class="more" data-action="more">更多<em class="icon-down"></em></a>
              <?php endif;?>
              <div class="tab-title" data-node="letterList">
                  <a href="javascript:;" class="active">所有品牌</a>
              </div>

              <div class="tab-menu" data-node="brandList">
                <ul class="clearfix" <?php if( count($search_data['facet']['brands'] ) <= 7 ):?> style="height: 24px"<?php endif;?> >
                <volist name="search_data.facet.brands" id="brands_item" key="brands_item_key" offset="0" >
                  <li data-word=""><a href="<{$brands_item.url}>" ><{$brands_item.name}></a></li>
                </volist>  
                </ul>
              </div>
            </div>
          </div>
          <!--品牌列表结束-->
          </empty>
          <empty name="search_params.categoryId">
          <!--分类列表开始-->
          <?php if( count($search_data['facet']['categories'] ) > 0 ):?>
          <div class="val-kind active" data-node="wrap">
            <div class="kind-name">分类</div>
            <div class="kind-val">
              <?php if( count($search_data['facet']['categories'] ) > 14 ):?>
              <a href="javascript:;" class="more" data-action="more">更多<em class="icon-down"></em></a>
              <?php endif;?>
              <div class="tab-menu">
                <ul class="clearfix" <?php if( count($search_data['facet']['categories'] ) <= 7 ):?> style="height: 24px"<?php endif;?> >
                  <volist name="search_data.facet.categories" id="categories_item" key="categories_item_key" offset="0">
                  <li ><a href="<{$categories_item.url}>"><{$categories_item.name}></a></li>
                  </volist>
                </ul>
              </div>
            </div>
          </div>
          <?php endif;?>
          <!--分类列表结束-->
          </empty>
        </div>
        </notempty>
        <!--搜索条件开始-->
        <div class="search-condition">
          <div class="condition-all fl">
    		  <a href="<{$search_data.OrderData.0}>" <?php if($search_params['sort']==0){echo 'class="active"';} ?> >综合</a>
          <a href="<{$search_data.OrderData.1}>" <?php if($search_params['sort']==1){echo 'class="active"';} ?> >销量</a>
          <a href="<{$search_data.OrderData.2}>" <?php if($search_params['sort']==2){echo 'class="active"';} ?> >价格

          <?php if($search_params['sort']==2 && $search_params['order']==1):?>
            <em class="iconn-2"></em>
    		  <?php else:?>
    		    <em class="iconn-1"></em>
    		  <?php endif;?>
    		  </a>
    		  
    		  <a href="<{$search_data.OrderData.3}>" <?php if($search_params['sort']==3){echo 'class="active"';} ?> >新品</a>
    		  </div>
          <div class="condition-add fl" data-node="topGoodInfo"><span class="fl">配送至</span>

            <div class="select-area" data-action="setAddress">
      				<a href="javascript:;" class="text-hide" title="<{$address.province.name}><{$address.city.name}><{$address.borough.name}>">
      				<span data-action="setAddressTopBox">
      					<span class="menu-add" data-aid="<{$address.province.id}>" data-node="addressTop"><{$address.province.name}></span><span class="menu-add" data-aid="<{$address.city.id}>" data-node="addressTop"><{$address.city.name}></span><span class="menu-add" data-aid="<{$address.borough.id}>" data-node="addressTop"><{$address.borough.name}></span>
      				</span>
      				<span class="icon-right"><em class="iconn-2"></em></span>
      				</a>
              <div class="select-box" data-node="setAddressbox">
                <em class="icon-close" data-action="addressClose">×</em>
                <div class="select-title">
        					<a href="javascript:;" data-action="setAddressTab" data-aid="<{$address.province.id}>">
        					<span><{$address.province.name}></span><em class="iconn-2"></em>
        					</a>
        					<a href="javascript:;" data-action="setAddressTab" data-aid="<{$address.city.id}>">
        					<span><{$address.city.name}></span><em class="iconn-2"></em>
        					</a>
        					<a href="javascript:;" data-action="setAddressTab" data-aid="<{$address.borough.id}>">
        					<span><{$address.borough.name}></span>
        					<em class="iconn-2"></em>
        					</a>
        				</div>
                <ul class="select-content" data-node="setAddressList"></ul>
                <ul class="select-content" data-node="setAddressList"></ul>
                <ul class="select-content" data-node="setAddressList"></ul>
              </div>
            </div>

          </div>
          <div class="condition-price fl">
            <input type="text" placeholder="￥最低价" class="val" value="<{$search_params.minPrice}>" data-node="minPrice">
			      <span> - </span>
            <input type="text" placeholder="￥最高价" class="val" value="<{$search_params.maxPrice}>" data-node="maxPrice">
            <a href="javascript:;" class="btn" data-action="submit">确定</a>
          </div>
          <div class="condition-icon fl">
            <label data-action="rebate" <?php if($search_params['isProspectiveRebateItem']=='true'): ?>class="active"<?php endif;?> ><em class="iconn-62"></em>返利</label>
            <label data-action="drop" <?php if($search_params['isDiscounted'] =='true'): ?>class="active"<?php endif;?> ><em class="iconn-62"></em>直降</label>
          </div>
          <div class="condition-num">
            <div class="fr" data-node="pageShow">
              <span class="red" data-node="currentPage"><{$search_data.page}></span>/<span class="mr7" data-node="tootlePage"><{$search_data.pageCount}></span>
              <em class="iconn-8 disabled" data-node="prePage"></em>
              <em class="iconn-9" data-node="nextPage"></em></div>
            <div class="fr">共<span class="num"><{$search_data.count}></span>件商品</div>
          </div>
        </div>
        <!--搜索条件结束-->
        <!--商品列表开始-->
        <notempty name="search_data.count">
        <div class="search-list">
          <ul class="clearfix" data-node="searchList">
            <volist name="search_data.items" id="vo">
            <li><a href="<{$vo.id|productDetailUrlGen=$vo['shopId'],###,$sourceCode}>" target="_blank" ><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$vo.mainImage}>" onerror="imgError(this, 'l')" ></a>
              <div class="text">
				      <a href="<{$vo.id|productDetailUrlGen=$vo['shopId'],###,$sourceCode}>" target="_blank" title="<{$vo.name}>">	<?php if( isset($vo['promotionMarks']['itemProspectiveRebateAmount']) && $vo['promotionMarks']['itemProspectiveRebateAmount'] > 0 ):?><span>返利</span><?php endif;?><{$vo.name}></a>
              <div class="price"><span>￥<{$vo.salePrice|convert_price=###}></span>
    				  <?php if( isset($vo['discount']) && $vo['discount']> 0) :?>
                      <del><{$vo.price|convert_price=###}></del>
    				  <?php endif;?>
              </div>
              <p><{$vo.totalVolume}>人付款</p>
              </div>
            </li>
            </volist>
          </ul>
        </div>
        <else />
        <div class="search-result top30" data-node="result">
          <div class="result-text clearfix"><em class="iconn-25"></em>
              <p>抱歉，没有找到您想要的结果<br>请更改筛选条件试试</p>
          </div>
        </div>
        </notempty>
        <!--商品列表结束-->
        <div>
            <div class="search-result hide" data-node="addMoreData" >
               <a href="javascript:;" class="disabled clearfix"><span><img src="<{$pcjspath}>/images/public/loading.gif"> 正在加载...</span></a>
            </div>
            <div class="search-result hide" data-node ="noDataShow">
              <div class="result-text clearfix"><em class="iconn-25"></em>
              <p>抱歉，数据异常，<span class="countDown" data-node="countDown">5</span>秒后自动刷新<br><a href="javascript:;" class="resultspan" data-node="spanRrfresh">点击此处</a>立即刷新</p>
              </div>
            </div>
            <div data-node="dataFalse" class="search-result hide">
              <p></p>
            </div>
        </div>
        
        <div class="page" data-node="page"></div>
      </div>
    </div>
<include file="Home@Front/Public/footer" />