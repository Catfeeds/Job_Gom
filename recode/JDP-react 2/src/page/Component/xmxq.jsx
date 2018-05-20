import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactMixin from 'react-mixin';
import pureRender from 'pure-render-decorator';
import { History, Link } from 'react-router';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import echarts from 'echarts';
// import CommonCharts from './widget/commonCharts';
import commonStyle from './widget/commonStyle';

import Connect from './connect/template';

class Xmxq extends Component {
  constructor(props, context) {
    super(props);

    this.state = {
      configs : {
        detailname: "项目生产推进",
        detailstarttime: "2017-7-20",
        detailendtime: "2017-12-10",
        detailphase: "开发阶段",
        detailprogress: 30,
        detailstate: "正常进行",
        detailworkload: 300,
        detailmember: 200,
      },
      option : {
        grid:{
          left:40
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        axisPointer: {
          link: {xAxisIndex: 'all'}
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                params = params[0];
                var date = new Date(params.name);
                  return `日期：</br>${date.getFullYear()}/${date.getDate()}/${date.getMonth()}</br></br>子任务剩余数：</br>${params.value[1]}`;
            },
            axisPointer: {
                animation: false
            }
        },
        xAxis: {
            type: 'time',
            boundaryGap: [0, '100%'],
            min:'data[0].value[0]',
            max:'data[data.length-1].value[0]',
            interval: +(24 * 3600 * 1000),
            splitNumber : 5,
            boundaryGap : false,
            axisLine: {onZero: true},
            splitLine: {
                show: true
            },
            axisTick:{
              show:false
            },
            axisLabel:{
              formatter: function (value) {
                  var date = new Date(value);
                  return (date.getMonth() + 1) + '-' + date.getDate();
              }
            }
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            min: 0,
            max: 'Math.max(...maxData)',
            splitLine: {
                show: true
            },
            axisTick:{
              show:false
            }
        },
        series: [{
            name: '燃尽图项目数',
            type: 'line',
            symbolSize: 3,
            showSymbol: true,
            hoverAnimation: true,
            data: 'data'
        }]
      }
    }
  }

  renderCommonCharts() {
    return (
      <div className="detail">
        <div className="detailMain">
          <div className="detailtitle clearfix">
            <i className="detailflag"></i>
            <h4 className="detailname">{this.state.configs.detailname}</h4>
          </div>
          <div className="detailcontainer">
            <ol>
              <li><span className="detailItems">项目开始时间：</span><span className="detailexplainItems">{this.state.configs.detailstarttime}</span></li>
              <li><span className="detailItems">项目结束时间：</span><span className="detailexplainItems">{this.state.configs.detailendtime}</span></li>
              <li><span className="detailItems">当前阶段：</span><span className="detailexplainItems">{this.state.configs.detailphase}</span></li>
              <li className="clearfix"><span className="detailItems fl">项目进度：</span><progress className="detailprogressItems fl" value="{this.state.configs.detailprogress}" max="100"></progress><span className="detailprogressCount">{this.state.configs.detailprogress}%</span></li>
              <li><span className="detailItems">项目状态：</span><span className="detailexplainItems">{this.state.configs.detailstate}</span></li>
              <li><span className="detailItems">工作量(人天)：</span><span className="detailexplainItems">{this.state.configs.detailworkload}</span></li>
              <li className="clearfix">
                <span className="detailItems fl">项目成员：</span>
                <Link className="detailmemberItems fl" to="/xmsx/xmxq/xmcy">查看全部{this.state.configs.detailmember}人</Link>
              </li>
              <li className="clearfix">
                <span className="detailItems">项目燃尽图：</span>
              </li>
              <li className="detailwrapper clearfix">
                <div className="detaildrawing" id="echarts" ref="CommonChartsEcharts"></div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    )
  }

  componentWillMount() {
    var data = [],
      maxData = [],
      resData = [
        {
            //横轴坐标
            'burnKey': '2017-07-01',
            //纵轴数值
            'burnValue': '111',
        },
        {
            //横轴坐标
            'burnKey': '2017-07-02',
            //纵轴数值
            'burnValue': '222',
        },
        {
            //横轴坐标
            'burnKey': '2017-07-03',
            //纵轴数值
            'burnValue': '303',
        },
        {
            //横轴坐标
            'burnKey': '2017-07-04',
            //纵轴数值
            'burnValue': '225',
        },
        {
            //横轴坐标
            'burnKey': '2017-07-05',
            //纵轴数值
            'burnValue': '409',
        },
        {
            //横轴坐标
            'burnKey': '2017-07-06',
            //纵轴数值
            'burnValue': '308',
        },
        {
            //横轴坐标
            'burnKey': '2017-07-07',
            //纵轴数值
            'burnValue': '206',
        },
        {
            //横轴坐标
            'burnKey': '2017-07-08',
            //纵轴数值
            'burnValue': '233',
        },
        {
            //横轴坐标
            'burnKey': '2017-07-09',
            //纵轴数值
            'burnValue': '377',
        },
        {
            //横轴坐标
            'burnKey': '2017-07-10',
            //纵轴数值
            'burnValue': '545',
        },
        {
            //横轴坐标
            'burnKey': '2017-07-11',
            //纵轴数值
            'burnValue': '288',
        },
        {
            //横轴坐标
            'burnKey': '2017-07-12',
            //纵轴数值
            'burnValue': '111',
        }
      ];

    function getData(resData) {
      // console.log(...resData.name)
        var now = +new Date(...resData.name);
        var oneDay = 24 * 3600 * 1000;
        var maxNow = new Date(+now+oneDay);
        now = new Date(+now);
        var value = resData.value;
        maxData.push(Math.round(value));

        data.push({
            name: now.toString(),
            value: [
                [now.getFullYear(), now.getMonth(), now.getDate()].join('/'),
                Math.round(value)
            ]
        });
    }
    resData.map((item, index) => {
      return {name : item.burnKey.split('-'), value: item.burnValue}
    }).forEach((itemData) => {
      getData(itemData);
    })

    // console.log(data)
    // console.log(Math.max(...maxData))

    let modifyOption = {
      xAxis : Object.assign({}, this.state.option.xAxis, {
        min: data[0].value[0],
        max: data[data.length - 1].value[0]
      }),
      yAxis : Object.assign({}, this.state.option.yAxis, {
        max: Math.max(...maxData)
      }),
      series: [Object.assign({}, this.state.option.series[0], {
        data: data
      })]
    }

    this.setState({
      option: Object.assign({}, this.state.option, modifyOption)
    })
  }

  componentDidMount() {
    // console.log(this);
      var BurnoutPic = echarts.init(ReactDOM.findDOMNode(this.refs.CommonChartsEcharts));
      BurnoutPic.setOption(this.state.option, true);
  }

  render() {
    return this.renderCommonCharts();
  }
}

export default Connect({
  _id: 'xmxq',
  _component: Xmxq,
  _headerBackUrls: '/xmsx', //头部回退按钮地址
  _headerTitleSets: '项目详情', //头部标题内容
});
