/**
 * [图文请求]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */

import fetch from 'io/fetch';
const ARTICLE_LIST = '/article/list';
const ARTICLE_DELETE = '/article/delete';
const ARTICLE_DETAIL = '/article/detail';
const ARTICLE_LIST_SUBSCRIBERS = '/article/needAddArticleSubscribeList';
const ARTICLE_ADDORUPATE_SUBSCRIBERS = '/article/createSubscribeArticleRelation';
const ARTICLE_UPATE_ARTICLE = '/article/modify';

class ArticleService {
    list(formData) {
        return fetch.get(ARTICLE_LIST, {
            params: formData,
            loading: true
        });
    }
    delete(id) {
        return fetch.get(ARTICLE_DELETE, {
            params:{
                article_id: id
            }
        });
    }
    add(formData) {
        return fetch.post(ARTICLE_ADDORUPATE_SUBSCRIBERS, {
            ...formData
        },{loading: true});
    }
    detail(id) {
        return fetch.post(ARTICLE_DETAIL, {
            article_id:id
        },{loading: true});
    }
    update(formData){
        return fetch.post(ARTICLE_UPATE_ARTICLE, {
            ...formData
        },{loading: true});
    }
    listSubscribers(article_id) {
        return fetch.get(ARTICLE_LIST_SUBSCRIBERS, {
            params: {
                article_id,
                loading: true
            }
        });
    }
}

export default new ArticleService();