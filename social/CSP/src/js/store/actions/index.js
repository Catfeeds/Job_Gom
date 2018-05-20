import utils from 'utils';

const actions = {};

import * as common from './common.js';
import * as user from './user.js';
utils.mixin(actions, common);
utils.mixin(actions, user);

export default actions;