<template>
	<div>
		<section class="topic" v-if="topics">	
			<div :class="headClass" :style="{background: !this.fixedType?'url(' +topic.coverPic?topic.coverPic:''+ ') 0% 0% / cover no-repeat':''}">
				<div class="top-header">
					<a href="javascript:;" @click="click_goback" class="header-back fl">
						<span class="icon-1"></span>
					</a>
					<img style="display:none" v-show="fixedType" :src="cssPath+'/images/error/user-face.png'" :social-src="topic.user.facePicUrl|imgbed('91')" alt="">
					<span  style="display:none" v-show="!fixedType" class="header-pic">内容详情</span>
					<a @click.stop="click_more_handle" href="javascript:;" class="header-move fr">
						<span class="icon-move"></span>
					</a>
					<a href="javascript:;" @click="click_share" class="header-share fr">
						<span class="icon-3"></span>
					</a>
					<div class="handle" data-target="handle" style="display: none" v-show="moreUserStatus">
							<div class="triangle"></div>
							<template v-if="userStatus===1">
									<p data-target="handle" @click="click_top_topic(topic.isUpper)">{{topic.isUpper?'取消':''}}置顶</p>
									<p data-target="handle" @click="click_add_topic(topic.isEssence)" >{{topic.isEssence?"取消":""}}加精</p>
									<p @click="click_del_topic" data-target="handle">删除</p>
							</template>
							<template v-else-if="userStatus===2">
								<p @click="click_top_topic(topic.isUpper)" data-target="handle">{{topic.isUpper?'取消':''}}置顶</p>
								<p @click="click_add_topic(topic.isEssence)" data-target="handle">{{topic.isEssence?"取消":""}}加精</p>
								<p @click="click_del_topic" data-target="handle">删除</p>
								<p @click="click_report_topic" data-target="handle">举报</p>
							</template>
							<template v-else-if="userStatus===3">
								<p @click="click_del_topic" data-target="handle">删除</p>
							</template>
							<template v-else>
								<p @click="click_report_topic" data-target="handle">举报</p>
							</template>
						</div>
				</div>
			</div>
			<div class="topic-info">
				<div class="info clearfix">
					<div class="info-img fl">
						<a href="javascript:;">
							<img :src="cssPath+'/images/error/user-face.png'" :social-src="topic.user.facePicUrl" alt="" />
						</a>
					</div>
					<div class="info-personage fl">
						<p class="name">
							<a href="javascript:;" v-html="topic.user.nickname"></a>
						</p>
						<div class="classify ">
							<a class="expert" href="javascript:;" v-if="topic.expertInfo&&topic.expertInfo.isExpert">
								<em></em>{{topic.expertInfo.category.name}}
							</a>
							<a href="javascrip:;" class="meihao" v-if="topic.extTopicType===8">
								<em></em>{{topic.mAccount.name}}
							</a>
						</div>
					</div>
					<!-- <div class="take fr">					
						<a class="take-already" href="javascript:;">
							+ 订阅
						</a>
					</div> -->
				</div>
				<h1 class="title" v-html="topic.name"></h1>
				<div class="datum clearfix">
					<div class="data fl">
						<span class="icon-timer"></span>
						<span class="timer">{{topic.createTime|commentTime}}</span>
						<span class="icon-flow"></span>
						<span class="flow" v-text="topic.pageviewText"></span>
					</div>
					<div class="genre fr clearfix">
						<span class="above fl" v-show="topic.isUpper" style="display: none">置顶</span>
						<span v-show="topic.isEssence" style="display: none" class="boutique fl">精品</span>
						<span v-show="topic.style" style="display: none" class="exclusive fl">专访</span>
					</div>
				</div>		
				<div class="cont">
					<template v-if="topic.components.length>0" v-for="component in topic.components">
						<template v-if="component.type==='text'&&replaceBr(component.text)!==''">
							<p v-html="component.text"></p>
						</template>
						<template v-else-if="component.type==='link'|| component.type==='shop' || component.type==='image'">
							<div class="cont-pic">
								<img :src="cssPath+'/images/error/fail-750.png'" :social-src="component.url" alt="" />
							</div>
							<p v-html="component.text"></p>
						</template>
						<template v-else-if="component.type==='item'">
							<div class="commodity clearfix">
								<a :href="component|itemUrl">
									<div class="commodity-pic fl">
										<img :src="cssPath+'/images/error/fail-750.png'" :social-src="component.item.mainImage" :alt="component.item.name" />
									</div>
									<div class="commodity-info fr">
										<div class="info-title" v-text="component.item.name"></div>
										<div class="info-shopping clearfix">
											<div class="price fl">
												<span v-text="'¥'+(component.item.price/100).toFixed(2)"></span>
											<span class="purchase " v-if="component.item.pricetype==='RUSHBUYPRICE'||component.item.pricetype==='TUANPRICE'">{{component.item.pricetype==='RUSHBUYPRICE'?'抢购价':(component.item.pricetype==='TUANPRICE'?'团购价':'')}}</span>
											</div>
											<div class="shopping-car fr">
												<span class="icon-shopping"></span>
											</div>
										</div>
									</div>
								</a>
							</div>
							<p v-html="component.text"></p>
						</template>
						<template v-else-if="component.type === 'video'">
							<div class="cont-pic" :id="'video_'+component.id">
								<div style="display: none" v-show="!hideVideoImg" class="play">
									<a href="javascript:;" @click="click_play_video(component.id)">
										<span class="icon-10"></span>
										<p class="timer">{{component.length|videoDate}}</p>
									</a>
								</div>
								<img :src="cssPath+'/images/error/fail-750.png'"  style="display: none" v-show="!hideVideoImg" :social-src="component.coverImage" alt="" />
							</div>
						</template>
					</template>
					<template v-else>
						
					</template>
					<!-- <div class="cont-pic">
						<div class="examine">
							<a href="javascript:;">查看详情</a>
						</div>
						<img src="../../../../src/images/topicDetails/topicTop.jpg" alt="" />
					</div> -->
					<div class="label-list clearfix" v-if="topic.labels&&topic.labels.length>0">
						<span v-for="label in topic.labels" v-text="label.name"></span>
					</div>
					<div class="cont-from">
						<span>来自</span>
						<span class="from-circle" v-text="topic.group.name"></span>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
<script>
	import fetch from 'io/fetch.js';
	import toast from 'mods/toast.js';
	import replace from 'mods/replace.js';
	import formatDate from 'util/formatDate.js';
	export default{
		props:["showApp"],
		data(){
			return{
				topics:"",
				topic:"",
				fixedType:false,
				hideVideoImg:false,
				cssPath:"",
				groupId:"",
				topicId:"",
				userStatus:4,
				moreUserStatus:false
			}
		},
		computed:{
			headClass(){
				let top = this.showApp ? " top1":"",
					isHeadBg = this.topic.coverPic;
				return "topic-top " + (this.fixedType ? "header-fixed":isHeadBg?"":"no-bg")+top;
			}
		},
		filters:{
			commentTime(val){
				return replace.replaceData(val);
			},
			itemUrl(val) {
				let item = val,
					url = val.url,
					end = '.html';
				if (item.shop && item.shop.id) {
					end = '.html?kid=&mid=' + item.shop.id;
				}
				if (item.pricetype === "TUANPRICE") {
					url = tuan_url + '/groupon_detail-' + item.itemId+end;
				} else if (item.pricetype === "RUSHBUYPRICE") {
					url = q_url + '/rushbuy_detail-' + item.itemId+end;
				}
				return url;
			},
			videoDate(val){
				return formatDate(val,"mm:ss");
			},
			imgbed(img,size){
				return replace.replaceImg(img,size)
			}
		},
		mounted(){
			let self = this;
			window.addEventListener("scroll", function() {
				let scTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
					top = document.querySelector('.topic-top').clientHeight;
					self.fixedType = scTop > top ? true : false;
			},false);
			document.onclick = function(e){
				e = e || event;
				let name = e.target.getAttribute("data-target");
				if(name !=="handle"){
					self.moreUserStatus = false;
				}
			}
			this.getUserStatus();
		},
		created(){
			this.cssPath = window.domain_json['PLUS_GOMEUI_CDN_IP'];
			if(window.content_json){
				this.topics = content_json;
				this.topic = this.topics.topic;
				this.topicId = this.topic.id;
				this.groupId = this.topic.groupId;
			}
		},
		methods:{
			/*头部更多 start*/
			getUserStatus(){//获取当前用户 1圈主主态/2圈主客态/3非圈主主态/4非圈主客态
				const self = this;
				fetch.get('circle/socailGueist',{
					params:{
						groupId:self.groupId,
						topicId:self.topicId
					}
				})
				.then(function(res){
					let data = res.data;
					if(data.code===0){
						self.userStatus = data.data.userStatus;
					}
				})
				.catch(function(err){
					console.log(err)
				})
			},
			click_more_handle(){
				this.moreUserStatus = true;
			},
			click_report_topic(){
				console.log(4)
				this.moreUserStatus = false;
			},
			click_del_topic(){
				console.log(3)
				this.moreUserStatus = false;
			},
			click_add_topic(){
				this.topquality({
					type:0,
					isEssence:this.topic.isEssence?0:1
				})
				this.moreUserStatus = false;
			},
			click_top_topic(){
				this.topquality({
					type:1,
					isUpper:this.topic.isUpper?0:1
				})
				this.moreUserStatus = false;
			},
			topquality(params){
				const self = this;
				params.id = this.topicId;
				params.groupId = this.groupId;
				fetch.get('topic/topquality',{
					params:params
				})
				.then(function(res){
					let data = res.data;
					if(data.code === 0){
						if(params.type === 0){//加精
							self.topic.isEssence = !self.topic.isEssence; 
						}else{
							self.topic.isUpper = !self.topic.isUpper;
						}
					}
				})
				.catch(function(err){
					console.log(err)
				})
			},
			/*头部更多 end*/
			click_goback(){
                if (location.hash.match(/backtwostep/)) {
                    history.go(-2);
                    return false;
                } else {
                    history.go(-1);
                }
			},
			click_share(){
				this.$emit("change","showShareLayer",true)
			},
			replaceBr(val){
				return val.replace(/\s|<br\/>/gi,"");
			},
			click_play_video(id){
				const v = new MeixinPlayer(),
					self = this;
				v.on("infoStartLoad",function(){
					self.hideVideoImg = true;
				})
				v.init(id, "video_"+id, {
	                autoplay: 1,
	                height: 'auto',
	                showFullBtn: 1
	            });
			}
		}
	}
</script>