import CONST from '../../help/CONST.js';

export const CONTROLDRAWER = function(state, obj) {
	obj.show ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto';
	state.drawerCtrl = obj;
};

export const SETDRAWERSTATE = function(state, type, obj) {
	// drawer首字母大写
	// CONST 全大写
	state[`drawer${type.replace(type.match(/([\s\S]){1}/)[1], type.match(/([\s\S]){1}/)[1].toUpperCase())}State`] = obj || CONST[`DRAWER${type.toUpperCase()}`];
};
