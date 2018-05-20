/* css */
import 'css/page/demo/index.scss';
/* fastclick */
import 'fastclick.js';

/*import toast from 'components/toast.js';

import Like from 'components/action/like.js';
import Collect from 'components/action/collect.js';
import Subscribe from 'components/action/subscribe.js';

console.log('done');

document.getElementById('root').innerHTML = navigator.userAgent;

toast({
	msg: '天啦噜'
});*/

// 页面点赞节点上需要添加data属性
// data-action="like" data-likeid="100" data-status="0"
// 如果有数量展示，在数量子节点上添加data-node="count"自定义属性。
// // 方法不给，则用默认的。
/*new Like({
	api:'/',    // 接口地址，组件有默认的，可不传
	delegate:'body',   // 事件委托的节点。传了就委托，不传就不委托。
	selector: '[data-action=like]',  // 点赞，收藏等具体的按钮节点，有默认值，可不传。
	beforeRequest: function(data){   // 发送请求前的操作，return false会阻止发送请求。
		if (data.status === 1) {     // 参数data包含了id和status。
			return false;            // 
		}
	},
	afterDoSuccess: function(data){  // 点赞成功后的回调操作，data包含了id,$el和接口返回的数据res
		console.log(data);       // 回调里根据各自实际业务情况做处理，此回调覆盖默认操作。
	},
	afterUndoSuccess:function(data){  // 取消点赞成功后的回调操作，data包含id,$el和接口返回数据res
		console.log(data);       // 回调里根据各自实际业务情况做处理，此回调覆盖默认操作。
	},
	afterDoFail:function(data){
		// 操作失败的回调。data = {id,$el,res},设置此回调会覆盖默认的toast提示操作。
	},
	afterUndoFail:function(data){
		// 操作失败的回调。data = {id,$el,res},设置此回调会覆盖默认的toast提示操作。
	}
});

// 页面点赞节点上需要添加data属性
// data-action="collect" data-collectid="100" data-status="0"
// // 如果有数量展示，在数量子节点上添加data-node="count"自定义属性。
// // 方法不给，则用默认的。
new Collect({
	// api:'/',
	// delegate:'body',
	selector: '[data-action=collect]',
	beforeRequest: function(data){   // 发送请求前的操作，return false会阻止发送请求。
		if (data.status === 1) {     // 参数data包含了id和status。
			return false;
		}
	},
	afterDoSuccess: function(data){  // 收藏成功后的回调操作，data包含了id,$el和接口返回的数据res
		console.log(data);       // 回调里根据各自实际业务情况做处理，此回调覆盖默认的操作。
	},
	afterUndoSuccess:function(data){  // 取消收藏成功后的回调操作，data包含id,$el和接口返回数据res
		console.log(data);       // 回调里根据各自实际业务情况做处理，此回调覆盖默认的操作。
	},
	afterDoFail:function(data){
		// 操作失败的回调。data = {id,$el,res},设置此回调会覆盖默认的toast提示操作。
	},
	afterUndoFail:function(data){
		// 操作失败的回调。data = {id,$el,res},设置此回调会覆盖默认的toast提示操作。
	}
});*/

// 页面点赞节点上需要添加data属性
// data-action="subscribe" data-subscribeid="100" data-status="0"
// // 如果有数量展示，在数量子节点上添加data-node="count"自定义属性。
// 方法不给，则用默认的。
/*new Subscribe({
	// api:'/',
	delegate:'body',
	// selector: '[data-action=subscribe]',
	beforeRequest: function(data){   // 发送请求前的操作，return false会阻止发送请求。
		if (data.status === 1) {     // 参数data包含了id和status。
			return false;
		}
	},
	afterDoSuccess: function(data){  // 订阅成功后的回调操作，data包含了id,$el和接口返回的数据res
		console.log(data);       // 回调里根据各自实际业务情况做处理，此回调覆盖默认的操作。
	},
	afterUndoSuccess:function(data){  // 取消订阅成功后的回调操作，data包含id,$el和接口返回数据res
		console.log(data);       // 回调里根据各自实际业务情况做处理，此回调覆盖默认的操作。
	},
	afterDoFail:function(data){
		// 操作失败的回调。data = {id,$el,res},设置此回调会覆盖默认的toast提示操作。
	},
	afterUndoFail:function(data){
		// 操作失败的回调。data = {id,$el,res},设置此回调会覆盖默认的toast提示操作。
	}
});*/


/*var send = function(){
	return new Promise(function(resolve, reject){
		setTimeout(function(){
			resolve('done');
		}, 1000);
	});
};*/
/**
 *  property: 
 *  	url
 *   	params
 * 
 *  method: do
 
class Req {
	constructor(opts){
		this.url = opts.url || '';
		this.state = opts.state || 0;
		this.callbacks = {
			before: opts.before || function(){},
			done: opts.done || function(){}
		};
	}
	do(){
		var that = this;
		var callbacks = this.callbacks;
		var before = callbacks.before;
		if(before() === false){
			return;
		}
		send().then(function(msg){
			callbacks.done();
		});
	}

}
*/

class Test{
	constructor(){
		this.$t = $('body').find('[data-node="txts"]');
		// this.init();
	}
	init(){
		this.$t.on({
			'focus': ()=>{
				console.log('focus');
			},
			'input':()=>{
				console.log(this);
				console.log($(this));
			},
			'blur':()=>{
				console.log('blur');
			}
		});
	}

}

let ts = new Test();

ts.init();