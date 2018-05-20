import Vue from 'vue';
import getToken from '../../plugin/getToken';
import store from '../index';

const actions = {
    'GET_HISTORY': (store) => {
        store.commit('GET_HISTORY');
    }
}
const mutations = {
    'GET_HISTORY': (state) => {
        if (!state.canClick) return;
        let imUserId = store.state.initModule.userInfo.userId;
        let shopId;
        let userType;
        let groupId = store.state.listModule.curTalk.groupId;
        if (/^\d+_\d+_\d{2,}$/.test(groupId)) {
            shopId = store.state.listModule.curTalk.shopId;
            userType = 1;
        } else if (/[9]{10}$/.test(groupId)) {
            shopId = '0';
            userType = 2;
        } else {
            throw new Error('history msg err!');
        }
        let curList = store.state.msgInfoList.msgList[shopId];
        if (!curList && !curList[0].msgSeqId && curList[0].msgSeqId <= 1) {
            return;
        }
        let len = curList.length || 1;
        let msgSeqId = curList[0].msgSeqId - 1;
        let historyObj = {
            option: {
                shopId: shopId,
                imUserId: imUserId,
                userType: userType,
                token: '',
                msgSeqId: msgSeqId,
                pageSize: 20,
                listOfficeMsg: historyMsg,
                error: error
            }
        };
        if (!state.token) {
            getToken(function(data) {
                if (data.success) {
                    state.token = data.data.token;
                    historyObj.option.token = state.token;
                    sendListOffileMsgs(historyObj);
                    state.canClick = 0;
                } else {
                    throw new Error('getToken Error!')
                }
            }, function() {
                throw new Error('getToken Error!')
            })
        } else {
            historyObj.option.token = state.token;
            sendListOffileMsgs(historyObj);
            state.canClick = 0;
        }


        function historyMsg(data) {
            let obj;
            let historyData = {
                groupId: groupId,
                hasHistoryMsg: 0
            };
            if (data.msg && data.msg.length) {
                let len = data.msg.length;
                let groupId = data.msg[0].groupId;
                historyData = {
                    groupId: groupId,
                    hasHistoryMsg: 0
                };
                if (data.msg[len - 1].msgSeqId <= 1) {
                    historyData.hasHistoryMsg = 0;
                } else {
                    historyData.hasHistoryMsg = 1;
                }
                store.dispatch('changeHistoryMsg', historyData);
                data.msg.map((item, index) => {
                    let list = item;
                    list.extra = list.extra ? JSON.parse(list.extra) : { type: 999999999, shareType: 999999 };
                    obj = {
                        id: shopId,
                        index: index,
                        info: list,
                        edit: 'history'
                    }
                    store.dispatch('EDIT_DATA', obj);
                })
            } else {
                store.dispatch('changeHistoryMsg', historyData);
            }
            state.canClick = 1;
        };

        function error() {
            throw new Error('getOffileMsgs err!');
        }
    }
}
const state = {
    canClick: 1, //获取历史消息是否可点开关
    token: ''
}

const historyModule = {
    state,
    mutations,
    actions
};
export default historyModule;
