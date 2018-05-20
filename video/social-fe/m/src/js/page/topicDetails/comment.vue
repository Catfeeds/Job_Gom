<template>
	<div>
		<header class="header" style="display: none" v-show="!setting.show">
			<a href="javascript:;" @click="click_show_topic" class="header-back fl"><span class="icon-1"></span></a>
			全部评论({{commentNum}})
		</header>
		<section class="comment" :style="{'padding-bottom':!replyType>0&&commentLists.length>0?'0':'.9rem'}">
			<div style="display: none" v-show="setting.show" class="tit">评论(<span class="num" v-text="commentNum"></span>)</div>
		<!-- 	<div style="display: none" v-show="setting.show" class="comment-write clearfix">
			<div class="list-head fl">
				<img src="../../../../src/images/topicDetails/pic1111.jpg" alt="" />
			</div>
			<div class="list-cont fr" @click="click_reply(0)">
				<textarea readonly="readonly" placeholder="快来写下你的评论"></textarea>
			</div>
		</div> -->
       	<ul id="comment" class="comment-list" v-if="commentLists.length>0">
       		<li :class="item.pics|imgClass" v-for="(item,index) in commentLists">
       			<div class="list-head fl">
       				<img :social-src="item.user.facePicUrl" :src="cssPath+'/images/error/user-face.png'" alt="">
       			</div>
       			<div class="list-cont fr">
       				<div class="cont-top clearfix">
       					<span class="name fl" v-text="item.user.nickname"></span>
       					<a href="javascript:;" class="report fr">
       						<em class="report-bg"></em>
       						<div class="report-box" style="display: none">举报</div>
       					</a>
       					<a href="javascript:;" @click="click_parise(5,item.id,item.like)" :class="['praise fr',item.like.isLike?'praiseWin':'']"><!-- praiseWin -->
       						<em class="icon-5 "></em>
       						<em class="praise-num" v-text="item.like.likeNumText"></em>
       					</a>
       				</div>
       				<div class="cont-txt" v-html="item.content"></div>
       				<div class="cont-pic" v-if="item.pics&&item.pics.length>0">
       					<div v-for="pic in item.pics">
       						<img :src="cssPath+'/images/error/fail-750.png'" :social-src="pic" onerror="" alt="">
       					</div>
       				</div>
       				<div class="cont-timer clearfix" @click="click_reply(1,item,index)">
       					<span class="timer fl">{{item.createTime | commentTime}}</span>
       					<span class="dot fl">·</span>
       					<a href="javascript:;" class="reply fl">回复TA</a>
       				</div>
       				<pro-item  v-if="item.item" :item="item"></pro-item>
       				<sub-reply @click-reply="click_reply" v-if="item.topicSubReplys&&item.topicSubReplys.length>0" :firIndex="index" :item="item"></sub-reply>
       				
       			</div>	
       		</li>
       		<div class="loading" style="display:none" v-show="replyType" v-text="noMore?'没有更多了':'正在加载...'"></div>
       		<!-- <div ref="moreReply" class="more-cmt" @click="click_more_reply" style="display: none" v-show="commentTotal>5">
       			<a href="javascript:;">查看更多评论<span class="icon-7"></span></a>
       		</div> -->
       	</ul>
       	<div v-else class="no-reply">
       		<div class="pro-img">
       			<img src="../../../images/topicDetails/no-reply.png">
       		</div>
       		<p>暂无评论</p>
       	</div>
		</section>
	 	<div ref="replyBox" class="cont-bottom clearfix" style="display: none">
			<textarea @blur="hideReply" maxlength="200" ref="replayArea" :placeholder="replyPlaceolder" v-model="replyText" class="fl"></textarea>
			<a href="javascript:;" @click.stop="click_send_reply($event)" class="fr send">发送</a>
		</div>
		<div class="topic-bottom  clearfix" v-show="replyType&&setting.show" style="display: none">
			<div class="operate fl clearfix">
				<a @click="click_reply(0)" href="javascript:;" class="discuss">
					<span></span>
					评论
				</a>
				<a href="javascript:;" @click="click_parise(1,topicId,likeList)" class="praise">
					<span :class="['icon-5',likeList.isLike?'icon-praiseWin':'']"></span>
					<span :class="['num',likeList.isLike?'ff5':'']" v-text="likeList.likeNumText"></span>
				</a>
				<a href="javascript:;" @click="click_collect" :class="['collect',collectStatus?'collectWin':'']">
					<span></span>
					收藏
				</a>
			</div>
			<div class="article fr" @click="click_more_items" v-if="detail.topic.items.length>0">
				<a href="javascript:;" class="clearfix">
					<span class="icon-article"></span>
					<em class="num" v-text="detail.topic.items.length"></em>
					<span>相关商品</span>
					<span class="triangle fr"></span>
				</a>
			</div>
		</div>
	</div>
</template>
<script>
	const domain = window.domain_json;
	import fetch from 'io/fetch.js';
	import replace from 'mods/replace.js';
	import toast from 'mods/toast.js';
	import subReply from './subReply.vue';
	import proItem from './pro.vue';
	import lazyload from 'mods/lazyload';
	import dropload from 'components/Dropload.vue';
 	export default{
 		props:["setting"],
		data(){
			return {
				commentNum:0,	  //评论条数  1级+二级
				commentLists:[],  //评论数据		
				commentTotal:0,   //1级评论总数
				sendBtnType:0,    //0,1,2 对应几级回复
				replyType:true,  //评论的时候需要去隐藏 底部回复
				firReplyIndex:0,
				twoReplyIndex:0,
				replyText:"",
				topicId:"",
				topicReplyId:"",
				topicSubReplyId:"",
				replyName:"",
				scTop:0,
				detail:"",
				collectStatus:false,
				likeList:null,
				cssPath:"",
				noMore:false,
				allLock:false,
				loading:true
			}
		},
		created(){
			const self = this;
			this.cssPath = domain['PLUS_GOMEUI_CDN_IP'];
			this.detail = window.content_json;
			this.topicId = this.detail.topic.id;
			this.groupId = this.detail.topic.groupId;
			this.collectStatus = this.detail.topic.userCollection.result;
			this.likeList = this.detail.like_list;  
			this.getReplyList(true);
		},
		filters:{
			imgClass(val){
				let cname = ["pic pic-one","pic pic-two","pic pic-three"];
				if(val&&val.length){
					let len = val.length-1;
					return "clearfix "+cname[len];
				}
				return "clearfix"; 
			},
			commentTime(val){
				return replace.replaceData(val);
			},
		},
		computed:{
			replyPlaceolder(){
				return this.replyName ? "回复："+this.replyName+"：":"说点什么吧：";
			},
		},
		mounted(){
			const self = this;
		    window.addEventListener("scroll", function() {
		    	var a = 1;
				if(self.scrollTop() + self.windowHeight() >= (self.documentHeight() - 50)&&!self.noMore&&self.replyType&&self.loading){
					self.getReplyList();
					self.loading = false;
				}
			},false);

		},
		methods:{
			scrollTop(){
			 	return Math.max(document.body.scrollTop,document.documentElement.scrollTop);
			},
			documentHeight(){
			 	return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
			},
			windowHeight(){
				return (document.compatMode == "CSS1Compat")?document.documentElement.clientHeight:document.body.clientHeight;
			},
			getReplyList(first){
				const self= this;
				fetch.get(self.setting.url,{
					params:self.setting.params
				})
				.then(function(response) {
					let data = response.data;
					if(data.code === 0){
						let result = data.data;
						if (result.topicReplys.length > 0) {
							if(result.topicReplys.length<10){
								self.noMore = true;
							}
							self.setting.params.preRecodeTime = result.topicReplys[result.topicReplys.length-1].createTime;
							if(first){
								self.commentNum = result.total + result.subReplyTotal;
								self.commentLists = result.topicReplys;
								self.commentTotal = result.total;
							}else{
								self.commentLists = result.topicReplys.concat(self.commentLists);
								self.$nextTick(function(){
									self.loading = true;
									lazyload._lazyload();	
								})
							}
							
						}else{
							if(!first){
								self.allLock = false;
							}
							self.noMore = true;
						}
					}else{
						toast({content:data.message})
					}
				})
				.catch(function(error) {
					toast({content:error.message})
				});
			},
			click_collect(){
				let is = !this.collectStatus;
				if(islogin===0){
					location.assign(domain["WAP_LOGIN_IP"]);
					return;
				}
				is?this.collect():this.cancelCollect();
				
			},
			cancelCollect(){
				const self = this;
				fetch.get("collect/cancel",{
					params:{
						groupId:self.topicId,
						topicId:self.groupId
					}
				})
				.then(function(res){
					let data = res.data;
					if(data.code === 0){
						self.collectStatus = false;
						toast({content:"取消收藏成功"});
					}else{
						toast({content:"取消收藏失败"});
					}	
				})
				.catch(function(err){
						toast({content:"取消收藏失败"});
				})
			},
			collect(is){
				const self = this;
				fetch.post("collect/add",{
					groupId:self.topicId,
					topicId:self.groupId,
				})
				.then(function(res){
					let data = res.data;
					if(data.code === 0){
						self.collectStatus = true;
						toast({content:"收藏成功"});
					}else{
						toast({content:"收藏失败"});
					}	
				})
				.catch(function(err){
						toast({content:"收藏失败"});
				})
			},
			click_parise(type,id,likeList){
				let is = !likeList.isLike;
				if(islogin===0){
					location.assign(domain["WAP_LOGIN_IP"]);
					return;
				}
				is?this.parise(type,id,likeList):this.cancelParise(type,id,likeList);
			},
			cancelParise(type,id,likeList){
				const self = this;
				fetch.get("praise/cancel",{
					params: {
				        id:id,
						type:type,
				    }
				})
				.then(function(res){
					let data = res.data;
					if(data.code === 0){
						likeList.isLike = false;
						likeList.likeNumText-=1;
						toast({content:"取消点赞成功"});
					}else{
						toast({content:"取消点赞失败"});
					}	
				})
				.catch(function(err){
					toast({content:"取消点赞失败"});		
				})
			},
			parise(type,id,likeList){
				const self = this;
				fetch.post("praise/add",{
				        id:id,
						type:type,
				    }
				)
				.then(function(res){
					let data = res.data;
					if(data.code === 0){
						likeList.isLike = true;
						likeList.likeNumText = parseInt(likeList.likeNumText)+1;
						toast({content:"点赞成功"});
					}else{
						toast({content:"点赞失败"});
					}	
				})
				.catch(function(err){
					toast({content:"点赞失败"});		
				})
			},
			click_more_items(){
				this.$emit("change","showMoreItems",true);
			},
			click_more_reply(){
				this.$emit("change","allReply",true);
				this.setting.show = false;
				this.$emit("change","setting",this.setting);
				this.$refs.moreReply.style.display = "none";
				this.allLock=true;
				this.scrollTop(0);
			},
			click_show_topic(){
				this.$emit("change","allReply",false);
				this.setting.show = true;
				this.$emit("change","setting",this.setting);
				this.allLock=false;
				this.$refs.moreReply.style.display = "block";
				this.scrollTop(0);
			},
			click_reply(type,item,index){
				if(islogin===0){
					location.assign(domain["WAP_LOGIN_IP"]);
					return;
				}				
				this.sendBtnType = type;
				if(type === 1){
					this.firReplyIndex = index;
				}else if(type === 2){
					this.twoReplyIndex = index;
					this.topicSubReplyId = item.topicSubReplys[index].id;
					this.replyName = item.topicSubReplys[index].user.nickname;
				}
				if(item){
					this.topicReplyId = item.id;
					this.replyName = item.user.nickname;
				}else{
					this.replyName = "";
				}
				this.showReply();
				document.body.className = "no-fixed";//唤起评论的时候需要去把顶部的fixed去掉
			},
			zeroReply(){//直接回复话题
				const self = this;
				if(islogin===0){
					location.assign(domain["WAP_LOGIN_IP"]);
					return;
				}
				fetch.post('topic/reply',{
					replyType:0,
					topicId:self.topicId,
					content:self.replyText
				})
				.then(function(res){
					let data = res.data;
					if(data.code === 0){
						data.data.like = {
							isLike:false,
							likeNumText:"0",
							userQuantity:0
						};
						self.commentLists.unshift(data.data);
						toast({content:"回复成功"});
					}else{
						toast({content:"回复失败"})
					}
				})
				.catch(function(err){
					toast({content:"回复失败"})
				})
			},
			oneReply(isTwo){//回复一级评论
				const self = this;
				if(islogin===0){
					location.assign(domain["WAP_LOGIN_IP"]);
					return;
				}
				let obj = {
					replyType:0,
					topicId:self.topicId,
					content:self.replyText,
					topicReplyId:self.topicReplyId
				}
				if(isTwo){
					obj.topicSubReplyId = self.topicSubReplyId;
				}
				fetch.post('topic/subreply',obj)
				.then(function(res){
					let data = res.data;
					if(data.code===0){
						self.commentLists[self.firReplyIndex].topicSubReplys.push(data.data);
						toast({content:"回复成功"});
					}else{
						toast({content:"回复失败"})
					}
				})
				.catch(function(err){
					toast({content:"回复失败"})
				})
			},
			twoReply(){//回复二级评论
				this.oneReply("1");
			},
			click_send_reply(e){
				e.stopPropagation();
				let arr = ["zeroReply","oneReply","twoReply"];
				this[arr[this.sendBtnType]]();
			},
			hideReply(){
				const self = this;
				setTimeout(function(){
					self.$refs.replyBox.style.display = "none";
					self.replyType = true;
					document.body.className = "";
					self.scrollTop(self.scTop);
				},350)
			},
			showReply(){
				let h = document.body.clientHeight+this.$refs.replyBox.scrollHeight,
					self = this;
				this.scTop = this.scrollTop();
				this.replyText = "";
				this.$refs.replayArea.value = "";
				this.$refs.replyBox.style.display = "block";
				this.$refs.replayArea.focus();
				this.replyType = false;
				setTimeout(function(){
					self.scrollTop(h+100);
				},400)
			},
			scrollTop(val){
				if(val!==undefined){
					window.scrollTo(0,val)
					return;
				}
				return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;	
			}
		},
		components:{
			subReply,
			proItem,
			dropload
		}
	}
</script>