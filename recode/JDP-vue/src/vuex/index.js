import Vue from 'vue';
import Vuex from 'vuex';

//首页module
import indexModule from './modules/index.js'
//原项目module
import xmjdModule from './general/xmjd.js'
import xmsxModule from './general/xmsx.js'
import xmztModule from './general/xmzt.js'
import xmlxModule from './general/xmlx.js'
import gzlxqModule from './general/gzlxq.js'
import zlModule from './general/zl.js'
import membersModule from './general/members.js'
import xmxqModule from './general/xmxq.js'
import loadmoreModule from './general/loadmore.js'
import departmentsModule from './general/departments.js'
import filterProjectModule from './general/filterProject.js'
import curProject from './general/curProject.js'
import filterByTable from './general/filterByTable.js'

//专项module
import search from './special/search.js'
import zxModule from './special/zx.js'
import zxsModule from './special/zxs.js'
import wcqkModule from './special/wcqk.js'
import hfztModule from './special/hfzt.js'
import zxxqModule from './special/zxxq.js'
import yfzxModule from './special/yfzx.js'
import zxOptions from './special/zxOptions.js'


Vue.use(Vuex);

// export default new Vuex.Store(indexModule);
export default new Vuex.Store({
	modules:{
		indexModule,
		//项目module
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
		filterByTable,
		//专项module
		search,
		zxModule,
		zxsModule,
		wcqkModule,
		hfztModule,
		zxxqModule,
		zxOptions,
		yfzxModule
	}
})
