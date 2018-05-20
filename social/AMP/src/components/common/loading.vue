<template>
	<transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @enter-cancelled="enterCancelled" @before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave" @leave-cancelled="leaveCancelled">
		<div class="loading_con transition" v-show="loading">
			<div class="loading">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
	</transition>
</template>
<script>
import Vue from 'vue';

import store from 'store';
export default {
	name: 'loading',
	computed: {
		loading: () => store.state.loading
	},
	methods: {
		beforeEnter: function(el) {

		},
		enter: function(el, done) {
			setTimeout(() => {
				el.style.opacity = 1;
			}, 0);
			setTimeout(() => {
				done();
			}, 300);
		},
		afterEnter: function(el) {

		},
		enterCancelled: function(el) {
			// el.style.display = 'none';
		},
		beforeLeave: function(el) {

		},
		leave: function(el, done) {
			setTimeout(() => {
				el.style.opacity = 0;
			}, 300);
			setTimeout(function() {
				done();
			}, 600);
		},
		afterLeave: function(el) {

		},
		leaveCancelled: function(el) {
			// el.style.display = 'none';
		}
	}
};
</script>
