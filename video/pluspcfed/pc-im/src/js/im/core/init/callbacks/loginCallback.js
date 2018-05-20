
import { getGroupList, VueApp }  from '../handleData/getGroupList';
import store from '../../vuex';

export const login_callback = () => {
	store.state.initModule.isDisConnect = false;
	if( store.state.initModule.isFirst ){
		store.dispatch('addResourceUrl',{host:IMConstants.IM_LOADFILEURL});
	    getGroupList();
	    store.state.initModule.isFirst = false;
	}
};
