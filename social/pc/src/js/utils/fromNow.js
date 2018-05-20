// 传入的时间格式  2016-04-27 15:12:58
var fromNow = function(timeStr,max) {
    /**
      1）1个小时以内发表的消息，显示发表的分钟数，如“20分钟前”；
      2）在24小时以内，发表的信息，显示具体小时数，如“15小时前”；
      3）大于24小时小于48小时，发表的消息，显示昨天；
      4）大于48小时小于72小时，发表的消息，显示2天前；大于72小时小于96小时，发表的消息，显示3天前；依此类推，最多到7天前
      5）超过7天前，显示具体年/月/日
    **/

    var showTime = "";
    var time = new Date(timeStr).getTime();
    var date = new Date().getTime();
    var num = date - time;
    var maxDay = max||7;
    var oneMin = 60000,
        oneHour = 3600000,
        oneDay = 24 * 3600000;
    var s;
    if (num < oneMin) {
        showTime = '1分钟前';
        //console.log(showTime);
    } else if (num >= oneMin & num < oneHour) {
        s = Math.floor(num / oneMin);
        showTime = s + "分钟前";
        //console.log(showTime);
    } else if (num >= oneHour & num < oneDay) {
        s = Math.floor(num / oneHour);
        showTime = s + "小时前";
        //console.log(showTime);
    } else if (num >= oneDay & num < 2 * oneDay) {
        s = Math.floor(num / oneDay);
        showTime = "昨天";
        //console.log(showTime);
    } else if (num >= 2 * oneDay & num < maxDay * oneDay) {
        s = Math.floor(num / oneDay);
        showTime = s + "天前";
        //console.log(showTime);
    } else {
        showTime = timeStr;
        //console.log(showTime);
    }
    return showTime;
}
module.exports = fromNow;
