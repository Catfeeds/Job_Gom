<template>
	<div>
		<div class="show-bg" style="display: none" v-show="showMoreItems" @click="click_hide_items"></div>
		<transition name="component-fade"> 
			<div v-show="showMoreItems" id="showCont" class="show-cont">
				<dl class="cont-list">
					<dt class="clearfix">
						<div class="fl">
							<span class="icon-article"></span>
						</div>
						<div class="list-txt fl">							
							提到的 
							<span class="num" v-text="items.length"></span> 
							款商品
						</div>
					</dt>
					<dl class="clearfix" v-for="item in items">
						<div class="list-pic fl">
							<img  :src="cssPath+'/images/error/fail-180.png'" :social-src="item.item.mainImage" :alt="item.item.name">
						</div>
						<div class="list-details fr">
							<h2 v-text="item.item.name"></h2>
							<div class="details clearfix">
								<div class="price fl" v-text="'¥ '+(item.item.salePrice/100).toFixed(2)"></div>
								<div class="shopping-car fr" @click="click_add_cart(item)">
									<a href="javascript:;
									">
										<span class="icon-shopping"></span>
									</a>
								</div>
							</div>
						</div>
					</dl>
				</dl>
			</div>
		</transition>
	</div>
</template>
<script>
	const domain = window.domain_json;
	import fetch from 'io/fetch.js';
	import toast from 'mods/toast.js';
	export default{
		props:["showMoreItems"],
		data(){
			return{
				items:null,
				cssPath:""
			}
		},
		mounted(){

		},
		created(){
			this.cssPath = domain['PLUS_GOMEUI_CDN_IP'];
			if(window.content_json.topic.items){
				this.items = window.content_json.topic.items;
			}
		},	
		methods:{
			click_hide_items(){
				const self = this;
				self.$emit("change","showMoreItems",false);
			},
			click_add_cart(item){
				if(islogin===0){
					location.assign(domain["WAP_LOGIN_IP"]);
					return;
				}
				fetch.post("shopcar/add",{
					mshopId:item.shopId,
					kid:item.kid,
					skuId:item.skuId,
					quantity:1	
				})
				.then(function(res){
					let data = res.data;
					if(data.code === 0){
						toast({content:"加入购物车成功"});
					}else{
						toast({content:data.message});
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
.component-fade-enter-active{
    animation-duration: .5s;
    animation-name: fadeInRight;
}
.component-fade-leave-active{
    animation-duration: .5s;
    animation-name: fadeOutRight;
}
.animated.infinite {
  animation-iteration-count: infinite;
}
@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes fadeOutRight {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
}

</style>