<!--左侧轮播-->
<div class="goods-carousel" data-node="topleft">
	<div class="carousel-cont" >
		<ul style="width:2000px;" class="carousel-list" data-node="leftBigBox">
    		<foreach name="imgList" item="vo">
   			<li style="display: none;"><img onerror="imgError(this)" data-origin="<{$vo.img|getResizeImg=###,800,800}>" src="<{$vo.img|getResizeImg=###,400,400}>" alt="<{$productInfo['item']['name']}>"></li>
    		</foreach>
            <eq name="imgDefault" value="">
            <li style="display: list-item;" data-origin="<{$productInfo.item.mainImage|getResizeImg=###,800,800}>" data-src="<{$productInfo.item.mainImage|getResizeImg=###,400,400}>"><img onerror="imgError(this)" data-origin="<{$productInfo.item.mainImage|getResizeImg=###,800,800}>" src="<{$productInfo.item.mainImage|getResizeImg=###,400,400}>" alt="<{$productInfo['item']['name']}>"></li>
            <else/>
            <li style="display: list-item;" data-origin="<{$productInfo.item.mainImage|getResizeImg=###,800,800}>" data-src="<{$productInfo.item.mainImage|getResizeImg=###,400,400}>"><img onerror="imgError(this)" data-origin="<{$imgDefault|getResizeImg=###,800,800}>" src="<{$imgDefault|getResizeImg=###,400,400}>" alt="<{$productInfo['item']['name']}>"></li>
            </eq>
		</ul>
	</div>
	<div class="moving-main">
		<a class="iconn-8 moving-btn" data-action="sliderTop"></a>
		<div class="moving-cont" >
		  <ol class="clearfix moving-list"  data-node="leftSmallBox">
			<foreach name="imgList" item="vo">
			  <li data-skuId="<{$vo.id}>"><img onerror="imgError(this)" src="<{$vo.img|getResizeImg=###,80,80}>"  alt="<{$productInfo['item']['name']}>"></li>
			</foreach>
		  </ol>
		</div><a href="javascript:void(0);" class="iconn-9 moving-btn" data-action="sliderDown"></a>
	</div>
	<div class="a-shares <neq name='productInfo.item.status' value="1">hide</neq>">
		<span class="text-add" data-node="proAddnum">+1</span>
		<p class="error" data-node="collectProError">收藏加入失败</p>
		<div class="shares-collect" data-node="collectProSuccess"><em class="sanjiao"></em><em class="iconn-7" data-action="collectProClose"></em>
			<p class="f16"><em class="iconn-20"></em>成功加入我的收藏</p>
			<p>你可以查看<a href="<{$i_domain}>collect" target="_blank">我的收藏</a>，或<a href="https://group.gomeplus.com/others/index.html" target="_blank">下载国美 APP</a></p>
		</div>
		<a href="javascript:;" data-action="collectProduct" class="collect <?php if($isCollectProduct == 1):?>active<?php endif;?>" data-isCollect="<eq name='isCollectProduct' value='1'>0<else/>1</eq>">
			<em class="icon iconn-57"></em>收藏商品
        </a>
		<span data-action="shareto">
			<em class="icon iconn-38" ></em>分享到
			<p>
				<a href="javascript:;" class="icon iconn-30" data-shareto="weixin" ></a>
				<a href="javascript:;" class="icon iconn-32" data-shareto="qq"></a>
				<a href="javascript:;" class="icon iconn-31" data-shareto="sina"></a>
				<a href="javascript:;" class="icon iconn-33" data-shareto="qzone"></a>
			</p>
		</span>
	</div>
</div>