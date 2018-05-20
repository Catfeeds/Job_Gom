/**
 * [判断Object是否为空]
 * @Author: Fu Xiaochun
 * @Email: 	fuzhengchun@gomeplus.com
 */
module.exports = function(o) {
	for (var k in o) {
		return false;
	}
	return true;
}