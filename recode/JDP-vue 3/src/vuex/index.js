import Vue from 'vue';
import Vuex from 'vuex';

import indexModule from './modules/index.js'
import xmjdModule from './modules/xmjd.js'
import xmsxModule from './modules/xmsx.js'
import xmztModule from './modules/xmzt.js'
import xmlxModule from './modules/xmlx.js'
import gzlxqModule from './modules/gzlxq.js'
import zlModule from './modules/zl.js'
import membersModule from './modules/members.js'
import xmxqModule from './modules/xmxq.js'
import loadmoreModule from './modules/loadmore.js'
import departmentsModule from './modules/departments.js'
import filterProjectModule from './modules/filterProject.js'
import curProject from './modules/curProject.js'
import filterByTable from './modules/filterByTable.js'

Vue.use(Vuex);

// export default new Vuex.Store(indexModule);
export default new Vuex.Store({
	modules:{
		indexModule,
		xmjdModule,
		xmsxModule,
		xmztModule,
		xmlxModule,
		gzlxqModule,
		zlModule,
		membersModule,
		xmxqModule,
		loadmoreModule,
		departmentsModule,
		filterProjectModule,
		curProject,
		filterByTable
	}
})
