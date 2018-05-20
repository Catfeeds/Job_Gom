/* css */
import 'css/page/my-index/index.scss';
/* fastclick */
import 'fastclick.js';
import { loginFlag, page } from 'util/phpCommon.js';

import unLoginMyRecord from './unLoginMyRecord.js';
import loginedMyRecord from './loginedMyRecord.js';

if (loginFlag) {
	loginedMyRecord();
}else{
	unLoginMyRecord();
}