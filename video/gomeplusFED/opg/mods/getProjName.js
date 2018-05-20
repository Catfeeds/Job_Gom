/**
 * 根据传入的git项目url路径截取工程名
 * @param gitUrl
 * @returns {string}
 */
var getProjName =  function(gitUrl) {
    var res = '';
    var tempArrUrl = gitUrl.split('/');
    if(tempArrUrl && tempArrUrl[tempArrUrl.length - 1]) {
        res = tempArrUrl[tempArrUrl.length - 1].split('.')[0]
    }
    return res;
}

module.exports = getProjName;