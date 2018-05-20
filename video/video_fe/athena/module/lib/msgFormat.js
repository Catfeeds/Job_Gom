/**
 *
 Created by zhangzhao on 2017/5/24.
 Email: zhangzhao@gomeplus.com
 */
export default function (msg, options = {}) {
    return {
        msg: msg,
        code: options.code || 200,
        data: options.data || {}
    }
}