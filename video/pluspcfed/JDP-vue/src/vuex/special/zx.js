/*
@desc:专项首页module
*/

import Vue from 'vue';
import echarts from 'echarts';
import getApis from '@/utils/apis.js';

const state = {
  deadline: '',
  projectTotal: '',
  top10List: [],
  lastHalfYear:[],
  doneChartsOpts: {
    legend: {
      bottom: 10,
      left: 'center',
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 25,
      icon: 'stack',
      data: ['未完成', '已完成'],
      textStyle: {
        fontSize: 10,
        fontFamily: 'PingFangSC-Regular'
      }
    },
    series: [{
      type: 'pie',
      hoverAnimation: false,
      radius: '70%',
      center: ['50%', '38%'],
      label: {
        normal: {
          position: 'inner',
          formatter: '{d}%',
          fontSize:6
        }
      },
      data: []
    }],
    color: ['#F5A623', '#5B9CD6']
  },
  replyChartsOpts: {
    legend: {
      bottom: 10,
      left: 'center',
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 25,
      icon: 'stack',
      data: ['已回复', '未回复', '无需回复'],
      textStyle: {
        fontSize: 10,
        fontFamily: 'PingFangSC-Regular'
      }
    },
    series: [{
      name: '回复状态',
      type: 'pie',
      hoverAnimation: false,
      radius: '70%',
      center: ['50%', '38%'],
      label: {
        normal: {
          position: 'inner',
          formatter: '{d}%',
          fontSize:6
        }
      },
      data: []
    }],
    color: ['#674C84', '#BF5A77', '#F7DB88']
  }
};

const mutations = {
  getInitialData(state, data) {
    state.deadline = data.date || (new Date().getMonth() + 1 + "/" + new Date().getDate());
    state.projectTotal = data.projectTotal;
    state.top10List = data.list;
    state.lastHalfYear = data.lastHalfYear;
    var doneData = [{
      value: data.projectStatus.unfinish,
      name: '未完成'
    }, {
      value: data.projectStatus.finish,
      name: '已完成'
    }];
    var replyData = [
      { value: data.replyStatus.replied, name: '已回复' },
      { value: data.replyStatus.notReply, name: '未回复'},
      { value: data.replyStatus.noNeedReply, name: '无需回复'}
    ]
    state.doneChartsOpts.series[0].data = doneData;
    state.replyChartsOpts.series[0].data = replyData;

  	var done = document.querySelector('#done');
  	var reply = document.querySelector('#reply');
  	var doneEharts = echarts.init(done);
  	var replyEcharts = echarts.init(reply);
  	doneEharts.setOption(state.doneChartsOpts);
  	replyEcharts.setOption(state.replyChartsOpts);
  }
};

const actions = {
  getInitialData(context) {
    Vue.$http.get(getApis('pandect')).then(function(data) {
      if (data.data.success) {
        context.commit('getInitialData', data.data.data);
      }
    })
  }
};

const indexModule = {
  state,
  mutations,
  actions
};
export default indexModule;
