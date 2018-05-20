let actions = {};

import { mixin } from 'utils/common.js';

import * as base from './base.js';
import * as user from './user.js';
import * as drawer from './drawer.js';
import * as anicer from './anicer.js';

mixin(actions, base);
mixin(actions, user);
mixin(actions, drawer);
mixin(actions, anicer);

export default actions;
