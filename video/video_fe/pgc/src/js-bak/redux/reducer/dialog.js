/**
 *
 Created by zhangzhao on 2017/8/2.
 Email: zhangzhao@gomeplus.com
 */
import initState from '../store/initState';

import * as constant from 'reduxs/constant/index';

const dialog = (state = initState.modal, action) => {
    switch (action.type) {
        case constant.DIALOG:
            return Object.assign({}, state.dialog, {
                dialog: {
                    visible: action.visible,
                    title: action.title,
                    onOk: action.onOk,
                    onCancel: action.onCancel
                }
            });
        case constant.CONFIRM:
            return Object.assign({}, state.confirm, {confirm: {
                visible: action.visible,
                title: action.title,
                msg: action.msg,
                onOk: action.onOk,
                onCancel: action.onCancel
            }});
        default:
            return state
    }
}
export default dialog;