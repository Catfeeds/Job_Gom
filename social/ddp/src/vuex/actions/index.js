let actions = {};

import { mixin } from 'utils';

import * as base from './base.js';
import * as user from './user.js';
import * as data from './data.js';
import * as report from './report.js';

mixin(actions, base);
mixin(actions, user);
mixin(actions, data);
mixin(actions, report);

export default actions;
