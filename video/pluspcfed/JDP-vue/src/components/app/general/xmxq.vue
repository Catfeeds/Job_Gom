<template>
  <div class="detail">
    <div class="detailMain" :class="[isShow]">
      <div class="detailtitle clearfix">
        <i class="detailflag"></i>
        <h4 class="detailname">{{configs.detailname}}</h4>
      </div>
      <div class="detailcontainer">
        <ol>
          <li v-if="!!configs.detailstarttime"><span class="detailItems">项目开始时间：</span><span class="detailexplainItems">{{configs.detailstarttime}}</span></li>
          <li v-if="!!configs.detailendtime"><span class="detailItems">项目结束时间：</span><span class="detailexplainItems">{{configs.detailendtime}}</span></li>
          <li v-if="!!configs.detailModules"><span class="detailItems">模块：</span><span class="detailexplainItems">{{configs.detailModules}}</span></li>
          <li v-if="!!configs.detailProjectType"><span class="detailItems">项目类型：</span><span class="detailexplainItems">{{configs.detailProjectType}}</span></li>
          <li v-if="!!configs.detailphase"><span class="detailItems">当前阶段：</span><span class="detailexplainItems">{{configs.detailphase}}</span></li>
          <li class="clearfix"><span class="detailItems fl">项目进度：</span><progress class="detailprogressItems fl" :value="configs.detailprogressContent" max="100"></progress><span class="detailprogressCount">{{configs.detailprogress}}%</span></li>
          <li v-if="!!configs.detailstate"><span class="detailItems">项目状态：</span><span class="detailexplainItems">{{configs.detailstate}}</span></li>
          <li v-if="!!configs.riskTypeChn"><span class="detailItems">项目风险：</span><span class="detailexplainItems">{{configs.riskTypeChn}}</span></li>
          <li v-if="!!configs.depart"><span class="detailItems">中心/部门：</span><span class="detailexplainItems">{{configs.depart}}</span></li>
          <li><span class="detailItems">工作量(人天)：</span><span class="detailexplainItems">{{configs.detailworkload}}</span></li>
          <li class="clearfix">
            <span class="detailItems fl">项目成员：</span>
            <router-link class="detailmemberItems fl" to="/xmsx/xmxq/xmcy/1">查看全部{{configs.detailmembercount}}人</router-link>
          </li>
          <li class="disWebkit" v-if="!!configs.detailProjectDiscrib"><span class="detailItems">项目描述：</span><span :class="{detailexplainItems: true, margin: setClassName(0, configs.detailProjectDiscrib)}">{{configs.detailProjectDiscrib}}</span><span class="switchBtn" v-if="setClassName(2, configs.detailProjectDiscrib)" @click="switchText($event, 6)"></span></li>

          <li class="disWebkit" v-if="!!configs.detailSummary"><span class="detailItems">本周总结：</span><!-- <span class="detailexplainItems margin">{{configs.detailSummary}}</span> --><span :class="{detailexplainItems: true, margin: setClassName(0, configs.detailSummary)}">{{configs.detailSummary}}</span><span class="switchBtn" v-if="setClassName(0, configs.detailSummary)" @click="switchText($event, 4)"></span></li>

          <li class="disWebkit" v-if="!!configs.detailPlan"><span class="detailItems">下周计划：</span><span :class="{detailexplainItems: true, margin: setClassName(1, configs.detailPlan)}">{{configs.detailPlan}}</span><span class="switchBtn" v-if="setClassName(1, configs.detailPlan)" @click="switchText($event, 5)"></span></li>

          <li v-if="parseInt(configs.detailStars)" class="clearfix"><span class="detailItems fl">评分：</span><div class="detailStars">
            <i v-for="item in (parseInt(configs.detailStars))" class="on"></i><i v-if="configs.detailStars != (parseInt(configs.detailStars))" class="half"></i><i v-for="item in (5 - Math.ceil(configs.detailStars))"></i>
          </div></li>
          <li class="clearfix">
            <span class="detailItems">项目燃尽图：</span>
          </li>
          <li class="detailwrapper clearfix">
            <div :class="[classed]" id="echarts" ref="echarts"></div>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import store from '../../../vuex';
  import echarts from 'echarts';
  import byteLen from '../../../utils/byteLen';
  export default {
    name: 'app-xmxq',
    methods:{
      switchText(ev, flag){
        this.$store.commit('switchText', {
          ev,
          flag
        });
      },
      setClassName(flag, text){
        let n = 0;
        switch(flag){
          case 0:
          case 1: 
          case 2: 
            n = 68;
            break;
        };
        if(byteLen(text) < n){
          return false;
        }else{
          return true;
        }
      }
    },
    computed:{
      ...mapState({
        configs:state=>state.xmxqModule.xmxqConfigs,
        option:state=>state.xmxqModule.xmxqOption,
        curProject:state=>state.curProject,
        classed:state=>state.xmxqModule.classed,
        isShow:state=>state.xmxqModule.isShow
      })
    },
    beforeCreate(){
      this.$store.dispatch('clearXmxqHttpGet');
    },
    created(){
      this.$store.dispatch('getCurProject');
      this.$store.dispatch('getXmxqHttpGet', 'day');
    },
    mounted(){
      if(!!store._modules.root.state.BurnoutPic){
        store._modules.root.state.BurnoutPic = echarts.init(this.$refs.echarts);
        store._modules.root.state.BurnoutPic.setOption(this.option);
      }
    },
    updated(){
      store._modules.root.state.BurnoutPic = echarts.init(this.$refs.echarts);
      store._modules.root.state.BurnoutPic.setOption(this.option);
    }
  }
</script>

<style lang="scss">
@import "../../../assets/sass/detail.scss";
.detailStars{
  float: left;
  height: .4rem;
  position: relative;
  top: .15rem;
  i{
    height: .4rem;
    width: .4rem;
    display: inline-block;
    verticle-align: middle;
    margin-right: .1rem;
    background: url(../../../assets/images/offstar.png) center center no-repeat;
    background-size: cover;
    &.on{
      background-image: url(../../../assets/images/onstar.png);
    }
    &.half{
      background-image: url(../../../assets/images/halfstar.png);
    }
  }
}
</style>
