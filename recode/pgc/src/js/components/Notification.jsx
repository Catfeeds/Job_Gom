/**
 *
 *  import Notification from 'components/Notification';
 *
 *  var notification = Notification({});
 *  notification.notice({
 *      content: '<span>ABC</span>',
 *      duration: 2, // 单位秒, 指定时间后,关闭toast, 传 null, toast 不可关闭
 *      onClose: function(){ // toast 关闭时触发
 *          console.log('closed');
 *      }
 *  });
 *
 * 调用 Notification() 时, 请在 componentDidMount中调用
 * 该方法会自动render一个容器到body上
 *
 * props参数可参考下面的链接：
 * http://react-component.github.io/notification/
 */
import React, {Component} from 'react';
import Notification from 'rc-notification';
import 'css/components/notification.scss';

let defaultProps = {
    duration: 2,
    style: {
        top: '50%',
        left: '50%'
    },
    onClose: function(){
    	this.destroy();
    }
};

const notification = function(props){
    return Notification.newInstance({...defaultProps, ...props});
}

export default notification;
