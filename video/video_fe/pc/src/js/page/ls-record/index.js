/**
 *  未登录时的观看记录,存储在localstorage,不会同步到服务器
 *  结构如下: 
 *  video-record: [{"id":552,"c":1800},{"id":561,"c":1000}]
 *  id: topicid
 *  c: 视频的观看时长
 *
 */

/* css */
import 'css/page/ls-record/index.scss';

/* header and footer */
import 'widgets/head/index.js';
import 'widgets/footer/index.js';

import React from 'react';
import ReactDom from 'react-dom';
import Records from 'components/react/Records.js';

import Record from 'widgets/record/index';
import pubsub from 'io/pubsub';

class RecordContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            status: 'loading' // loading, done, fail, finished -> 没有更多数据
        };
        this.videoRecord = Record.getInstance();
        var that = this;
        pubsub('del-record').sub(function(id){
        	that.handleDel(id);
        });
    }
    componentDidMount() {
        this.load();
    }
    load() {
    	var that = this;
    	
        this.setState({
            status: 'loading'
        }, function(){
            this.videoRecord.get().then(function(list){
                var status = 'done';
                var current = that.state.list.concat(list);
                if(current.length === list.total){
                    status = 'finished';
                }
                that.setState({
                    list: current,
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
    handleDel = (id) => {
    	var list = this.state.list;
		for(var i = 0, len = list.length; i < len; i++){
			if(list[i].id === id){
				list.splice(i, 1);
				break;
			}
		}
    	this.setState({
    		list: list
    	}, function(){
    		this.videoRecord.remove(id); // 从localstorage中移除记录
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
    	var list = this.state.list;
        var status = this.state.status;
    	var records = null;
    	var title = null;
    	var load = null;
    	var indicator = null;
    	if(list.length){
    		records = <Records list={list} onDel={this.handleDel} />;
    		title = <h1 className="title">观看记录</h1>;
            if(status !== 'finished'){
        		load = (
        			<div className="exchange">
        				<a href="#" onClick={this.handleClick}>{this._getText()}</a>
        			</div>
        		);
            }
    	} else {
            if(status !== 'loading'){
                indicator = <div className="no-data"><p>你还没有观看记录</p></div>;
            }
    	}
        return (
        	<div>
        		{indicator}
        		{title}
            	{records}
	            {load}
            </div>
        );
    }
}

ReactDom.render( <RecordContainer /> ,
    document.getElementById('record-container')
);
