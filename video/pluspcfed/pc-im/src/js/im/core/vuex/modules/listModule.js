import store from '../index';
import Vue from 'vue';
const state = {
    myXmList: {}, //小美会话列表数据
    myShopLists: [], //商家客服会话列表数据
    curTalk: {}, //当前会话数据
    bellRemind: 1, //来信息响铃标识
    loadListFlag: 1 //loading标识
};
const mutations = {
    'myXmList': (state, payload) => {
        let xmList = payload.xmList;
        let showNoMsg = xmList.showNoMsg;
        let myXmList = {
            unreadNum: 0,
            msgBody: '',
            sendTime: '',
            groupId: store.state.initModule.userInfo.userId + '_9999999999',
            data: xmList,
            hasHistoryMsg: 0,
            showNoMsg: showNoMsg,
            name: '小美',
            icon: store.state.initModule.imIconUrl + '/src/images/gome-1.png'
        };
        if (xmList.lastMsg) {
            let lastMsg = xmList.lastMsg;
            let msgType = lastMsg.msgType;
            let unreadNum = xmList.unreadNum;
            let hasHistoryMsg = xmList.hasHistoryMsg;


            let msgBody = handleMsgBody(lastMsg);
            let time = handleTime(lastMsg);

            //处理未读消息
            if (unreadNum > 99) {
                unreadNum = '...';
            };
            /*如果初始化没有最后一条消息的话直接将msgBody和sendTime清空即可，商家同理*/
            myXmList = {
                msgBody: msgBody,
                data: xmList,
                sendTime: time,
                hasHistoryMsg: hasHistoryMsg,
                showNoMsg: showNoMsg,
                unreadNum: unreadNum,
                groupId: xmList.groupId,
                shopId:'0',
                name: '小美'
            }
        }
        state.myXmList = myXmList;
    },
    'myShopLists': (state, payload) => {
        let myShopLists = payload.myShopLists;
        let myShopList = [];
        let now = +new Date();
        let time = '';
        myShopLists.map((item, index) => {
            let msgType = item.lastMsg.msgType;
            let lastMsg = item.lastMsg;
            let sendTime = item.lastMsg.sendTime;
            let time;

            let msgBody = handleMsgBody(lastMsg);
            if (sendTime) {
                time = handleTime(lastMsg);
            }
            let unreadNum = item.unreadNum;
            if (unreadNum > 99) {
                unreadNum = '...';
            }
            let imIconUrl = store.state.initModule.imIconUrl;

            let icon = item.icon;
            let name = item.name;
            let hasHistoryMsg = item.hasHistoryMsg;
            let showNoMsg = item.showNoMsg;
            myShopList[index] = {
                groupId: item.groupId,
                icon: item.icon,
                seqId: item.seqId,
                name: item.name,
                unreadNum: unreadNum,
                hasHistoryMsg: hasHistoryMsg,
                showNoMsg: showNoMsg,
                data: item,
                msgBody: msgBody,
                time: time
            }
        })
        state.myShopLists = myShopList;
    },
    'addXmMsg': (state, payload) => {
        let xmList = payload.data;
        let imMsg = xmList.msg.imMsg;
        let groupId = imMsg.groupId;
        if (groupId) {
            let lastMsg = xmList.msg.imMsg;
            let msgType = lastMsg.msgType;

            let unreadNum = state.myXmList.unreadNum;

            let msgBody = handleMsgBody(lastMsg);
            let time = handleTime(lastMsg);
            if (groupId !== state.curTalk.groupId && !xmList.isIsend) {
                unreadNum = handleNum(unreadNum);
            } else {
                state.curTalk.showNoMsg = 0;
            }

            state.myXmList.showNoMsg = 0;
            state.myXmList.msgBody = msgBody;
            state.myXmList.sendTime = time;
            state.myXmList.unreadNum = unreadNum;
        }
    },
    'addShopMsg': (state, payload) => {
        let data = payload.data;
        let imMsg = data.msg.imMsg;

        let groupId = imMsg.groupId;
        let inListFlag = 0;
        state.myShopLists.forEach((item, index) => {
            if (item.data.groupId == groupId) {
                inListFlag = 1;
                let msgBody = handleMsgBody(imMsg);
                let time = handleTime(imMsg);
                item.msgBody = msgBody;
                item.time = time;
                item.showNoMsg = 0;
                if (groupId !== state.curTalk.groupId && !data.isIsend) {
                    item.unreadNum = handleNum(item.unreadNum);
                    state.myShopLists.splice(index, 1);
                    state.myShopLists.unshift(item);
                } else {
                    state.curTalk.showNoMsg = 0;
                }
            }
        });
        if (!inListFlag) {
            let groupId = imMsg.groupId;
            let shopId = groupId.split('_')[2];
            let msgType = imMsg.msgType;
            let msgBody = imMsg.msgBody;
            let msgSeqId = imMsg.msgSeqId;

            let sendTime = imMsg.sendTime;
            let time = handleTime(imMsg);
            let json = { //模拟的拉取会话列表返回数据
                groupId: groupId,
                shopId: shopId,
                lastMsg: { msgType: msgType, msgBody: msgBody, sendTime: sendTime },
                hasHistoryMsg: 0,
                icon: $GLOBAL_CONFIG['imIconUrl'] + '/src/images/im-gif1.gif',
                name: '',
                showNoMsg: 0
            }

            let newShopList = { //要添加到myShopLists中的数据
                groupId: groupId,
                shopId: shopId,
                lastMsg: { msgType: msgType, msgBody: '', sendTime: sendTime },
                hasHistoryMsg: 0,
                showNoMsg: 1,
                msgSeqId: msgSeqId,
                msgBody: msgBody,
                time: time,
                data: json,
                name: '',
                icon: $GLOBAL_CONFIG['imIconUrl'] + '/src/images/im-gif1.gif',
                unreadNum: 0
            };
            //针对在APP端给新商家发消息，未读消息数的处理
            if (groupId !== state.curTalk.groupId && !data.isIsend) {
                newShopList.unreadNum = handleNum(newShopList.unreadNum);
            } else {
                state.curTalk.showNoMsg = 0;
            }
            let da = { "shopsId": shopId + "" };
            $.ajax({
                type: 'post',
                url: $GLOBAL_CONFIG['ucenter_domain'] + 'im/initShopList',
                data: da,
                success: function(data) {
                    if (data.success == false) return;
                    let dataK = data[shopId].data;
                    newShopList.icon = dataK.icon;
                    newShopList.name = dataK.name;
                    newShopList.data.icon = dataK.icon;
                    newShopList.data.icon = dataK.name;
                    if (newShopList.groupId == state.myShopLists[0].groupId) {
                        state.myShopLists.splice(0, 1);
                        state.myShopLists.unshift(newShopList);
                    } else {
                        state.myShopLists.unshift(newShopList);
                    }
                    //分发获取用户消息
                    store.dispatch('GET_USER_MSG', { item: state.myShopLists[0] });
                    //分发获取用户名
                    store.dispatch('GET_USER_NAME', { item: state.myShopLists[0] });
                }
            });
        }
    },
    'selected': (state, payload) => {
        let selItem = payload.item;
        let groupId = selItem.groupId;
        let xmReg = /[9]{10}$/;
        let shopReg = /^\d+_\d+_\d+$/;
        if (xmReg.test(groupId)) {
            state.myXmList.unreadNum = 0;
        } else if (shopReg.test(groupId)) {
            state.myShopLists.forEach((item, index) => {
                if (item.groupId == groupId) {
                    item.unreadNum = 0;
                }
            })
        }else{
            state.myXmList.unreadNum = 0;
            selItem = store.state.listModule.myXmList;
        }
        store.dispatch('CHANGE_USER', { item: selItem });
        state.curTalk = payload.item;

        //清除新消息的title提醒
        let newMsgFlag = 0;
        let xmUnreadNum = state.myXmList.unreadNum;
        if (!xmUnreadNum) {
            state.myShopLists.map((item, index) => {
                if (item.unreadNum) {
                    newMsgFlag = 1;
                    return;
                }
            })
            let titleTimer = store.state.initModule.titleTimer;
            if (!newMsgFlag && titleTimer) {
                store.dispatch('cancelTitleWarn');
            }
        }
    },
    'changeRemind': (state) => {
        state.bellRemind = state.bellRemind ? 0 : 1;
    },
    'changeLoadListFlag': (state, payload) => {
        state.loadListFlag = 0;
    },
    'changeUnreadLists': (state, payload) => {
        state.unreadLists = payload.unreadLists;
    },
    'changeHistoryMsg': (state, payload) => {
        let groupId = payload.groupId;
        let hasHistoryMsg = payload.hasHistoryMsg;
        let xmReg = /[9]{10}$/;
        let shopReg = /^\d+_\d+_\d{2,}$/;
        if (xmReg.test(groupId)) {
            state.myXmList.hasHistoryMsg = hasHistoryMsg;
        } else if (shopReg.test(groupId)) {
            state.myShopLists.map((item, index) => {
                if (item.groupId == groupId) {
                    item.hasHistoryMsg = hasHistoryMsg;
                }
            })
        }
        state.curTalk.hasHistoryMsg = hasHistoryMsg;
    }
};
const handleMsgBody = (lastMsg) => {
    let msgBody;
    let msgType = lastMsg.msgType;
    switch (msgType) {
        case 1:
            msgBody = lastMsg.msgBody;
            break;
        case 2:
            msgBody = '[语音]';
            break;
        case 3:
            msgBody = '[图片]';
            break;
        case 4:
            msgBody = '[视频]';
            break;
        case 5:
            msgBody = '[位置]';
            break;
        case 6:
            msgBody = '[附件]';
            break;
        default:
            msgBody = '[消息透传]';
    };
    return msgBody;
};
const handleTime = (lastMsg) => {
    let sendTime = lastMsg.sendTime;
    let sendT = new Date(sendTime);
    let nowDayDateStart = store.state.initModule.nowDayDateStart;
    let nowDayDateEnd = store.state.initModule.nowDayDateEnd;

    let time;

    //处理时间
    switch (true) {
        case sendTime >= nowDayDateStart && sendTime <= nowDayDateEnd:
            let m = sendT.getMinutes();
            m = m < 10 ? '0' + m : m;
            time = sendT.getHours() + ":" + m;
            break;
        default:
            time = sendT.getFullYear() + '/' + (sendT.getMonth() + 1) + "/" + sendT.getDate();
    }
    return time;
};
const handleNum = (num) => {
    let unreadNum = num;
    if (unreadNum !== '...') {
        unreadNum++;
        //处理未读消息
        if (unreadNum > 99) {
            unreadNum = '...';
        };
    }
    return unreadNum;
}

const actions = {
    'myXmList': (store, payload) => {
        store.commit('myXmList', payload);
    },
    'myShopLists': (store, payload) => {
        store.commit('myShopLists', payload);
    },
    'addXmMsg': (store, payload) => {
        store.commit('addXmMsg', payload);
    },
    'addShopMsg': (store, payload) => {
        store.commit('addShopMsg', payload);
    },
    'selected': (store, payload) => {
        store.commit('selected', payload);
    },
    'changeRemind': (store) => {
        store.commit('changeRemind');
    },
    'changeLoadListFlag': (store) => {
        store.commit('changeLoadListFlag');
    },
    'changeUnreadLists': (store, payload) => {
        store.commit('changeUnreadLists', payload);
    },
    'sendImMsg': (store) => {
        store.commit('sendImMsg')
    },
    'changeHistoryMsg': (store, payload) => {
        store.commit('changeHistoryMsg', payload)
    }
};
const leftModule = {
    state,
    mutations,
    actions
};
export default leftModule;
