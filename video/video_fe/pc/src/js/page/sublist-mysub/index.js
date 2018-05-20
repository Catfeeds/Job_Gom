/* css */
import 'css/page/sublist-mysub/index.scss';
import fetch from 'io/fetch';
import React from 'react';
/* header and footer */
import 'widgets/head/index.js';
import 'widgets/footer/index.js';
import ReactDom from 'react-dom';
import formatMsToDuration from 'util/formatMsToDuration.js';
import formatDate from 'util/formatDate.js';
import { loginFlag, page as CommonConfig, apiParams } from 'util/phpCommon';
import backTop from 'plugin/backTop.js';
import overflowStr from  'util/overflowStr';

var inParams = '?' + apiParams.inParams;

class Subscriber extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		var data = this.props.data;
		var href = '/sub/' + data.id + '.html';
		return (
			<div className="subscriber clearfix">
				<div className="user clearfix">
					<div className="avatar fl">
						<a href={href} target="_blank">
							<img src={data.icon} />
						</a>
					</div>
					<div className="fl">
						<div className="name"><a href={href} target="_blank">{data.name}</a></div>
						<div className="desc" title={data.summary.substring}>{data.summary.substring(0, 28)}</div>
						<div className="fans">粉丝:<span>{data.subscribe_num}</span></div>
					</div>
					
				</div>
			</div>
		)
	}
}

class CardItem extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		var data = this.props.data;
		var offline = data.video_type == -1 ? (<span className="offline">已下线</span>) : null;
		var href = '/v/' + data.id + '.html';
		var flag = '';
		if (data.video_type > -1) {
			href = '/'+ 'sv'.charAt(data.video_type) +'/' + data.id + '.html';
		}
		if (data.video_type == 0) {
			// flag = formatDate(data.start_time*1000, 'yyyy-MM-dd hh:mm');
		}else{
			// 点播
			flag = formatMsToDuration(data.length);
		}
		return (
			<li>
				<div className="img">
					<a href={href} target="_blank">
						<img src={data.image} />
						<span className="time">{flag}</span>
						{offline}
					</a>
				</div>
				<a href={href} className="list-title" target="_blank">{overflowStr(data.title,35)}</a>
				
			</li>
		);
	}
}

class Card extends React.Component {
	constructor(props){
		super(props);
	}
	render (){
		var data = this.props.data;
		var imageText = data.imageText.slice(0, 4);
		return (
			<div>
				<Subscriber data={data} more={data.imageText.length > 3 ? true : false} />
				<div className="list">
					<ul className="clearfix list-card">
						{
							imageText.map(function(item){
								return (<CardItem data={item} key={item.id} />);
							})
						}
					</ul>
				</div>
			</div>
		);
	}
}

class ListContainer extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			list: [],
			status: 'loading' // loading, done, fail, finished -> 没有更多数据
		};
		this.data = {
			size: 12,
			cursor: ''
		};
		this.url = 'v1/video/userPublishList' + inParams;
	}
	componentDidMount(){
		this.load();
		new backTop();
	}
	load(){
		var that = this;
		this.setState({
			status: 'loading'
		}, function(){
			fetch.get(this.url, {
				domain: 'domain-sault',
				data: this.data
			}).then(function(json){
				var status = 'done';
				var list = that.state.list;
				if(json && json.code === 200){
					var data = json.data || {};
					var total = parseInt(data.total, 10);
					var publisher = data.publisher || [];
					that.data.cursor = data.cursor;

					list = list.concat(publisher);
					if(list.length === total){
						status = 'finished';
					}
				} else {
					status = 'fail';
				}
				that.setState({
					status: status,
					list: list
				});
			}).catch(function(){
				that.setState({
					status: 'fail'
				});
			});
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

    handleClick = (e) => {
    	e.preventDefault();
    	var status = this.state.status;
        if(status !== 'finished' && status !== 'loading'){
	        this.load();
        }
    }

	render(){
		var card = null;
		var list = this.state.list;
		var status = this.state.status;
		var load = null;
		if(list.length){
			card = list.map(function(data){
				return <Card data={data} key={data.id}/>;
			});
			if(status !== 'finished'){
				load = (
					<div className="exchange">
						<a href="#" onClick={this.handleClick}>{this._getText()}</a>
					</div>
				);
    		}
		} else {
			if(status !== 'loading'){
				card = <div className="no-data sub"><p>您还没有订阅过任何内容哦</p></div>	
			}
		}
		return (
			<div>
				{card}
				{load}
			</div>
		);
	}
}

ReactDom.render( <ListContainer /> ,
    document.getElementById('list-container')
);
