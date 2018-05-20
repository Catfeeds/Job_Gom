import 'css/page/publishArticle/index.scss';

import React, { Component } from 'react';
import {Link, Prompt} from 'react-router-dom';
import cs from 'classnames';

import TitleField from 'components/TitleField';
import GomeEditor from 'components/GomeEditor';
import ArticleTag from 'components/ArticleTag';
import Alert from 'components/Alert';

import PublishService from 'api/publish';
import pubsub from 'io/pubsub';
import {isArray} from 'util/tools';
import fillComponents from 'util/fillComponents';

// import {store} from '../redux/store';
// import {PUBLIC_TOP} from '../redux/constant';

// import * as constant from 'reduxs/constant/index';


/**
 * tags = {
 * 		id: 'asdfsldkf',
 * 		name: '标签',
 * 		status: 1
 * }
 * 标签状态 status = [-1=>敏感词, 0=>创建中, 1=>成功的]
 */

class Article extends Component{
	constructor(props){
		super(props);

		let tags = this._initPropsTags(this.props.tags || []);

    this._isMounted = true

		this.form = {
			title : this.props.title || '',
			content: this.props.content || [],
			tags: tags || []
		}

		this.tags = tags;

		this.state = {
			editor: 'ArticleEditor',
			article_id: this.props.article_id || 0,
			title : this.props.title || '',
			content: this.props.content || [],
			tags: tags,
			errDialogVisible : false,
			errMsg : '',
			setTop : {
				titleTop: 0,
				textareaTop: 0,
				tagTop: 0
			},
			onOff : false,
		}
	}

	// reBack = () => {
	// 	this.state.onOff = true;
	// }

	reset = () => {
		this.setState({
			title : '',
			content: [],
			tags: [],
			errDialogVisible : false,
			errMsg : '',
			setTop : {
				titleTop: 0,
				textareaTop: 0,
				tagTop: 0
			}
		},() => {

			let tags = this._initPropsTags(this.props.tags || []);

			this.form = {
				title : this.props.title || '',
				content: this.props.content || [],
				tags: tags || []
			}

			let input = this.titleInput;
			input.resetTitle();

			let editor = UE.getEditor(this.state.editor);
			editor.setContent('');
			editor.document.body && editor.document.body.innerHTML = '<p></br></p>';
			//editor.setContent('');
			this.desInstance.error('');

			let tag = this.tagInstance;
			tag.resetTag();

			let $contentWrap = document.querySelector('#mainContents');
			$contentWrap && ($contentWrap.scrollTop = 0);
			// window.location.reload();
		})
	}

	// 初始化接收到的有效标签，添加成功的状态。
	_initPropsTags = (tags)=>{
		return tags.map(v=>{
			v.status = 1;
			return v;
		});
	}

	validate=()=> {
		var validate = true;
		var form = this.form;

		var title = form.title;
		let editor = UE.getEditor(this.state.editor);
		//获取纯文本内容
		let newTxt = !!editor.getContentTxt().trim();
		//获取全部内容
		let content = editor.getContent();
		//判断是否带有图片
		let hasContentImg = content.indexOf('img') != -1 ? 1:0 ;

		var tags = Object.keys(this.tagInstance.state.tags);
		form.content = fillComponents(UE.getEditor(this.state.editor), []);

		this.desInstance.error('');
		this.titleInput.error('');

		this.setState({
			content: form.content,
			errMsg : '',
			errDialogVisible : false
		})

		let $contentWrap = document.querySelector('#mainContents');

		if(!tags.length){
				$contentWrap && ($contentWrap.scrollTop = 605);
				this.tagInstance.showError('请添加标签');
				validate = false;
		}

		if(!newTxt && !hasContentImg){
				$contentWrap && ($contentWrap.scrollTop = 125);
				this.desInstance.error('请添加正文内容');
				validate = false;
		}

		if(!title.length){
				$contentWrap && ($contentWrap.scrollTop = 45);
				this.titleInput.error('请填写标题');
				validate = false;
		}

		if(title.length && (title.length < 2 || title.length > 30)){
				$contentWrap && ($contentWrap.scrollTop = 45);
				this.titleInput.error('请填写2-30个字（汉字、字母或符号）的标题');
				validate = false;
		}

		return validate;
	}

	pulledValidate = (data) => {
		let defs = {
			name: null,
			components: null,
			labels: null
		};

		Object.assign(defs, data);

		var validate = true;
		this.desInstance.error('');

		this.setState({
			errMsg : '',
			errDialogVisible : false
		})

		let $contentWrap = document.querySelector('#mainContents');

		if(defs.labels !== null){
				$contentWrap && ($contentWrap.scrollTop = 605);
				this.tagInstance.showError(defs.labels);
				validate = false;
		}
		if(defs.components !== null){
				$contentWrap && ($contentWrap.scrollTop = 125);
				this.desInstance.error(defs.components);
				validate = false;
		}
		if(defs.name !== null){
				$contentWrap && ($contentWrap.scrollTop = 45);
				this.titleInput.error(defs.name);
				validate = false;
		}

		return validate;
	}

	checkDenyWords = ()=>{
		let denyWords = Object.keys(this.tagInstance.denyWords);
		if (!denyWords.length) {
			return false;
		}
		// this.setState({
		// 	errDialogVisible : true,
		// 	errMsg : '标签中含有敏感词 ['+denyWords.join(',')+']',
		// });
		this.tagInstance.showError('内容中含有敏感词，请重新填写');
		return true;
	}

	checkCreatedWords = ()=>{
		let tags = this.tagInstance.state.tags;
		let noCreated = [];
		tags.map(v=>{
			if (v.status === 0) {
				noCreated.push(v.name);
			}
		});
		if (!noCreated.length) {
			return false;
		}
		this.setState({
			errDialogVisible: true,
			errMsg: `标签[${noCreated.join(',')}]还未审核成功，请稍后重试`
		});
		return true;
	}

	setAllowTags = ()=>{
		let tags = this.tagInstance.state.tags;
		let formTags = tags.map(v=>{
			delete v.status;
			return v;
		});
		this.form.tags = formTags;
	}

	pubSubmit = () => {
		let that = this;
		if (this.validate()) {
			setTimeout(()=>{
				let hasDenyWords = that.checkDenyWords();
				let hasNoCreated = that.checkCreatedWords();
				if (hasDenyWords || hasNoCreated) {
					return false;
				}else{
					that.setAllowTags();
					that.form.content = JSON.stringify(that.form.content);
					that.props.onSubmit(that.form);
				}

				// store.dispatch({
				// 	type: PUBLIC_TOP,
				// 	setTop: {
				// 		titleTop: this.titleWrap.offsetTop,
				// 		textareaTop: this.textareaWrap.offsetTop,
				// 		tagTop: this.tagWrap.offsetTop
				// 	}
				// })
			},200);
		}
	}

	onTitleChange = (title)=> {
			this.form.title = title.trim();
			this.setState({
				title: title,
				errMsg : '',
				errDialogVisible : false
			})
	}

	componentWillMount() {
		// console.log(this.props.content)
		// this.setState({
		// 	setTop : {
		// 		titleTop: this.titleWrap.offsetTop,
		// 		textareaTop: this.textareaWrap.offsetTop,
		// 		tagTop: this.tagWrap.offsetTop
		// 	}
		// })
		//
		//

		// 监听该channel,然后reset到文件选择页
		pubsub('reset_article').sub(() => {
			if(this._isMounted) {
				this.reset();
			}
		});
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render(){
		return (
  		<div className="video-uploader article-update" ref={(content) => {this.contentWrap = content}}>
				<Alert
						height='200'
						visible={this.state.errDialogVisible}
						msg={this.state.errMsg}
				/>
				<div className="upload-form">
					<div className="form">
						<div className="form-group" ref={(input) => {this.titleWrap = input}}>
							<label>
								<span className="color-rad">*</span>
								标题：
							</label>
							<TitleField
								ref={(input) => {this.titleInput = input}}
								value={this.state.title}
								onChange={(val)=>{this.onTitleChange(val)}}
							 />
						</div>
						<div className="form-group" ref={(textarea) => {this.textareaWrap = textarea}}>
							<label>
								<span className="color-rad">*</span>
								正文：
							</label>
							<div className="form-input">
								<GomeEditor
									editorId={this.state.editor}
								 	className="input-textarea"
									ref={(textarea) => {this.desInstance = textarea}}
									content={this.props.content}
								/>
							</div>
						</div>
						<div className="form-group" ref={(tag) => {this.tagWrap = tag}}>
							<label>
								<span className="color-rad">*</span>
								标签：
							</label>
							<div className="form-input">
								<ArticleTag
									ref={(tag) => {this.tagInstance = tag}}
									tags={this.state.tags}
								/>
							</div>
						</div>
						<div className="article-update-btns">
							<button onClick={this.pubSubmit} className={cs({"au-btn": true, "article-update-submit": true, "article-if-submit": !this.state.article_id})}>{this.state.article_id?'提交':'发布'}</button>
							{this.state.article_id ? <Link to="/portal/articleManage" className="au-btn article-update-cancel">取消</Link> : ''}
						</div>
					</div>
				</div>
  		</div>
		)
	}
}

export default Article;
