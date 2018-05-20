var ShowDate = function (option) {
    // set options;
}
ShowDate.prototype.tpl = function (){
	var str = '<div class="data_box hide" data-node="data_box"><div class="sel_date" data-node="sel_date"><div class="date-nav clearfix"><span class="prev_y fl" data-node="prev_y">&lt;&lt;</span><span class="prev_m fl" data-node="prev_m">&lt;</span><div class="show_mn fl"><a href="javascript:;" data-node="year"></a><span class="ml5">年</span><a href="javascript:;" data-node="month"></a><span class="ml5">月</span></div><span class="next_y fr" data-node="next_y">&gt;&gt;</span><span class="next_m fr" data-node="next_m">&gt;</span></div><table class="data_table" data-node="data_table" cellpadding="0" cellspacing="0"><thead><tr><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td><td>日</td></tr></thead><tbody data-node="tBody"><tr><td><span></span></td><td><span></span></td><td><span></span></td><td><span></span></td><td><span></span></td><td><span></span></td><td><span></span></td></tr><tr><td><span></span></td><td><span></span></td><td><span></span></td><td><span></span></td><td><span></span></td><td><span></span></td> <td><span></span></td> </tr> <tr> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> </tr> <tr> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> </tr> <tr> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> </tr> <tr> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td></tr></tbody></table></div></div>';
	return str;
};
ShowDate.prototype.init = function (){
	var _this = this;
	var tpl = _this.tpl();
	$('body').append(tpl);
	$('[data-node=input]').attr('readonly', 'true');
	//节点获取
	_this.$box = $('[data-node=data_box]');
	_this.$year = _this.$box.find('[data-node=year]');
	_this.$month = _this.$box.find('[data-node=month]');
	_this.$box_tbody = _this.$box.find('[data-node=tBody]');
	_this.$box_td = _this.$box_tbody.find('td');
	_this.$box_day = _this.$box_tbody.find('span');

	_this.$pre_m = _this.$box.find('[data-node=prev_m]');
	_this.$pre_y = _this.$box.find('[data-node=prev_y]');
	_this.$next_m = _this.$box.find('[data-node=next_m]');
	_this.$next_y = _this.$box.find('[data-node=next_y]');
	$(document).on('click', '[data-node=input]', function() {
    	_this.node = this;
    	_this.$box.removeClass('hide');
		if ($(_this.node).val() === "") {
			var _date = new Date();
		} else {
			var val = ($(_this.node).val()).split('-');
			var _date = new Date(val[0], val[1] - 1, val[2]);
		};
		_this.htmlInit(_date.getFullYear(),_date.getMonth() + 1,_date.getDate());
        return false;
    });
     _this.$box_tbody.on('click','span', function(event) {
		var Ev = event.target;
		_this.$box_td.removeClass('active');
		$(Ev.parentNode).addClass('active');
		if ($(Ev).hasClass('grayClr')) {
			if ($(Ev).html() <= 15) {
				var _date = new Date(_this.$year.html(), parseInt(_this.$month.html()), $(Ev).html());
			} else if ($(Ev).html() > 15) {
				var _date = new Date(_this.$year.html(), parseInt(_this.$month.html()) - 2, $(Ev).html());
			}
		} else {
			var _date = new Date(_this.$year.html(), _this.$month.html() - 1, $(Ev).html());
		}
		$(_this.node).val(_date.getFullYear() + '-' + (_date.getMonth() + 1) + '-' + _date.getDate());
		_this.$box.addClass('hide');
	});
    _this.headBind();
};
ShowDate.prototype.headBind = function (){
	var _this = this;
	this.$pre_m.on('click', function() {
		_this.dateChange({type:'pre_m',month:-2});
	});
	this.$pre_y.on('click', function() {
		_this.dateChange({type:'pre_y',year:-1,month:-1});
	});
	this.$next_m.on('click', function() {
		_this.dateChange({type:'next_m'});
	});
	this.$next_y.on('click', function() {
		_this.dateChange({type:'next_y',year:1,month:-1});
	});
};
ShowDate.prototype.option = function (){
	var _this = this;
	return {
		getYear:function (){
			return _this.$year.html();
		},
		getMonth:function (){
			return _this.$month.html();
		},
		getDay:function (){
			for (var i = 0; i < _this.$box_td.length; i++) {
				if (_this.$box_td.eq(i).hasClass('active')) {
					return _this.$box_td.eq(i).children('span').html();
				}
			}
		}
	};
};

ShowDate.prototype.getFirstDayIndex = function (year, month){
	var _date = new Date(year, month - 1, 1);
	var _week = _date.getDay();
	if (_week === 0) {
		_week = 7;
	}
	return 1 - _week;
};

ShowDate.prototype.htmlInit = function (year, month, day){
	var _this = this;
	_this.$year.html(year);
	_this.$month.html(month);
	_this.$box_td.removeClass('active');
	var n_index = _this.getFirstDayIndex(year, month);
	for (var i = 0; i < _this.$box_day.length; i++) {
		n_index++;
		var _date = new Date(year, month - 1, n_index);
		_this.$box_day.eq(i).html(_date.getDate());
		if (_date.getMonth() + 1 != month) {
			_this.$box_day.eq(i).addClass('grayClr');
		} else {
			if (day == _date.getDate()) {
				$(_this.$box_day[i].parentNode).addClass('active');
			}
			_this.$box_day.eq(i).removeClass('grayClr');
		}
	}
};

ShowDate.prototype.dateChange = function (obj){
	var _this = this;
	var _obj = obj||{};
	var c = {
		type:_obj.type,
		year:_obj.year||0,
		month:_obj.month||0
	};
	var _date = new Date(parseInt(_this.option().getYear()) + c.year, parseInt(_this.option().getMonth()) + c.month, _this.option().getDay());
	switch (c.type){
		case "pre_m" : {
			if (_date.getMonth() + 1 == _this.option().getMonth()) {
				_date = new Date(option.getYear(), option.getMonth() - 1, 0);
			}
			break;
		}
		case "pre_y" : {
			if (_date.getMonth() + 1 != _this.option().getMonth()) {
				_date = new Date(option.getYear() - 1, option.getMonth(), 0);
			}
			break;
		}
		case "next_m" : {
			if (_this.option().getMonth() < _date.getMonth()) {
				_date = new Date(option.getYear(), option.getMonth(), 1);
			}
			break;
		}
		case "next_y" : {
			if (_this.option().getMonth() < _date.getMonth() + 1) {
				_date = new Date(parseInt(option.getYear()) + 1, parseInt(option.getMonth()), 0);
			}
			break;
		}
	}
	_this.htmlInit(_date.getFullYear(), _date.getMonth() + 1, _date.getDate());
};
$.fn.miniDate = (function() {
    var miniDate = new ShowDate();
    miniDate.init();
})($);