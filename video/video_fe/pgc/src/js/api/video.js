/**
 *
 Created by zhangzhao on 2017/8/1.
 Email: zhangzhao@gomeplus.com
 */
import fetch from 'io/fetch';
const VIDEO_LIST = '/video/list';
const VIDEO_DELETE = '/video/delete';
const VIDEO_VIEW = '/video/view';
const VIDEO_LIST_SUBSCRIBERS = '/subscribe/needAddVideoSubscribeList';
const VIDEO_ADDORUPATE_SUBSCRIBERS = '/subscribe/createSubscribeVideoRelation';
const VIDEO_UPATE_VIDEO = '/video/edit';

class VideoService {
    list(formData) {
        return fetch.get(VIDEO_LIST, {
            params: formData,
            loading: true
        });
    }
    delete(id) {
        return fetch.post(VIDEO_DELETE, {
            id
        });
    }
    add(formData) {
        return fetch.post(VIDEO_ADDORUPATE_SUBSCRIBERS, {
            ...formData,
            loading: true
        });
    }
    view(content_id) {
        return fetch.get(VIDEO_VIEW, {
            params: {
                content_id
            },
            loading: true
        });
    }
    update(formData){
        return fetch.post(VIDEO_UPATE_VIDEO, {
            ...formData,
            loading: true
        });
    }
    listSubscribers(video_id) {
        return fetch.get(VIDEO_LIST_SUBSCRIBERS, {
            params: {
                video_id,
                loading: true
            }
        });
    }
}

export default new VideoService();