import utils from 'utils';

const mutations = {};

import * as common from './common.js';
import * as user from './user.js';
utils.mixin(mutations, common);
utils.mixin(mutations, user);

export default mutations;