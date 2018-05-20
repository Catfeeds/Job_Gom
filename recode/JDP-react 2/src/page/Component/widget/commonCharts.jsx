import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import ReactDOM from 'react-dom';
// import { is, fromJS} from 'immutable';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import { History, Link } from 'react-router';
import echarts from 'echarts';

// import echarts from 'echarts/lib/echarts' //必须
// import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/grid'
// import 'echarts/lib/chart/bar'

// import ReactEcharts from 'echarts-for-react';

import '../../Style/sass/commonCharts';

class CommonCharts extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      getEcharts : null,
      showForm : true,
      showCharts : false,
      curMonth : true,
      curWeek : false,
      curDay : false,
      option : this.props.option
    }

    this.initEcharts = () => {
      // console.log(this.props.option)
      // let optionGrid = Object.assign({}, this.state.option.grid, {
      //   width: 'auto',
      //   height: 'auto'
      // })
      // let optionLegend = Object.assign({}, this.state.option.legend, {
      //   width: 'auto',
      //   height: 'auto',
      //   left: 'auto',
      //   top: 'auto',
      //   right: 'auto',
      //   bottom: 'auto',
      //   align: 'auto',
      //
      // })
      // console.log(optionGrid, optionLegend)
      // this.setState({
      //   option : Object.assign({}, this.state.option, {
      //     optionGrid,
      //     optionLegend
      //   })
      // });
      //
      //
      // var gzlEcharts = echarts.init(document.querySelector('#echarts'));
      // console.log(ReactDOM.findDOMNode);
      //
      // 暂时修改
      if(!this.state.initCharts){
        // console.log(this.props.option)
        let getEcharts = echarts.init(ReactDOM.findDOMNode(this.refs.CommonChartsEcharts));
        this.state.getEcharts = getEcharts;
        getEcharts.setOption(this.props.option);
      }
    }
  }

  _changeDate(type) {
    switch (type){
      case 0://月
      this.setState({
        curMonth : true,
        curWeek : false,
        curDay : false
      })
      break;
      case 1://周
      this.setState({
        curMonth : false,
        curWeek : true,
        curDay : false
      })
      break;
      case 2://日
      this.setState({
        curMonth : false,
        curWeek : false,
        curDay : true
      })
      break;
    }
  }

  _changeTab(num) {
    if(num) {
      this.setState({showCharts : true, showForm : false});
    } else {
      this.setState({showCharts : false, showForm : true});
    }
  }

  componentWillMount() {
    // this.initEcharts();
  }

  componentDidMount() {
    // console.log.call(this, this.props)
    // console.log(ReactDOM.findDOMNode.call(this, this.refs.CommonChartsEcharts));
    // if(this.state.showCharts)this.initEcharts();
  }

  componentDidUpdate() {
    if(this.state.showCharts)this.initEcharts();
  }

  render() {
    let configs = this.props.configs;
    // console.log(this.props)
    return (
      <div className="riskBox">
        <div className={configs.isZT?"tbBox":null}>
           {this.state.showForm?<table className={configs.isZT?"tables ztPage":"tables"}>
            <thead>
              <tr className="trHead">
                  {configs.topTitles.length>0?configs.topTitles.map((title, index) => {
                    return <th key={index} className={!index?"leftHead":null}>{title}</th>
                  }):null}
              </tr>
            </thead>
            <tbody>
              {configs.daLists.length>0?configs.daLists.map((list, index) => {
                return <tr key={index}>
                  <td className="leftHead">{list.title}</td>
                  {
                    list.data.length>0?list.data.map((da, index) => {
                      return <td key={index}>{da}</td>
                    }):null
                  }
                </tr>
              }):null}
            </tbody>
           </table>:null}
         </div>
         {this.state.showCharts?<div className="chart">
           {configs.showDMW?<div className="chartTop">
             <span className={this.state.curMonth?"btnActive":null} onClick={() => this._changeDate(0)}>月</span>
             <em>|</em>
             <span className={this.state.curWeek?"btnActive":null} onClick={() => this._changeDate(1)}>周</span>
             <em>|</em>
             <span className={this.state.curDay?"btnActive":null} onClick={() => this._changeDate(2)}>日</span>
           </div>:null}
           {configs.showDMW?<div className="grayLine"></div>:null}
           <div className="drawing" id="echarts" ref="CommonChartsEcharts">

           </div>
         </div>:null}
         <div className="bottomBtn">
           <div onClick={() => this._changeTab(0)} className={this.state.showForm?"tbBtn btnActive":"tbBtn"}>表格</div>
           <div onClick={() => this._changeTab(1)} className={this.state.showCharts?"graphBtn btnActive":"graphBtn"}>图形</div>
         </div>
      </div>
    )
  }
}

export default CommonCharts;
