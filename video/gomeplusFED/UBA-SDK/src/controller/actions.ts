import { PROP_CURRENT_NODE, PROP_SUDA, PROP_HREF, PROP_HREF_ADDIN, PROP_A_NODE } from './constants';
import { insertQuery, mixin } from '../utils';
// 不单独导出， 防止使用 export * as , 将产生Object.freeze代码
// 由于暂时不涉及监听， 性能考虑，暂时make it dirty
export default {
	updateSuda: function(store, key, value) {
		let data = store.getState(PROP_SUDA) || {};
		data[key] = value;
		return store.commit({
			key: PROP_SUDA,
			data
		});
	},
	assignSuda: function(store, data) {
		let olddata = store.getState(PROP_SUDA) || {};
		return store.commit({
			key: PROP_SUDA,
			data: mixin(olddata, data)
		});
	},
	setCurrentTarget: function(store, data) {
		return store.commit({
			key: PROP_CURRENT_NODE,
			data
		});
	},
	setATag: function(store, data) {
		return store.commit({
			key: PROP_A_NODE,
			data
		});
	},
	updateATagHref: function(store) {
		let addin = store.getState(PROP_HREF_ADDIN);
		let href = store.getState(PROP_HREF);
		if (href && addin) {
			let data = insertQuery(href, addin);
			let atag = store.getState(PROP_A_NODE);
			atag && data && (atag.href = data);
		}
	},
	updateHrefJson: function(store, key, value) {
		let data = store.getState(PROP_HREF_ADDIN) || {};
		data[key] = value;
		return store.commit({
			key: PROP_HREF_ADDIN,
			data
		});
	},
	setHref: function(store, data) {
		return store.commit({
			key: PROP_HREF,
			data
		});
	}
};
