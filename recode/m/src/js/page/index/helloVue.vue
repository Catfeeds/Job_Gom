<template>
	<div class="demo"> hello {{name}}</div>
</template>

<script>
	export default {
		data(){
			return {
				name:'Vue'
			}
		}
	}
</script>

<style scoped>
	.demo{
		color:#F00;
	}
	.demotest{
	color:#666;
	}
</style>