/**
 * 聚合所有的reducer
 * TODO: 命名规范
 *
 */
import {combineReducers} from 'redux';
// 视频上传reducer
import videoUploader from './video_uploader';
// 编辑器

export default combineReducers({
    videoUploader
})
