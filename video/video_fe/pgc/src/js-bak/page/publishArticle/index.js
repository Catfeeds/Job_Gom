import 'css/page/publishArticle/index.scss';

import React, { Component } from 'react';
import {Link, Prompt} from 'react-router-dom';
import NoAuth from 'components/BlankPage';
import PublishService from 'api/publish';

import Topic from 'components/Article';
import Alert from 'components/Alert';
// import Success from './success';
import pubsub from 'io/pubsub';
import { page } from 'util/phpCommon.js';
import {isArray} from 'util/tools';

class PublishArticle extends Component{
	constructor(props){
		super(props);

		this.state = {
			submitType : false,
			errDialogVisible : false,
			errMsg : ''
		}

		this.onSubmitted = false;
		this.showPromp = true;
	}

	clearState() {
		this.setState(() => {
			return ({
				submitType : false,
				errDialogVisible : false,
				errMsg : '',
			})
		});
	}

	sensitive = (messageArr) => {
		messageArr.some((message) => {
			return /message/ig.test('敏感词')
		})
	}

	fetchSubmit = (form) => {
		let that = this;
		this.clearState();
		if(window.navigator.onLine) {
			if(!this.onSubmitted) {
				this.onSubmitted = true;
				PublishService.add({
					name : form.title,
					components: form.content,
					labels: form.tags
				}).then(ret => {
					let data = ret.data;
					this.onSubmitted = false;

					if(data.code == 1) {
						that.setState((previousState) => {
							return ({
								submitType : true,
								errDialogVisible : false,
								errMsg : '',
							})
						})
					} else if (data.code == 0) {
						if(data.message !== 'auth failed' && !isArray(data.message)) {
							that.setState((previousState) => {
								return ({
									submitType : false,
									errDialogVisible : true,
									errMsg : data.message.content || data.message.name || data.message.tags,
								})
							})
						}

						if (isArray(data.message)) {
							let denyWordsTips = '内容中含有敏感词，请重新填写';
							let denyWordsData = data.data;
							let _temp = {};
							for(let k in denyWordsData){
								_temp[k] = denyWordsTips;
							};
							that.topicPublish.pulledValidate(_temp);

							return false;
						}
					}
				});
			}
		} else {
			that.setState((previousState) => {
				return ({
					submitType : false,
					errDialogVisible : true,
					errMsg : '网络连接出错，请稍后重试',
				})
			})
		}
	}

	pubBack = () => {
		this.setState({
			submitType:false
		},()=>{
			setTimeout(()=>{
				this.setState({});
			},0);
		});
	}

	componentDidUpdate(){
		this.showPromp = !this.state.submitType;
	}

	componentDidMount() {
		$('[href="/portal/publishArticle"]').on('click', this.pubBack);
	}

	componentWillUnmount() {
		$('[href="/portal/publishArticle"]').off('click', this.pubBack);
	}

	render(){

		if(page.approve_status != '1'){
		    return (
		        <NoAuth tag={'noArticleAuthority'} />
		    )
		}

		if (this.state.submitType) {
			return (
				<div className="video-uploader">
					<div className="submit-success">
						<div className="success-icon-img"></div>
						<h3 className="success-title">发布成功</h3>
						<p className="success-detail">图文内容正在审核阶段，请耐心等待...</p>
						<div>
							<button className="btn submit-goon" onClick={this.pubBack}>继续发布</button>
							<Link id="submanager" className="btn submit-backs" to={"/portal/articleManage"}>前往图文管理</Link>
						</div>
					</div>
				</div>
			);
		}else{
			return (
		  		<div className="video-uploader">
					<Alert
						height='200'
						visible={this.state.errDialogVisible}
						msg={this.state.errMsg}
						onClose={this.onAlertClose}
					/>
					<Prompt
						message="确定离开此页面吗？"
						when={this.showPromp}
					/>
					<Topic
						ref={(topic) => {this.topicPublish = topic}}
						onSubmit={this.fetchSubmit}
						title=''
						content=''
						tags={[]}
					/>
		  		</div>
			);
		}
	}

}


export default PublishArticle;
