/**
 * [小程序数据接口配置]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */

let host = {
    pre: 'https://h5-v-pre.gomeplus.com',
    pro: 'https://h5-v.gomeplus.com'
};

// 当前环境配置
let curEnv = 'pro';

let ctrUrl = host[curEnv] + '/api/video';
let API = {
    listUrl: ctrUrl + '/index',
    videoUrl: ctrUrl + '/detail',
    relatedVideosUrl: ctrUrl + '/related_video_list',
    commentsUrl: ctrUrl + '/get_comments',
    recommentUrl: ctrUrl + '/recomment',
    likeUrl: ctrUrl + '/like'
};

module.exports = {
    API
}