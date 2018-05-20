/**
 *
 Created by zhangzhao on 2017/7/20.
 Email: zhangzhao@gomeplus.com
 */
import initState from '../store/initState';

import * as constant from 'reduxs/constant/index';

const videoInfo = (state = initState.videoData, action) => {
    switch (action.type) {
        case constant.QUERY_VIDEO_LIST:
            return [...state];
        default:
            return state
    }
}
export default videoInfo;