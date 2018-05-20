export const CONTROLANICER = function(state, obj) {
	state.anicerControl = Object.assign({},state.anicerControl,obj);
};

export const SETANICERDATA = function(state,obj) {
	state.anicerFormData = 	Object.assign({},state.anicerFormData,obj);
};
