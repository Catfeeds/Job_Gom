import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import { History, Link } from 'react-router';

import Connect from './connect/template';

import CommonCharts from './widget/commonCharts';

import * as Http from '../Widget/http';

class Zl extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      configs:{
        showDMW:false,//是否展示图表的月/周/日
        topTitles:['月份','规划项目数量','部门内部项目数量','合计'],//表格上面头部
        // daLists:[{title:'2017/7',data:[6,6,6]},//表格title为左侧头部
        // {title:'2017/8',data:[6,6,6]},
        // {title:'2017/9',data:[6,6,6]},
        // {title:'2017/10',data:[6,6,6]},
        // {title:'总数',data:[6,6,6]}]
        daLists: []
      },
      option:{
        grid:{
            left:60,
            bottom:140
        },
        borderWidth:0,
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'cross',
		            crossStyle: {
		                color: '#579DD1'
		            }
		        }
		    },
		    legend: {
		        data:['规划项目数量','部门项目数量'],
            bottom:0,
            itemWidth:20,
            itemHeight:20,
            icon:'stack',
            left:40,
            itemGap:20,
            align:'left',
            textStyle:{
              fontSize:20
            }
		    },
		    xAxis: [
		        {
		            type: 'category',
		            data: "monthData",
		            axisPointer: {
		                type: 'shadow'
		            },
                axisTick:{
                  show:false
                }
		        }
		    ],
		    yAxis: [
		        {
		            type: 'value',
		            min: 0,
		            max: 100,
		            interval: 20,
                axisTick:{
                  show:false
                },
                splitLine:{
                    show:false
                },
		            axisLabel: {
		                formatter: '{value}'
		            }
		        }
		    ],
		    series: [
		        {
		            name:'规划项目数量',
		            type:'bar',
		            data:"planData",
                itemStyle:{
                  normal:{
                    color:'#579DD1'
                  }
                },
                barWidth:14
		        },
		        {
		            name:'部门项目数量',
		            type:'bar',
		            data:"sectionData",
                itemStyle:{
                  normal:{
                    color:'#EB7F31'
                  }
                },
                barWidth:14
		        }
		    ]
	    }
    }
  }

  renderCommonCharts() {
    return <CommonCharts configs={this.state.configs} option={this.state.option}></CommonCharts>
  }

  componentWillMount() {
    var monthData = [],
        planData = [],
        sectionData = [],
        data = [{
            "month": "2017-07",
            "data": {
                "plan": 30,
                "section": 40
            }
        },
        {
            "month": "2017-06",
            "data": {
                "plan": 20,
                "section": 20
            }
        }],
        _this = this;


        //封装总览fetch网络拉取
        Http.http_get('/jira/total/table', {
          "mode": 'cors',
          "Content-Type": "application/json",
          "params": {
            id: 'xdsjk13',
            cookie: 'sdfssn1'
          }
        }).then((json) => {
          //表格
          let jsonData = json.data.map(item => {
            let array = item.lists;
            array = [...array, array[0]+array[1]];
            return {'title': item.name, 'data': array}
          })
          let tempState = {};
          tempState.state = _this.state;
          tempState.state.configs.daLists = jsonData;
          _this.setState(Object.assign({}, tempState.state));


          //图形
          json.data.map(item => {
            return {
              'month': item.name,
              'data': {
                "plan": item.lists[0],
                "section": item.lists[1]
              }
            }
          }).forEach((item, index) => {
            monthData.push(item.month);
            planData.push(item.data.plan);
            sectionData.push(item.data.section);
          })
        }).catch(error => {
          console.log(error)
        })
        // console.log(JSON.stringify({
        //   id: 'xdsjk13',
        //   cookie: 'sdfssn1'
        // }))
        //总览fetch网络拉取
        // fetch('http://10.112.170.139:9090/mock/59880fce588f7c09fde7578b/jira/total/table?id=xdsjk13&cookie=sdfssn1',{
          // "mode": 'cors',
          // "method":'post',
          // "Content-Type": "application/json",
          // "body":JSON.stringify({
          //   id: 'xdsjk13',
          //   cookie: 'sdfssn1'
          // })
        // }).then(response => {
        //   if(response.ok) {
        //     response.json().then(json => {
        //       // console.log(json)
        //
        //       //表格
        //       let jsonData = json.data.map(item => {
        //         let array = item.lists;
        //         array = [...array, array[0]+array[1]];
        //         return {'title': item.name, 'data': array}
        //       })
        //       let tempState = {};
        //       tempState.state = _this.state;
        //       tempState.state.configs.daLists = jsonData;
        //       _this.setState(Object.assign({}, tempState.state));
        //
        //
        //       //图形
        //       json.data.map(item => {
        //         return {
        //           'month': item.name,
        //           'data': {
        //             "plan": item.lists[0],
        //             "section": item.lists[1]
        //           }
        //         }
        //       }).forEach((item, index) => {
        //         monthData.push(item.month);
        //         planData.push(item.data.plan);
        //         sectionData.push(item.data.section);
        //       })
        //     })
        //   } else {
        //     console.log("status", response.status);
        //   }
        // }).catch(error => {
        //   console.log(error)
        // })

      let modifyOption = {
        xAxis: [
          Object.assign({}, this.state.option.xAxis[0], {
            data: monthData
          })
        ],
        series: [
          Object.assign({}, this.state.option.series[0], {
            data: planData
          }),
          Object.assign({}, this.state.option.series[1], {
            data: sectionData
          })
        ]
      }

      this.state.option = Object.assign({}, this.state.option, modifyOption);

      this.setState(Object.assign({}, this.state.option, modifyOption));
  }

  render() {
    return this.renderCommonCharts();
  }
}

export default Connect({
  _id: 'zl',
  _component: Zl,
  _headerBackUrls: '／', //头部回退按钮地址
  _headerTitleSets: '总览', //头部标题内容
});
