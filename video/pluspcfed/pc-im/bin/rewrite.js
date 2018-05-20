var r_cdn = /CDN\d{4}\//;
var rewritePre = function(path, req) {
    return path.replace(r_cdn, '').replace('dist', 'src');
};
var rewritePrd = function(path, req) {
    // return path.replace(/\/m\/pc\-im\/dist/, 'src');
    return path.replace(/\/m\/pc\-im\/dist/, 'src');
};

module.exports = {
	pre: rewritePre,
	prd: rewritePrd
};