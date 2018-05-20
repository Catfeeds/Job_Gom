import store from '../index';
import { imgLoad } from '../../plugin/img-load';
import { getDateFormat, getNowDayDate } from '../../plugin/dateFormat';
import { audioPlay, audioStop } from '../../plugin/audioPlay';
import Vue from 'vue';
import { parseEmoji } from '../../plugin/parseEmoji';
import { parseLink } from '../../plugin/parseLink';

const state = {
    msgList: {},
    userInfo: {},
    lastMsgTime: {},
    isHistory: false
};
const mutations = {
    'GET_USER_MSG': (state, data) => {
        let info = data.item;
        let imId = store.state.initModule.imid;
        if (state.msgList[data.item.shopId] === undefined) {

            Vue.set(state.msgList, data.item.shopId, []);
        }
        let index = state.msgList[data.item.shopId].length;
        if( info.lastMsg !== undefined ){
            info.lastMsg.extra = info.lastMsg.extra !== undefined && JSON.parse(info.lastMsg.extra);

            if (info.lastMsg.msgType !== undefined && info.lastMsg.msgBody !== '') {

                store.dispatch('EDIT_DATA', {
                    info: info.lastMsg,
                    id: data.item.shopId,
                    index: index,
                    edit: 'last'
                })

            }
        }
        if (state.userInfo[data.item.shopId] === undefined) {
            state.userInfo[data.item.shopId] = {
                name: data.item.name,
                avatar: data.item.icon
            }
        }
    },
    'SEND_IM_MSG': (state, data) => {
        let sendMsg = data.msg.imMsg;
        let imId = parseInt(sendMsg.groupId.split('_')[2], 10) || 0;
        let initModule = store.state.initModule;
        let shopId = parseInt(initModule.imid, 10);
        let timer = initModule.titleTimer;

        let myId = store.state.initModule.userInfo.userId;
        let senderId = sendMsg.senderId;

        let isIsend = !!(myId == senderId);

        if (timer === null && imId !== shopId && !isIsend) {
            store.dispatch('addTitleWarn')
        }

        if (state.msgList[imId] === undefined) {

            Vue.set(state.msgList, imId, []);
        }

        let index = state.msgList[imId].length;
        sendMsg.extra = sendMsg.extra ? JSON.parse(sendMsg.extra) : { type: 999999999, shareType: 999999 };

        if (sendMsg.msgType !== undefined) {
            store.dispatch('EDIT_DATA', {
                info: sendMsg,
                id: imId,
                index: index,
                edit: 'send'
            })

        }
    },
    'ADUIO_PLAY': (state, e) => {
        var _this = $(e.target).hasClass('im-voice') ? $(e.target) : $(e.target).parents('.im-voice').eq(0);
        if (!_this.hasClass('active')) {
            audioPlay(_this);
        } else {
            audioStop(function() {
                _this.removeClass('active');
            })
        }
    },
    'EDIT_DATA': (state, data) => {
        let initModule = store.state.initModule;
        let id = data.id;
        let index = data.index;
        let info = data.info;
        info = getServerVideoAndPicPath(info);
        let msgHtml = '';
        if (info.msgType === 1) {


            info.isGifEmoji = false;
            if (info.extra.shareType === 11 && info.extra.type === 21) {
                info.extra.proPrice = info.extra.proPrice.split('.')[1].length > 1 ? info.extra.proPrice : (info.extra.proPrice + '0');
                info.mallUrl = $GLOBAL_CONFIG.mall_domain + 'item/' + info.extra.shopId + '-' + info.extra.proId + '.html';
            } else if (info.extra.type === 24) {
                let url = initModule.gifEmoji + info.extra.iconUrl.split('/')[0] + '/' + info.extra.iconUrl;
                imgLoad(url, function() {
                    info.imagesUrl = url;
                    info.originImagesUrl = url;
                    info.isGifEmoji = true;
                    info.loading = false;
                    info.fail = false;
                }, function() {
                    info.msgHtml = '[收到了一个表情，请在手机上查看]';
                });

            } else {
                msgHtml = info.msgBody || '';
                msgHtml = parseLink(msgHtml);
                msgHtml = parseEmoji(msgHtml);
                info.msgHtml = msgHtml.replace(/[\r\n]/g, '<br/>');
            }
        }
        //图片
        if (info.msgType === 3) {
            let imgFix = info.attch[0].attachUrl.split('.');
            imgFix = imgFix[imgFix.length - 1];
            info.imagesUrl = initModule.resourceUrl + info.attch[0].attachUrl;
            info.originImagesUrl = initModule.resourceUrl + info.attch[0].attachUrl.replace(/_Small/, '');
            info.isShowError = false;
            imgLoad(info.imagesUrl, function() {}, function() {
                state.msgList[id][index].isShowError = true;
                state.msgList[id][index].imagesUrl = initModule.imIconUrl + '/src/images/img-fail.png';
                state.msgList[id].splice(index, 1, state.msgList[id][index]);
            });

        }
        //音频
        if (info.msgType === 2) {
            /*info.attachPlaytime = info.attch[0].attachPlaytime;
            info.attachUrl = initModule.resourceUrl + info.attch[0].attachUrl;
            info.width = 80 + 120 / 90 * info.attch[0].attachPlaytime;
            info.isErrorType = false;
            if(!window.AudioContext){*/
                info.isErrorType = true;
                info.msgHtml = '[收到了一个语音，请在手机上查看]';
            //}
        }
        //视频
        if (info.msgType === 4) {

            info.attachPlaytime = '00:' + (parseInt(info.attch[0].attachPlaytime, 10) > 10 ? info.attch[0].attachPlaytime : '0' + info.attch[0].attachPlaytime);
            info.attachUrl = initModule.resourceUrl + info.attch[0].attachUrl;
            info.videoUrl = info.attachUrl.replace('_img.jpg', '_vedio.mp4');
            info.attachSize = Math.ceil(info.attch[0].attachSize / 1024 * 100) / 100 + 'M';
        }

        if (data.edit === 'send') {

            if (info.sendTime - state.lastMsgTime[id] > 3 * 60 * 1000) {
                info.isShowTime = true;
                state.lastMsgTime[id] = info.sendTime;
                info.time = getDateFormat(info.sendTime);
            }
        } else if (data.edit === 'history') {

            info.isShowTime = true;
            info.time = getDateFormat(info.sendTime);

        }
        //判断数据插入位置
        if (data.edit === 'history') {

            state.msgList[id].unshift(info);
            state.isHistory = true;
            if (state.msgList[id].length === 1000) {
                state.msgList[id].splice(0, 1);
                //console.log(454332)
                initModule.hasHistory = false;
            }

        } else {
            if (state.msgList[id].length === 200 && state.isHistory) {
                state.msgList[id].splice(0, 1);
            }
            state.msgList[id].push(info);

        }
        if (data.edit !== 'last' && data.edit !== 'history') {

            let timer = null;
            timer = setTimeout(function() {
                $('#im-scroll').scrollTop($('#im-scroll')[0].scrollHeight);
                clearTimeout(timer);
            }, 200);

        }
        if (info.sendTime > initModule.nowDayDateEnd) {
            getNowDayDate();
            store.dispatch('EDIT_DATA_SENDTIME');
        }
        Vue.set(state.lastMsgTime, id, info.sendTime);
        initModule.hasNewMsg = true;
    },
    'EDIT_DATA_SENDTIME': (state) => {

        let msgList = state.msgList;
        let { keys, values, entries } = Object;

        for (let key of keys(msgList)) {
            msgList[key].map((item, index) => {

                state.msgList[key][index].time = getDateFormat(item.sendTime);
            })
        }
    },
    'CHANGE_USER': (state, data) => {
        //let initModule = store.state.initModule;
        let shopId = parseInt( data.item.shopId, 10);
        if( store.state.initModule.imid !== shopId ){
            store.state.initModule.imid = shopId;
            state.uid = shopId;
            store.state.sendMsgModule.sendMsgBody = '';
            $("#sendMsg").val('');
            if ($('#im-scroll').length > 0) {
                let timer = null;
                timer = setTimeout(function() {
                    $('#im-scroll').scrollTop($('#im-scroll')[0].scrollHeight);
                    clearTimeout(timer);
                }, 200);
            }
        }
    }
};
const actions = {
    'GET_USER_MSG': (store, data) => {
        store.commit('GET_USER_MSG', data);
    },
    'SEND_IM_MSG': (store, data) => {
        store.commit('SEND_IM_MSG', data);
    },
    'ADUIO_PLAY': (store, e) => {
        store.commit('ADUIO_PLAY', e);
    },
    'EDIT_DATA': (store, data) => {
        store.commit('EDIT_DATA', data);
    },
    'EDIT_DATA_SENDTIME': (store) => {
        store.commit('EDIT_DATA_SENDTIME');
    },
    'CHANGE_USER': (store, data) => {

        store.commit('CHANGE_USER', data);
    }
};
const msgInfoList = {
    state,
    mutations,
    actions
};
export default msgInfoList;
