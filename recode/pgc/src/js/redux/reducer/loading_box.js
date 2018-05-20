/**
 * [loading box]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */

import * as constant from 'reduxs/constant/index';

const loadingBox = (state = {showLoading: false}, action) => {
    switch (action.type) {
        case constant.LOADING_BOX:
            return Object.assign({}, state, {
                showLoading: action.showLoading
            });
        default:
            return state
    }
}
export default loadingBox;