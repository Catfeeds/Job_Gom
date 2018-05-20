<style lang="less">
@import "../../../node_modules/nprogress/nprogress.css";
</style>
<script>
import nprogress from 'nprogress';
import pleaseWaitMe from 'utils/pleaseWaitMe.js';
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
					if (this.loading.progress) {
						nprogress.start();
					} else {
						nprogress.done();
					}
					if (this.loading.circle) {
						pleaseWaitMe.wait();
					} else {
						pleaseWaitMe.finish();
					}
				}
			}
		}
	}
};
</script>
