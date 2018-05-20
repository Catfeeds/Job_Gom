var page = function(options) {
    var defaultOptions = {
            pageContent: $('[data-node="pageContent"]'),
            curPage: 0, //目标页码	number
            pageSize: 0, //总页数	number
            visiblePages: 5, //显示条数，默认为5 number
            prevCls: '',
            prevHtml: '上一页',
            nextCls: '',
            nextHtml: '下一页'
        },
        opts = $.extend({}, defaultOptions, options);
    var start = [], //左侧页码 Array
        half = [], //中间页码 Array
        end = [], //右侧页码 Array
        html = '',
        nHalf = Math.floor(opts.visiblePages / 2), //中间值	number
        nStart = opts.curPage - nHalf, //开始	number
        nEnd = opts.curPage + nHalf; //结束 number
    if (nStart < opts.visiblePages - nHalf) {
        if (opts.pageSize > opts.visiblePages + 1) {
            start = [1, 2, 3, 4, 5];
            half = [];
            end = [opts.pageSize];
        } else if (opts.pageSize == opts.visiblePages + 1) {
            for (var i = 1; i <= opts.pageSize; i++) {
                start.push(i);
            }
            half = [];
            end = [];
        } else {
            for (var i = 1; i <= opts.pageSize; i++) {
                start.push(i);
            }
            half = [];
            end = [];
        }
    } else {
        if (nEnd > opts.pageSize) {
            nEnd = opts.pageSize;
        }
        if (nEnd - nHalf > opts.pageSize - opts.visiblePages) {
            start = [1];
            half = [];
            for (var i = opts.pageSize - opts.visiblePages + 1; i <= opts.pageSize; i++) {
                end.push(i);
            }
        } else {
            start = [1];
            for (var i = opts.curPage - nHalf; i <= opts.curPage + nHalf; i++) {
                half.push(i);
            }
            end = [opts.pageSize];
        }
    }
    html += '<a href="javascript:;" class="' + opts.prevCls + ' ' + (~~opts.curPage === 1 ? 'page-disable' : '') + '" data-page="' + (opts.curPage - 1) + '">' + opts.prevHtml + '</a>';
    for (var i = 0; i < start.length; i++) {
        html += '<a href="javascript:;" data-page="' + start[i] + '" class="' + (start[i] == opts.curPage ? 'active' : '') + '">' + start[i] + '</a>'
    }
    if (half.length != 0) {
        html += '<span>...</span>';
        for (var i = 0; i < half.length; i++) {
            html += '<a href="javascript:;" data-page="' + half[i] + '" class="' + (half[i] == opts.curPage ? 'active' : '') + '">' + half[i] + '</a>'
        }
    }
    if (end.length != 0) {
        html += '<span>...</span>';
        for (var i = 0; i < end.length; i++) {
            html += '<a href="javascript:;" data-page="' + end[i] + '" class="' + (end[i] == opts.curPage ? 'active' : '') + '">' + end[i] + '</a>'
        }
    }
    html += '<a href="javascript:;" class="' + opts.nextCls + ' ' + (opts.curPage === opts.pageSize ? 'page-disable' : '') + '" data-page="' + (opts.curPage + 1) + '">' + opts.nextHtml + '</a>';
    opts.pageContent.html(html).attr("data-pageSize", opts.pageSize).attr("data-curPage", opts.curPage);
}
module.exports = page;
