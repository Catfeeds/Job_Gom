import Vue from 'vue';
import store from '../../vuex';
import App from '../../vue/app.vue';
import VueLazyLoad from 'vue-lazyload';
import lazyload from '../../plugin/img-lazyload';

let userId = $GLOBAL_CONFIG.imUserId;
let token = $GLOBAL_CONFIG.token;
Vue.config.silent = true;
let vueApp = null;

let imtype = store.state.initModule.imType;
let imid = store.state.initModule.imid;

const getXmList = (data) => {
    let talkLists = data.group;
    let reg = /[9]{10}$/;
    let xmList = [];
    let xmInfo;
    if (talkLists.length) {
        xmList = talkLists.filter((item, index) => {
            return reg.test(item.groupId)
        });
        if (!xmList.length) {
            let groupId = userId+'_'+'9999999999';
            xmList = [{
                unreadNum: 0,
                shopId: '0',
                name: '小美',
                icon: store.state.initModule.imIconUrl + '/src/images/gome-1.png',
                groupId:groupId ,
                hasHistoryMsg: 0,
                showNoMsg: 1, //聊天框内是否显示‘暂无消息’--0：不显示，1：显示
                data: {
                    unreadNum: 0,
                    shopId: '0',
                    name: '小美',
                    icon: store.state.initModule.imIconUrl + '/src/images/gome-1.png',
                    groupId:groupId ,
                    hasHistoryMsg: 0,
                    showNoMsg: 10
                }
            }];
        } else {
            //添加头像、昵称、shopId、是否有历史消息
            xmList[0].shopId = 0;
            xmList[0].name = '小美';
            xmList[0].showNoMsg = 0;
            xmList[0].icon = store.state.initModule.imIconUrl + '/src/images/gome-1.png';
            if (xmList[0].lastMsg && xmList[0].lastMsg.msgSeqId > 1) {
                xmList[0].hasHistoryMsg = 1;
            } else {
                xmList[0].hasHistoryMsg = 0;
            }
        }
    }
    xmInfo = xmList[0];
    store.dispatch('myXmList', { xmList: xmInfo });
    //分发获取用户消息
    store.dispatch('GET_USER_MSG', { item: xmInfo });
    //分发获取用户名
    store.dispatch('GET_USER_NAME', { item: xmInfo });
    if (imtype == 'xm') {
        store.dispatch('selected', { item: xmInfo });
    }
}
const getShopLists = (data) => {
    let talkLists = data.group;
    let shopReg = /^\d+_\d+_\d{2,}$/;

    let shopLists = [];
    if (talkLists.length) { //筛选出商家的会话列表
        shopLists = talkLists.filter((item, index) => {
            return shopReg.test(item.groupId);
        });
    }

    /*商家会话列表按时间先后排序
    shopLists = shopLists.sort(function(a, b) {
        return b.lastMsg.sendTime - a.lastMsg.sendTime })
        */

    let shopIds = []; //shopId数组
    let includeFlag = 0; //会话列表是否包含新点进来商家标识,0为不包含,1为包含
    shopLists.forEach((item, index) => { //循环会话列表数据
        let shopId = item.groupId.split('_')[2];
        item.shopId = shopId; //将shopId放到item中
        item.unreadNum = 0;
        item.showNoMsg = 0;
        if (item.lastMsg && item.lastMsg.msgSeqId > 1) {
            item.hasHistoryMsg = 1;
        } else {
            item.hasHistoryMsg = 0;
        }

        if (shopId == imid) { //商家先前在会话列表中
            includeFlag = 1;
            shopLists.splice(index, 1);
            shopLists.unshift(item);
        }
        shopIds.push(shopId); //将所有的shopId放到数组中
    });
    //商家不在会话列表中
    if (imtype == 'shop') {
        if (!includeFlag) {
            let newShopList = {
                groupId: userId + '_' + '9999999997' + '_' + imid,
                shopId: imid,
                lastMsg: { msgType: 1, msgBody: '', sendTime: 0 },
                hasHistoryMsg: 0,
                showNoMsg: 1
            };
            shopIds.unshift(imid);
            shopLists.unshift(newShopList);
        }
    }


    let shopsStr = shopIds.join('_'); //"469_478"请头求像和昵称传入shopId的数据格式
    let da = {
        "shopsId": shopsStr
    };
    let urlReg = /^http$/i;
    $.ajax({
        type: 'post',
        url: $GLOBAL_CONFIG['ucenter_domain'] + 'im/initShopList',
        data: da,
        success: (data) => {
            lazyload(Vue, VueLazyLoad);
            vueApp = new Vue({
                store,
                el: '#app',
                components: {
                    App
                },
                beforeCreate: function() {
                    $(document).on('click', function() {
                        store.state.faceModule.isShowFace = false;
                    });
                    //分发隐藏loading方法
                    store.dispatch('changeLoadListFlag');
                    //如果参数有数据则直接返回数据，没有 success:true，
                    //如果错误才会给返回success:false，所以这样判断
                    if (data.success == false) return;
                    for (var k in data) {
                        let dataK = data[k];
                        shopLists.map((item, index) => {
                            if (item.groupId.split('_')[2] == k) {
                                //添加头像和昵称
                                item.name = dataK.data.name;
                                item.icon = dataK.data.icon;

                                //分发获取用户消息
                                store.dispatch('GET_USER_MSG', { item: item });
                                //分发获取用户名
                                store.dispatch('GET_USER_NAME', { item: item });
                                if (item.shopId == imid) {
                                    store.dispatch('selected', { item: item });
                                }
                            }
                        })
                    }
                    store.dispatch('myShopLists', { myShopLists: shopLists });
                }
            });
        },
        error: () => {
            throw new Error('get avatar and nickname error!')
        }
    })
}

const groupFn = (data) => {
    getXmList(data);
    getShopLists(data);
}
const err = () => {
    throw new Error('getGroupList error!');
}
let groupMsgOpts = {
    option: {
        uid: userId,
        time: 0,
        token: token,
        listGroupMsg: groupFn,
        error: err
    }
};

export const getGroupList = () => {
    sendListGroupMsgs(groupMsgOpts);
}
