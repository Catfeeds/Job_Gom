/* css */
import 'css/page/searchnodata/index.scss';

/* header and footer */
import 'widgets/head/index.js';
import 'widgets/footer/index.js';
import GMP from 'GMP';
import 'util/GMPHelper';
import fetch from 'io/fetch';
import {items} from './itemTpl';
import {guesslikeTpl} from './guessLikeTpl';
import toast from 'components/toast';
import {page, apiParams} from 'util/phpCommon';
new GMP({
    el: '[data-id=guesslike-wrap]',
    events: {
        'click [data-id=exchange-btn]': 'exchangeHandler'
    },
    data: {
        page: 1,
        pageSize: 8,
        nomore: false
    },
    exchangeHandler(e) {
        let that = this;
        if (this.data.nomore) {
            toast('没有更多数据');
            return;
        }
        fetch.get('/v1/recommendlike/rank_list' + "?" + apiParams.outParams, {
            domain: 'domain-user',
            data: {
                size: this.data.pageSize
            },
            success: function (data) {
                if (data.code != 200) {
                    toast(data.message);
                    return false;
                }
                let likeData = data.data;
                if (likeData.multipleImageText && likeData.multipleImageText.length > 0) {
                    let itemsHtml = GMP.template(items)(likeData);
                    $('[data-id=search-guesslike-container]').html(itemsHtml);
                    that.data.nomore = false;
                    if (!(typeof e === 'boolean')) {
                        $('body').scrollTop(that.guesstitletop);
                    }
                } else {
                    that.data.nomore = true;
                    toast('没有更多数据');
                }
            },
            error: function (e) {
                toast('请求异常，请稍后再试');
            }
        })
    },
    init() {
        this.$el.html(guesslikeTpl);
        this.guesstitletop = $('#guesslike-title').offset().top - 120;
        this.exchangeHandler(true);
    }
});

