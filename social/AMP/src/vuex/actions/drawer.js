export const controlDrawer = function(context, obj) {
	context.commit('CONTROLDRAWER', obj);
};

export const setDrawerState = function(context, type, obj) {
	context.commit('SETDRAWERSTATE', type, obj);
};
