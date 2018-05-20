import store from '../index';

import {imgLoad} from '../../plugin/img-load';


const state = {
    uploadImgData: {}

};

const mutations = {

    'SHOW_FACE': (state, e) => {
        store.state.faceModule.isShowFace = !store.state.faceModule.isShowFace;
        store.dispatch('FACE_MOUSEOVER', 0);
        let nSl = $(window).scrollLeft();
        let nSt = $(window).scrollTop();
        let $faceBtn = $(e.target);
        let nOff = $faceBtn.offset();
        let $face = $('#facePop');
        let nFaceHeight = $face.height();
        let nFaceWidth = $face.width();
        $face.css({
            'left': nOff.left - nSl - 12,
            'top': nOff.top - nFaceHeight - $faceBtn.height() - 12
        });
    },
    'SEND_IMAGE': (state, e) => {
        let initModule = store.state.initModule;
        let curTalk = store.state.listModule.curTalk;
        let objUpload = {
            option: {
                appId: initModule.appId,
                uid: initModule.userInfo.userId,
                file: e.target,
                fileUpload: uploadCb,
                error: err
            }
        };
        ajaxFileUpload(objUpload);

        function uploadCb(data) {
            let cbData = data.data;
            state.uploadImgData = cbData;

            let groupId = curTalk.groupId;
            let shopReg = /^\d+_\d+_\d+$/;
            let xmReg = /[9]{10}$/;
            let userType;
            let shopId;
            if (xmReg.test(groupId)) {
                userType = 2;
                shopId = 0;
            } else if (shopReg.test(groupId)) {
                userType = 1;
                shopId = groupId.split('_')[2];
            } else {
                return;
            }

            let attachId = +new Date();
            let attachSize = e.target.files[0].size;
            let attachName = e.target.files[0].name;
            let attachType = 3;
            let attch = [{
                attachId: attachId + "", //附件id没规则(String类型)
                attachName: attachName, //附件名字没规则
                attachType: attachType, //附近类型
                attachUrl: cbData.imgSmallName, //附件地址
                attachSize: attachSize, //附件大小
                width: cbData.width, //图片附件宽度大小
                height: cbData.height, //图片附件高度大小
                attachUploadtime: cbData.uploadTime //附件上传时间
            }];
            let extra = {
                crmpopShopId: shopId,
                crmpopServiceType: "COMMON_MSG",
                crmpopServiceId: "COMMON_MSG"
            };
            let opts = {
                option: {
                    imUserId: initModule.userInfo.userId,
                    userType: userType, //1商家；2小美
                    msgType: 3,
                    groupType: 5,
                    msgBody: '',
                    attch: attch,
                    shopId: shopId,
                    extra: JSON.stringify(extra),

                }
            };

            
            $(e.target).val('');

            let msgId = sendImMsg(opts);
            let imgInfo = opts.option;
            let imgFix = cbData.imgUrl.split('.');
            imgFix = imgFix[imgFix.length-1];
            imgInfo.imagesUrl = cbData.imgUrl;
            imgInfo.originImagesUrl =  cbData.imgUrl.split('_')[0] + '.' + imgFix;
            imgInfo.senderId =  initModule.userInfo.userId;
            imgInfo.loading =  true;
            imgInfo.fail =  false;
            imgInfo.msgId = msgId; 
            let msgInfoList = store.state.msgInfoList.msgList;
            let index = msgInfoList[initModule.imid].length
            imgLoad( imgInfo.imagesUrl, function(){}, function(){
                msgInfoList[initModule.imid][index].isShowError = true;
                msgInfoList[initModule.imid][index].imagesUrl = initModule.imIconUrl + '/src/images/img-fail.png';
                msgInfoList[initModule.imid].splice(index, 1, msgInfoList[initModule.imid][index]);
            });
            msgInfoList[initModule.imid].push(imgInfo);

            let timer = null;
            timer = setTimeout(function(){
                $('#im-scroll').scrollTop( $('#im-scroll')[0].scrollHeight);
                clearTimeout(timer);
            }, 200);
        };

        function err() {
            throw new Error('uploadImg err!');
        }
    },
    'RETRY_SEND': ( state, e ) => {
        let index = $(e.target).parents('dl').eq(0).parent().attr('data-index');
        index = parseInt( index, 10 );
        let initModule = store.state.initModule;
        let msgListInfo = store.state.msgInfoList.msgList;
        let uid = initModule.userInfo.userId;
        let shopId = initModule.imid;
        let msgInfo = msgListInfo[shopId][index];
        let options = {}
        if( msgInfo.msgType === 1 ){
            options = {
                option: {
                    imUserId: uid,
                    userType: ( initModule.imid === 0 ? 2 : 1 ),
                    msgType: 1,
                    groupType: 5,
                    msgBody: msgInfo.msgBody, 
                    attch: null,
                    shopId: shopId,
                    extra: JSON.stringify(msgInfo.extra)
                }
            };
            
        }else if( msgInfo.msgType === 3 ){
            options = {
                option: {
                    imUserId: uid,
                    userType: ( initModule.imid === 0 ? 2 : 1 ), //1商家；2小美
                    msgType: 3,
                    groupType: 5,
                    msgBody: '',
                    attch: msgInfo.attch,
                    shopId: shopId,
                    extra: JSON.stringify(msgInfo.extra)
                }
            };
        }
        let msgId = sendImMsg(options);
        console.log('重发后的MSGID:'+msgId)
        if( msgId === '' ){
            console.log('为空的MSGID'+msgId)
            msgListInfo[shopId][index].loading = false;
            msgListInfo[shopId][index].fail = true;
        }else{
            console.log('不为空的MSGID'+msgId)
            msgListInfo[shopId][index].loading = true;
            msgListInfo[shopId][index].fail = false;
            msgListInfo[shopId][index].msgId = msgId;
        }
    }
};


const actions = {
    'SHOW_FACE': (context, e) => {
        context.commit('SHOW_FACE', e);
    },
    'SEND_IMAGE':(state, e) => {
        state.commit('SEND_IMAGE', e);
    },
    'RETRY_SEND': ( store, e ) => {
        store.commit( 'RETRY_SEND', e );
    }
};

const handelModule = {
    state,
    mutations,
    actions
};
export default handelModule;
