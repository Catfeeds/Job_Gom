<template>
  <div class="main">
    <div class="nav-list">
      <div class="search-head">
        <span @click="getProStatus(0)" :class="{filter:true, on:showNum==0}">全部</span>
        <span @click="getProStatus(1)" :class="{filter:true, on:showNum==1}">过去3个月</span>
        <span @click="getProStatus(2)" :class="{search:true, on:showNum==2}">过去1个月</span>
      </div>
      <div class="clips"></div>
      <div class="doneCharts" id="doneCharts">
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
            <td v-for="(da,i) in list.proStatus" :class="{canClick:!!da}" @click="routeTo({name:'zxlb',params:{id:3},query:{type:typeArr[showNum],nameCHN:list.username_chn,name:list.username,done:doneArr[i]['EN'],titleCHN:doneArr[i]['CHN'],flag:'doneLists'}},$event)">{{da}}</td>
          </tr>
        </table>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex';
import router from '@/router';
export default {
  name: 'special-wcqk',
  data:function(){
    return {
      doneArr:[{EN:'done',CHN:'已完成'},{EN:'undone',CHN:'未完成'},{EN:'total',CHN:'总数'}],
      typeArr:['all','threeMonths','oneMonth']
    }
  },
  computed:{
    ...mapState({
      showNum:state=>state.wcqkModule.showNum,
      tableTitles:state=>state.wcqkModule.tableTitles,
      tableLists:state=>state.wcqkModule.tableLists
    })
  },
  methods: {
    ...mapActions({
      getProStatus:'getProStatus'
    }),
    tabLeftCls(index){
      return {leftHead:!index,zxLeft:!index}
    },
    routeTo(route,event){
      if(event.target.innerText !=='0'){
        router.push(route)
      }
    }
  },
  created:function(){
    this.$store.dispatch('getProStatus',this.showNum);
  }
}
</script>
<style lang='scss'>
  .doneCharts{
    height: 5.5rem;
  }
  .rightBorder{
    border-right: 1px solid #ddd;
  }
  .everyDone{
    padding-left: .15rem;
    padding-bottom: .15rem;
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
        width: 1.76rem;
      }
      .zxLeft{
        width: 1.5rem;
      }
    }
  }


</style>
