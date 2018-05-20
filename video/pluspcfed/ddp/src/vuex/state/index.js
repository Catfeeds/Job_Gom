let state = {};

import { mixin } from 'utils';

import common from './base.js';
import user from './user.js';
import data from './data.js';
import report from './report.js';

mixin(state, common);
mixin(state, user);
mixin(state, data);
mixin(state, report);

export default state;
