/**
 *
 *  import Notification from 'components/Notification';
 *
 *  Notification.notice({
 *      content: '<span>ABC</span>',
 *      duration: 2, // 单位秒, 指定时间后,关闭toast, 传 null, toast 不可关闭
 *      onClose: function(){ // toast 关闭时触发
 *          console.log('closed');
 *      }
 *  });
 *
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

let notification = null;
// Notification.newInstance(defaultProps, (n) => notification = n);

export default notification;