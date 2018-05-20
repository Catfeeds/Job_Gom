/**
 * [点击交互基类]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */

import toast from 'components/toast.js';
import fetch from 'io/fetch.js';
import EventBus from 'util/event-bus.js';
import formatNumber from 'util/formatNumber.js';
import {login} from 'common/commonLogin.js';
import { loginFlag, page, apiParams} from 'util/phpCommon.js';

var inParams = '?' + apiParams.inParams;
var noop = function() {};
var afterFail = function(data){
	toast(data.res.message);
};
var cache = {};

class Base extends EventBus {
	constructor(opts = {}) {
		super();
		this.api = opts.api + inParams;
		this.selector = opts.selector;
		this.action = opts.action;
		this.delegate = opts.delegate || 'body';

		this.beforeRequest = opts.beforeRequest || noop;
		this.afterRequest = opts.afterRequest || noop;

		this.afterDoSuccess = opts.afterDoSuccess || null;
		this.afterUndoSuccess = opts.afterUndoSuccess || null;
		this.afterDoFail = opts.afterDoFail || afterFail;
		this.afterUndoFail = opts.afterUndoFail || afterFail;
		
		this.formatNumber = formatNumber;
		this.localStorageKey = 'gmv_pc_action';

		this._bindEvent();
		this._init();
		this._checkBeforeLogin();
	}

	_defaultDoSuccess(){}
	_defaultUndoSuccess(){}
	
	_bindEvent() {
		var _this = this;

		// 执行成功
		this.on('doSuccess', function(data) {
			if (typeof _this.afterDoSuccess === 'function') {
				_this.afterDoSuccess(data);
			}else{
				_this._defaultDoSuccess(data);
			}
		});

		// 执行失败
		this.on('doFail',function(data){
			_this.afterDoFail(data);
		});

		// 取消成功
		this.on('undoSuccess', function(data) {
			if (typeof _this.afterUndoSuccess === 'function') {
				_this.afterUndoSuccess(data);
			}else{
				_this._defaultUndoSuccess(data);
			}
		});

		// 取消失败
		this.on('undoFail',function(data){
			_this.afterUndoFail(data);
		});
	}

	_init() {
		var _this = this;
		var action = this.action;

		$(this.delegate).on('click', this.selector, doEvent);

		function doEvent(e) {
			var $this = $(this);
			var id = $this.data(action + 'id'); // action + 'id' => data-likeid
			var status = $this.data('status'); // 状态
			switch (status){
				case 'true':
					status = 1;
					break;
				case 'false':
					status = 0;
					break;
				default:
					status = status^0;
			}

			var key = action + id;
			if (cache[key] == 1) {
				return false;
			}

			if (!loginFlag) {
				localStorage.setItem(_this.localStorageKey, JSON.stringify({ action: action, id: id, status:status}));
				login();
				return false;
			}
			cache[key] = 1;
			// _this.emit(_this.action, {id:id, status:status});
			_this.request(_this.getReqData({id:id, status:status}));
			return false;
		}
	}

	_checkBeforeLogin() {
		var _this = this;
		var interactiveInfo = localStorage.getItem(this.localStorageKey);
		var data = null;
		var IA = null;

		if (loginFlag && interactiveInfo) {
			IA = JSON.parse(interactiveInfo);
			if (IA.action == this.action) {
				data = {
					id: IA.id,
					status: IA.status
				};
				// this.emit(IA.action, data);
				_this.request(_this.getReqData(data));
			}
		}
		localStorage.removeItem(this.localStorageKey);
	}

	getReqData(data){
		var type = data.status ^ 1;
		return {
			id: data.id,
			actionType: type,
			formData:{
				id: data.id,
				type: type
			}
		};
	}

	request(opts) {
		var _this = this;
		var action = _this.action;
		var id = opts.id;
		var actionType = opts.actionType;

		if (_this.beforeRequest(opts) === false) {
			return false;
		}

		fetch.post(this.api, {
			domain:'domain-user',
			data: opts.formData,
			success: function(data) {
				var el = `[data-${_this.action}id="${id}"]`;
				var $el = $(el);
				var code = data.code;
				var info = {id:id,res:data,$el:$el,$delegate:$(_this.delegate)};
				var done = ['undoSuccess','doSuccess'];
				var fail = ['undoFail','doFail'];
				var successCode = [200,400008];
				

				// 登录过期
				if (code == 200001) {
					localStorage.setItem(_this.localStorageKey, JSON.stringify({ action: action, id: id, status:actionType^1}));
					location.href = page.loginUrl;
					return false;
				}
				if (successCode.indexOf(code) != -1) {
					_this.emit(done[actionType], info);
				} else {
					_this.emit(fail[actionType], info);
				}
			},
			error: function() {
				toast('网络请求失败，请稍后重试');
			},
			complete: function() {
				delete cache[action + id];
				_this.afterRequest(opts);
			}
		});
	}
}

export default Base;
