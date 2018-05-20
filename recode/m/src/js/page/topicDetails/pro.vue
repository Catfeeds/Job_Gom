<template>
	<div class="commodity clearfix">
		<a :href="url">
			<div class="commodity-pic fl">
				<img :src="cssPath+'/images/error/fail-180.png'" :social-src="item.item.mainImage" onerror="" alt="">
			</div>
			<div class="commodity-info fr">
				<div class="info-title overflow-two" v-text="item.item.name"></div>
				<div class="info-shopping clearfix">
					<div class="price fl">
						<span v-text="'¥ '+(item.item.salePrice/100).toFixed(2)"></span>
					<span class="purchase" v-if="icon" v-text="icon"></span>
					</div>
					<div class="shopping-car fr">
						<span class="icon-shopping"></span>
					</div>
				</div>
			</div>
		</a>
	</div>
</template>
<script>
	export default {
		props:["item"],
		data(){
			return {
				url:"",
				icon:"",
				cssPath:""
			}
		},
		created(){
			let item = this.item.item,
				url =  window.domain_json['WAP_ITEM_IP'] + '/product-' + item.id + '-' + item.skuId,
				end = '.html',
				iconText = '';
			this.cssPath = window.domain_json['PLUS_GOMEUI_CDN_IP'];
			if (this.item.shop && this.item.shop.id) {
				end = '.html?kid=&mid=' + item.shop.id;	
			}
			if(item.pricetype === "TUANPRICE"){
				url = tuan_url + '/groupon_detail-' + item.itemId;
				iconText = '抢购价';
			}else if(item.pricetype === "RUSHBUYPRICE"){
				url = q_url + '/rushbuy_detail-' + item.itemId;
				iconText = '团购价';
			}
			this.icon = iconText;
			this.url = url+end;
		}
	}
</script>