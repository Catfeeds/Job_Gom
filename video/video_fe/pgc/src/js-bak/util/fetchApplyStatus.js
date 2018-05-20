/**
 *
 Created by zhangzhao on 2017/8/15.
 Email: zhangzhao@gomeplus.com
 */
import {page} from 'util/phpCommon';
import fetch from 'io/fetch';
// 只要审核不通过都需要请求，
// "" 为没有审核状态，-1审核失败，0 待审核，1审核通过

let delay = 5 * 60 * 1000;
if (page.approve_status === "0" || page.approve_status === "-1") {
    window.fetchTimer = setInterval(() => {
        fetch.get('/apply/getApplyResult').then(ret=>{
            page.approve_status = ret.data.data.approve_status ?
                ret.data.data.approve_status : page.approve_status;
            if (page.approve_status === "1") {
                window.location.reload();
                clearInterval(window.fetchTimer);
            }
        });
    }, delay);
}