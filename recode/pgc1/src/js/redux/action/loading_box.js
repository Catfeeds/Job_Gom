/**
 * [loading box]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import * as constant from 'reduxs/constant/index';

export const loadingBox = (isShow) => {
	return {
		type: constant.LOADING_BOX,
		showLoading: isShow
	}
}