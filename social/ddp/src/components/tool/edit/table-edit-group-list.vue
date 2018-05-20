<template>
	<div class="list-group" v-if="list.length">
		<h4>{{title}}</h4>
		<button type="button" class="btn btn-primary" v-for="(index, item) in list" >
			{{item.text}}
			<span class="badge">{{index+1}}</span>
			<span class="glyphicon glyphicon-remove remove" @click="remove(index)"></span>
		</button>
	</div>
</template>
<script>
	export default {
		props: ['list', 'remove', 'title']
	};
</script>
<style scoped>
	.list-group {
		margin-top: 20px;
	}

	.list-group > button {
		margin: 3px;
		position: relative;
	}

	.list-group > button > span.remove {
		position: absolute;
		right: 0px;
		top: 0px;
		cursor: pointer;
	}
</style>