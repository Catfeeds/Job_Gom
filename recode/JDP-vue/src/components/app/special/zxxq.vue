<template>
  <div class="detail zxdetail">
    <div class="detailMain">
      <div class="detailtitle">
        <i class="detailflag"></i>
        <h4 v-if="info.summary" class="detailname">{{info.summary}}</h4>
        <span class="switchBtn" v-if="setClassName(0, info.summary)" @click="switchText($event, 0)"><!-- <em class="header-backicon iconn-1"></em> --></span>
      </div>
      <div class="detailcontainer">
        <ol>
          <li v-if="info.ext_ref_num">
            <span class="detailItems">任务文号：</span>
            <span class="detailexplainItems">{{info.ext_ref_num}}</span>
          </li>
          <li v-if="info.ext_type">
            <span class="detailItems">类型：</span>
            <span class="detailexplainItems">{{info.ext_type}}</span>
          </li>
          <li v-if="info.ext_assign_date">
            <span class="detailItems">下达时间：</span>
            <span class="detailexplainItems">{{info.ext_assign_date}}</span>
          </li>
          <li v-if="info.ext_status">
            <span class="detailItems">项目状态：</span>
            <span class="detailexplainItems">{{info.ext_status}}</span>
          </li>
          <li class="zx_speed" v-if="info.ext_speed_progress">
            <span class="detailItems">专项进度：</span>
            <div class="detailexplainItems">
              <progress :value="info.ext_speed_progress" class="detailprogressItems" max="100"></progress>
              <span class="detailprogressCount">{{parseInt(info.ext_speed_progress)}}%</span>
            </div>
          </li>
          <li v-if="info.assignee_chn">
            <span class="detailItems">技术负责人：</span>
            <span class="detailexplainItems">{{info.assignee_chn}}</span>
          </li>
          <li v-if="members.length">
            <span class="detailItems">其他负责人：</span>
            <span class="detailexplainItems">
              <router-link to="/xmsx/xmxq/xmcy/2" tag="b" class="aaa">查看全部负责人</router-link>
            </span>
          </li>
          <li v-if="info.ext_transfer">
            <span class="detailItems">层级流转：</span>
            <span class="detailexplainItems">{{info.ext_transfer}}</span>
          </li>
          <li v-if="info.ext_requirement">
            <span class="detailItems">任务要求：</span>
            <span :class="{detailexplainItems: true, margin: setClassName(1, info.ext_requirement)}">{{info.ext_requirement}}</span>
            <span class="switchBtn" v-if="setClassName(1, info.ext_requirement)" @click="switchText($event, 1)"><!-- <em class="header-backicon iconn-1"></em> --></span>
          </li>
          <li v-if="info.ext_is_replied">
            <span class="detailItems">是否回复：</span>
            <span class="detailexplainItems">{{info.ext_is_replied}}</span>
          </li>
          <li v-if="info.ext_reply_contents">
            <span class="detailItems">回复内容：</span>
            <span :class="{detailexplainItems: true, margin: setClassName(2, info.ext_reply_contents)}">{{info.ext_reply_contents}}</span>
            <span class="switchBtn" v-if="setClassName(2, info.ext_reply_contents)" @click="switchText($event, 2)"><!-- <em class="header-backicon iconn-1"></em> --></span>
          </li>
          <li v-if="attach.length">
            <span class="detailItems">附件：</span>
            <span class="detailexplainItems specialLi">
              <b @click="turnToFj(item, index)" v-for="(item, index) in attach" :key="index" track-by="index">{{item.file_name}}</b>
            </span>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import store from '../../../vuex';
import byteLen from '../../../utils/byteLen';
export default {
  name: 'zxxq',
  computed:{
    ...mapState({
      info:state=>state.zxxqModule.info,
      attach:state=>state.zxxqModule.attach,
      members:state=>state.zxxqModule.members,
      id:state=>state.curProject.curProjectId
    })
  },
  methods: {
    switchText(ev, flag){
      this.$store.commit('switchText', {
        ev,
        flag
      });
    },
    turnToFj(item, index){
      this.$store.commit('setFjIndex', index);
      this.$router.push({path: '/zx/fj'});
    },
    setClassName(flag, text){
      let n = 0;
      switch(flag){
        case 0: 
          n = 68;
          break;
        case 1: 
          n = 68;
          break;
        case 2: 
          n = 76;
          break;
      };
      if(byteLen(text) < n){
        return false;
      }else{
        return true;
      }
   }
  },
  beforeCreate(){

  },
  created(){
    this.$store.dispatch('getXqData', this.id);
  },
  mounted(){
    
  }
}
</script>
<style lang="scss" scope>
@import "../../../assets/sass/zxDetail.scss";
.switchBtn{
  background: url(../../../assets/images/up.png) center center no-repeat;
}
</style>