/**
 *
 Created by zhangzhao on 2017/7/18.
 Email: zhangzhao@gomeplus.com
 */
import {page} from 'util/phpCommon';
import { indexRoutes } from 'router/navigation.jsx';

let maps = indexRoutes.map(v=>v.path);

export default function userAuth(history) {
    if (page.approve_status === "1") {
    	maps.splice(maps.indexOf('/portal/auth'),1);
    	let checkRouter = maps.some((v)=>{
    			return history.location.pathname.indexOf(v) >= 0;
    		});
        if (history.location.pathname === '/portal/auth') {
            history.replace('/portal/videoUploader');
            return false;
        }
        if (history.location.pathname === '/portal') {
            history.replace('/portal/videoUploader');
            return false;
        }
        if (!checkRouter) {
        	history.replace('/portal/videoUploader');
        }
    } else {
        history.replace('/portal/auth');
    }
}