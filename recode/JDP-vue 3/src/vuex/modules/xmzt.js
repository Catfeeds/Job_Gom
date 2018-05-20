import Vue from 'vue';
import echarts from 'echarts';
import getApis from '@/utils/apis.js';

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
  xmztOption: defaultOpts,
  //表格数据
  xmztTableConfigs: {
    showDMW: true, //是否展示图表的月/周/日
    topTitles: getTabTitle('xmzt'), //表格上面头部
    daLists: []
  }
};

const mutations = {
  //获取echarts数据
  getXmztEchartsData(state, date) {
    var api = '';
    //判断日、周、月，请求不同接口
    switch (date) {
      case 'day':
        api = getApis('statusDay');
        break;
      case 'week':
        api = getApis('statusWeek');
        break;
      case 'month':
        api = getApis('statusMonth');
    };

    Vue.$http.get(api).then(function(data) {
      if (!data.data.success) return;
      var da = data.data.data;
      var scaleDa = da.scale;
      var listsDa = da.lists;
      //重置echarts的option
      scaleDa = handleDate(scaleDa, date);
      state.xmztOption.xAxis.data = getXscale(scaleDa);
      state.xmztOption.yAxis.max = getYscale(listsDa).max;
      state.xmztOption.yAxis.interval = getYscale(listsDa).interval;
      state.xmztOption.series = handleSeries(listsDa);
      state.xmztOption.legend.data = getLegend(listsDa);
      var ztEharts = echarts.init(document.querySelector('#echarts'));
      ztEharts.setOption(state.xmztOption)
    })
  },
  //获取表格数据
  getXmztTableData(state, date) {
    Vue.$http.get(getApis('statusTab')).then(function(data) {
      if (!data || !data.data || !data.data.success) return;
      var da = data.data.data;
      var totleData = {
        title: "总数",
        data: initTotle(da)
      }
      var tableData = getTabData(da, totleData);
      state.xmztTableConfigs.daLists = tableData;
    })
  }
};

const actions = {
  getXmztEchartsData(store, date) {
    store.commit('getXmztEchartsData', date);
  },
  getXmztTableData(store) {
    store.commit('getXmztTableData')
  }
};

const indexModule = {
  state,
  mutations,
  actions
};
export default indexModule;
