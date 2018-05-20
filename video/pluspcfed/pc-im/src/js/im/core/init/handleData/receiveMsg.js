import store from '../../vuex';

const handleRecMsg = (data) => {
    let myShopLists = store.state.listModule.myShopLists;
    let curTalk = store.state.listModule.curTalk;
    let myXmList = store.state.listModule.myXmList;
    let bellRemind = store.state.listModule.bellRemind;

    let myId = store.state.initModule.userInfo.userId;
    let senderId = data.msg.imMsg.senderId;

    let isIsend = !!(myId == senderId);
    let infotip = document.querySelector('#infotip');
    //如果消息发送不成功，就不执行下面
    if (data.head.result !== 0) return;
    //清除上次响铃
    if (bellRemind && !isIsend) {
        infotip.pause();
        infotip.currentTime = 0;
    }
    let groupId = data.msg.imMsg ? (data.msg.imMsg.groupId ? data.msg.imMsg.groupId : '') : ''; //来消息的groupId
    //筛选小美或商家的消息
    var r = /^(\d+_\d+_\d+)$|([9]{10}$)/;
    if (!r.test(groupId)) return;
    //判断是否响铃
    if (groupId !== curTalk.groupId && bellRemind && !isIsend) {
        infotip.play();
    }
    data.isIsend = isIsend;
    if (groupId == myXmList.groupId) {
        store.dispatch('addXmMsg', { data: data });
        /*处理会话列表小美数据*/
    } else {
        store.dispatch('addShopMsg', { data: data });
        // 处理会话列表商家客服数据
    }
}
export default handleRecMsg;
