<template>
	<div>
		<goods></goods>	
		<!-- <comment-list></comment-list> -->
		<back-top></back-top>
	</div>
</template>

<script>
	//import commentList from '../topicDetails/comment.vue'
	import goods from './goods.vue';
	import swiper from '../../components/swiper.vue';
	import backTop from '../../components/backTop.vue';
	export default {
		data(){
			return {
				name:'aaaaa'
			}
		},
		components:{
			//commentList,
			backTop,
			goods:goods
		}
	}
</script>

<style scoped>
</style>