import React from 'react';

class Tag extends React.Component{

	constructor(props) {
		super(props);
	}

	handleClick = (e) => {
		this.props.onDel(this.props.index);
	}

	render(){
		return (
			<div className="tag-item">
				<i className="icon-4 del" onClick={this.handleClick}></i>
				<span>{this.props.name}</span>
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
			error: ''
		};
	}

	updateTags(newTags){
		this.setState({
			tags: newTags
		});
	}

	componentDidMount(){
	}

	handleDel = (index) => {
		let tags = [...this.state.tags];
		tags.splice(index, 1);
		this.setState({
			tags: tags,
			value: '',
			error: ''
		}, function(){
			this.props.onChange(tags);
		});
	}

	showError(err) {
		this.setState({
			error: err
		});
	}

	isUnique(val){
		return this.state.tags.indexOf(val) === -1;
	}

	addTag(val) {
		let tags = [...this.state.tags, val];
		this.setState({
			tags: tags,
			value: ''
		}, function(){
			this.props.onChange(tags);
		});
	}

	delTag() {
		let tags = this.state.tags;
		if(tags.length){
			let t = tags.slice(0, -1);
			this.setState({
				tags: t
			}, function(){
				this.props.onChange(t);
			});
		}
	}

	validate(val) {
		let err = '';
		let ret = true;
		let len = val.length;

		if(!val.length){
			ret = false;
		} else if(len > 4){
			err = '请填写4个字以内的标签';
			ret = false;
		} else if(this.state.tags.length === 10){
			err = '最多填写10个标签';
			ret = false;
		} else if(!this.isUnique(val)){
			err = '已有相同标签';
			ret = false;
		}
		if(!ret){
			this.showError(err);
		}

		return ret;
	}

	handleChange = (e) => {
		let val = e.target.value;
		let len = val.length;
		let err = '';
		if(len > 4){
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
						tags.map((name, index) => {
							return <Tag key={name} index={index} name={name} onDel={this.handleDel} />
						})
					}
					<input
						className="tag-input"
						tabIndex="-1"
						style={{width: inputWidth + 'px'}}
						value={state.value}
						onChange={this.handleChange}
						onKeyDown={this.handleKeyDown}
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
