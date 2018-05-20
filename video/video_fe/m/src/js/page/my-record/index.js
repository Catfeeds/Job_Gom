/* css */
import 'css/page/my-record/index.scss';
/* fastclick */
import 'fastclick.js';
import { loginFlag, page } from 'util/phpCommon.js';

import loginRecord from './loginRecord.js';
import unloginRecord from './unloginRecord.js';
import historyBack from 'util/historyback';

historyBack();

if (loginFlag) {
	loginRecord();
}else{
	unloginRecord();
}