function addPreZero(number) {
  if(number < 10) {
    return '0' + number;
  } else {
    return number;
  }
}

function getTabTime(tableData) {
  // 数据模拟
  // tableData =[{title: "2017-02-31", data: Array(3)},{title: "2017-03-00", data: Array(3)},{title: "2017-04-55", data: Array(3)}, {}]
  let totalData = tableData.pop();
  let startTime = tableData[0].title.toString();
  let lastTime = tableData[tableData.length-1].title.toString();
  let lastTimeYear = new Date(Date.parse(lastTime.replace(/-/g,   "/"))).getFullYear();
  let startTimeMonth = new Date(Date.parse(startTime.replace(/-/g,   "/"))).getMonth() + 1;
  let lastTimeMonth = new Date(Date.parse(lastTime.replace(/-/g,   "/"))).getMonth() + 1;
  let topTempMonth = [], bottomTempMonth = [];
  let MonthNum = tableData.length;

  tableData = tableData.map((item) => {
    return {title : item.title.slice(0, item.title.lastIndexOf('-')), data : item.data}
  })

  // document.body.innerHTML = lastTime +'====='+ new Date(Date.parse(lastTime.replace(/-/g,   "/"))).getMonth()+'========='+typeof(lastTimeMonth);
  switch (true) {
    case lastTimeMonth <= 6:
      if(startTimeMonth == 1) {
        for(var i = lastTimeMonth + 1; i <= 6; i++){
          bottomTempMonth.push({title: `${lastTimeYear}-${addPreZero(i)}`, data: [0, 0, 0]})
        }
        tableData = topTempMonth.concat(tableData, bottomTempMonth, totalData);
      } else {
        for(var i = 1; i < startTimeMonth; i++) {
          topTempMonth.push({title: `${lastTimeYear}-${addPreZero(i)}`, data: [0, 0, 0]})
        }
        for(var i = lastTimeMonth + 1; i <= 6; i++){
          bottomTempMonth.push({title: `${lastTimeYear}-${addPreZero(i)}`, data: [0, 0, 0]})
        }
        tableData = topTempMonth.concat(tableData, bottomTempMonth, totalData);
      }
      break;
    case lastTimeMonth > 6:
      if(startTimeMonth <= 7) {
        for(var i = lastTimeMonth + 1; i <= 12; i++){
          bottomTempMonth.push({title: `${lastTimeYear}-${addPreZero(i)}`, data: [0, 0, 0]})
        }
        tableData = topTempMonth.concat(tableData, bottomTempMonth, totalData);
      } else {
        for(var i = 7; i < startTimeMonth; i++) {
          topTempMonth.push({title: `${lastTimeYear}-${addPreZero(i)}`, data: [0, 0, 0]})
        }
        for(var i = lastTimeMonth + 1; i <= 12; i++){
          bottomTempMonth.push({title: `${lastTimeYear}-${addPreZero(i)}`, data: [0, 0, 0]})
        }
        tableData = topTempMonth.concat(tableData, bottomTempMonth, totalData);
      }
      break;
    default:
      tableData = topTempMonth.concat(tableData, bottomTempMonth, totalData);
  }
  // console.log(tableData);
  return tableData
}

export default getTabTime;
