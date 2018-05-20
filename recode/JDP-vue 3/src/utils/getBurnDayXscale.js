//天数间隔
function GetDateDiff(startDate, endDate) {
    var startTime = new Date(Date.parse(startDate.replace(/-/g,   "/"))).getTime();
    var endTime = new Date(Date.parse(endDate.replace(/-/g,   "/"))).getTime();
    var dates = Math.abs((startTime - endTime))/(1000*60*60*24);
    return dates;
}

function getXscale(startDate, endDate, store) {
  let option = {
    min : startDate,
    max : endDate,
    interval : +(24 * 3600 * 1000)
  };
  switch(true) {
    case GetDateDiff(startDate, endDate) <= 10 :
      // documents.querySelector('#echarts').className = "detaildrawing-min";
      store.dispatch('getXmxqEchartsClass', 'detaildrawing-min');
      option.interval = +(24 * 3600 * 1000);
      // option.classname = "detaildrawing-min";
      break;
    case GetDateDiff(startDate, endDate) > 10 && GetDateDiff(startDate, endDate) <= 60 :
      // document.querySelector('#echarts').className = "detaildrawing-min";
      store.dispatch('getXmxqEchartsClass', 'detaildrawing-mid');
      option.interval = +(24 * 3600 * 1000 * 7);
      // option.classname = 'detaildrawing-min';
      break;
    case GetDateDiff(startDate, endDate) > 60 :
      // document.querySelector('#echarts').className = "detaildrawing-mid";
      store.dispatch('getXmxqEchartsClass', 'detaildrawing-mid');
      option.interval = +(24 * 3600 * 1000 * 31);
      // option.classname = 'detaildrawing-mid';
      break;
    case GetDateDiff(startDate, endDate) > 90 :
      // document.querySelector('#echarts').className = "detaildrawing-max";
      store.dispatch('getXmxqEchartsClass', 'detaildrawing-max');
      option.interval = +(24 * 3600 * 1000 * 31);
      // option.classname = 'detaildrawing-max';
      break;
    case GetDateDiff(startDate, endDate) > 120 :
      // document.querySelector('#echarts').className = "detaildrawing-smax";
      store.dispatch('getXmxqEchartsClass', 'detaildrawing-smax');
      option.interval = +(24 * 3600 * 1000 * 31);
      // option.classname = 'detaildrawing-smax';
      break;
    default:
      break;
  }

  return option;
}

export default getXscale;
