import Vue from 'vue';
import echarts from 'echarts';
import getApi from '@/utils/apis.js';

import initTotle from '@/utils/initTotle.js';
import getTabData from '@/utils/getTabData.js';
import getYscale from '@/utils/getYscale.js';
import getXscale from '@/utils/getXscale.js';
import handleSeries from '@/utils/handleSeries.js';
import getLegend from '@/utils/getLegend.js';
import handleDate from '@/utils/handleDate.js';
import defaultOpts from '@/utils/defaultOpts.js';
import getTabTitle from '@/utils/tableTitle.js';

const state = {
  //echarts图数据
  rtOption: defaultOpts,
  rsOption: defaultOpts,
  rwOption: defaultOpts,
  //表格数据
  rtTableConfigs: { //人天数据
    showDMW: true, //是否展示图表的月/周/日
    showTip:true,//展示注释tip
    tips:'总人天数不仅包含各阶段的数量<br/>还包含了项目相关的数值。',
    topTitles: getTabTitle('gzl_rt'), //表格上面头部
    daLists: []
  },
  rsTableConfigs: { //人数数据
    showDMW: true, //是否展示图表的月/周/日
    showTip:true,//展示注释tip
    tips:'总人数不仅包含各阶段的数量<br/>还包含了项目相关的数值。',
    topTitles: getTabTitle('gzl_rs'), //表格上面头部
    daLists: []
  },
  rwTableConfigs: { //任务数数据
    showDMW: true, //是否展示图表的月/周/日
    showTip:true,//展示注释tip
    tips:'总任务数不仅包含各阶段的数量<br/>还包含了项目相关的数值。',
    tbSty:true,//任务数表格调样式
    topTitles: getTabTitle('gzl_rw'), //表格上面头部
    daLists: []
  }
};

const mutations = {
  //获取echarts数据
  getGzlEchartsData(state, option) {
    var param = option.param;
    var date = option.date;
    if (param == 1) { //人天
      var api = '';
      //判断日、周、月，请求不同接口
      switch (date) {
        case 'day':
          api = getApi('workDayImgDay');
          break;
        case 'week':
          api = getApi('workDayImgWeek');
          break;
        case 'month':
          api = getApi('workDayImgMonth');
      };

      Vue.$http.get(api).then(function(data) {
        if(!data.data.success) return;
        var da = data.data.data;
        var scaleDa = da.scale;
        var listsDa = da.lists;
        //重置echarts的option
        state.rtOption.legend.itemGap = 10;
        state.rtOption.legend.left = 25;

        scaleDa = handleDate(scaleDa, date);
        state.rtOption.xAxis.data = getXscale(scaleDa);
        state.rtOption.yAxis.max = getYscale(listsDa).max;
        state.rtOption.yAxis.interval = getYscale(listsDa).interval;
        state.rtOption.series = handleSeries(listsDa);
        state.rtOption.legend.data = getLegend(listsDa);

        //设置echarts的legend参数
        state.rtOption.legend.itemGap = 20;
        var gzlEharts = echarts.init(document.querySelector('#echarts'));
        gzlEharts.setOption(state.rtOption)
      })
    } else if (param == 2) { //人数
      var api = '';
      //判断日、周、月，请求不同接口
      switch (date) {
        case 'day':
          api = getApi('workManCntImgDay');
          break;
        case 'week':
          api = getApi('workManCntImgWeek');
          break;
        case 'month':
          api =getApi('workManCntImgMonth');
      };

      Vue.$http.get(api).then(function(data) {
        if(!data.data.success) return;
        var da = data.data.data;
        var scaleDa = da.scale;
        var listsDa = da.lists;
        //重置echarts的option
        scaleDa = handleDate(scaleDa, date);
        state.rsOption.xAxis.data = getXscale(scaleDa);
        state.rsOption.yAxis.max = getYscale(listsDa).max;
        state.rsOption.yAxis.interval = getYscale(listsDa).interval;
        state.rsOption.series = handleSeries(listsDa);
        state.rsOption.legend.data = getLegend(listsDa);
        var gzlEharts = echarts.init(document.querySelector('#echarts'));
        gzlEharts.setOption(state.rsOption)
      })
    } else { //任务数
      var api = '';
      //判断日、周、月，请求不同接口
      switch (date) {
        case 'day':
          api = getApi('processDay');
          break;
        case 'week':
          api = getApi('processWeek');
          break;
        case 'month':
          api = getApi('processMonth');
      };

      Vue.$http.get(api).then(function(data) {
        // if(!data.data.success) return;
        var da = data.data.data;
        var scaleDa = da.scale;
        var listsDa = da.lists;
        //重置echarts的option
        scaleDa = handleDate(scaleDa, date);
        state.rwOption.xAxis.data = getXscale(scaleDa);
        state.rwOption.yAxis.max = getYscale(listsDa).max;
        state.rwOption.yAxis.interval = getYscale(listsDa).interval;
        state.rwOption.series = handleSeries(listsDa);
        state.rwOption.legend.data = getLegend(listsDa);
        var gzlEharts = echarts.init(document.querySelector('#echarts'));
        gzlEharts.setOption(state.rwOption)
      })
    }
  },
  //获取表格数据
  getGzlTableData(state, data) {
    if (data == 1) { //人天
      Vue.$http.get(getApi('workDayTab')).then(function(data) {
        if(!data || !data.data || !data.data.success) {
          state.rtTableConfigs.showTip = false;
          return;
        }
        var da = data.data.data;
        var totleData = {
          title: "人天数合计",
          data: initTotle(da)
        }
        var tableData = getTabData(da, totleData);
        state.rtTableConfigs.daLists = tableData;
      }).catch(function(error){
        state.rtTableConfigs.showTip = false;
      })
    } else if (data == 2) { //人数
      Vue.$http.get(getApi('workManCntTab')).then(function(data) {
        if(!data || !data.data || !data.data.success) {
          state.rsTableConfigs.showTip = false;
          return;
        }
        var da = data.data.data;
        var totleData = {
          title: "人数合计",
          data: initTotle(da)
        }
        var tableData = getTabData(da, totleData);
        state.rsTableConfigs.daLists = tableData;
      }).catch(function(error){
        state.rsTableConfigs.showTip = false;
      })
    } else { //任务数
      Vue.$http.get(getApi('processTab')).then(function(data) {
        if(!data || !data.data || !data.data.success) {
          state.rwTableConfigs.showTip = false;
          return;
        }
        var da = data.data.data;
        var totleData = {
          title: "任务数合计",
          data: initTotle(da)
        }
        var tableData = getTabData(da, totleData);
        state.rwTableConfigs.daLists = tableData;
      }).catch(function(error){
        state.rwTableConfigs.showTip = false;
      })
    }
  }
};

const actions = {
  getGzlEchartsData(store, date) {
    store.commit('getGzlEchartsData', date);
  },
  getGzlTableData(store, data) {
    store.commit('getGzlTableData', data);
  }
};

const indexModule = {
  state,
  mutations,
  actions
};
export default indexModule;
