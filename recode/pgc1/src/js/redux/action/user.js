/**
 *
 Created by zhangzhao on 2017/7/18.
 Email: zhangzhao@gomeplus.com
 */
import user from 'api/user';

import * as constant from 'reduxs/constant/index';

const login = (formData) => {
    /*return dispatch => {
        user.login(formData).then(
            re => dispatch({
                type: constant.LOG_IN,
                re
            })
        );
    }*/
    dispatch({
        type: constant.LOG_IN,
        userData: {
            ...formData
        }
    })
};

export default {
    login
}