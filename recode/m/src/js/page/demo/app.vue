<template>
	<div>
		<div @click="showShare(true)">点我</div>
		<share-layer @change="changeName" :showShareLayer="showShareLayer"></share-layer>	
		<div class="diaglog" @click="dialog">dialog</div>
		<div>{{time}}</div>
	</div>
</template>
<script>
	import shareLayer from '../../components/share.vue';
	import dialogLayer from '../../mods/dialog.js';
	import confirmLayer from '../../mods/confirm.js';
	import replace from '../../mods/replace.js';
	export default {
		data(){
			return {
				showShareLayer:false,
				time:replace.replaceData(1516501551848)
			}
		},
		methods:{
			showShare(val){
				this.showShareLayer = val;
			},
			dialog(){
				confirmLayer({content:"在手机浏览器打开我会更好看哦!",title:"提示",sureCon:"确定",cancelCon:"取消",sureCallback(){alert(1)}});
			},
			changeName(key,val){
				this[key] = val;
			}
		},
		components:{
			shareLayer
		}
	}
</script>