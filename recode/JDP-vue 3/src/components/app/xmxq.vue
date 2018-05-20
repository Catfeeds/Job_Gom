<template>
  <div class="detail">
    <div class="detailMain" :class="[isShow]">
      <div class="detailtitle clearfix">
        <i class="detailflag"></i>
        <h4 class="detailname">{{configs.detailname}}</h4>
      </div>
      <div class="detailcontainer">
        <ol>
          <li><span class="detailItems">项目开始时间：</span><span class="detailexplainItems">{{configs.detailstarttime}}</span></li>
          <li><span class="detailItems">项目结束时间：</span><span class="detailexplainItems">{{configs.detailendtime}}</span></li>
          <li><span class="detailItems">当前阶段：</span><span class="detailexplainItems">{{configs.detailphase}}</span></li>
          <li class="clearfix"><span class="detailItems fl">项目进度：</span><progress class="detailprogressItems fl" :value="configs.detailprogress" max="100"></progress><span class="detailprogressCount">{{configs.detailprogressContent}}%</span></li>
          <li><span class="detailItems">项目状态：</span><span class="detailexplainItems">{{configs.detailstate}}</span></li>
          <li><span class="detailItems">工作量(人天)：</span><span class="detailexplainItems">{{configs.detailworkload}}</span></li>
          <li class="clearfix">
            <span class="detailItems fl">项目成员：</span>
            <router-link class="detailmemberItems fl" to="/xmsx/xmxq/xmcy">查看全部{{configs.detailmembercount}}人</router-link>
          </li>
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
  import store from '../../vuex';
  import echarts from 'echarts';
  export default {
    name: 'app-xmxq',
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
@import "../../assets/sass/detail.scss";
</style>
