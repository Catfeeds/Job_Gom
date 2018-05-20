<template>
    <div>
        
        <div v-for="(msg, index) in msgList[uid]"  :data-msgId="msg.msgId" :data-index="index" :key="msg.msgId">  
            <!-- 时间 -->
            <div class="im-chat-time" v-if="msg.isShowTime"><span>{{msg.time}}</span></div>
           
            <dl  :class="{ 'im-chat-user im-chat-me':msg.senderId === userId, 'im-chat-user' : msg.senderId !== userId }" >
                <dt class="im-face">
                    <img :src="msg.senderId === userId ? myAvatar : userInfo[uid].avatar" onerror="imgError(this)">
                </dt> 
               

                <!-- 普通文字 -->
                <dd class="chat-info" v-if="msg.msgType === 1 && msg.extra.type !== 21 && msg.extra.type !== 26 && !msg.isGifEmoji ">
                    <div class="info-box">
                        <div class="info-txt" v-html="msg.msgHtml"></div>
                        <div class="info-load" v-show="msg.loading&&msg.senderId === userId"><em class="im-gif"></em></div>
                        <div class="info-fail" v-show="msg.fail&&msg.senderId === userId" @click="RETRY_SEND"><em class="im-gif"></em></div>
                    </div>
                </dd>
                <dd class="chat-info" v-if="msg.msgType === 2 && msg.extra.type !== 21 && msg.extra.type !== 26 && msg.isErrorType">
                    <div class="info-box">
                        <div class="info-txt" v-html="msg.msgHtml"></div>
                        <div class="info-load" v-show="msg.loading&&msg.senderId === userId"><em class="im-gif"></em></div>
                        <div class="info-fail" v-show="msg.fail&&msg.senderId === userId" @click="RETRY_SEND"><em class="im-gif"></em></div>
                    </div>
                </dd>
                <!-- 商品 -->
                 <dd class="chat-info"  v-if="msg.msgType === 1 && msg.extra.shareType === 11   && msg.extra.type === 21">
                    <div class="info-box">
                        <div class="info-other">
                            <a :href="msg.mallUrl" target="_blank">
                                <div class="topinfo">
                                    <img :src="msg.extra.iconUrl" class="img">
                                    <h2 class="tit">{{msg.extra.proName}}</h2>
                                    <p class="price"> <small>￥</small>{{msg.extra.proPrice}}</p>
                                </div>
                                <div class="botinfo">
                                    <span class="txt">商品</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </dd>
                <!-- 图片 -->
                <dd class="chat-info" v-if="msg.msgType === 3 || msg.isGifEmoji">
                    <div class="info-box" @click.stop='showMask(msg.originImagesUrl)'>
                        <div class="info-img">
                            <em class="im-doubt" v-show="msg.isShowError"></em>
                            <img  :class="{ 'im-gifEmoji': msg.isGifEmoji}" :src="msg.imagesUrl" :origin-src="msg.originImagesUrl">
                        </div>
                        <div class="info-load" v-show="msg.loading && msg.senderId === userId"><em class="im-gif"></em></div>
                        <div class="info-fail" v-show="msg.fail&&msg.senderId === userId" @click="RETRY_SEND"><em class="im-gif"></em></div>
                    </div>
                </dd>
                <!-- 订单 -->
                <dd class="chat-info" v-if="msg.msgType === 1 && msg.extra.type === 26">
                    <div class="info-box">
                        <div class="info-other">
                            <a href="javascript:;">
                                <div class="topinfo">
                                    <img :src="msg.extra.extUrl" class="img">
                                    <div class="order-r">
                                      <p>订单编号：<span>{{msg.extra.extId}}</span></p>
                                      <p>订单金额：<span class="red">{{msg.extra.amount}}</span></p>
                                    </div>
                                </div>
                                <div class="botinfo">
                                    <span class="txt">订单</span>
                                    <span class="date">{{msg.extra.extTime}}</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </dd>
                <!-- 音频 -->
                <dd class="chat-info"  v-if="msg.msgType === 2 && !msg.isErrorType">
                    <div class="info-box">
                        <div class="info-txt">
                            <a href="javascript:;" class="im-voice" :style="{width: msg.width + 'px'}" @click="ADUIO_PLAY" :src="msg.attachUrl">
                                <!-- /点击添加 class=‘active’-->
                                <!-- /最小宽度 65px，最大宽度 205px;-->
                                <em class="im-gif"></em><small>{{msg.attachPlaytime}}''</small>
                            </a>
                        </div>
                    </div>
                </dd>
                <!-- 视频 -->
                <dd class="chat-info" v-if="msg.msgType === 4">
                    <div class="info-box"  @click.stop='showMask(msgList[uid][index].videoUrl)'>
                        <div class="info-video" :url="msgList[uid][index].videoUrl">
                            <!-- <em class="im-doubt"></em> -->
                            <em class="im-play"></em>   
                            <p class="im-bot">
                                <small class="fl">{{msg.attachSize}}</small>
                                <small class="fr">{{msg.attachPlaytime}}</small>
                            </p>
                            <img :src="msg.attachUrl">
                        </div>
                    </div>
                </dd>
            </dl>
        </div>
    </div>
</template>

<script>

import store from '../../../vuex';
import { mapState, mapActions } from 'vuex';

let msgInfoList = store.state.msgInfoList;
let initModule = store.state.initModule;

export default {
    computed: {
        ...mapState({
            msgList: state => msgInfoList.msgList,
            uid: state => initModule.imid,
            userInfo: state => msgInfoList.userInfo,
            userId: state => initModule.userInfo.userId,
            local: state => initModule.local,
            myAvatar: state => initModule.userInfo.myAvatar
        })
    },
    methods:{
      ...mapActions(['ADUIO_PLAY', 'showMask', 'RETRY_SEND'])
    }
}
</script>

<style>
   @import  '../../../../../../css/core/msglist.css';
</style>

   