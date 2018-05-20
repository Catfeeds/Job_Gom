module.exports = {
	extend: function(a, b) {
		if (this.type(b) === "object") {
			for (var p in b) {
				if (b.hasOwnProperty(p) && (!a.hasOwnProperty(p))) {
					a[p] = b[p];
				}
			}
		} else {
			return a;
		}
	},
	type: function(val) {
		return Object.prototype.toString.call(val).replace(/\[object\s|\]/g, "").toLocaleLowerCase();
	},
	inArray: function(val, arr, key) {
		var len = arr.length;
		for (var i = 0; i < len; i++) {
			if ((key ? arr[i][key] : arr[i]) === val) {
				return i;
			}
		}
		return -1;
	}
};
