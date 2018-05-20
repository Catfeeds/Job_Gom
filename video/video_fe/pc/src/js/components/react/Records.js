import React from 'react';
import msToDuration from 'util/msToDuration.js';
import overflowStr from  'util/overflowStr';
import format from 'util/formatDate';

var domainData = $CONFIG['domain-data'];

function formatMsToDuration(obj) {
    let result = '';
    if (obj.day !== '00') {
        return `${obj.day}:${obj.hour}:${obj.min}:${obj.sec}`;
    } else if (obj.hour !== '00') {
        return `${obj.hour}:${obj.min}:${obj.sec}`;
    } else {
        return `${obj.min}:${obj.sec}`;
    }
}

class RecordCard extends React.Component {
	constructor(props){
		super(props);
	}
	formatDate(duration) {
		return formatMsToDuration(msToDuration(duration));
	}
	handelDel = (e) => {
		e.preventDefault();
		var data = this.props.data;
		this.props.onDel(data.id, data.website_id);
	}
	render() {
		var record = this.props.data || {};
		var href = '/v/' + record.id + '.html';
		var progress = null;
		var time = null; // 视频时长,点播时才显示
		var duration = null;
		var watchTime = null;
		if(record.video_type == 1){ // 0 直播, 1 点播
			watchTime = record.duration * 1000 > record.length ? record.length : record.duration * 1000;
			progress = (
				<div className="progress">
					<p style={{width: (record.duration / Math.floor(record.length / 1000)) * 100 + '%'}}></p>
				</div>
			)
			time = <span className="time">{this.formatDate(record.length)}</span>
			duration = (
				<div className="list-time">
					<em className="icon-29"></em>
					<span>观看至{this.formatDate(watchTime)}</span>
				</div>
			)
		} else {
			href = '/s/' + record.id + '.html';
			if(record.start_time){
				duration = (
					<div className="list-time">
						<span>开始时间 {format(record.start_time * 1000, 'yyyy-MM-dd hh:mm')}</span>
					</div>
				)
			}
		}
		return (
			<li ref="item">
				<div className="img">
					<a href={href} target="_blank">
						<img src={record.image} />
						<em className="icon-13" onClick={this.handelDel}></em>
						{time}
						{record.online != 2 ? <span className="offline">已下线</span> : null}
						{progress}
					</a>
				</div>
				<a href={href} className="list-title" target="_blank">{overflowStr(record.title,35)}</a>
				{duration}
			</li>
		);
	}
}

class Record extends React.Component {
	constructor(props){
		super(props);
	}
	handleDel = (id, website_id) => {
		this.props.onDel(id, website_id);
	}
	render() {
		var list = this.props.list;
		var records = list.map((item) => {
			var video_info = item.video_info;
			if(video_info){
				item.image = video_info.image;
				item.length = video_info.length;
				item.title = video_info.title;
				item.id = video_info.id;
				item.status = video_info.status;
				item.online = video_info.online;
				item.video_type = video_info.video_type;
				item.start_time = video_info.start_time;
			}
			return (<RecordCard data={item} key={item.id} onDel={this.handleDel} />);
		});
		return (
			<ul className="clearfix list-card">
				{records}
			</ul>
		);
	}
}

export default Record;

