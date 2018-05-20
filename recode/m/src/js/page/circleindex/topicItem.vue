<template>
	<div>
		<div class="bor-b cle-item" v-for="item in topicItems">
			<div class="flex-box user-box">
				<div class="face-img"><img :src="cssPath+'images/error/user-face.png'" :social-src="item.user.facePicUrl"></div>
				<div class="flex-cell">
					<p class="c-6 us-name">{{item.user.nickname}}</p>
				</div>
			</div>
			<div class="item-cont">
				<a :href="'topic-'+item.id+'.html'">
					<h2 class="tit-box">
						<em class="ic-zf" v-if="item.isEssence">精品</em>
						<em class="ic-jp" v-if="item.style == 1">专访</em>
						<span v-html='item.name'></span>
					</h2>
				</a>
			</div>
			<div class="cont-info">
				<a :href="'topic-'+item.id+'.html'" class="info-href">
					<div class="c-6 txt-box" v-html="item.content[0].text"></div>
					<div class="pic-box" :class="{'one':item.compic.length===1,'two':item.compic.length===2,'three':item.compic.length>=3}">
						<a :href="'topic-'+item.id+'.html'">
							<span class="num" v-if="item.countImg > 3">{{item.countImg}}</span>
							<div class="img-it" v-for="(compic,index) in item.compic" v-if="index<3">
								<template v-if="compic.type==='image'||compic.type==='item'||compic.type==='video'">
									<img :src="cssPath+'images/error/fail-'+errorImg[item.compic.length-1]+'.png'" :social-src="compic.url">
								</template>
								<template v-else-if="compic.type==='item'">
										<em class="icon-8"></em>
								</template>
								<template v-else-if="compic.type==='video'">
									<em class="icon-9"></em>
								</template>
							</div>
						</a>
					</div>
				</a>
			</div>
			<div class="m-tags m-tags-slide">
				<div class="t-list">
					<label v-for="label in item.labels">{{label.name}}</label>
				</div>
			</div>
			<div class="flex-box info">
				<div class="flex-bd">
					<p class="c-9 time">{{new Date(item.lastReplyTime).getFullYear()+'.'+(new Date(item.lastReplyTime).getMonth()+1)+'.'+new Date(item.lastReplyTime).getDate()}}</p>
				</div>
				<div class="flex-ft">
					<p class="c-9 handle">
						<em class="icon-flow"></em>
						<cite>{{item.pageviewText}}</cite>
						<em class="icon-4"></em>
						<cite>{{item.replyTotalQuantityText}}</cite>
						<em class="icon-5"></em>
						<cite>{{item.like.likeNumText}}</cite>
						<em class="icon-6"></em>
						<cite>{{item.topicCollectionQuantity}}</cite>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import fetch from 'io/fetch';
import lazyload from 'mods/lazyload';
	export default{
		name:'topic-item',
		props:['topicItems'],
		data(){
			return {
				cssPath:window.js_cdn,
				errorImg:["750","360","180"]
			}
		}
	}
</script>
<style scoped>

</style>