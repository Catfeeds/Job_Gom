function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function findItem(arr,key,value){
    var len = arr.length;
    for(let i = 0; i< len; i++){
        if(arr[i][key] == value){
            return arr[i];
        }
    }
}

module.exports = {
  formatTime: formatTime,
  findItem: findItem
}
