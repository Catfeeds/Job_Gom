import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import { History, Link } from 'react-router';

import CommonCharts from './widget/commonCharts';
import Connect from './connect/template';

class Lxxq extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      configs : {},
      option : {
        grid:{
          left:60,
          bottom:140
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
          data:['在建工程','战略项目','部门级项目'],
          bottom:0,
          itemWidth:18,
          itemHeight:18,
          icon:'stack',
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
                name:'在建工程',
                type:'line',
                data:[1, 2, 5, 3, 2, 10]
            },
            {
                name:'战略项目',
                type:'line',
                data:[1, 6, 1, 5, 3, 9]
            },
            {
                name:'部门级项目',
                type:'line',
                data:[1, 1, 2, 5, 3, 8]
            }
        ]
      }
    }
  }

  renderCommonCharts() {
    return <CommonCharts configs={this.state.configs} option={this.state.option}></CommonCharts>
  }

  FXseriesSetState() {
    let seriesFX = [
        {
            name:'沟通风险',
            type:'line',
            data:[1, 2, 5, 3, 2, 10]
        },
        {
            name:'资源风险',
            type:'line',
            data:[1, 6, 1, 5, 3, 9]
        },
        {
            name:'硬件风险',
            type:'line',
            data:[1, 1, 2, 5, 3, 8]
        },
        {
            name:'依赖风险',
            type:'line',
            data:[1, 6, 1, 5, 3, 9]
        },
        {
            name:'无风险',
            type:'line',
            data:[1, 1, 2, 5, 3, 8]
        }
    ]
    // let titles = this.configs.topTitles.concat();
    let titles = [...this.state.configs.topTitles];
    titles.splice(0, 1);
    let addOptionFX = {
      legend: {
        data: titles
      },
      series: seriesFX
    };
    let optionFX = Object.assign({},
      this.state.option,
      addOptionFX
    );
    // console.log(optionFX)
    this.setState(optionFX);
  }

  componentWillMount() {
    let id = this.props.params.id;
    if(id == 'lxfx'){
      this.setState({
        configs: {
          showDMW:true,//是否展示图表的月/周/日
          topTitles:['部门','在建工程','战略项目','部门级项目'],//表格上面头部
          daLists:[{title:'大数据中心',data:[6,6,6]},//表格title为左侧头部
          {title:'技术中心',data:[6,6,6]},
          {title:'架构部',data:[6,6,6]},
          {title:'商城技术部',data:[6,6,6]},
          {title:'基础支持中心',data:[6,6,6]},
          {title:'总数',data:[6,6,6]}]
        }
      }, this.FXseriesSetState)
    } else {
      this.setState({
        configs: {
          showDMW:true,//是否展示图表的月/周/日
          topTitles:['部门','沟通风险','资源风险','硬件风险','依赖风险','无风险'],//表格上面头部
          daLists:[{title:'大数据中心',data:[6,6,6,6,6]},//表格title为左侧头部
          {title:'技术中心',data:[6,6,6,6,6]},
          {title:'架构部',data:[6,6,6,6,6]},
          {title:'商城技术部',data:[6,6,6,6,6]},
          {title:'基础支持中心',data:[6,6,6,6,6]},
          {title:'总数',data:[6,6,6,6,6]}]
        }
      }, this.FXseriesSetState)
    }
  }

  render() {
    return this.renderCommonCharts();
  }
}

export default Connect({
  _id: 'lxxq',
  _component: Lxxq,
  _headerBackUrls: '/xmlx', //头部回退按钮地址
  _headerTitleSets: '项目类型分析', //头部标题内容
});
