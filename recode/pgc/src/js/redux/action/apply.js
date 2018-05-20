/**
 * [apply actions]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */

import * as constant from 'reduxs/constant/index';

export const apply = (data) => {
	return {
		type: constant.AUTH_APPLY,
		pageState: data.pageState
	}
}