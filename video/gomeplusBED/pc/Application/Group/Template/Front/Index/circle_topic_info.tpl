


<li class="circle-l-c-w-minute "  modelid="<?php echo $modelType . str_pad($m,4,'0',STR_PAD_LEFT); ?>">
	<div class="circle-l-c-w-m-wrap clearfix">
		<div class="circle-l-c-w-m-user clearfix">
			<a target="_blank" href="<{$tp.user.id|userInfoUrlGen=$userId,$userinfos['loginStatus']}>"><img class="circle-l-c-w-m-u-icon" onerror="imgError(this, 'h')" src="<{$tp['user']['facePicUrl']|default=''}>" ></a>
			<a target="_blank" href="<{$tp.user.id|userInfoUrlGen=$userId,$userinfos['loginStatus']}>"><span class="circle-l-c-w-m-u-name"><{$tp['user']['nickname']|default=''}></span></a>
		</div>
		<div class="circle-l-c-w-m-title clearfix">
			<span class="circle-l-c-w-m-titlewrap">
				<if condition="($tp.isUpper eq true) AND ($tid neq 1) ">
					<i class="circle-l-c-w-m-titletop">置顶</i>
				</if>
				<eq name="tp.isEssence" value="true"><i class="circle-l-c-w-m-titlequality">精品</i></eq>
				<eq name="tp.style" value="1"><i class="circle-l-c-w-m-titleinterview">专访</span></eq>
			</span>
			<a  target="_blank" title="<{$tp['name']|htmlspecialchars}>" href="<{$tp.id|topicDetailUrlGen=###}>"><h3><{$tp['name']|msubstr=###,0,50}></h3></a>
		</div>

			<notempty name="tp['text']">
				<div class="circle-l-c-w-m-paper"><p><a target="_blank" href="<{$tp.id|topicDetailUrlGen=###}>"><{$tp['text']|string_parse_face=###,22}></a></p></div>
			</notempty>
	<notempty name="tp['images_lst']">
		<div class="circle-l-c-w-m-imagepreview clearfix">
			<volist name="tp['images_lst']" id='img'>
				<a class="circle-l-c-w-m-imagepreviewhover" target="_blank" <if condition="$img['type'] neq 'item'"> title="<{$tp['name']|htmlspecialchars}>" </if> href="<{$tp.id|topicDetailUrlGen=###}>">
					<if condition="$img['type'] eq 'item'">
						<div class="circle-imagepreview-goods">
							<img onerror="imgError(this, 'm')" alt="<{$img['name']}>"  src="<{$img['mainImage']}>">
							<div class="circle-i-goodsmask clearfix">
								<if condition="$img['salePrice']">
									<div class="circle-i-g-price"><span class="circle-i-g-p-currency">￥</span><span class="circle-i-g-p-pricecount"><{$img['salePrice']}></span></div>
								<else />
									<div class="circle-i-g-price"><span class="circle-i-g-p-currency">￥</span><span class="circle-i-g-p-pricecount">暂无售价</span></div>
								</if>
								<div class="circle-i-g-icon">
									<gt name='img.rebateSummary.refRebateMoney' value="0">
										<i class="circle-i-g-i-word">返利</i>
									</gt>
									<i class="circle-i-g-i-icon"></i>
								</div>

							</div>
							<div class="circle-i-goodstitle"><span><{$img['name']}></span></div>
						</div>
					<elseif  condition="$img['type'] eq 'image'"/>
						<div class="circle-imagepreview-img"><img onerror="imgError(this, 'm')" alt="<{$img['name']}>"  src="<{$img['mainImage']}>"></div>
					<else/>
						<div class="circle-imagepreview-img circle-imagepreview-play">
							<img onerror="imgError(this, 'm')" alt="<{$img['name']}>"  src="<{$img['mainImage']}>">
							<div class="circle-i-p-icon"></div>
						</div>

					</if>
				</a>
			</volist>
		</div>
	</notempty>
		<div class="circle-l-c-w-m-state clearfix">
			<div class="circle-l-c-w-m-s-left"><em class="iconn-75"></em><span class="circle-l-c-w-m-s-l-timedate"><{$tp['time_str']}></span></div>
			<div class="circle-l-c-w-m-s-right">
				<ul class="circle-l-c-w-m-s-r-tool">
					<li><em class="icon iconn-10"></em><span class="circle-l-c-w-m-s-r-islikecount"><{$tp['like']['userQuantity']}></span></li>
					<li><em class="icon iconn-11"></em><span class="circle-l-c-w-m-s-r-iscommetcount"><{$tp['replyQuantity']}></span></li>
					<li><em class="icon iconn-57"></em><span class="circle-l-c-w-m-s-r-isstarcount"><{$tp['topicCollectionQuantity']}></span></li>
				</ul>
			</div>
		</div>
	</div>
</li>