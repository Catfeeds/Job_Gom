/**
 *
 Created by zhangzhao on 2017/7/24.
 Email: zhangzhao@gomeplus.com

 用法：
     参数：
         1. visible: true/false，true是显示弹出框，false是隐藏弹出框
         2. msg: 弹出框说明
         3. onClose:  右上角关闭按钮
 */
import React, {Component} from 'react';
// import Dialog from 'fv-dialog';
import Dialog from 'components/Dialog';
import 'css/components/dialog.scss';
class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible,
            style: {
                width: 290,
                height: parseInt(this.props.height) || 180
            }
        }
    }
    onClose = () => {
        this.setState({
            visible: false
        }, function(){
            let onClose = this.props.onClose;
            onClose && onClose();
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: nextProps.visible
        });
    }
    render() {
        if (!this.state.visible) {
            return null;
        } else {
            return(
                <div>
                    <Dialog visible={this.state.visible}
                            onClose={this.onClose}
                            style={this.state.style}
                            closeStyle="icon-19"
                            footer={
                                <a className="alert-button" onClick={this.onClose}>确定</a>
                            }
                    >
                        <p className="alert-body">{this.props.msg}</p>
                    </Dialog>
                </div>
            );
        }
    }
}

export default Alert;
