<template>
	<div class="cont-list">	
		<div class="list" v-for="(list,index) in item.topicSubReplys">
			<div class="list-net">
				<a href="javascript:;" class="net-name" v-text="list.user.nickname+':'"></a>
				<span class="answer" v-if="list.topicSubReplyUser">回复</span>
				<a href="javascript:;" v-if="list.topicSubReplyUser" class="net-name" v-text="list.topicSubReplyUser.nickname+':'"></a>
				<span v-html="list.content"></span>
			</div>
			<div class="list-timer clearfix" @click="click_reply(index,item)">
				<span class="timer fl">{{list.createTime|commentTime}}</span>
				<span class="dot fl">·</span>
				<a href="javascript:;" class="reply fl">回复TA</a>
			</div>
		</div>
		<div class="list" style="display: none" v-show="retractType" v-for="list in topicSubReplys">
			<div class="list-net">
				<a href="javascript:;" class="net-name" v-text="list.user.nickname+':'"></a>
				<span class="answer" v-if="list.topicSubReplyUser">回复</span>
				<a href="javascript:;" v-if="list.topicSubReplyUser" class="net-name" v-text="list.topicSubReplyUser.nickname+':'"></a>
				<span v-html="list.content"></span>
			</div>
			<div class="list-timer clearfix" @click="click_reply(index,item)">
				<span class="timer fl">{{list.createTime|commentTime}}</span>
				<span class="dot fl">·</span>
				<a href="javascript:;" class="reply fl">回复TA</a>
			</div>
		</div>
		<div class="more-reply" @click="click_more_subReply(item.topicReplyId,item.subReplyQuantity-2)" v-show="item.subReplyQuantity>2&&!retractType">
			<a href="javascript:;">查看{{item.subReplyQuantity-2}}条回复&gt;</a>
		</div>
	</div>
</template>
<script>
	import replace from 'mods/replace.js';
	import fetch from 'io/fetch.js';
	export default {
		props:["item","firIndex"],
		data(){
			return {
				topicSubReplys:[],
				retractType:false
			}
		},
		created(){

		},
		filters:{
			commentTime(val){
				return replace.replaceData(val);
			}
		},
		methods:{
			click_more_subReply(topicId,num){
				const self = this;
				fetch.get('topic/subreply_list',{
					params:{
						topicReplyId:topicId,
						pageNum:1,
						pageSize:num
					}	
				})
				.then(function(response){
					const data = response.data;
					if(data.code===0){
						self.retractType = true;
						self.topicSubReplys = self.topicSubReplys.concat(data.data.topicSubReplys);
					}
				})
				.catch(function(error){

				})
			},
			click_reply(index,item){
				this.$emit("change","firReplyIndex",this.firIndex);
				this.$emit("click-reply",2,item,index);
			}
		}
	}
</script>