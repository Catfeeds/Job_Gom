import { PROP_CURRENT_NODE, PROP_A_NODE, PROP_SUDA, PROP_HREF } from './constants';
export default {
	getSudaDate: function(store) {
		return store.getState(PROP_SUDA);
	},
	getCurrentTarget: function(store) {
		return store.getState(PROP_CURRENT_NODE);
	},
	getATag: function(store) {
		return store.getState(PROP_A_NODE);
	},
	getHref: function(store) {
		return store.getState(PROP_HREF);
	}
};
