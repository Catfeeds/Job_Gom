<template>
  <div class="main">
    <div class="nav-list">
      <div class="search-head">
        <span @click="getReplyStatus(0)" :class="{filter:true, on:showNum==0}">全部</span>
        <span @click="getReplyStatus(1)" :class="{filter:true, on:showNum==1}">过去3个月</span>
        <span @click="getReplyStatus(2)" :class="{search:true, on:showNum==2}">过去1个月</span>
      </div>
      <div class="clips"></div>
      <div class="doneCharts" id="replyCharts">
      </div>
      <div class="clips"></div>
      <div class="everyDone">
        <h2>每人完成数</h2>
        <div class="everyCharts" id="everyCharts"></div>
      </div>
      <div>
       <div class="boxW">
        <table class="tables">
          <tr class="trHead">
            <th v-for="(title,index) in tableTitles"  :class="tabLeftCls(index)">{{title}}</th>
          </tr>
          <tr v-for="list in tableLists">
            <td class="leftHead titleW zxTable">{{list.username_chn}}</td>
            <td v-for="(da,i) in list.dataDetail" :class="{canClick:!!da}" @click="routeTo({name:'zxlb',params:{id:3},query:{type:typeArr[showNum],nameCHN:list.username_chn,name:list.username,reply:replyArr[i]['EN'],titleCHN:replyArr[i]['CHN'],flag:'replyLists'}},$event)">{{da}}</td>
          </tr>
        </table>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router';
import { mapState,mapActions } from 'vuex';
export default {
  name: 'special-hfzt',
  data:function(){
    return {
      replyArr:[{EN:'replied',CHN:'已回复'},{EN:'noReply',CHN:'未回复'},{EN:'no',CHN:'无需回复'},{EN:'total',CHN:'总数'}],
      typeArr:['all','threeMonths','oneMonth']
    }
  },
  computed:{
    ...mapState({
      showNum:state=>state.hfztModule.showNum,
      tableTitles:state=>state.hfztModule.tableTitles,
      tableLists:state=>state.hfztModule.tableLists
    })
  },
  methods: {
    ...mapActions({
      getReplyStatus:'getReplyStatus'
    }),
    routeTo(route,event){
      if(event.target.innerText !=='0'){
        router.push(route)
      }
    },
    tabLeftCls(index){
      return {leftHead:!index}
    }
  },
  created:function(){
    this.$store.dispatch('getReplyStatus',this.showNum);
  }
}
</script>
<style lang='scss'>
  .doneCharts{
    height: 5.5rem;
  }
  .canClick{
    text-decoration: underline;
    color: blue;
  }
  .rightBorder{
    border-right: 1px solid #ddd;
  }
  .everyDone{
    padding-left: .15rem;
    h2{
      font-size: .32rem;
      height: 1.25rem;
      line-height: 1.25rem;
      font-weight: bold;
      color: #333;
      padding-left: .2rem;
      
    }
    .everyCharts{
      height: 6.5rem
    }
  }
  .boxW{
    .tables{
      .zxTable{
        color: #333;
        width: 1.76rem;
      }
    }
  }
</style>
