import 'css/page/video_uploader/index.scss';

import React from 'react';
import PublishService from 'api/publish';
// import {store} from 'reduxs/store';

class Tag extends React.Component{

	constructor(props) {
		super(props);
	}

	handleClick = (e) => {
		this.props.onDel(this.props.name);
	}

	render(){
		let status = this.props.status+'';
		let statusCls = {
			'-1': 'red',
			'0': 'gray',
			'1':''
		}
		return (
			<div className="tag-item">
				<i className="icon-4 del" onClick={this.handleClick}></i>
				<span className={statusCls[status]}>{this.props.name}</span>
			</div>
		)
	}
}

class TagContainer extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			tags: this.props.tags || [],
			value: '',
			error: '',
			'chinese': false,
		};

		this.denyWords = {};
	}

	componentDidMount(){
	}

	handleDel = (name) => {
		let tags = [...this.state.tags];
		let index = -1;

		this.denyWords[name] && delete this.denyWords[name];
		for(let i = 0; i< tags.length; i++){
			if (tags[i].name === name) {
				index = i;
				break;
			}
		}

		index !== -1 && tags.splice(index, 1);

		this.setState({
			tags: tags,
			value: '',
			error: ''
		}, () => {
			let hasTags = this.state.tags.length;
			let err = '';
			if(!hasTags){
				err = '请添加标签';
			}
			this.showError(err);
		});
	}

	showError(err) {
		this.setState(() => {
			return {error: err}
		});
	}

	isUnique(val){
		let tags = this.state.tags;
		let len = tags.length;
		for(let i=0;i<len;i++){
			if (tags[i].name === val) {
				return false;
			}
		}
		return true;
	}

	setTag = (tag)=>{
		let tags = this.state.tags.map(v=>{
			if (v.name === tag.name) {
				Object.assign(v,tag);
			}
			return v;
		});
		this.setState({
			tags:[...tags]
		});
	}

	createTag = (tag)=>{
		let that = this;
		PublishService.createTag({
			name: tag
		}).then(ret => {

			let tags = that.state.tags;
			let data = ret.data;

			if(data.code == 1) {

				// 创建成功
				let newTag = data.data;
				newTag.status = 1;

				that.setTag(newTag);

			} else if(data.code == 0 && data.data.length) {

				// 有敏感词
				let denyWords = data.data.join(',');

				that.setTag({
					name: tag,
					status: -1
				});

				// 收集敏感词
				that.denyWords[tag] = denyWords;

			}else{

				// 请求超时，当做未创建成功，状态默认为0，不做处理。
			}
		});
	}

	addTag(val) {
		if (val === '') {
			return false;
		}

		let newTag = {
			name: val,
			status: 0
		}
		let tags = [...this.state.tags, newTag];
		this.setState({
			tags: tags,
			value: ''
		}, function(){
			this.createTag(val);
		});
	}

	delTag() {
		let tags = this.state.tags;

		if(tags.length){
			let t = tags.slice(0, -1);
			delete this.denyWords[t.name];
			this.setState({
				tags: t
			}, () => {
				let hasTags = this.state.tags.length;
				let err = '';
				if(!hasTags){
					err = '请添加标签';
				}
				this.showError(err);
			});
		}
	}

	resetTag() {
		let tags = this.state.tags;

		if(tags.length){
			tags.length = 0;
			this.denyWords = {};
			this.setState({
				tags: []
			});
		}
		this.showError('');
	}

	validate(val) {
		let err = '';
		let ret = true;
		let len = val.length;
		let hasTags = this.state.tags.length;
		
		if(!this.state.chinese) {
			if(!len && !hasTags){
				err = '请添加标签';
				ret = false;
			} else if(len > 4){
				err = '请填写4个字以内的标签';
				ret = false;
			}else if(!len && this.state.tags.length == 10){
				err = '',
				ret = false;
			} else if(this.state.tags.length >= 10){
				err = '最多填写10个标签';
				ret = false;
			} else if(!this.isUnique(val)){
				err = '已有相同标签';
				ret = false;
			}
			if(!ret){
				this.showError(err);
			}
		}

		return ret;
	}

	handleChange = (e) => {
		let val = e.target.value;
		let len = val.length;
		let err = '';

		if(len > 4 && !this.state.chinese){
			err = '请填写4个字以内的标签';
		}

		this.setState({
			error: err,
			value: val
		});
	}

	handleBlur = (e) => {
		let val = e.target.value.trim();
		if(this.validate(val)){
			this.addTag(val);
		}
	}

	handleKeyDown = (e) => {
		let keyCode = e.keyCode;
		let val = e.target.value.trim();
		if(keyCode === 32 || keyCode === 13){ // 空格键
			e.preventDefault();
			if(this.validate(val)){
				this.addTag(val);
			}
		} else if(keyCode === 8){ // 删除键
			if(val === ''){
				this.delTag();
			}
		}
	}

	handleComstart = (e) => {
		this.setState(() => {return {'chinese': true} })
	}

	handleComEnd = (e) => {
		let val = e.target.value.trim();
		this.setState({'chinese': false, 'value': val}, () => {
			this.validate(val);
		})
	}

	render(){
		let state = this.state;
		let tags = state.tags;
		let placeholder = '';
		let inputWidth = 150;
		if(!tags.length){
			placeholder = '每个标签最多4个字，最多不超过10个标签，使用空格或enter隔开标签';
			inputWidth = 450;
		}
		return (
			<div className="form-input">
				<div className="tag-input-wrap clearfix">
					{
						tags.map((v, k) => {
							return <Tag key={k} status={v.status} name={v.name} onDel={this.handleDel} />
						})
					}
					<input
						className="tag-input"
						tabIndex="-1"
						style={{width: inputWidth + 'px'}}
						value={state.value}
						onChange={this.handleChange}
						onKeyDown={this.handleKeyDown}
						onCompositionStart={this.handleComstart}
						onCompositionEnd={this.handleComEnd}
						onBlur={this.handleBlur}
						placeholder={placeholder}
					/>
				</div>
				<p className="error tag-error show">{state.error}</p>
			</div>
		);
	}
}

export default TagContainer;
