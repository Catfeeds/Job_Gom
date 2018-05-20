<template>
  <div class="riskBox">
    <div :class="{tbBox:!configs.noSlide}">
      <div class="boxW">
        <table class="tables" v-show="showForm" :class="{ztPage:!configs.noSlide,isZl:!configs.showDMW,tbSty:configs.tbSty}" @click="turnToList">
          <tr class="trHead">
            <th v-for="(title,index) in configs.topTitles"  :class="tabLeftCls(index)">{{title}}</th>
          </tr>
          <tr v-for="list in configs.daLists">
            <td class="leftHead titleW">{{list.title}}</td>
            <td v-for="da in list.data" :class="canClick(da)">{{da}}</td>
          </tr>
        </table>
      </div>

    </div>
    <div class="tipBox" v-show="showTip">
      <ul>
        <li class="title">注：</li>
        <li class="content" v-html="configs.tips"></li>
      </ul>
    </div>
    <div class="chart" v-show="showCharts">
      <div class="chartTop"  v-show="configs.showDMW">
        <span :class="{btnActive:curMonth}" @click="changeDate(0)">月</span>
        <em>|</em>
        <span :class="{btnActive:curWeek}" @click="changeDate(1)">周</span>
        <em>|</em>
        <span :class="{btnActive:curDay}" @click="changeDate(2)">日</span>
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
export default {
  name: 'commonCharts',
  data(){
    return{
      showForm:true,
      showCharts:false,
      curMonth:true,
      curWeek:false,
      curDay:false
    }
  },
  computed:{
    showTip:function(){
      return this.configs.showTip&&this.showForm
    }
  },
  props:['configs'],
  methods:{
    canClick: function (data){
      let title = this.$router.currentRoute.meta.title;
      return {
        canClick: (data != 0 && title != '项目阶段人天分析' && title != '项目阶段人数分析')
      }
    },
    tabLeftCls:function(index){
      return {
        leftHead:!index,
        titleW:!index && !this.configs.showDMW
      }
    },
    changeTab:function(num){
      //点击图形后开始绘图
      if(this.curMonth){
        this.emitRouteDate('month');
      }
      if(this.curWeek){
        this.emitRouteDate('week');
      }
      if(this.curDay){
        this.emitRouteDate('day');
      }
      if(num){
        this.showCharts = true;
        this.showForm = false;
      }else{
        this.showCharts = false;
        this.showForm = true;
      }
    },
    emitRouteDate:function(date){
      var param = this.$route.params.id;
      switch (this.$route.name){
        case 'xmjd':
        this.$store.dispatch('getXmjdEchartsData',date);
        break;
        case 'xmzt':
        this.$store.dispatch('getXmztEchartsData',date);
        break;
        case 'lxxq':
        this.$store.dispatch('getXmlxEchartsData',{date:date,param:param});
        break;
        case 'gzlxq':
        this.$store.dispatch('getGzlEchartsData',{date:date,param:param});
        break;
      }
    },
    changeDate:function(type){
      switch (type){
        case 0://月
        this.curMonth = true;
        this.curWeek = false;
        this.curDay = false;
        this.emitRouteDate('month');
        break;
        case 1://周
        this.curMonth = false;
        this.curWeek = true;
        this.curDay = false;
        this.emitRouteDate('week');
        break;
        case 2://日
        this.curMonth = false;
        this.curWeek = false;
        this.curDay = true;
        this.emitRouteDate('day');
        break;
      }
    },
    turnToList(ev){
      let target = ev.target;
      if(this.$router.currentRoute.meta.title == '项目阶段任务数分析'){
        this.$store.dispatch('setTurnToDetail', false);
      }else{
        this.$store.dispatch('setTurnToDetail', true);
      }
      if(target.tagName == 'TD'  && target.className != 'leftHead titleW' && target.innerHTML != 0){
        if(target.className != 'canClick')return;
        this.$store.dispatch('initProjectState');
        let $th = document.getElementsByClassName('trHead')[0].getElementsByTagName('th');
        this.$store.dispatch('setReffer', 'table');
        this.$store.dispatch('setCurrentTableMes', {
          text: $th[target.cellIndex].innerHTML,
          month: target.parentNode.firstChild.innerHTML.replace(/&amp;/g, '&'),
          refferTitle: this.$route.meta.title
        });
        this.$router.push({path:'/xmsx/sxjg'});
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='sass'>
@import '../../assets/sass/commonCharts.scss';
.riskBox td.canClick
  text-decoration: underline
  color: blue
</style>
