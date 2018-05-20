/**
 * 聚合所有的reducer
 * TODO: 命名规范
 *
 */
import {combineReducers} from 'redux';

import userData from './user';
import videoData from './video';
import modal from './dialog';
import loadingBox from './loading_box';
import apply from './apply';
// 视频上传reducer
import videoUploader from './video_uploader';
// 编辑器
import publish from './tag'

export default combineReducers({
    userData,
    videoData,
    modal,
    loadingBox,
    apply,
    videoUploader,
    publish
})
