import React from 'react';
import ReactDom from 'react-dom';
import pubsub from 'io/pubsub';
import isToday from 'util/isToday';

import RecordService from '../record/index';


var videoRecord = RecordService.getInstance();

class RecordItem extends React.Component{
	constructor(props){
		super(props);
		this.pubsub = pubsub('del-record');
	}
	handleDel = (e) => {
		e.preventDefault();

		var that = this;
		var data = this.props.data;

		var id = data.id;
		var website_id = data.website_id;
		videoRecord.remove(website_id || id).done(function(json){
			if(json && json.code == 200){
				that.props.onDel(id);
				that.pubsub.pub(id, data.website_id);
			} else {
				// console.log('删除失败'); toast 提示
			}
		}).always(function(){
			// curLi.attr('firing', false);
		});
	}
	render(){
		var item = this.props.data;
		var id = item.id;
		var ahref = 'sv'.charAt(item.video_type);

		var progressBar = null;
		if(item.video_type == 1){ // 0 直播 , 1 点播
			// 播放器获取到的当前播放时长存在误差
			var totalTime = Math.floor(item.length / 1000) * 1000;
			var progress = (1 - (item.duration * 1000 / totalTime)) * 100;
			// 播放器的获取当前播放时长的接口存在bug,返回的长度可能会大于视频总长度
			if(progress === 0 || item.duration * 1000 >= totalTime){
				progress = '已看完';
			} else {
				progress = Math.floor(progress);
				if(progress !== 100){
					progress += 1;
				}
				progress = '剩余' + progress + '%';
			}
			progressBar = <span className="progress">{progress}</span>
		} else { // 直播 live_status	String	1(直播)2(预约)3(回看)4(点播)
			var text = '';
			var live_status = item.live_status;
			if(live_status == 1){
				text = '正在直播';
			} else if(live_status == 2){
				text = '即将直播';
			} else if(live_status == 3){
				text = '直播回看';
			} else if(live_status == 4){
				text = '已结束';
			}
			progressBar = <span className="progress">{text}</span>
		}
		
		return (
			<li key={id}>
                <a className="title" target="_blank" href={'/' + ahref + '/' + id + '.html'}>{item.title}</a>
                {progressBar}
                <em title="删除" className="del icon-13" data-id={id} onClick={this.handleDel}></em>
            </li>
		);
	}
}

class RecordList extends React.Component{
	constructor(props){
		super(props);
		// 删除一条记录后,补充新的观看记录
		// 新发送的请求失败时,需要处理
		this.state = {
			today: [],
			before: [],
			status: 'loading' // loading, fail, done, add
		};
	}

	handleDel = (id) => {
		if(!this.state.status !== 'add'){
			this.loadRecord('add');
		}
	}

	loadRecord(status) {
		var that = this;

		var parseList = function(list){
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
	    };

		this.setState({
			status: status || 'loading'
		}, function(){
			videoRecord.getHistory(5).then(function(list){
				var ret = parseList(list);
				// var state = that.state;

				// var today = state.today;
				// var before = state.before;
				that.setState({
					today: ret.today,
					before: ret.before,
					status: 'done'
				});
			}).catch(function(e){
				this.setState({
					status: 'fail'
				});
			});
		});
	}

	componentDidMount(){
		this.loadRecord();
	}

	renderItems(list) {
		var that = this;
		return list.map(function(item){
			var video_info = item.video_info;
			if(video_info){
				item.id = video_info.id;
				item.title = video_info.title;
				item.length = video_info.length;
				item.video_type = video_info.video_type; // 0 直播 1 点播
				item.live_status = video_info.live_status; // 直播状态
			}
			return <RecordItem data={item} onDel={that.handleDel} key={item.id} />;
		});
	}

	render(){
		var that = this;
		var state = this.state;
		var status = state.status;
		// 今天
		var today = state.today;
		var todayLen = today.length;
		var todayTitle = null;
		var todayItems = null;
		// 更早
		var before = state.before;
		var beforeLen = before.length;
		var beforeTitle = null;
		var beforeItems = null;
		
		var more = null;
		var indicator = null;
		
		if(status === 'loading'){
			indicator = <div className="empty">正在加载...</div>;
		} else if(status === 'fail'){
			indicator = <div className="empty">加载失败,请重试</div>;
		} else {
			if(todayLen){
				todayItems = this.renderItems(today);
				todayTitle = <h3>今天</h3>;
			}
			if(todayLen < 5 && beforeLen){ // 如果今天的观看记录小于5条且有更早的观看记录
				beforeItems = this.renderItems(before);
				beforeTitle = <h3>更早</h3>;
			}
			if(!todayLen && !beforeLen){
				indicator = (<div className="empty">暂时还没有观看记录哦～</div>);
			} else {
				more = <a className="more-record" target="_blank" href="/u/history.html">查看更多</a>;
			}
		}

		return (
			<div className="record-card-list">
				{indicator}
				{todayTitle}
				<ul>{todayItems}</ul>
				{beforeTitle}
				<ul>{beforeItems}</ul>
				{more}
            </div>
		);
	}
}

class Record extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div className="record-card">
                <em className="arrow"></em>
                <RecordList />
            </div>
		);
	}
}

var init = function(){
	var $header = $('.header'); // [data-node=header]
	var $record = $header.find('[data-node=record]');
	var container = $record.children()[1];

	$record.on('mouseenter', function(){
		ReactDom.render(<Record />, container);
		return false;
	});
	$record.on('mouseleave', function(){
		ReactDom.unmountComponentAtNode(container);
		return false;
	});
};

init();
