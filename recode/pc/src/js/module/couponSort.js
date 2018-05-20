var outArr = [];
var key;
var couponSort = {
    //money 升序couponSort
    upMoney: function(x, y) {

        return (~~x.money < ~~y.money) ? -1 : 1;
    },
    //失效期
    upDate: function(x, y) {
        return (x[key] < y[key]) ? -1 : 1
    },
    //获取重复的=>money
    getRepeatAttr: function(arr, key) {
        var obj = {},
            innerArr = [];
        key = false;

        for (var i = 0, len = arr.length; i <= len; i++) {
            var item = i === arr.length ? '' : arr[i][key];
            if (obj[item] == null) {
                obj[item] = 1;
                outArr.push(innerArr);
                innerArr = [];
                innerArr.push(arr[i]);
            } else {
                innerArr.push(arr[i])
            }
        }
    },
    init: function(data, keyName, callback) {
        var fn = callback || function() {};
        outArr = [];
        key = keyName || 'useEndTime';
        var self = couponSort;
        self.getRepeatAttr(data.sort(self.upDate), key);
        var firstStep = outArr,
            result = [];
        for (var i = 1; i < firstStep.length; i++) {
            firstStep[i].sort(self.upMoney);
            for (var j = 0; j < firstStep[i].length; j++) {
                result.push(firstStep[i][j]);
            }

        }
        fn.call(null);
        return result;
    }
}

module.exports = couponSort.init;