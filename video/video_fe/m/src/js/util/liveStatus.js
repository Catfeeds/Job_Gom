/**
 * [直播状态]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
export default function(status) {
	let names = {
		1: '<i class="live"></i>直播',
		2:'未开始',
		3:'回看'
	};
	return names[status];
}