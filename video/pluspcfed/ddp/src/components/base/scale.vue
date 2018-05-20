<template>
	<div class="scale no-select">
		<span>{{val | currency '' 0}}%</span>
		<span class="adjust" @click="val >= min + step ? val -= step : val = min;">—</span>
		<input type="range" id="myRange" :min="min" :max="max" :style="{transform: 'rotate(' + transform +'deg)', width: width + 'px'}" v-model="val">
		<span class="adjust" @click="val <= max - step ? val += step : val = max;">+</span>
	</div>
</template>
<script>
	export default {
		props: {
			transform: {
				type: Number,
				default: 90
			},
			width: {
				type: Number,
				default: 100
			},
			min: {
				type: Number,
				default: 10
			},
			max: {
				type: Number,
				default: 100
			},
			step: {
				type: Number,
				default: 20
			},
			val: {
				type: Number,
				default: 0
			}
		}
	};
</script>
<style>
	.scale {
		height: 21px;
		line-height: 21px;

	}
	.scale input {
		display: inline-block;
		vertical-align: middle;
	}
	.scale .adjust {
		vertical-align: middle;
		display: inline-block;
		width: 20px;
		height: 20px;
		border: 1px solid #aabbcc;
		border-radius: 50px;
		text-align: center;
		line-height: 20px;
		font-weight: bold;
		cursor: pointer;
	}
</style>