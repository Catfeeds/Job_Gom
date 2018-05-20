class Tab {
    constructor(container, opts = {}) {
    	if(!container){
    		throw Error('container is required');
    	}

    	this.container = container;
    	this.opts = Object.assign({
    		index: 0,
    		active: 'active',
    		selector: {
    			tab: '[data-role=tab]',
    			content: '[data-role=content]'
    		},
    		event: 'click'
    	}, opts);

    	this._init();
    }
    _init() {
    	var container = this.container;
    	var opts = this.opts;
    	var selector = opts.selector;

    	this.tabs = container.find(selector.tab);
    	this.contents = container.find(selector.content);
    	//TODO: 判断index是否大于dom节点的数量
    	this.show(opts.index);
    	this._bindEvents();
    }
    _bindEvents(unbind) {
    	var action = unbind ? 'off' : 'on';
    	var opts = this.opts;
    	this.container[action](opts.event, opts.selector.tab, $.proxy(this._change, this));
    }
    show(index) {
    	var current = this.current;
    	if(current && index === current.index){
    		return;
    	}

    	var tab = this.tabs.eq(index);
    	var content = this.contents.eq(index);
    	var current = {
    		index: index,
    		tab: tab,
    		content: content
    	};

    	tab.addClass(this.opts.active);
    	content.show();

    	this.current = current;
    }
    _change(e) {
    	var index = this.tabs.index(e.currentTarget);
    	var current = this.current;
    	if(current && index === current.index){
    		return;
    	}
    	
    	current.tab.removeClass(this.opts.active);
    	current.content.hide();

    	this.show(index);
    }
}

export default Tab;

