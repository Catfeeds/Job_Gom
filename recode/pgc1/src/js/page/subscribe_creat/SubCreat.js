
import React, {Component} from 'react';
import fetch from 'io/fetch';
import ImgUploader from 'components/ImgUploader';
import Notification from 'components/Notification';
class NameField extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            val: this.props.value || '',
            err: ''
        };
    }

    validate = (val) => {
        let len = val.length;
        let err = '';
        if(strlen(val) < 2 ||strlen(val) > 16){
            err = '请输入2-8字以内名称';
        }
        return err;
    }

    error(err) {
        this.setState({
            err: err
        });
    }

    onBlur = (e) => {
        let val = e.target.value.trim();
        this.error(this.validate(val));
    }

    onChange = (e) => {
        let val = e.target.value;
        this.setState({
            val: val
        }, function(){
            this.props.onChange(val);
        });
    }

    render(){
        let err = this.state.err;
        let errClsName = 'error';
        if(err.length > 0){
            errClsName += ' show ';
        }
        return(
            <div className="form-input">
                <input
                    className="input-text"
                    type="text"
                    placeholder="请输入8字以内名称"
                    value={this.state.val}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                />
                <p className={errClsName}>{err}</p>
            </div>
        );
    }
}

class DescriptionField extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            val: this.props.value || '',
            err: ''
        };
    }
    validate = (val) => {
        let len = val.length;
        let err = '';
        if(len < 2 ||len > 20){
            err = '请输入2-20字以内简介';
        }
        return err;
    }

    error(err) {
        this.setState({
            err: err
        });
    }

    onBlur = (e) => {
        let val = e.target.value.trim();
        this.error(this.validate(val));
    }

    onChange = (e) => {
        let val = e.target.value;
        this.setState({
            val: val
        }, function(){
            this.props.onChange(val);
        });
    }

    render(){
        let err = this.state.err;
        let errClsName = 'error';
        if(err.length > 0){
            errClsName += ' show ';
        }
        return(
            <div className="form-input">
                <input
                    className="input-text"
                    type="text"
                    placeholder="请输入20字以内简介"
                    value={this.state.val}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                />
                <p className={errClsName}>{err}</p>
            </div>
        );
    }
}


class SubCreat extends Component{
    constructor(props){
        super(props);

        this.form = {
            name : this.props.param.name || '',
            description: this.props.param.description ||'',
            img :this.props.param.image || ''
        }
        this.state={
            unClick : this.props.unClick
        }
        this.nameInput = null;
        this.desInput = null;
        this.imgUploader = null;
        this.notification = null; // toast实例
        if(this.props.param.name){
            this.submitType = [1,1,1];
        }else{
            this.submitType = [0,0,0];
        }
        this.onOk = this.onOk.bind(this);
        this.onCancle = this.onCancle.bind(this);
    }

    onOk(){
        var validate = this.fromCheckout();
        if(!validate){
            return false;
        }else{
            // 页面跳转

            this.fetchData();
            return true;
        }
    }
    onCancle(){
        document.getElementById(this.props.parentNav).click();
    }
    componentWillReceiveProps(nextPrep){
        this.setState({
            unClick : this.props.unClick
        });
        this.form = {
            name : nextPrep.param.name || '',
            description: nextPrep.param.description ||'',
            img :nextPrep.param.image || ''
        };
        if(nextPrep.param.name){
            this.submitType = [1,1,1];
        }else{
            this.submitType = [0,0,0];
        }

    }
    componentDidMount(){
        this.notification = Notification();
    }
    fromCheckout(){
        var validate = true;
        var name = this.form.name.trim();
        var des = this.form.description.trim();
        var img = this.form.img;
        var param = this.props.param;
        if(!name.length ){
            this.nameInput.error('请填写名称');
            validate = false;
        }else if(strlen(name) > 16 ){
            this.nameInput.error('请输入2-8字以内名称');
            validate = false;
        }
        if(!des.length){
            this.desInput.error('请填写简介');
            validate = false;
        }else if(!des.length > 20){
            this.desInput.error('请输入2-20字以内简介');
            validate = false;
        }

        switch(img.status){
            case 'pending':
                this.imgUploader.setMsg('请添加图像');
                validate = false;
                break;
            case 'error':
                imgUploader.error('上传失败');
                validate = false;
                return;
        }

        return validate;
    }
    fetchData(){
        var form = this.form;
        var param = {
            name : form.name,
            description: form.description,
            image:this.form.img.imgUrl
        }
        if(this.props.param.type == 1){
            param.subscribe_id = this.props.param.subscribe_id;
        }

        fetch.post(this.props.fetch,param)
            .then((data) => {
                var data = data.data;
                if(data.message == 'success'){
                    if(data.data.notchanged && data.data.notchanged == 1){
                        // 不用显示toast
                    }else{
                        // 显示toast
                        this.notification.notice({
                            content: <span>{'提交成功'}</span>
                        });
                        //this.props.onSubmit(1);
                    }
                    document.getElementById(this.props.parentNav).click();

                }else{
                    // 显示toast
                    var err = '';
                    if(data.message.name){
                        err = data.message.name;
                    }else{
                        err = '提交失败';
                    }
                    this.notification.notice({
                        content: <span>{err}</span>
                    });

                }
            })
    }

    unClickCheck(arr){
        var item = true;
        arr.map((val,index)=> {
            if(val == 0){
                item = false;
            }
        });
        return item;
    }

    onNameChange = (name) => {
        this.form.name = name;
        if(name && strlen(name.trim()) < 17 && strlen(name.trim()) > 1){
            this.submitType[0]= 1;


            if(this.unClickCheck(this.submitType) && this.submitType.length == 3){
                this.setState({
                    unClick :''
                });
            }
        }else{
            this.submitType[0] = 0;
            this.setState({
                unClick :'unClick'
            });
        }
    }
    onDesChange = (des) => {
        this.form.description = des;
        if(des && des.trim().length < 21 && des.trim().length > 1){
            this.submitType[1] = 1;
            if(this.unClickCheck(this.submitType) && this.submitType.length == 3){
                this.setState({
                    unClick :''
                });
            }
        }else{
            this.submitType[1] = 0;
            this.setState({
                unClick :'unClick'
            });
        }
    }
    onCoverChange = (img) => {
        this.form.img =  img;
        if(img && img.imgUrl){
            this.submitType[2] = 1;
            if(this.unClickCheck(this.submitType) && this.submitType.length == 3 ){
                this.setState({
                    unClick :''
                });
            }
        }else{
            this.submitType[2] = 0;
            this.setState({
                unClick :'unClick'
            });
        }
    }


    render(){
        var param = this.props.param;
        return (

            <div className="subOption">
                <div className="title">
                    <p>{this.props.title}</p>
                </div>
                <div className="messageContain" >
                    <div className="addNewDialog">
                        <div className="form">
                            <div className="form-group">
                                <label>
                                    <span className="color-rad">*</span>
                                    名称：
                                </label>
                                <NameField
                                    ref={(input) => {this.nameInput = input}}
                                    value={param.name}
                                    onChange={this.onNameChange}
                                />
                            </div>
                        </div>
                        <div className="form">
                            <div className="form-group">
                                <label>
                                    <span className="color-rad">*</span>
                                    简介：
                                </label>
                                <DescriptionField
                                    ref={(input) => {this.desInput = input}}
                                    value={param.description}
                                    onChange={this.onDesChange}
                                />
                            </div>
                        </div>
                        <ImgUploader
                            ref={(loader) => {this.imgUploader = loader}}
                            label ='头像：'
                            remark = {"仅支持JPG、PNG、JPEG的图片文件，且文件小于4M，比例1:1"}
                            size={{width: 340, height: 340}}
                            onChange={this.onCoverChange.bind(this)}
                            imgUrl={param.image}
                            checkRatio={false}
                            imgType={'avatar'}

                        />
                    </div>
                </div>
                <div className="subFooter">
                    <div className="subOptionBtn btn" onClick={this.onOk}>提交</div>
                    <div className="subOptionBtn btn deletBtn" onClick={this.onCancle}>取消</div>
                </div>
            </div>

        );
    }
}
export  default SubCreat;

function strlen(str) {
    var len = 0;
    for (var i=0; i<str.length; i++) {

        if (str.charCodeAt(i)>127 || str.charCodeAt(i)==94) {
            len += 2;
        } else {
            len ++;
        }
    }
    return len;
}
