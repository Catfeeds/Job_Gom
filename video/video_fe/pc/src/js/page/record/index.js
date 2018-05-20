/* css */
import 'css/page/record/index.scss';

import 'widgets/head/index.js';
import 'widgets/footer/index.js';

import React from 'react';
import ReactDom from 'react-dom';
import Records from 'components/react/Records.js';

import Record from 'widgets/record/index';
/* back to top */
import backTop from 'plugin/backTop.js';
import pubsub from 'io/pubsub';
import isToday from 'util/isToday';
// new backTop();

class RecordContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			today: [],
			before: [],
			status: '' // loading, done, fail, finished -> 没有更多数据, nodata 第一次请求回来就没有数据
		};

		this.list = [];
		this.videoRecord = Record.getInstance();
		var that = this;
		pubsub('del-record').sub(function(id, website_id){
			that.handleDel(id, website_id);
		});
	}

	parseList(list){
		var today = [];
		var before = [];
		list.forEach(function(item){
			if(isToday(new Date(item.create_time * 1000))){
				today.push(item);
			} else {
				before.push(item);
			}
		});
		return {
			today: today,
			before: before
		}
	}

	componentDidMount() {
		this.load(true);
	}

	load(isFirst) {
		var that = this;
		this.setState({
			status: 'loading'
		}, function(){
			var status;
			this.videoRecord.get().then(function(list){
				var status = 'done';
				if(!list.length){
					if(isFirst){
						status = 'nodata';
					} else {
						status = 'finished';
					}
				}
				var state = that.state;
				var ret = that.parseList(list);
				that.setState({
					before: state.before.concat(ret.before),
					today: state.today.concat(ret.today),
					status: status
				});
			}).catch(function(error){
				that.setState({
					status: 'fail'
				});
			});
		});
	}
	handleClick = (e) => {
		e.preventDefault();
		var status = this.state.status;
		if(status !== 'finished' && status !== 'loading'){
			this.load();
		}
	}
	handleDel = (id, website_id) => {
		var today = this.state.today;
		var before = this.state.before;
		var i = 0;
		var len = 0;

		for(len = today.length; i < len; i++){
			if(today[i].id === id){
				today.splice(i, 1);
				break;
			}
		}
		for(i = 0, len = before.length; i < len; i++){
			if(before[i].id === id){
				before.splice(i, 1);
				break;
			}
		}
		this.setState({
			today: today,
			before: before
		}, function(){
			this.videoRecord.remove(website_id);
		});

	}
	_getText() {
		var text = '点击加载更多';
		var status = this.state.status;
		if(status === 'loading'){
			text = '加载中...';
		} else if(status === 'finished'){
			text = '没有更多数据了';
		}
		return text;
	}
	render() {
		var state = this.state;
		var before = state.before;
		var today = state.today;

		var records = null;
		var title = null;
		var load = null;
		var indicator = null;

		var t = null;
		var b = null;
		var canLoad = false;
		if(today.length){
			canLoad = true;
			t = (
				<div>
					<h1 className="title">今天</h1>
					<Records list={today} onDel={this.handleDel} />
				</div>
			);
		}

		if(before.length){
			canLoad = true;
			b = (
				<div>
					<h1 className="title">更早</h1>
					<Records list={before} onDel={this.handleDel} />
				</div>
			);
		}

		if(canLoad){
			load = (
				<div className="exchange">
					<a href="#" onClick={this.handleClick}>{this._getText()}</a>
				</div>
			);
		}

		if(this.state.status === 'nodata'){
			indicator = <div className="no-data record"><p>你还没有观看记录</p></div>;
		}
		return (
			<div>
				{indicator}
				{t}
				{b}
				{load}
			</div>
		);
	}
}

ReactDom.render( <RecordContainer /> ,
	document.getElementById('record-container')
);

