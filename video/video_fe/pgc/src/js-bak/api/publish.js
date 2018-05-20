/**
 * [图文请求]
 * @Author: Akesure
 * @Email:  xuyang-ds@gomeplus.com
 */

import fetch from 'io/fetch';
const CREATE_TAG = '/article/createTags';
const PUBLISH_ARTICLE = '/article/add';

class PublishService {
    createTag(tagstr) {
      return fetch.post(CREATE_TAG, {
        ...tagstr
      });
    }

    add(textstr) {
        return fetch.post(PUBLISH_ARTICLE, {
          ...textstr
        });
    }
}

export default new PublishService();
