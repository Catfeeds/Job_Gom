/**
 * [转换成缩略图地址]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
export default (url)=>{
	let index = url.lastIndexOf('.');
	let thumbnail = url.substring(0,index) + '-dh300' + url.substring(index);
	return thumbnail;
}