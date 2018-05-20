import React, { Component } from 'react';
import {login} from 'common/commonLogin.js';
import { loginFlag, page, apiParams } from 'util/phpCommon.js';
import emojiData from './emojiData.js';
import fetch from 'io/fetch';
import toast from 'components/toast';

class TextArea extends Component{
    constructor(props){
        super(props);
        this.$el = null;
        this.maxHeight = 134;
        this.minHeight = 0;
    }

    gotoLogin = ()=>{
        login();
    }

    componentDidMount(){
        let _this = this;
        let $el = this.refs.textarea;
        if ($el) {
            this.$el = $el;
            this.props.getRef($el);
            this.minHeight = $el.clientHeight+2;
        }
    }

    onChange = (e)=>{
        let value = e.target.value;
        this.props.onChange(value);
        this.changeTextareaHeight();
    }

    changeTextareaHeight(){
        let $el = this.$el;
        let minHeight = this.minHeight;
        let maxHeight = this.maxHeight;
        let t = 0;

        if (minHeight < maxHeight) {
            $el.style.height = minHeight + "px";
            let scrollHeight = $el.scrollHeight;
            if (scrollHeight > minHeight) {
                t = scrollHeight+2 > maxHeight ? maxHeight : scrollHeight;
                $el.style.height = t + "px";
            }
        }

        let overflowStyle = $el.scrollHeight+2 > maxHeight ? 'scroll' : 'hidden';
        $el.style.overflowY = overflowStyle;
    }

    render(){
        if (loginFlag) {
            return (
                <textarea ref="textarea" 
                    onChange={this.onChange} 
                    className="form-area" 
                    placeholder={this.props.placeholder} 
                    value={this.props.value}></textarea>
            );
        }else{
            return (
                <div className="form-area" onClick={this.gotoLogin}>
                    我来说两句，请先<span>登录</span>
                </div>
            );
        }
    }
}

class Emoji extends Component{
    constructor(props){
        super(props);
        this.state = {
            show: false
        };
    }

    _hideEmoji = ()=>{
        this.setState({
            show: false
        });
    }

    componentDidMount(){
        document.addEventListener('click',this._hideEmoji,false);
    }

    componentWillUnmount(){
        document.removeEventListener('click',this._hideEmoji,false);
    }

    wrapClick = (e)=>{
        e.nativeEvent.stopImmediatePropagation();
    }

    toggleEmoji = (e)=>{
        if (!loginFlag) {
            return false;
        }

        this.setState({
            show: !this.state.show
        });
    }

    onSelect = (e)=>{
        let info = e.target.alt;
        this.props.onClick(info);
        this.setState({
            show: !this.state.show
        });

    }

    render(){
        let emojis = [];
        for(let k in emojiData){
            emojis.push(
                <a key={k} href="javascript:;"><img onClick={this.onSelect} title={k} alt={k} src={emojiData[k]}/></a>
            );
        }

        return (
            <div className="fl" onClick={this.wrapClick}>
                <em onClick={this.toggleEmoji} className={loginFlag ? "icon-45" : "icon-45 disabled"}></em>
                <div className={this.state.show? "emoji fadeInDown" : "emoji"}>{emojis}</div>
            </div>
        );
    }
}


class CommentInput extends Component{
    constructor(props){
        super(props);
        this.textarea = null;
        this.submitting = false;

        this.state={
            param:this.props.param,
            textVal: '',
            textLen: 0,
            submitText: '发送'
        };
    }

    selectEmoji = (emoji)=>{
        
        let obj = this.textarea;
        obj.focus();
        if (document.selection) {
            var sel = document.selection.createRange();
            sel.text = emoji;
        } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
            var startPos = obj.selectionStart,
                endPos = obj.selectionEnd,
                cursorPos = startPos,
                tmpStr = obj.value;
            obj.value = tmpStr.substring(0, startPos) + emoji + tmpStr.substring(endPos, tmpStr.length);
            cursorPos += emoji.length;
            obj.selectionStart = obj.selectionEnd = cursorPos;
        } else {
            obj.value += emoji;
        }

        let afterLen = this.state.textLen + emoji.length;

        this.setState({
            textVal: obj.value,
            textLen: afterLen
        },()=>{
            this.refs.TextArea.changeTextareaHeight();
        });
    }

    onChange = (value)=>{
        let textLen = value.length;
        this.setState({
            textVal: value,
            textLen: textLen
        });        
    }

    checkTextLength = ()=>{
        let txts = this.state.textVal.trim();
        let reg = /\[[^\[]+\]/g;
        let txtsArr = txts.split(reg) || [];
        let faceArr = txts.match(reg) || [];

        let newTxts = '';
        let strLen = 0;

        txtsArr.forEach((v) => {
            let face = faceArr.shift();
            strLen += v.length;
            newTxts += v;

            if (face) {
                if (typeof emojiData[face] !== 'undefined') {
                    strLen += 1;
                    newTxts += face;
                }else{
                    // 偽表情，當做文本處理
                    strLen += face.length;
                    newTxts += face;
                }
            }
            
        });

        this.setState({
            textLen: strLen
        });
        
    }

    getRef = (ref)=>{
        this.textarea = ref;
    }

    onSubmit = ()=>{
        if (!loginFlag) {
            login();
            return false;
        }
        if (this.submitting) {
            return false;
        }

        let _this = this;
        let value = this.state.textVal.trim();
        let valueLen = this.state.textLen;
        if (value === '') {
            toast('评论不能为空');
            return false;
        }
        if(valueLen > 300){
            toast('最多输入300个字哦');
            return false;
        }

        let formData = this.props.param.formData;
        let fetchApi = this.props.param.fetchUrl+"?"+apiParams.inParams;
        formData.content = this.state.textVal.trim();

        this.setState({
            submitText: '发送中…'
        });
        this.submitting = true;
        fetch.post(fetchApi,{
            domain:'domain-user',
            data: formData,
            success: (res)=>{
                _this.setState({
                    submitText: '发送'
                });

                let delTypes = ['原评论已被作者删除','原回复已被作者删除'];

                if (delTypes.indexOf(res.message) != -1) {
                    this.props.param.returnMsg.delete="delete";
                    _this.props.replyMsgError(res,this.props.param.returnMsg);
                    return false;
                }

                if (res.code != 200) {
                    toast(res.message);
                    return false;
                }

                toast('发送成功！');

                res.data.to_user_nickname = _this.props.param.to_user_nickname;
                res.data.reply_type = formData.reply_type;
                res.data.submitTime = +new Date();
                _this.setState({
                    textVal: '',
                    textLen: 0
                },()=>{
                    _this.textarea.removeAttribute('style');
                    _this.props.replyMsg(res.data);
                });
            },
            error: (err)=>{
                _this.setState({
                    submitText: '发送'
                });
                toast('网络异常，请稍后再试');
            },
            complete: ()=>{
                _this.submitting = false;
            }
        });
    }

    render(){
        let nickname = this.state.param.to_user_nickname;
        let placeholder = !!nickname ? `回复 ${nickname}：` : '我来说两句...';

        return(
            <div className={this.state.submitText === '发送' ? 'comment-form' : 'comment-form send'}>
                <div className="textarea-box">
                    <TextArea placeholder={placeholder} ref="TextArea" getRef={this.getRef} onChange={this.onChange} value={this.state.textVal} />
                </div>
                <div className="form-btn clearfix">
                    <Emoji onClick={this.selectEmoji} />
                    <div className="fr">
                        <a href="javascript:;" onClick={this.onSubmit} className={loginFlag ? 'btn' : 'btn disabled'}>{this.state.submitText}</a>
                    </div>
                    <div className="fr">
                        <span className={this.state.textLen > 300 ? 'red': ''}>{this.state.textLen}</span>
                        <span className="gray">/300</span>
                    </div>
                </div>
            </div>
        );

    }
}
export default CommentInput;