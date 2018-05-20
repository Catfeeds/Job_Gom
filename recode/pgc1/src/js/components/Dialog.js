/**
 *
 Created by zhangzhao on 2017/7/30.
 Email: zhangzhao@gomeplus.com

 用法：
     参数：
         1. visible: true/false，true是显示弹出框，false是隐藏弹出框
         2. style: 控制弹出框的样式，比如宽高{{width: 700, height: 500}}
         3. onOk:  确定按钮
         4. onCancel: 取消按钮
         5. onClose:  右上角关闭按钮
         6. title：弹出框标题
         7. footer: 底部按钮，默认底部按钮：确定和取消。自定义，单个按钮：如<a>提交</a>，多个按钮[<a key="确定">确定</a>,<a key="取消">取消</a>]

            第一种情况，使用配置信息：
                num：为必填，按钮数量，现在只有1和2，表示一个和两个按钮
                buttonName为选填，表示按钮名称，默认名称为确定

                单个按钮：num:1, buttonName：按钮名称
                {
                    defaults: {
                        num: 1,
                        buttonName: '提交'
                    }
                }
                两个按钮： num:2, buttonName如下，默认为确定和取消
                {
                    defaults: {
                        num: 2,
                        buttonName: {
                            okName: '提交',
                            cancelName: '取消'
                        }
                    }
                }

            第二种情况，自己在footer里写button，这个比较适合三个及以上按钮情况
 */
import React, {Component} from 'react';
import FVDialog from 'fv-dialog';
import classNames from 'classnames';
import 'css/components/dialog.scss';

class Dialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerStyle: {
                height: 84
            },
            style: {
                width: 700
            },
            disabled: this.props.disabled,
            footerBtn: {
                oneBtn: {
                    height: 40,
                    lineHeight: 3
                },
                leftBtn: {
                    marginRight: 20,
                    height: 40,
                    lineHeight: 3
                },
                rightBtn: {
                    marginLeft: 0,
                    height: 38,
                    lineHeight: 3,
                    backgroundColor: '#fff',
                    border: '1px solid #53a6f8',
                    color: '#53a6f8'
                }
            },
            visible: this.props.visible
        }
    }
    _close=()=>{
        this.setState({
            visible: false
        });
    }
    onClose = () => {
        this._close();
        let _onClose = this.props.onClose;
        _onClose && _onClose();
    }
    onOk = () => {
        let onOk = this.props.onOk;
        onOk && onOk(this._close);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: nextProps.visible,
            disabled: nextProps.disabled
        })
    }
    render() {
        let {title, style,
             onCancel, footer} = this.props;
        let footerContainer = <div></div>;
        if(footer) {
            if (footer.defaults) {
                if (footer.defaults.num === 1) {
                    let classname = classNames('footer-button btn', {'disable': this.state.disabled});
                    footerContainer = <a key="确定" className={classname} style={this.state.footerBtn.oneBtn}
                                            onClick={this.onOk}>{footer.defaults.buttonName  || '确定'}</a>
                } else if (footer.defaults.num === 2) {
                    footerContainer =
                        [<a key="确定" className="footer-button btn" style={this.state.footerBtn.leftBtn}
                           onClick={this.onOk}>{footer.defaults.buttonName && footer.defaults.buttonName.okName || '确定'} </a>,
                        <a key="取消" className="footer-button btn" style={this.state.footerBtn.rightBtn}
                           onClick={onCancel || this.onClose}>{footer.defaults.buttonName && footer.defaults.buttonName.cancelName  || '取消'}</a>]
                }
            } else {
                footerContainer = footer;
            }
            footerContainer = <div className="dialog-footer-wrap">{footerContainer}</div>
        }
        if (!this.state.visible) {
            return null;
        } else {
            return  (
                <FVDialog 
                    visible={this.state.visible}
                    onClose={this.onClose}
                    style={style ? style : this.state.style}
                    title={title}
                    headerStyle={this.state.headerStyle}
                    closeStyle="icon-19"
                    footer={
                        footerContainer
                    }
                >
                    {this.props.children}
                </FVDialog>
            );
        }
    }
}

export default Dialog;
