<template>
	<router-view></router-view>
</template>
<script>
	var Vue = require('Vue');
	var $ = require('jQuery');
	// var Loading = require('../../common/loading.vue');
	// var Alert = require('../../common/alert.vue');
	// var Confirm = require('../../common/confirm.vue');
	var store = require('store');
	var App = Vue.extend({
		name: 'UserManagement',
		data: function() {
			return {
				loading: {
					show: false,
					noLoaded: 0
				}
			}
		},
		store: store,
		route: {
			data: function(transition) {
				var url = this.$route.path.replace(/(\?.*)/, '');
				// $('[href="#!' + url + '"]').parent().parent().parent().addClass('active');
				$('[href="#!' + url + '"]').focus();
				$('#side-menu a').removeClass('active');
				$('[href="#!' + url + '"]').addClass('active');

			}
		},
		components: {
		}

	});

	module.exports = App;
</script>