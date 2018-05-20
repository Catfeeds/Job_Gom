const utils = {};

utils.mixin = (source, target) => {
	for (var i in target) {
		if (target.hasOwnProperty(i)) {
			source[i] = target[i];
		}
	}
	return source;
};

import * as cookie from './cookie.js';
import * as common from './common.js';
import * as audio from './audio.js'
utils.mixin(utils, cookie);
utils.mixin(utils, common);
utils.mixin(utils, audio);


export default utils;