let mutations = {};

import { mixin } from 'utils/common.js';

import * as base from './base.js';
import * as user from './user.js';
import * as drawer from './drawer.js';
import * as anicer from './anicer.js';

mixin(mutations, base);
mixin(mutations, user);
mixin(mutations, drawer);
mixin(mutations, anicer);

export default mutations;
