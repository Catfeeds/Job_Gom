function getMonthDays(startDate) {
        var curDate = new Date(startDate);
        /* 获取当前月份 */
        var curMonth = curDate.getMonth();
       /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
       curDate.setMonth(curMonth + 1);
       /* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
       curDate.setDate(0);
       /* 返回当月的天数 */
       return curDate.getDate();
}

function getXscale(dailyScale) {
  let option = {
    min : dailyScale[0].value[0],
    max : dailyScale[dailyScale.length-1].value[0],
    interval : +(24 * 3600 * 1000)
  };
  switch(true) {
    case dailyScale.length <= 10 :
      document.querySelector('#echarts').className = "detaildrawing-min";
      option.interval = +(24 * 3600 * 1000);
      break;
    case dailyScale.length > 10 && dailyScale.length <= 60 :
      document.querySelector('#echarts').className = "detaildrawing-min";
      option.interval = +(24 * 3600 * 1000 * 7);
      break;
    case dailyScale.length > 60 :
      document.querySelector('#echarts').className = "detaildrawing-mid";
      option.interval = +(24 * 3600 * 1000 * getMonthDays(dailyScale[0].value[0]));
      break;
    case dailyScale.length > 90 :
      document.querySelector('#echarts').className = "detaildrawing-max";
      option.interval = +(24 * 3600 * 1000 * getMonthDays(dailyScale[0].value[0]));
      break;
    case dailyScale.length > 120 :
      document.querySelector('#echarts').className = "detaildrawing-smax";
      option.interval = +(24 * 3600 * 1000 * getMonthDays(dailyScale[0].value[0]));
      break;
    default:
      break;
  }

  return option;
}

export default getXscale;
