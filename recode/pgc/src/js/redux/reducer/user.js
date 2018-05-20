/**
 *
 Created by zhangzhao on 2017/7/18.
 Email: zhangzhao@gomeplus.com
 */
import initState from '../store/initState';

import * as constant from 'reduxs/constant/index';

const userInfo = (state = initState.userData, action) => {
    switch (action.type) {
        case constant.LOG_IN:
            return Object.assign({}, state, {
                userData: action.userData
            });
        default:
            return state
    }
}
export default userInfo;