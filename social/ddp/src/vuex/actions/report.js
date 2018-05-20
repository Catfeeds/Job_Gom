export const setLayouts = (store, layouts) => {
	store.dispatch('SETLAYOUT', layouts);
};

export const setComponents = (store, components) => {
	store.dispatch('SETCOMPONENTS', components);
};

export const setLayoutId = (store, layoutid) => {
	store.dispatch('SETLAYOUTID', layoutid);
};
