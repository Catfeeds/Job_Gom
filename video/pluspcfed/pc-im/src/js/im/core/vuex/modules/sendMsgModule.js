
import { limitCN, byteLen} from '../../plugin/limitCN';
import {getDateFormat} from '../../plugin/dateFormat';
import store from '../index';
import {parseEmoji} from '../../plugin/parseEmoji';
import {parseLink} from '../../plugin/parseLink';
import Vue from 'vue';

const actions = {
	'EDIT_MSG': (store, e) => {
        store.commit('EDIT_MSG', e);
    },
    'SEND_MSG_TEXTAREA': ( store, e ) => {
    	store.commit('SEND_MSG_TEXTAREA', e);
    },
    'ACK_MSG': ( store, data ) => {
    	store.commit('ACK_MSG', data);
    },
    'SEND_MESSAGE': ( store, obj ) => {
    	store.commit('SEND_MESSAGE', obj);
    },
    'SEND_MSG_BTN': ( store ) => {
    	store.commit('SEND_MSG_BTN');
    }
}
const mutations = {
	'EDIT_MSG': (state, e) => {
		let text = $(e.target).val();
	 	text = byteLen(text, 4000) ? limitCN( text, 4000) : text;
	    state.sendMsgBody = text;
	    //$(e.target).val( text );
		if( e.ctrlKey && e.keyCode == 13 ||  e.keyCode === 13 ){
			e.preventDefault();
		}
	},
	'SEND_MSG_TEXTAREA': (state, e) => {
		if( e.ctrlKey && e.keyCode == 13 ||  e.keyCode === 13 ){
			e.preventDefault();
			store.dispatch('SEND_MESSAGE', $(e.target));
		}

	},
	'SEND_MSG_BTN': ( state ) => {
		store.dispatch('SEND_MESSAGE', $('#sendMsg'));
	},
	'SEND_MESSAGE': ( state, $obj ) => {
		let value = $obj.val();
		let text = $obj.val().replace(/[\r\n]/g,'<br/>');
		let textHtml = text;
		textHtml = parseLink(text);
		textHtml = parseEmoji(textHtml);
		let initModule = store.state.initModule;
		let msgInfoList = store.state.msgInfoList;
		let listModule = store.state.listModule;
		let uid = initModule.userInfo.userId;
        let extra = {
            crmpopShopId: listModule.curTalk.shopId,
            crmpopServiceType: 'COMMON_MSG',
            crmpopServiceId: 'COMMON_MSG'
        };
        if( initModule.imid === 0 ){
        	extra.type = 9876543;
        	extra.shareType = 764543;
        }
        let opts = {
            option: {
                imUserId: uid,
                userType: ( initModule.imid === 0 ? 2 : 1 ),
                msgType: 1,
                groupType: 5,
                msgBody: value, 
                attch: null,
                shopId: listModule.curTalk.shopId,
                extra: JSON.stringify(extra)
            }
        };
        if(  $.trim( value ) !== '' ){

	        let msgId = sendImMsg(opts);
	        let param = {
	        	extra: extra,
				groupId: (initModule.imid === 0 ? uid + '_9999999999' : uid + '_9999999997'+ initModule.imid),
				msgBody: value,
				msgHtml: textHtml,
				msgId: msgId,
				msgType: 1,
				senderId: uid,
				loading: true,
				fail: false
	        }
	        if( msgId === '' ) {
	        	param.fail = true;
	        	param.loading = false;
	        }
			msgInfoList.msgList[initModule.imid].push(param);
	        state.sendMsgBody = '';
	        $obj.val('');
	        
			let timer = null;
	        timer = setTimeout(function(){
	            $('#im-scroll').scrollTop( $('#im-scroll')[0].scrollHeight);
	            clearTimeout(timer);
	        }, 200);
        }
	},
	'ACK_MSG' :( state, msg ) => {
		if( msg.msg !== undefined && $('[data-msgid="' + msg.msg.imMsg.msgId + '"]').length > 0 ){
			let msgId = msg.msg.imMsg.msgId;
			let $list = $('[data-msgid="' + msgId + '"]');
			let index = parseInt( $list.attr('data-index'), 10);
			let uid = store.state.initModule.imid;
			let lastMsgTime = store.state.msgInfoList.lastMsgTime[uid];
			let msgInfoList = store.state.msgInfoList.msgList[uid];
			msgInfoList = $.extend( true, msgInfoList[index], msg.msg.imMsg );
			if( (msgInfoList.sendTime - lastMsgTime) > 3*60*1000 ){
				Vue.set( msgInfoList, 'isShowTime', true );
				Vue.set( msgInfoList, 'time', getDateFormat(msgInfoList.sendTime) );
				store.state.msgInfoList.lastMsgTime[uid] = msgInfoList.sendTime;

			}
			store.state.msgInfoList.msgList[uid].splice( index, 1, msgInfoList );
			store.state.msgInfoList.msgList[uid][index].loading = ( msg.head.result !== 0 );
			store.state.msgInfoList.msgList[uid][index].fail = ( msg.head.result === -1 );
		}
		
	}
}
const state = {
	sendMsgBody: ''
}

const sendMsgModule = {
	state,
	mutations,
	actions
};
export default sendMsgModule;