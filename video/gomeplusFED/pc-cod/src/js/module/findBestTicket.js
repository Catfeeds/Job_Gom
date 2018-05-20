/**
 * 查找最好的优惠券
 * @param  {[Object]} data   要用于查找的对象数组
 * @param  {[type]} unique 对象的唯一键 优惠券ID键名
 * @return {[type]}        返回最好的优惠券对象
 */
var findBestTicket = function(data, unique) {
	var len = data.length;
	/*var best = data[0];
	best._index_ = 0;
	if (len > 1) {
		for (var i = 1; i < len; i++) {
			var next = data[i];
			best = compareMethod(best, next);
			if (best[unique] === next[unique]) {
				best._index_ = i;
			}
		}
	}*/
	var best = data[len - 1];
	best._index_ = len - 1;
	if (len > 1) {
		for (var i = len - 2; i >= 0; i--) {
			var next = data[i];
			best = compareMethod(best, next);
			if (best[unique] === next[unique]) {
				best._index_ = i;
			}
		}
	}
	return best;

	function compareMethod(obj1, obj2) {
		var money1 = parseFloat(obj1.money);
		var money2 = parseFloat(obj2.money);
		var endDate1 = obj1.endTime;
		var endDate2 = obj2.endTime;

		if (money1 === money2) {
			if (endDate1 >= endDate2) {
				return obj2;
			} else {
				return obj1;
			}
		} else {
			if (money1 > money2) {
				return obj1;
			} else {
				return obj2;
			}
		}
	}
};

module.exports = findBestTicket;