<template>
  <div class="detail">
    <div class="detailMain">
      <div class="detailtitle clearfix">
        <i class="detailflag"></i>
        <h4 class="detailname">{{detailname}}</h4>
      </div>
      <div class="detailcontainer">
        <ol>
          <li><span class="detailItems">项目开始时间：</span><span class="detailexplainItems">{{detailstarttime}}</span></li>
          <li><span class="detailItems">项目结束时间：</span><span class="detailexplainItems">{{detailendtime}}</span></li>
          <li><span class="detailItems">当前阶段：</span><span class="detailexplainItems">{{detailphase}}</span></li>
          <li class="clearfix"><span class="detailItems fl">项目进度：</span><progress class="detailprogressItems fl" :value="detailprogress" max="100"></progress><span class="detailprogressCount">{{detailprogress}}%</span></li>
          <li><span class="detailItems">项目状态：</span><span class="detailexplainItems">{{detailstate}}</span></li>
          <li><span class="detailItems">工作量(人天)：</span><span class="detailexplainItems">{{detailworkload}}</span></li>
          <li class="clearfix">
            <span class="detailItems fl">项目成员：</span>
            <router-link class="detailmemberItems fl" to="/xmsx/xmxq/xmcy">查看全部{{detailmember}}人</router-link>
          </li>
          <li class="clearfix">
            <span class="detailItems">项目燃尽图：</span>
          </li>
          <li class="detailwrapper clearfix">
            <div class="detaildrawing" id="echarts"></div>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from "echarts";

  export default {
    name: 'app-xmxq',
    data () {
      return {
        detailname: "项目生产推进",
        detailstarttime: "2017-7-20",
        detailendtime: "2017-12-10",
        detailphase: "开发阶段",
        detailprogress: 30,
        detailstate: "正常进行",
        detailworkload: 300,
        detailmember: 200,
      }
    },
    mounted () {
      var data = [],
      maxData = [];
      function getData(resData) {
        console.log(...resData.name)
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


      // var now = +new Date(1997, 9, 3);
      // var oneDay = 24 * 3600 * 1000;
      // var value = Math.random() * 1000;
      var resData = [
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
            },
            // {
            //     //横轴坐标
            //     'burnKey': '2017-07-13',
            //     //纵轴数值
            //     'burnValue': '200',
            // },
            // {
            //     //横轴坐标
            //     'burnKey': '2017-07-14',
            //     //纵轴数值
            //     'burnValue': '200',
            // },
            // {
            //     //横轴坐标
            //     'burnKey': '2017-07-15',
            //     //纵轴数值
            //     'burnValue': '100',
            // },
            // {
            //     //横轴坐标
            //     'burnKey': '2017-07-16',
            //     //纵轴数值
            //     'burnValue': '000',
            // }

      ].map(function(item, index) {
        return {name : item.burnKey.split('-'), value : item.burnValue}
      })
      resData.forEach((itemData) => {
        getData(itemData)
      })

      console.log(data)
      console.log(Math.max(...maxData))
      // var now = +new Date(1997, 9, 3);
      // var oneDay = 24 * 3600 * 1000;
      // var value = Math.random() * 1000;
      // for (var i = 0; i < 1000; i++) {
      //     data.push(randomData());
      // }

      var BurnoutPic = echarts.init(document.querySelector('#echarts'));
      var option = {
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
            min:data[0].value[0],
            max:data[data.length-1].value[0],
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
            max: Math.max(...maxData),
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
            data: data
        }]
      }
      BurnoutPic.setOption(option);
    }
  }
</script>

<style lang="scss">
@import "../../assets/sass/detail.scss";
</style>
