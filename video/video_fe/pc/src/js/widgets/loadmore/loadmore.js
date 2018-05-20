/**
 *
 Created by zhangzhao on 2017/5/5.
 Email: zhangzhao@gomeplus.com

 点击加载更多
 */
import GMP from 'GMP';
import fetch from 'io/fetch';
import {loginFlag, page, apiParams} from 'util/phpCommon';
import {items} from './itemTpl';
import toast from 'components/toast';
import GetQueryString from 'util/getParamFromUrl';

function preInit(options = {}, config = {}) {
    let d = {
        'click [data-id=loadMore]': 'loadMore'
    };

    if (!options.events) {
        options.events = d;
    } else {
        GMP.Util.defaults(options.events, d);
    }

    if (!options.data) {
        options.data = config;
    } else {
        GMP.Util.defaults(options.data, config);
    }
}
export default class LoadMore extends GMP.BaseClass {
    constructor(options) {
        preInit(options, {
            url: '',
            page: 1,
            pageSize: 12,
            nodata: false
        });
        super(options);
        this.trigger('_on_after', options);
    }
    _create() {
        this.$loadMore = this.$el.find('[data-id=loadMore]');
    }
    loadMore(e) {
        if (this.data.nodata) {
            return;
        }
        this.data.page = this.data.page + 1;
        let that = this;
        fetch.get(this.data.url, {
            domain: 'domain-data',
            data: {
                keyword: GetQueryString('keyword'),
                page: this.data.page,
                num: this.data.pageSize
            },
            success: function (data) {
                if (data.code != 0) {
                    toast(data.message);
                    return false;
                }
                let pubData = data.data;
                if (pubData.publisher.length > 0) {
                    let itemsHtml = GMP.template(items)(pubData);
                    $('[data-id=loadmore-container]').append(itemsHtml);
                    that.data.nodata = false;
                } else {
                    that.data.nodata = true;
                    that.$loadMore.html('没有更多数据');
                }
            },
            error: function (e) {
                toast('请求异常，请稍后再试');
            }
        });
    }
}