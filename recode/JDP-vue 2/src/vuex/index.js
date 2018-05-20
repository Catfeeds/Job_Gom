import Vue from 'vue';
import Vuex from 'vuex';

import indexModule from './modules/index.js'
import xmjdModule from './modules/xmjd.js'

Vue.use(Vuex);

// export default new Vuex.Store(indexModule);
export default new Vuex.Store({
	modules:{
		indexModule:indexModule,
		xmjdModule:xmjdModule
	}
})
