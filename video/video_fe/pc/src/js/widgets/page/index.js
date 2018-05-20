import 'css/widgets/page.scss';
import fetch from 'io/fetch';
import EventBus from 'util/event-bus';

var calcPages = function(total, page) {
    var pages = ['<'];
    if (total < 10) { // 小于10页,直接全部展示
        for (let i = 0; i < total; i++) {
            pages.push(i + 1);
        }
        pages.push('>');
        return pages;
    } else {
        var pre = [];
        var mid = [];
        var last = [];
        var i = 0;
        var start = page - 2;
        if (start < 1) {
            start = 1;
        } else if (start > total - 5) {
            start = total - 5;
        }

        var end = page + 2;
        if (end > total) {
            end = total;
        }

        for (; i < start; i++) {
            pre.push(i + 1);
        }
        if (page > 5) {
            pre.splice(1, start - 2, '...');
            if (start === total - 5) {
                pre.splice(pre.length - 1, 1);
            }
        }
        pre.unshift('<');

        for (i = start; i < (end < 5 ? 5 : end); i++) {
            mid.push(i + 1);
        }

        for (i = end; i < total; i++) {
            last.push(i + 1);
        }
        if (page <= total - 5) {
            last.splice(0, total - end - 1, '...');
        }
        last.push('>');
    }
    return pre.concat(mid).concat(last);
};

class Page extends EventBus {
    constructor(container, option = {}) {
        if (!container) {
            throw new Error("container is required");
        }
        if (!option.total) {
            throw new Error("totalPage required");
        }
        super();
        this.current = option.current || 1;
        this.total = option.total || 1;
        this.container = $(container);
        this.$root = $('<ul class="pageBreak">');
        this.status = ''; // 后续添加 ajax 请求后,添加更多状态

        this._init();
    }

    _init() {
        var that = this;

        var total = this.total;
        var $root = this.$root;
        $root.on('click', 'li', function(e) {
            if (that.status === 'disable') {
                return false;
            }
            var current = that.current;
            var page = $(this).data('page');
            if (page === '<') {
                page = current - 1;
                if (page < 1) {
                    page = 1;
                }
            } else if (page === '>') {
                page = current + 1;
                if (page > total) {
                    page = total;
                }
            } else if (page === '...') {
                page = 0;
            }
            if (page && page !== current) {
                that.selectPage(page);
            }
            return false;
        });
        this.container.append(this.render());
    }

    selectPage(page) {
        this.current = page;
        this.render();
        this.emit('pageClick', page);
    }

    renderItem(page) {
        var current = this.current;
        var active = '';
        if (page === current) {
            active = 'active';
        }else if (page === "<"){
        	active = "prev";
        }else if (page === ">"){
        	active = "next";
        }else if (page === "..."){
        	active = "nodata";
        }
        return '<li class="' + active + '" data-page="' + page + '"><a href="javascript:void(0)">' + page + '</a></li>';
    }

    disable() {
        this.status = 'disable';
    }

    enable() {
        this.status = '';
    }

    render() {
        var total = this.total;
        var items = calcPages(total, this.current);

        var html = '';
        for (var i = 0; i < items.length; i++) {
            html += this.renderItem(items[i]);
        }
        return this.$root.html(html);
    }
}


export default Page;
