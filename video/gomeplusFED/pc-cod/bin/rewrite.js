var r_cdn = /CDN\d{4}\//;
var rewritePre = function(path, req) {
    return path.replace(r_cdn, '').replace('pc/', '').replace('dist', 'src');
};
var rewritePrd = function(path, req) {
    return path.replace(/\/m\/pc\/dist/, 'src');
};

module.exports = {
	pre: rewritePre,
	prd: rewritePrd
};