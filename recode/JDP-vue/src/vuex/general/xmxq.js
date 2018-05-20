import Vue from 'vue';
import echarts from 'echarts';
import store from '../../vuex';
import router from '../../router';

import getApis from '@/utils/apis.js'
import getDates from '@/utils/getDate.js';
import getBurnXscale from '@/utils/getBurnXscale.js';
import getBurnDayXscale from '@/utils/getBurnDayXscale.js';
import getYscale from '@/utils/getYscale.js';


const state = {
  isShow : false,
  classed : '',
  xmxqOption : {
    legend:{
      top: 0,
      width:'100%'
    },
    grid:{
      top: 27,
      left:40
    },
    // toolbox: {
    //     feature: {
    //         saveAsImage: {}
    //     }
    // },
    axisPointer: {
      link: {xAxisIndex: 'all'}
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            params = params[0];
            var date = new Date(params.name);
              return `日期：${date.getFullYear()}/${date.getMonth()}/${date.getDate()}</br>子任务剩余数：${params.value[1]}`;
        },
        axisPointer: {
            animation: false
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    xAxis: {
        type: 'time',
        min:"data[0].value[0]",
        max:"data[data.length-1].value[0]",
        interval: +(24 * 3600 * 1000),
        boundaryGap : false,
        axisLine: {onZero: true},
        splitLine: {
            show: false
        },
        axisTick:{
          show:false
        },
        axisLabel:{
          formatter: function (value) {
              var date = new Date(value);
              return (date.getMonth() + 1) + '.' + date.getDate();
          },
          width:"120%",
          borderWidth: 30,
          interval:0,
          fontWeight: 100,
          showMaxLabel: null,
          textStyle:{
            fontSize:4
          }
        }
    },
    yAxis: {
        type: 'value',
        min: 0,
        max: "Math.max(...maxData)",
        splitNumber: 5,
        splitLine: {
            show: false
        },
        axisTick:{
          show:false
        },
        axisLabel:{
          interval:0,
          textStyle:{
            fontSize:8
          }
        }
    },
    series: [{
        name: '燃尽图项目数',
        type: 'line',
        symbolSize: 3,
        showSymbol: false,
        hoverAnimation: true,
        data: "data"
    }]
  },
  xmxqConfigs : {
    detailname: "",
    detailstarttime: "",
    detailendtime: "",
    detailphase: "",
    detailprogress: 0,
    detailstate: "",
    detailworkload: 0,
    detailmembercount: 0,
    detailmember: {},
    curProjectId: '',
    detailprogressContent: 0
  }
}

const mutations = {
  clearXmxqHttpGet(state) {
    state.isShow = 'vHide';
  },
  getXmxqHttpGet(state, date) {
    var api = '', parmas = {};
    //判断日、周、月，请求不同接口
    switch (date) {
      case 'day':
        api = getApis('projectDetail');
        break;
    };
    switch (state.xmxqConfigs.reffer) {
      case 'filter':
      case 'search':
      case 'table':
        parmas = {
          projectId : state.xmxqConfigs.curProjectId,
          type: 0
        }
        break;
    }
    Vue.$http({
      method: 'GET',
      url: api,
      params: parmas
    }).then(function(data) {
      if(data.data.code == '200') {
        state.isShow = 'vShow';
        state.xmxqConfigs.curProjectId = data.data.data.projectId;
        store.dispatch('getXmxqPageData', data);
        store.dispatch('getXmxqEchartsData', data);
      }/* else {
        router.replace('/xmsx/ssjg');
      }*/
    })
  },
  getXmxqEchartsData(state, data) {
      let resData = data.data,
      scaleData = [],
      maxData = [],
      findData = -1,
      curTime = 0,
      lastTime = parseInt(resData.data.projectEndData.split('-').join(''));

      resData.data.projectBurnGraph.every((item, index) => {
         curTime = parseInt(item.burnKey.split('-').join(''));
         if(curTime > lastTime){
           findData = index;
           return findData;
         } else {
           findData = resData.data.projectBurnGraph.length;
           return findData;
         }
      })

      getDates(resData.data.projectBurnGraph.slice(0, findData)).forEach((item, index) => {
        scaleData.push(...item.data)
        maxData.push(...item.maxData);
      });

      // console.log(state.xmxqConfigs.detailstarttime, state.xmxqConfigs.detailendtime)
      // console.log(getBurnDayXscale(state.xmxqConfigs.detailstarttime, state.xmxqConfigs.detailendtime));
      var options = getBurnDayXscale(state.xmxqConfigs.detailstarttime, state.xmxqConfigs.detailendtime, store);
      state.xmxqOption.xAxis.min = options.min;
      state.xmxqOption.xAxis.max = options.max;
      state.xmxqOption.xAxis.interval = options.interval;
      state.xmxqOption.yAxis.max = getYscale(getDates(resData.data.projectBurnGraph), 'maxData').max;
      state.xmxqOption.yAxis.interval = getYscale(getDates(resData.data.projectBurnGraph), 'maxData').interval;
      state.xmxqOption.series[0].data = scaleData;
  },
  getXmxqPageData(state, data) {
      // 模拟配置
      //
      // xmxqConfigs : {
      //   detailname: "项目生产推进",
      //   detailstarttime: "2017-7-20",
      //   detailendtime: "2017-12-10",
      //   detailphase: "开发阶段",
      //   detailprogress: 30,
      //   detailstate: "正常进行",
      //   detailworkload: 300,
      //   detailmember: 200,
      // }

      let resData = data.data;
      let pageData = {
        detailname: resData.data.title,
        detailstarttime: resData.data.projectBeginData,
        detailendtime: resData.data.projectEndData,
        detailphase: resData.data.currProcess,
        detailprogress: resData.data.projectSpeed>100?100:resData.data.projectSpeed,
        detailstate: resData.data.projectStatus,
        detailworkload: resData.data.workLoad,
        detailmembercount: resData.data.projectMember.totalNum,
        detailmember: resData.data.projectMember,
        detailprogressContent: resData.data.projectSpeed
      }
      Object.assign(state.xmxqConfigs, pageData);
  },
  getXmxqEchartsClass(state, classdata) {
    state.classed = classdata;
    // console.log(state.classed)
  }
}

const actions = {
    getCurProject(store) {
      store.state.xmxqConfigs.detailname = store.rootState.curProject.curName;
      Object.assign(store.state.xmxqConfigs, store.rootState.curProject);
    },
    getXmxqHttpGet(store, date) {
      store.commit('getXmxqHttpGet', date);
    },
    getXmxqPageData(store, data) {
      store.commit('getXmxqPageData', data);
    },
    getXmxqEchartsData(store, data) {
      store.commit('getXmxqEchartsData', data);
    },
    getXmxqEchartsClass(store, classdata) {
      store.commit('getXmxqEchartsClass', classdata);
    },
    clearXmxqHttpGet(store) {
      store.commit('clearXmxqHttpGet');
    }
}

const indexModule = {
  state,
  mutations,
  actions
}

export default indexModule;
