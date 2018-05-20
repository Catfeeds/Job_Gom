/**
 * [toast]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 * 使用方法：
 * 普通函数调用，参数为string或者object
 * toast('提示内容');
 * toast({
 * 		content:'提示内容',    // 必填
 * 		closable: false,      // 可选，默认false，是否显示关闭按钮。
 * 		onClose: ()=>{},      // 可选，toast框关闭时执行的方法
 * 		duration: 1.5,		  // 可选，几秒后消失，默认1.5秒,为null则一直显示
 * 		style:{}              // 可选，toast提示框内容器样式。
 * 		key: 'toastid'		  // 可选，设置此值后，页面上相同key的toast只显示一个，第一个消失后第二个才可以显示。
 * })
 */
import Notification from 'rc-notification';
import 'css/components/notification.scss';

let noop = function(){};
let notification = null;
let defaultPorps = {
	style:{
		top:'45%',
		left:'50%',
		transform:'translate(-50%,-50%)'
	}
}
Notification.newInstance(defaultPorps, (n) => notification = n);

const toast = (props)=>{
	let options = {
		content: '',
		closable: false,
		onClose: noop,
		duration:1.5,
		style: {},
		key: 'rc-toastKey'
	}
	if(typeof props === 'string'){
		props = {content: props}
	}
	Object.assign(options, props);
	notification.notice(options);
}

export default toast;