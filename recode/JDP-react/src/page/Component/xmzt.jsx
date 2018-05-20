import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import { History, Link } from 'react-router';

import CommonCharts from './widget/commonCharts';
import Connect from './connect/template';

class Xmzt extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      configs:{
      	isZT:true,//是不是项目状态页
        showDMW:true,//是否展示图表的月/周/日
        topTitles:['部门','未启动','正常进行','已延期','部分上线','暂停/取消','已上线'],//表格上面头部
        daLists:[{title:'大数据中心',data:[6,6,6,6,6,6]},//表格title为左侧头部
        {title:'技术中心',data:[6,6,6,6,6,6]},
        {title:'架构部',data:[6,6,6,6,6,6]},
        {title:'商城技术部',data:[6,6,6,6,6,6]},
        {title:'基础支持中心',data:[6,6,6,6,6,6]},
        {title:'总数',data:[6,6,6,6,6,6]}]
      },
      option:{
        grid:{
            left:60,
            bottom:170
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
          data:['未启动   ','正常进行 ','已延期','部分上线','暂停/取消','已上线'],
          bottom:0,
          itemWidth:18,
          itemHeight:18,
          icon:'stack',
          left:40,
          itemGap:20,
          align:'left',
          textStyle:{
            fontSize:20,
            fontFamily:'PingFangSC-Regular'
          }
        },
        xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: ['2017\n07.12','2017\n07.12','2017\n07.12','2017\n07.12','2017\n07.12','2017\n07.12']
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 10,
            interval: 2,
            axisLabel: {
                formatter: '{value}'
            },
            splitLine:{
                show:false
            },
            axisTick:{
              show:false
            }
        },
        series: [
            {
                name:'未启动   ',
                type:'line',
                data:[1, 2, 5, 3, 2, 10]
            },
            {
                name:'正常进行 ',
                type:'line',
                data:[1, 6, 1, 5, 3, 9]
            },
            {
                name:'已延期',
                type:'line',
                data:[1, 1, 2, 5, 3, 8]
            },
            {
                name:'部分上线',
                type:'line',
                data:[1, 2, 2, 5, 3, 7]
            },
            {
                name:'暂停/取消',
                type:'line',
                data:[1, 3, 2, 5, 3, 6]
            },
            {
                name:'已上线',
                type:'line',
                data:[1, 3, 2, 5, 3, 5]
            }
        ]
      }
    }
  }

  renderCommonCharts() {
    return <CommonCharts configs={this.state.configs} option={this.state.option}></CommonCharts>
  }

  render() {
    return this.renderCommonCharts();
  }
}

export default Connect({
  _id: 'xmzt',
  _component: Xmzt,
  _headerBackUrls: '／', //头部回退按钮地址
  _headerTitleSets: '项目状态分析', //头部标题内容
});
