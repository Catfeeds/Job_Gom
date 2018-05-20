import utils from 'utils';

const state = {};

import common from './common.js';
import user from './user.js';
utils.mixin(state, common);
utils.mixin(state, user);

export default state;