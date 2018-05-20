/* css */
import 'css/page/live-detail/index.scss';
/* fastclick */
import 'fastclick.js';
import {loginFlag, page} from 'util/phpCommon';

import liveChat from './chat/index.js';
import historyBack from 'util/historyback';

import tabChange from './tabChange';
import info from './info';
import goodsLoad from './getGoods';
historyBack();
tabChange();
goodsLoad();
