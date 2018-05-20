function getDate(resData) {
  // console.log(...resData.name)
  var data = [],
  maxData = [];
    var now = +new Date(...resData.name);
    var oneDay = 24 * 3600 * 1000;
    var maxNow = new Date(+now+oneDay)  ;
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

    return {data, maxData};
}

function BurnMap(arrayData) {
  return arrayData.map((item, index) => {
    return {name : item.burnKey.split('-'), value : item.burnValue}
  }).map((item) => {
    return getDate(item)
  })
}


export default BurnMap;
