<template>
	<div class="m-downapp" v-show="showApp" style="display: none">
		<div class="app-box">
			<a @click="click_close" id="appstart-click" class="app-close">
				<em class="icon-close"></em>
			</a>
			<img src="../../images/public/gome_icon.png" class="app-logo">
			<h2 class="app-tit">更多优惠尽在国美Plus</h2>
			<a href="javascript:;" @click="click_open_app" class="app-btn">戳我打开</a>
		</div>
	</div>
</template>
<script>
	import appstart from '../mods/appstart.js';
	export default {
		data(){
			return {
				showApp:true
			}	
		},
		created(){
			
		},
		methods:{
			click_close(){
				this.showApp = false;
				this.$emit("change","showApp",false)
			},
			click_open_app(){
				appstart({
	                type: "download",
	            })
			}
		}
	}
</script>