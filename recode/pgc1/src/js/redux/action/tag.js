/**
 * [gome editor]
 * @Author: Akesure
 * @Email:  xuyang-ds@gomeplus.com
 */
import * as constant from 'reduxs/constant/index';

export const publicTag = (tags) => {
	return {
		type: constant.PUBLIC_TAG,
		countModuleTags: tags
	}
}

export const publicTop = (top) => {
	return {
		type: constant.PUBLIC_TOP,
		countTop: top
	}
}
