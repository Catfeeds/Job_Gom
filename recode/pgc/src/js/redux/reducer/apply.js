/**
 * [apply]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import * as constant from 'reduxs/constant/index';

let defaults = {
	pageState: -1,
	applyStatus: 0
}
const apply = (state = defaults, action) => {
    switch (action.type) {
        case constant.AUTH_APPLY:
            return Object.assign({}, state, {
                pageState: action.pageState
            });
        default:
            return state
    }
}
export default apply;