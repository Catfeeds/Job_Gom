<style lang="less">
@import "../../../node_modules/nprogress/nprogress.css";
</style>
<script>
import nprogress from 'nprogress';
import store from 'store';

nprogress.configure({
	showSpinner: false
});

export default {
	name: 'Loading',
	data() {
		return {
			width: 0
		};
	},
	vuex: {
		getters: {
			loading: () => {
				return store.state.loading;
			}
		}
	},
	watch: {
		loading: {
			handler() {
				if (this.loading) {
					nprogress.start();
				} else {
					nprogress.done();
				}
			}
		}
	}
};
</script>
