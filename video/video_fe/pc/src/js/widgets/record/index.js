import fetch from 'io/fetch.js';
import { loginFlag, page as CommonConfig, apiParams } from 'util/phpCommon';

var inParams = '?' + apiParams.inParams;
var outParams = '?' + apiParams.outParams;

class Record{
	constructor(opts = {}) {
		this.state = loginFlag ? 1 : 0; // 是否已登录
		this.page = opts.page || 1;
		this.size = opts.size || 12;
		this.cursor = ''; // 登录后根据cursor获取数据
		this._ls_key_ = 'gmv_local_record';

		// 因为旧的结构不能满足现有需求,清理之前旧key对应的数据,存到新的key中
		window.localStorage.removeItem('video-record');
	}

	getHistory(count){ // 获取最近5条观看历史
		var onError = function(){
			console.log('数据获取失败');
		};
		var that = this;
		if(this.state){
			return this.getFromServer(count, true).then(function(json){
				if(json && json.code == 200){
					var data = json.data || {};
					return data.list || [];
				} else {
					return [];
				}
			}, onError);
		} else {
			return this.getFromLocal(count, 1).then(function(json){
				if(json && json.code == 200){
					return that._mixinDuration(json.data);
				} else {
					return [];
				}
			}, onError);
		}
	}

	get(){
		var that = this;
		var onError = function(){
			console.log('数据获取失败');
		};
		if(this.state){
			return this.getFromServer().then(function(json, status){
				if(json && json.code == 200){
					var data = json.data;
					that.cursor = data.cursor;
					return data.list || [];
				} else {
					return [];
				}
			}, onError);
		} else {
			return this.getFromLocal().then(function(json){
				if(json && json.code == 200){
					that.page++;
					json.data.total = that.getFromStorage().length;
					return that._mixinDuration(json.data);
				} else {
					return [];
				}
			}, onError);
		}
	}

	getFromStorage() { // 从localstorage获取观看历史
		return JSON.parse(localStorage.getItem(this._ls_key_) || '[]');
	}

	getFromLocal(size, page) {
		size = size || this.size;
		page = page || this.page;

		var ret = this.getFromStorage().slice(size * (page - 1), size * page);
		if(ret.length){
			return fetch.get('v1/video/historyUnloginList' + outParams, {
				domain: 'domain-sault',
				data: {
					video_ids: ret.map(function(r){
						return r.id
					}).join(',')
				}
			});
		} else {
			return $.Deferred().resolve([]);
		}
	}
	getFromServer(size, nocursor) {
		var data = {
			userId: CommonConfig.userId,
			size: size || this.size
		};
		if(!nocursor){
			data.cursor = this.cursor;
		}
		return fetch.get('v1/video/historyList' + inParams, {
			domain: 'domain-sault',
			data: data
		});
	}

	push(id, opts) { // 把观看记录推送到服务器
		if(this.state){
			this.pushToServer(id).then(function(){});
		} else {
			this.pushToLocal(id);
		}
	}

	pushToServer(videoId) {
		return fetch.post('v1/video/historyPost' + inParams, {
			domain: 'domain-sault',
			data: {
				video_id: videoId
			}
		});
	}

	pushToLocal(id){
		id = parseInt(id, 10);
		var record = this.getFromStorage();
		var index = -1;
		var that = this;

		for(var i = 0, len = record.length; i < len; i++){
			if(record[i].id === id){
				index = i;
				break;
			}
		}

		var add = function(r){
			record.unshift(r);
			// 本地纪录 100 条
			let len = record.length;
			if (len >= 100) {
				record.splice(len - 1, 1);
			}
			that.setItem(record);
		};

		if (index === -1) {
			add({
				id: id,
				c: 0, // 当前观看时间
				d: (new Date().getTime()) / 1000 // 观看时间
			});
		} else { // 更新到最新
			var deleted = record[index];
			record.splice(index, 1);
			add(deleted);
		}
	}

	remove(id){
		if(!id){
			throw Error('content id is required!');
		}
		if(this.state){
			return this.removeFromServer(id);
		} else {
			return this.removeFromLocal(id);
		}
	}

	removeFromServer(id) {
		return fetch.get('v1/video/deleteHistory' + inParams, {
			domain: 'domain-sault',
			data: {
				id: id
			}
		});
	}

	removeFromLocal(id){
		var index = this._getIndexFromLS(id);
		var record = this.getFromStorage();
		if(index !== -1){
			record.splice(index, 1);
		}
		this.setItem(record);
		// localStorage.setItem('video-record', JSON.stringify(record));
		return $.Deferred().resolve({
			code: 200
		});
	}

	updateDuration(id, duration){
		if(this.state){
			fetch.post('/v1/history/update_duration' + inParams, {
				domain: 'domain-user',
				data: {
					video_id: id,
					duration: duration
				},
				async: false // 阻止页面关闭时,异步请求可能发送不成功
			});
		} else { // 更新 localstorage 中的观看时长
			var rets = this.getFromStorage();
			var index = this._getIndexFromLS(id);
			if(index !== -1){
				rets[index].c = duration;
				this.setItem(rets);
				// localStorage.setItem('video-record', JSON.stringify(rets));
			}
		}
	}

	transform() {
		// localStorage存的数组转换成 obj
		var list = this.getFromStorage();
		var ret = {};
		list.forEach(function(item){
    		ret[item.id] = {
    			id: item.id,
    			c: item.c,
    			d: item.d
    		}
    	});
    	return ret;
	}

	_mixinDuration(list){
		var ret = this.transform();
		list.forEach(function(item, i){
    		var times = ret[item.id] || {};
    		item.duration = parseInt(times.c, 10);
    		item.create_time = times.d;
    	});
    	return list;
	}

	_getIndexFromLS(id){
		var record = this.getFromStorage();
		var ids = record.map(function(item){
			return item.id;
		});
		return ids.indexOf(parseInt(id, 10));
	}

	setItem(item) {
		localStorage.setItem(this._ls_key_, JSON.stringify(item));
	}

}

var instance;
export default {
	getInstance: function(opts){
		if(!instance){
			instance = new Record(opts || {});
		}
		return instance;
	}
};
