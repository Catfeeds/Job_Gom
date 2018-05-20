<template>
    <section class="topics" v-if="code === 200">
		<down-app style="display: none" v-show="!allReply" @change="changeName"></down-app>
		<topic-detail  style="display: none" v-show="!allReply" @change="changeName" :showApp="showApp"></topic-detail>
		<recommend  style="display: none" v-show="!allReply"></recommend>
		<items  style="display: none" v-show="!allReply" @change="changeName" :showMoreItems="showMoreItems"></items>
		<comment-list :setting="setting"  @change="changeName"></comment-list>
		<back-top></back-top>
		<share-layer @change="changeName" :showShareLayer="showShareLayer"></share-layer>
	</section>
	<div class="m-prompt" v-else>
		<div class="pro-img"><img src="../../../images/public/img-1.png"></div>
	   <div class="pro-txt">{{code === 404 ? "该话题已被删除":(code === 403 ? "该话题审核未通过":"该话题不存在")}}</div>
	</div>

</template>
<script>
	import commentList from './comment.vue';
	import topicDetail from './topic.vue';
	import downApp from 'components/downApp.vue';
	import backTop from 'components/backTop.vue';
	import shareLayer from 'components/share.vue';
	import recommend from './recommendTopic.vue';
	import fetch from 'io/fetch.js';
	import items from './item.vue';
	import lazyload from 'mods/lazyload';
 	export default {
		data(){
			return {
				showApp:true,
				showShareLayer:false,
				replayFooter:"",
				setting:{
					url:"topic/reply_list",
					type:"get",
					params:{
						topicId:"",
						pageSize:10,
						preRecodeTime:new Date()*1	
					},
					show:true
				},
				allReply:false,
				code:200,
				showMoreItems:false
			}
		},
		created(){
			this.code = window.data_code;
			if(this.code===200){
				this.setting.params.topicId = window.content_json.topic.id;
			}
		},
		mounted(){
			lazyload._lazyload();
		},
		methods:{
			changeName(key,val){
				this[key] = val;
			}
		},
		components:{
			commentList,
			topicDetail,
			downApp,
			backTop,
			shareLayer,
			items,
			recommend
		}
	}
</script>
<style scoped>
	body,html{
		height: 100%;
	}
	.topics{
		position: relative;
		height:100%;
	    margin:0;
	    padding:0;
	    overflow:hidden;
	    .topic-header{
		    height: 1rem;
		    width:100%;
		    position:absolute;
	    }
	    .content{

	    }
	}
</style>
