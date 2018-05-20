
<div class="comments-imglist" >
	<ul class="clearfix comments-imglist" >
		{{each picsSrc as value i}}
	    <li data-imgSort={{i}} data-node="imgPics"><a href="javascript:;"><img src="{{value}}"></a></li>
	    {{/each}}
	</ul>
	<div class="imglist-big hide" data-node="imgBigPic">
	    <div class="big-title">
	   		<a href="javascript:;" data-node="imgBigHind"><em class="icon-up"></em>收起</a>
	   		<a href="javascript:;" data-node="imgBigSrc" target="_blank"><em class="icon-view-img"></em>查看原图</a>
	   	</div>
	   <div class="big-img" data-picLength="{{length}}">
	   		<div class="img-hidden">
	   			{{each picture as value i}}
	   			 <div class="img-box" data-bigImg={{i}} data-node="hideBigPic"><img class="srcError" data-imgsrc = "{{value.url}}"></div>
	   			{{/each}}
              </div>
	   		<em class="icon-left" data-node="imgBigPN" data-page="pre"></em>
	   		<em class="icon-right" data-node="imgBigPN" data-page="next"></em>
	   	</div>
	    <div class="img-slide">
	    	{{each picture as value i}}
	  		<a href="javascript:;" data-node="showImg" data-active="{{i}}" ></a>
	  		{{/each}}
	    </div>
	</div>
</div>
