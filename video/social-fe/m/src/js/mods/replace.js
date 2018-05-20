import formatDate from '../util/formatDate.js';
export const obj = {
    replaceData: function(timestamp, serverTime) {
        if (!timestamp) {
            return "";
        }
        let time_g = obj.get_unix_time(timestamp);
            timestamp = parseInt(time_g) * 1000;
        if (timestamp && timestamp > 0) {
            let now = +new Date();
            if (serverTime) {
                now = +new Date(serverTime);
            }
            let duration = Math.round((now - timestamp) / 60000);
            if (duration < 60) {
                return duration < 1 ? "刚刚" : duration + "分钟前";
            } else if (duration >= 60 && duration < 60 * 24) {
                return "今天" + formatDate(timestamp,"hh:mm");
            } else if (duration >= 60 * 24 && duration < 60 * 48) {
                return '昨天'+ formatDate(timestamp,"hh:mm");
            } else if (duration >= 60 * 48) {
               /* let delta_day = Math.floor(duration / (60 * 24));
                if (delta_day <= 7) {
                    return delta_day + '天前';
                } else {
                    let date = new Date(time_g * 1000),
                        month = date.getMonth() + 1,
                        day = date.getDate();
                    month = month < 10 ? "0" + month : month;
                    day = day < 10 ? "0" + day : day;
                    return date.getFullYear() + '-' + month + '-' + day;
                }*/
                return "20"+formatDate(timestamp,"yy-MM-dd hh:mm").replace(/-/g,"/");
            }
        } else {
            return "刚刚";
        }
    },
    get_unix_time: function(dateStr) {
        if (typeof dateStr === 'number') { //兼容dateStr是时间戳的number类型 20160621 wangchunpeng
            return (dateStr + '').substr(0, 10);
        }
        let newstr = dateStr.replace(/-/g, '/');
        let date = new Date(newstr);
        let time_str = date.getTime().toString();
        return time_str.substr(0, 10);
    },
    replaceImg(img,size){
        let reg = /(\.jpeg|\.png|\.jpg|\.bmp)/i,
            m = img.match(reg),
            newImg = '';
            if(reg&&reg.length>0&&size){
                newImg = img.replace(m[0],size+m[0]);
            }
        return newImg;    
    },
    //把时间戳改为字符串
    getLocalDate: function(time, separator, hasTime, isHours) {
        let date = time ? new Date(time) : new Date();
        let year = date.getFullYear();
        let month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
        let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
        let hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
        let minute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
        let second = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
        let dateStr = '';
        if (separator) {
            dateStr += year + separator + month + separator + day;
        } else {
            dateStr += year + '.' + month + '.' + day;
        }
        if (hasTime) {
            if (isHours) {
                dateStr += ' ' + hour + ':' + minute;
            } else {
                dateStr += ' ' + hour + ':' + minute + ':' + second;
            }
        }
        return dateStr;
    },
    /********星号替换***********/
    replaceX: function(str) {
        let newstr = '';
        if (str.length == 11) {
            newstr = str.substr(0, 3) + "*****" + str.substr(8);
        }
        return newstr;
    },
    replaceStr: function(str) {
        let newstr = '';
        if (str.length >= 6) {
            newstr = str.substr(0, 2) + "***" + str.substr(-2);
        } else {
            return str;
        }
        return newstr;
    }
}
module.exports = obj;
