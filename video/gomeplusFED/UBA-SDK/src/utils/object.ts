export const mixin = function(source, target) {
	for (var i in target) {
		if (target.hasOwnProperty(i)) {
			source[i] = target[i];
		}
	}
	return source;
};
