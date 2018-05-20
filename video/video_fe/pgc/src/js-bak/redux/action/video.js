/**
 *
 Created by zhangzhao on 2017/7/20.
 Email: zhangzhao@gomeplus.com
 */
import * as constant from 'reduxs/constant/index';
import videoService from 'api/video';

export const queryVideoList = (formData) => {
    return dispatch => {
        videoService
            .list(formData)
            .then(
                re => dispatch({
                    type: constant.QUERY_VIDEO_LIST,
                    videoList: re
                })
            )
    }
};

export const deleteVideo = (formData) => {
    return {
            type: constant.DELETE_VIDEO,
            name: '我看'
    }
};
