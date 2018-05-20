/**
 *
 Created by zhangzhao on 2017/7/24.
 Email: zhangzhao@gomeplus.com

 用法：
     参数：
         1. visible: true/false，true是显示弹出框，false是隐藏弹出框
         2. msg: 弹出框说明
 */
import React, {Component} from 'react';
// import Dialog from 'fv-dialog';
import Dialog from 'components/Dialog';
import 'css/components/dialog.scss';
class Toast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible,
            toast: '',
            style: {
                width: 230
            }
        }
    }
    onClose=()=> {
        this.setState({
            visible: false
        });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: nextProps.visible
        });
    }

    componentDidMount() {
        setTimeout(()=>{
            this.setState({
                visible: false
            });
        }, 2000)
    }
    render() {
        if (!this.state.visible) {
            return null;
        } else {
            return (
                <div><Dialog visible={this.state.visible}
                             onClose={this.onClose}
                             closable={false}
                             style={this.state.style}
                >
                    <p className="toast-body">{this.props.msg}</p>
                </Dialog></div>
            );
        }
    }
}

export default Toast;