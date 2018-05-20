<template>
	<div>
		<template v-if="detailJson!==''">
			<div v-for="shop in detailJson.topic.components" v-if="shop.type ==='mshop'" class="topic-store clearfix">
				<a :href="domain.WAP_MSHOP_DOMAIN+'/mshop-'+shop.mshopId+'.html'">
					<div class="store-img fl">
						<img :src="cssPath+'/images/error/fail-180.png'" :social-src="shop.icon" alt="">
					</div>
					<div class="store-info fl">
						<div class="name" v-text="shop.name"></div>
						<div :class="['grade clearfix','level'+shop.mshopLevel.level]"></div>
					</div>
					<div class="store-stroll fr">
						进点逛逛
						<span class="icon-7"></span>
					</div>
				</a>
			</div>
		</template>
		<dl class="related" v-if="recommend.length>0">
			<dt class="related-tit">相关话题</dt>
			<template v-for="item in recommend"></template>
			<dd v-if="item.picture" class="clearfix related-pic">
				<div class="txt fl ">
					<h3 v-text="item.name"></h3>
					<div class="amount">
						<span class="icon-flow"></span>{{item.pageviewText}}
					</div>
				</div>
				<div class="pic fr">
					<img src="" alt="">
				</div>
			</dd>
			<dd v-else class=" related-list">
				<h3  v-text="item.name"></h3>
				<div class="amount">
					<span class="icon-flow"></span>{{item.pageviewText}}}
				</div>
			</dd>
		</dl>
	</div>
</template>
<script>
	import fetch from 'io/fetch.js';
	export default{
		data(){
			return {
				topicId:"",
				recommend:[],
				detailJson:"",
				cssPath:"",
				domain:[]
			}
		},
		mounted(){
			const self = this;
			this.topicId = window.content_json.topic.id;
			this.detailJson = window.content_json;
			this.domain = window.domain_json;
			this.cssPath = this.domain["PLUS_GOMEUI_CDN_IP"];
			fetch.get('topic/topic_recommend',{
				params:{
					topicId:self.topicId,
					boxType:0
				}
			})
			.then(function(res){
				let data = res.data;
				if(data.code === 0){
					self.recommend = data.data;
				}
			})
			.catch(function(err){
				console.log(err)
			})
		}
	}
</script>