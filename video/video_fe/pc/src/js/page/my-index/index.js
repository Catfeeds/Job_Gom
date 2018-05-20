/* css */
import 'css/page/my-index/index.scss';

/* header and footer */
import 'widgets/head/index.js';
import 'widgets/footer/index.js';

import fetch from 'io/fetch';
import React from 'react';
import ReactDom from 'react-dom';
import overflowStr from  'util/overflowStr';
import formatDate from 'util/formatDate';
import formatNumber from 'util/formatNumber';
import formatMsToDuration from 'util/formatMsToDuration.js';

import { loginFlag, page as CommonConfig, apiParams } from 'util/phpCommon';
import backTop from 'plugin/backTop.js';

var inParams = '?' + apiParams.inParams;

class Card extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		var record = this.props.data || {};
		var publisher = record.publisher || {};
		var href = '/v/' + record.id + '.html';
		var title = overflowStr(record.title,35);
		return (
			<li>
				<div className="img">
					<a href={href} target="_blank">
						<img src={record.image} />
						{/* <em className="icon-13"></em> */}
						<span className="time">{formatMsToDuration(record.length)}</span>
						{/* <span className="offline">已下线</span> */}
					</a>
				</div>
				<a href={href} className="list-title" target="_blank">{title}</a>
				<div className="num">
					<a href={'/sub/' + publisher.id + '.html'} target="_blank" className="list-name">
						<img src={publisher.icon} />
						<span>{publisher.name}</span>
					</a>
					<div className="fr">
						<em className="icon-15"></em>
						<span>{formatNumber(record.praise_num)}</span>
					</div>
				</div>
			</li>
		);
	}
}

class CardList extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div className="listwrap">
				<ul className="list-card clearfix">
					{
						this.props.list.map(function(record){
							return <Card data={record} key={record.id} />
						})
					}
				</ul>
			</div>
		);
	}
}

class ListContainer extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            list: [],
            status: 'loading' // loading, done, fail, finished -> 没有更多数据
        };
    }
    componentDidMount() {
        this.load();
    }
    load(cb) {
    	var that = this;
    	fetch.get('/v1/recommendlike/list' + inParams, {
			domain: 'domain-user',
			data: {
				size: 9
			}
		}).then(function(json){
			if(json && json.code === 200){
				var data = json.data || {};
				that.setState({
					list: data.multipleImageText || [],
					status: 'done'
				}, function(){
					cb && cb.call(this);
				});
			} else {
				that.setState({
					status: 'error'
				});
			}
		}).catch(function(){
			that.setState({
				status: 'error'
			});
		});
    }
    handleClick = (e) => {
        e.preventDefault();
        var status = this.state.status;
        if(status !== 'finished' && status !== 'loading'){
	        this.setState({
	        	status: 'loading'
	        }, function(){
	        	this.load(function(){
	        		var top = $(this.refs.container).position().top;
					window.scrollTo(0, top - 102);
	        	});
	        });
        }
    }
    _getText() {
    	var text = '换一组';
    	var status = this.state.status;
    	if(status === 'loading'){
    		text = '加载中...';
    	}
    	return text;
    }
    render() {
    	var list = this.state.list;
    	var title = null;
    	var load = null;
    	var records = null;
    	if(list.length){
    		title = (
	    		<div className="title clearfix">
					<h1 className="fl">猜你喜欢</h1>
					{/*<a className="more fr" href="#" onClick={this.handleClick}>换一组</a>*/}
				</div>
			)
    		load = (
    			<div className="exchange">
					<a href="#" onClick={this.handleClick}>{this._getText()}</a>
				</div>
    		);
    		records = (<CardList list={list} />);
    	}
        return (
        	<div ref="container">
        		{title}
            	{records}
	            {load}
            </div>
        );
    }
}

new backTop();
ReactDom.render(<ListContainer /> ,
    document.getElementById('list-container')
);