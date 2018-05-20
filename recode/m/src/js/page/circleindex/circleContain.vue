<template>
	<div class="circle"> 
		<appDown></appDown>
		<div class="m-openapp"></div>
		<div :style="{backgroundImage: 'url('+groupInfo.icon+')',backgroundSize: 'cover'}" class="cle-top">
			<header class="header clearfix">
				<div class="h-left">
					<a href="javascript:;" class="h-back" @click='back'>
						<em class="icon-1"></em>
					</a>
				</div>
				<div class="h-cnt flex-cell"></div>
				<div class="h-right">
					<a href="javascript:;" class="h-btn">
						<!-- <em class="icon-2"></em> -->
						<em class="icon-3" @click="showShare"></em>
					</a>
				</div>
			</header>
			<!-- /header-->
			<shareLayer @change="changeName" :showShareLayer="showShareLayer"></shareLayer>
			<div class="c-f top-info">
				<p class="tips">by {{groupInfo.user.nickname}}</p>
				<h3> 
					<span class="top-infor-header">{{groupInfo.name}}</span>
					<span class="identify-img" v-if="groupInfo.isOfficial">官方圈子</span>
				</h3>
				<div class="num-box clearfix">
					<span>话题</span>
					<cite>{{groupInfo.topicQuantity}}</cite>
					<span>成员</span>
					<cite>{{groupInfo.memberQuantity}}</cite>
					<span class="icon-tag ft">
						<em></em>
						{{groupInfo.category.name}}
					</span>
				</div>
				<div class="ft">
					<div class="head-box face-img">
						<img :src="groupInfo.icon">
					</div>
					<a href="javascript:;" class="bor-all join-btn" v-if="(groupInfo.user.id == 0||groupInfo.memberType == 1)&&(groupInfo.memberQuantity<10000000)" :data-id="groupInfo.id" @click="joinCircle" >加入</a>
					<p class="pos-abs hide">申请已发送</p>
				</div>
			</div>
		</div>
		<div class="cle-text" v-if="groupInfo.introduction">
	    	<p>{{groupInfo.introduction}}</p>
	    </div>

	    <div class="cle-tab clearfix">
			<div class="tab-head">	    		
		    	<a class="tabs link" :class="{'active':tabPage=='all'}" href="javascript:;" @click="tabChange">全部</a>
			    <a class="tabs link" :class="{'active':tabPage=='jingpin'}" href="javascript:;" @click="tabChange">精品</a>
			</div>
			<div class="tab-body"  v-if="hasTopic">
				<div tab-page cle-list ref="listBox">
					<ul class="cle-lst" v-if="tabPage == 'all'&&topTopics.length">
		    			<li v-for="topTopic in topTopics">
		    				<em class="ic-zd">置顶</em>
		    				<a :href='"topic-"+topTopic.id+".html"'>{{topTopic.name}}</a>
		    			</li>
		    		</ul>
					<topicItem :topicItems='allTopicItems' v-show="tabPage == 'all'"></topicItem>
					<topicItem :topicItems='jingpinTopicItems' v-show="tabPage == 'jingpin'"></topicItem>
					<div class='no-more-topic' v-show="noMoreTopic">没有更多内容了</div>
					<div class='no-more-topic' v-show="loadingErr">数据加载失败</div>
					<div class="loading" v-show="loadingFlag"></div>
				</div>
		    </div>
		    <div class="tab-page hidden">
		    	<div class="m-prompt">		    		
		    		<div class="pro-txt">还没有精品话题呐</div>
		    	</div>
		    </div>
		</div>
			    <!-- 暂无话题 -->
	    <div class="m-prompt" v-if="!hasTopic">
	    	<div class="pro-img">
	    		<img src="../../../../src/images/circleindex/img-1.png">
	    	</div>
	    	<div class="pro-txt">暂无话题<br>快来占领第一块儿地盘</div>
	    </div>
	    <backTop></backTop>
	</div>
</template>

<script>
import topicItem from './topicItem.vue';
import appDown from '../../components/downApp.vue';
import shareLayer from '../../components/share.vue';
import backTop from '../../components/backTop.vue';
import lazyload from 'mods/lazyload';
import fetch from 'io/fetch';
import toast from 'mods/toast';
	export default {
		data(){
			return {
				tabPage:'all',//目前tab页面标识
				showShareLayer:false,//展示分享标识
				isLogin:!!islogin,//是否登陆
				allNum:2,//全部话题加载页码
				jingpinNum:2,//精品话题加载页码
				allData:content_json,//页面输入数据
				allLoadFlag:true,//加载全部话题标识
				jingLoadFlag:true,//加载精品话题标识
				noMoreTopic:false,//加载更多没有数据标识
				loadingFlag:false,//加载更多loading标识
				loadingErr:false,//加载更多数据加载失败标识 
				cndPath:""
			}
		},
		computed:{
			hasTopic:function(){
				var flag = true;
				if(this.tabPage == 'all'){
					if(!this.allTopicItems.length){
						flag = false
					}
				}else if(this.tabPage == 'jingpin'){
					if(!this.jingpinTopicItems.length){
						flag = false
					}
				}
				return flag;
			},
			allTopicItems:function(){
				var topicItems = this.allData.all_topics;
				// var resultDa = this.handleTopicData(topicItems);
				return topicItems;
			},
			jingpinTopicItems:function(){
				var topicItems = this.allData.jin_topics;
				// var resultDa = this.handleTopicData(topicItems);
				return topicItems;
			},
			groupInfo:function(){
				var groupInfo = this.allData.group_info;
				return groupInfo;
			},
			topTopics:function(){
				return this.allData.top_topics;
			}
		},
		created(){
			this.cssPath = window.js_cdn;
		},
		mounted(){
			window.onscroll = this.loadMore;
		},
		methods:{
			handleTopicData:function(data){
				var topicItems = data;
				/*
					*将每条话题中的商品图片、视频图片和图片整理到一个数组中便于渲染，
					*整理后格式为：
					*	components:[{
					*		type:'text',
					*		text:'123453212'
							},{
					*			type:'image',
					*			urls:[url1,v-url2,i-url3...];
					*		}]
					*商品图片以i-为自定义前缀；视频图片以v-为自定义前缀
				*/
				for(var i = 0;i<topicItems.length;i++){
					var o = topicItems[i].components;
					var imgItem = {type:"image",urls:[]};
					for(var j = 0;j<o.length;j++){
						switch(o[j].type){
							case 'image':
								imgItem.urls.push(o[j].url);
								o.splice(j,1);
								j--;
								break;
							case 'video':
								imgItem.urls.push('v-'+o[j].coverImage);
								o.splice(j,1);
								j--;
								break;
							case 'item':
								imgItem.urls.push('i-'+o[j].item.mainImage);
								o.splice(j,1);
								j--;
								break;
							case 'text':
								break;

						}
					}
					if(imgItem.urls.length){
						imgItem.urls.length = imgItem.urls.length>3?3:imgItem.urls.length; 
						if(topicItems[i].components[0].type == 'text'){
							topicItems[i].components.splice(1,0,imgItem);
						}else{
							topicItems[i].components.unshift(imgItem);
						}
						imgItem = {type:"image",urls:[]};
					}

				}
				return topicItems;
			},
			tabChange:function(e){
				if(e.target.innerText.indexOf('全部')>-1){
					this.tabPage = 'all';
				}else{
					this.tabPage = 'jingpin';
				}
			},
			showShare:function(){
				this.showShareLayer = true;
				this.$emit("change","showShareLayer",true);
			},
			changeName:function(key,val){
				this[key] = val;
			},
			back:function(){
				history.back();
			},
			joinCircle:function(e){
				var target = e.target;
				var id = target.dataset.id;
				if(!this.isLogin){
					window.location.href = 'http://login.m.atguat.com.cn/login.html';
					return;
				}
				fetch.post('/circle/joingroup',{
					groupId:id
				}).then(function(data){
					data = data.data;
					if(!data) {
						toast({
							content:'加入圈子失败，请重试！'
						});
					}else if(data.code == 0){
						toast({
							content:'加入圈子成功！',
							callback:function(){
								target.style.display = 'none';
							}
						});
					}else{
						toast({
							content:data.message
						})
					}
				})
			},
			getListData:function(cb){
				var _this = this;
				this.loadingFlag = true;
				this.loadingErr = false;
				fetch.get('/circle/getTopicList',{
					params:{
						circleId:_this.groupInfo.id,
						pageNum:_this.tabPage =='all'?_this.allNum:_this.jingpinNum,
						pageSize:10,
						essenceType:_this.tabPage =='all'?0:1
					}
				}).then(function(data){
					var da = data.data;
					_this.loadingFlag = false;
					if(da.code == 0){
						if(!da.data.data.topics.length){
							_this.tabPage == 'all' ? (_this.allLoadFlag = false):(_this.jingLoadFlag = false);
							_this.noMoreTopic = true;
							toast({
								content:'没有更多数据了'
							});
							return;
						}
						if(_this.tabPage =='all'){
							_this.allNum++;
							_this.allData.all_topics=_this.allData.all_topics.concat(da.data.data.topics);
							_this.allLoadFlag = true;
						}else{
							_this.jingpinNum++;
							_this.allData.jin_topics=_this.allData.jin_topics.concat(da.data.data.topics);
							_this.jingLoadFlag = true;
						}
					}else{
						_this.loadingErr = true;
						toast({content:da.message});
					}
				}).catch(function(){
					_this.loadingFlag = false;
					_this.loadingErr = true;
				})
			},
			loadMore:function(){
	            var pageHeight = Math.max(document.body.scrollHeight,document.body.offsetHeight);
	            var viewportHeight = window.innerHeight || 
	                document.documentElement.clientHeight ||
	                document.body.clientHeight || 0;
	            var scrollHeight = window.pageYOffset ||
	                document.documentElement.scrollTop ||
	                document.body.scrollTop || 0; 
	            var isBottom = pageHeight - viewportHeight - scrollHeight;
	            if(isBottom < 150){
	            	if(this.tabPage == 'all'&&this.allLoadFlag){
	            		this.allLoadFlag = false;
	            		if(this.allTopicItems.length){
	            			this.getListData();
	            		}
	            	}else if(this.tabPage == 'jingpin'&&this.jingLoadFlag){
	            		this.jingLoadFlag = false;
	            		if(this.jingpinTopicItems.length){
		            		this.getListData();
		            	}
	            	}
	            	
	            }
			}
		},
		components:{
			topicItem:topicItem,
			appDown:appDown,
			shareLayer:shareLayer,
			backTop:backTop
		}
	}
</script>

<style scoped>
</style>	