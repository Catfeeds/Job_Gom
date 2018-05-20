<template>
  <div class="main">
    <div class="box">
      <div class="search-head">
        <span @click="getZxData(0)" :class="{filter:true, on:showNum==0}">全部</span>
        <span @click="getZxData(1)" :class="{filter:true, on:showNum==1}">过去3个月</span>
        <span @click="getZxData(2)" :class="{search:true, on:showNum==2}">过去1个月</span>
      </div>
      <div class="clips"></div>
      <div class="charts" id="zxsCharts"></div>
      <ul class="list">
        <router-link tag="li" class="clearfix" v-for="(top,index) in tableLists" :key="index" :to="{name:'zxlb',params:{id:2},query:{name:top.username,nameChn:top.username_chn,flag:'personalLists'}}">
          <div class="top-left">
            <b>{{++index}}.</b>
            <b class="topName">{{top.username_chn}}</b>
            <span>{{top.position}}</span>
          </div>
            <div class="top-right">
            <span class="topNum">{{top.total}}</span>
            <em class="icon iconn-5 zxrw"></em>
          </div>
        </router-link>
    </ul>
    </div>
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex';
export default {
  name: 'zxs',
  methods: {
    ...mapActions({
      getZxData:'getZxData'
    })
  },
  computed:{
    ...mapState({
      tableLists:state=>state.zxsModule.tableLists,
      showNum:state=>state.zxsModule.showNum
    })
  },
  created(){
    this.$store.dispatch('getZxData',this.showNum)
  }
}
</script>
<style lang='scss'>
.box{
  .clips{
    height: .1rem;
    background-color: #f3f5f7;
  }
}
.charts{
  height: 7.8rem;
}
.zxrw{
  font-size: .24rem;
  margin-bottom: .04rem;
}
.list{ 
  margin-top: .3rem;
  padding-left: .15rem;
  padding-bottom: .3rem;
  li{
    border-bottom: 1px solid #ddd;
    &:first-child{
      border-top:1px solid #ddd;
    }
    div{
      height: 1.02rem;
      line-height: 1.02rem;
      font-family: PingFangSC-Regular;
      font-size: .3rem;
      color: #333333;
    }
  .top-left{
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 5.28rem;
    .topName{
      margin-right: .24rem;
    }
    span{
      color: #3F3F3F;
    }
  }
  .top-right{
    float: right;
    margin-right: .28rem;
    .topNum{
      font-family: PingFangSC-Regular;
      margin-right: .30rem;
      color:#333;
      font-weight: bold;
    }
    .icon:before{
      color:#666;
    }
  }
  }
  .topDate{
    border-bottom: none;
    margin-top: .15rem;
    padding-bottom: 0;
  }
  .topAll{
    border-bottom: none;
    text-align: center;
    font-size: .28rem;
  color: #4A90E2;
  margin-top: .2rem;
  padding-bottom: .28rem;
  span{
    margin-right: .1rem;
  }
  .icon{
    font-size: .24rem;
  }
  .icon:before{
    color: #4A90E2;
  }
  }
}
</style>
