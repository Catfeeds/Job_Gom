/**
 *
 Created by zhangzhao on 2017/8/2.
 Email: zhangzhao@gomeplus.com
 */
import * as constant from 'reduxs/constant/index';

const modalInfo = (args)=> {
    return {
        visible: args.visible,
        title: args.title,
        onOk: args.onOk,
        onCancel: args.onCancel,
        msg: args.msg
    }
};

export const dialog = (args) => {
    return {
        type: constant.DIALOG,
        ...modalInfo(args)
    }
};

export const confirm = (args) => {
    return {
        type: constant.CONFIRM,
        ...modalInfo(args)
    }
};

