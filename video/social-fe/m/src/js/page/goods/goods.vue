<template>
	<div class="goods">
		<header class="goods-header clearfix">
			<span class="header-back fl" @click="headerBack"></span>
			<span class="header-reprinted fr" @click="headerSet"></span>
			<span class="header-share fr" @click="headerShare"></span>
		</header>
		<div class="goods-carousel">	
			<swiper :listImg='swiperList' :listUrl="itemInfo.url"></swiper>
		</div>
		<div class="goods-info">
			<h2 v-text="itemInfo.item.name"></h2>
			<div class="price clearfix">
				<div class="money fl" v-text="'¥'+itemInfo.item.price">¥199.00</div>
				<div class="buy fr">
					<em></em>
					<span class="num" v-html='itemInfo.item.sales'>2</span>人已买
				</div>
			</div>
			<div class="tit">好在哪里</div>
			<div v-for="item in topic.components">
				<template v-if="item.type==='text'&&replaceBr(item.text)!==''">
					<p v-html="item.text"></p>
				</template>	
				<template v-else-if="item.type==='image'">
					<div class="info-pic">
						<img :src="item.url" :social-src="item.url" alt="" />
					</div>
					<p v-html="item.text"></p>
				</template>
			</div>
			<div class="tit">自定义分类</div>
			<div class="custom-info">
				<p>这是一款简约的男士休闲T恤，适合追求休闲个性风格的型男穿，精选优质舒适的面料设计，上身极其舒适透气，简单却带有个性的图案装饰，尽显随性潇洒的风格。</p>
				<div class="store">
					<div class="store-pic">
						<a href="javascript:;">
							<img :src="cssPath+'images/goods/pic1111.jpg'" alt="">
						</a>
					</div>
					<div class="store-name">
						<a href="javascript:;">小仙女的服饰店
						</a>
					</div>
				</div>
			</div>
		</div>
		<div class="goods-related">
			<div class="tit">
				相关好货
				<em class="tit-left"></em>
				<em class="tit-right"></em>
			</div>
			<ul class="related clearfix">
				<li v-for="item in relatedList">
					<div class="list-info">
						<a :href="item.listHref" >
							<div class="info-pic">
								<img :src="item.listSrc" alt="">
							</div>
							<div class="info-tit" v-text="item.listTit"></div>
						</a>
					</div>
					<div class="list-user clearfix">
						<a :href="item.userHref"  class="clearfix fl">
							<span class="user-pic">
								<img :src='item.userPic' alt="">
							</span>
							<span class="user-name" v-text='item.userName'></span>
						</a>
						<span class="fr">
							<em v-text='item.userBuy'></em>人已买
						</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="goods-bot clearfix">
			<a href="javascript:;" class="discuss-btn fl">
				<span></span>
				评论
			</a>
			<a href="javascript:;" class="assist-btn fl" @click="click_parise(4,topic.id,topic.like)">
				<span class="icon-5 " :class="{'icon-praiseWin':likeList.isLike}"></span>
				赞
				<span class="like-num" v-text='likeList.likeNumText'>1</span>
			</a>
			<a :href="itemInfo.url" class="shop-btn fr">去购买</a>
		</div>
	</div>
</template>
<script>
	import swiper from '../../components/swiper.vue';
	import bridge from '../../util/birdge.js';
	import fetch from '../../io/fetch.js';
	import toast from '../../mods/toast.js';
	let app_version = navigator.userAgent.match(/gome[plus]{0,4}\/[iphone\/]{0,7}(\d*)/) ? navigator.userAgent.match(/gome[plus]{0,4}\/[iphone\/]{0,7}(\d*)/)[1] : 0;
	let kkid = 0;
	let sstid = typeof (content_json.stid) == 'undefined' ? 0 : content_json.stid;
	if (sstid == '') {
	    var _stid = 0
	} else {
	    var _stid = sstid
	}
	export default {
		data(){
			return {				
				swiperList:content_json.banner_pic,
				itemInfo:content_json.item_info,
				topic:content_json.topic,
				zanflag:true,				
				likeList:content_json.likeList,
				relatedList:[
					{
						listHref:'',
						listSrc:'../../../../src/images/goods/pic1.jpg',
						listTit:'美的(Midea)洗衣机  全自动洗衣机',
						userHref:'',
						userPic:'../../../../src/images/goods/pic1111.jpg',
						userName:'咕噜噜咕咕噜噜咕',
						userBuy:'66'
					}
				],
			}
		},
		created(){
			const self = this;
			this.cssPath = window.js_cdn;
		},
		components:{
			swiper:swiper,
		},
		mounted(){		
	        if(typeof this.itemInfo.shopId != 'undefined'){
	            if (app_version >= 104 && (islogin=='1') && (this.itemInfo.shopId > 1)) {
	            //if ((islogin=='1') && (shop_id.length > 1)) {
	            	//WAP_ITEM_IP不确定
	                let _url = this.changeHttps(domain_json.WAP_ITEM_IP)
	                this.gourl = `${_url}/reship_goods-${topic_id}-${content_json.item_info.shopId}-${kkid}-${_stid}.html`;
	                this.headerSet();
	            }
	        }  
		},
		methods:{
			headerBack (e){
				//window.history.back(-1);
				e.stopPropagation();
                if (history.length == 1) {
                    location.assign('//m.gomeplus.com/');
                    return false;
                }
                if (location.hash.match(/backtwostep/)) {
                    history.go(-2);
                    return false;
                } else {
                    history.go(-1);
                }
                return false;
			},
			headerSet () {
		        let self = this;
		        var param = {
		            menus: {
		                isShowCloseMenu: 'Y',
		                rightMenus: [
		                    {
		                        type: 'scheme',
		                        title: '转载',
		                        icon: '',
		                        action: `${self.gourl}`
		                    },
		                ]
		            }
		        }
		        bridge.setHeadBar(function (data) {
		            console.log(data)
		        }, function (err) {
		            console.log(err)
		        }, param)
		    },
		    headerShare () {
		        if (app_version > 89) {
		            if (app_version > 106 && (islogin=='1') && (shop_id.length > 1)) {
		                var param = {
		                    title: app_title,
		                    shareDesc: app_desc,
		                    shareImageUrl: app_img,
		                    shareUrl: app_link,
		                    channel: 'mshop',
		                    platform: ['WeiBo', 'Wechat', 'WechatMoments', 'QQ', 'QZone', 'GomeMyFriends', 'GomeMoments', 'MShop', 'CopyLink'],
		                    mshopInfo:
		                        {
		                            topicID: String(this.topic.id),//topicid
		                            kid: String(kkid),  //返利id
		                            mid: String(this.itemInfo.shopId),//
		                            stid: String(_stid),  //门店id 
		                        },
		                }

		            } else {
		                var param = {
		                    title: app_title,
		                    shareDesc: app_desc,
		                    shareImageUrl: app_img,
		                    shareUrl: app_link,
		                    channel: 'link',
		                    platform: ['WeiBo', 'Wechat', 'WechatMoments', 'QQ', 'QZone', 'GomeMyFriends', 'GomeMoments', 'CopyLink'],
		                }
		            }
		            bridge.callShareComp(function (data) {
		                console.log(data)
		            }, function (err) {
		                console.log(err)
		            }, param)
		        } else {
		            share.show()
		        }
		    },
		    replaceBr(val){
				return val.replace(/\s|<br\/>/gi,"");
			},
		    click_parise(type,id,likeList){
				let is = !this.likeList.isLike;
				if(islogin===0){
					location.assign("http://login.m.atguat.com.cn/login.html");
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
			changeHttps (url) {
	            if (url.match('https:') == null && url.match('http:') == null) {
	                return `https:${url}`
	            } else {
	                return url.replace('http:', 'https:')
	            }
		    },


		}
	}
</script>










