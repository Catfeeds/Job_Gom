/**
 * [formLicense表单项 - 营业执照]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */

import React, { Component } from 'react';
import Uploader from 'util/ImgUploader';
import httpConfig from 'io/http.config.js';
import ConvertThumbnail from 'util/convertThumbnail';


var noop = function(){};

const ImgLoading = ()=>{
	return (
		<div className="img-add">
			<div className="loading-bg">
				<span className="icon-20 indicator"></span>
			</div>
		</div>
	)
}

class Thumbnail extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
			<div className="img-add">
				<img src={ConvertThumbnail(this.props.imgUrl)} />
				<span onClick={this.props.onDel} className="icon-4 del"></span>
			</div>
		)
	}
}
class FormLicense extends Component{
	constructor(props){
		super(props)
		this.uploader = null;
		this.ImgUploadApi = '/upload/licenseImage';
		let imgUrl = this.props.imgUrl;
		this.state = {
			msg: '',
			imgUrl: imgUrl,
			isUploading: false,
		};
	}

	handleChange() {
		this.props.onChange({...this.state});
	}

	setMsg(msg) {
		this.setState({
			isUploading: false,
			msg: msg
		});
	}

	error(msg) {
		this.setState({
			isUploading: false,
			msg: msg
		}, this.handleChange);
	}

	beforeFileQueued = (file) => {
		this.setMsg('');
	}

	fileQueued = (file)=>{
		this.setState({
			isUploading: true
		},()=>{
			this.handleChange();
		});
	}

	validateError = (error) => {
		let msg = '';
		if(error === 'Q_TYPE_DENIED'){
			msg = '图片仅支持JPG、PNG、JPEG格式';
		} else if(error === 'Q_EXCEED_SIZE_LIMIT'){
			msg = '图片大小不能超过4M';
		}
		this.setState({
			isUploading: false,
			msg: msg
		});
	}

	uploadError = () => {
		this.error('error');
	}

	uploadSuccess = (WUFile, json) => {
		if(json && json.code === 1){
			this.setState({
				isUploading: false,
				imgUrl: json.data.url,
				msg: ''
			},()=>{
				this.handleChange()
			});
		} else {
			this.error(json.message || '上传失败，请重新上传');
		}
	}

	onReset = ()=>{
		this.uploader.reset();
		this.setState({
			isUploading: false,
			imgUrl: ''
		},()=>{
			this.handleChange()
		});
	}

	onDel = ()=>{
		this.onReset();
	}

	componentDidMount() {
		let opts = {
			auto: true,
			server: httpConfig[process.env.NODE_ENV] + '/api/upload/licenseImage',
			pick: {
				id: '#licenseUpload',
				multiple: false
			},
			fileSizeLimit: 1024 * 1024 * 10
		};

		let uploader = this.uploader = Uploader(opts);
		uploader.on('error', this.validateError);
		uploader.on('beforeFileQueued', this.beforeFileQueued);
		uploader.on('fileQueued', this.fileQueued);
		uploader.on('uploadError', this.uploadError);
		uploader.on('uploadSuccess', this.uploadSuccess);
	}

	componentWillReceiveProps({data}){
		let showMsg = data.showMsg;
		let msg = data.msg[showMsg];

		if (data.showMsg !== 'ok') {
			this.setState({msg});
		}
	}

	render(){
		let data = this.props.data;

		return (
			<div className="form-group">
				<label>
					{data.isRequired ? <span className="color-rad">*</span> : null}
					{data.label}：
				</label>
				<div className="form-input upload-box">
					<div className="upload-attention">仅支持JPG、PNG、PNEG的图片文件，且文件小于4M</div>
					<div className="clearfix">
						<div className="upload-img">
							<div className="upload-add" id="licenseUpload">
								<div className="add-item">
									<em className="icon-7"></em>
								</div>
							</div>
							{this.state.isUploading ? <ImgLoading /> : null}
							{!!this.state.imgUrl ? <Thumbnail imgUrl={this.state.imgUrl} onDel={this.onDel} /> : null}
						</div>
					</div>
					<p className="error show">{this.state.msg}</p>
				</div>
			</div>
		);
	}
}

export default FormLicense;