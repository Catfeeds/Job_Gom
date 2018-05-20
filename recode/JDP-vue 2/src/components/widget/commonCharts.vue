<template>
  <div class="riskBox">
    <div :class="{tbBox:configs.isZT}">
       <table class="tables" v-show="showForm" :class="{ztPage:configs.isZT}">
          <tr class="trHead">
              <th v-for="(title,index) in configs.topTitles"  :class="{leftHead:!index}">{{title}}</th>
          </tr>
          <tr v-for="list in configs.daLists">
            <td class="leftHead">{{list.title}}</td>
            <td v-for="da in list.data">{{da}}</td>
          </tr>
       </table>
     </div>
     <div class="chart" v-show="showCharts">
       <div class="chartTop"  v-show="configs.showDMW">
         <span class="btnActive">月</span>
         <em>|</em>
         <span>周</span>
         <em>|</em>
         <span>日</span>
       </div>
       <div class="grayLine" v-show="configs.showDMW"></div>
       <div class="drawing" id="echarts"></div>
     </div>
     <div class="bottomBtn">
       <div class="tbBtn" @click="changeTab(0)" :class="{btnActive:showForm}">表格</div>
       <div class="graphBtn" @click="changeTab(1)" :class="{btnActive:showCharts}">图形</div>
     </div>
  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  name: 'app-zl',
  data(){
    return{
      showForm:true,
      showCharts:false
    }
  },
  props:['configs'],
  methods:{
    changeTab:function(num){
      if(num){
        this.showCharts = true;
        this.showForm = false;
      }else{
        this.showCharts = false;
        this.showForm = true;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='sass'>
@import '../../assets/sass/commonCharts.scss';
</style>
