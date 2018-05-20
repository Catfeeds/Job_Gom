let mutations = {};

import { mixin } from 'utils';

import * as base from './base.js';
import * as user from './user.js';
import * as data from './data.js';

mixin(mutations, base);
mixin(mutations, user);
mixin(mutations, data);

export default mutations;
