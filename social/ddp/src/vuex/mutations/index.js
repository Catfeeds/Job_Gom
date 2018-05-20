let mutations = {};

import { mixin } from 'utils';

import * as base from './base.js';
import * as user from './user.js';
import * as data from './data.js';
import * as report from './report.js';

mixin(mutations, base);
mixin(mutations, user);
mixin(mutations, data);
mixin(mutations, report);

export default mutations;
