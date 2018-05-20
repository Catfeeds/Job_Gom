<template>
	<svg width="100%" height="100%">
		<line v-for='item in list' :x1="item.x1" :y1="item.y1" :x2="item.x2" :y2="item.y2" style="stroke:rgb(99,99,99);stroke-width:2"/>
	</svg>
</template>
<script>
	export default {
		props: [ 'list' ]
	};
</script>