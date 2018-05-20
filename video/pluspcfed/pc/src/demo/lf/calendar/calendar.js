
//模板		
 var str = '<table class="cal-table">'+
				'<thead>'+
					'<tr>'+
						'<td>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td>'+
					'</tr>'+
				'</thead>'+
				'<tbody>'+
					'<tr>'+
						'<td>1</td><td></td><td></td><td></td><td></td><td></td><td></td>'+
					'</tr>'+
					'<tr>'+
					   '<td>1</td><td></td><td></td><td></td><td></td><td></td><td></td>'+
					'</tr>'+
					'<tr>'+
						'<td></td><td></td><td></td><td></td><td></td><td></td><td></td>'+
					'</tr>'+
					'<tr>'+
						'<td></td><td></td><td></td><td></td><td></td><td></td><td></td>'+
					'</tr>'+
					'<tr>'+
						'<td></td><td></td><td></td><td></td><td></td><td></td><td></td>'+
					'</tr>'+
					'<tr>'+
						'<td></td><td></td><td></td><td></td><td></td><td></td><td></td>'+
					'</tr>'+
				'</tbody>'+
			'</table>';
	

//构造函数
function Calendar(json) {
	this.init.apply(this,arguments);
}

//计算月份总天数
Calendar.prototype.getDays=function(y,m){
	var arr=[31,28,31,30,31,30,31,31,30,31,30,31];
	if( y%400 == 0 ){
		arr[1]=29;
	}else{
		if( y%4 == 0 && y%100 != 0 ){
			arr[1]=29;
		}
	}
	return arr[ m ];
}

//渲染模板
Calendar.prototype.render = function (Year, Month, Dd) {
	var _self = this;
	var newDay = new Date();
	
	newDay.setFullYear(Year,Month,Dd);	//生成新日期
	
	var dd = newDay.getDate();		//当天日期
	
	var tempDay = new Date();
		tempDay.setFullYear(Year, Month, 1);	
	
	var firstDay = tempDay.getDay();	//第一天星期几
	var dayLen = this.getDays(Year,Month);	//	获取本月天数

	for(var i = 0; i < _self.$td.length; i++){	//42
		_self.$td[i].innerHTML = "";
		_self.$td[i].className = _self.$td[i].className.replace("on", "");
	}
	for(var j = 0; j < dayLen; j++) {
		_self.$td[ j+firstDay ].innerHTML = j+1;
		if( j + 1 == dd){
			_self.$td[j + firstDay].className = "on";
		}
	}
}

//填充年、月
Calendar.prototype.fill = function (y,m,d) {
	var _self = this,
		now = new Date(),
		year = y || now.getFullYear(),
		month = m-1 || now.getMonth(),
		dd = d || now.getDate();

	//填充
	_self.$yearBox.val(year);
	
	var temp = m || now.getMonth()+1;
	_self.$monBox.val(temp);
	//渲染模板 
	var tempdd = this.getDays(year,month);   //日期计算有点点小问题 大于29日的转换
	
	dd > tempdd  ? tempdd : dd;
	console.log(dd,tempdd,dd>tempdd)
	_self.render(year, month, dd);
}

Calendar.prototype.init = function (obj) {
	var _self = this;
	var $_self = $(obj.id);
	$(str).appendTo($_self.find(".date-lawyer"));	//填充日历模板
	
	_self.$dateText = $_self.find(".calendar");	//选择日期所在input
	_self.$dateLawyer = $_self.find(".date-lawyer");	//弹出层
	_self.$yearBox = $_self.find(".year");		//输入框： 年	
	_self.$monBox = $_self.find(".month");
	
	_self.thisDay = "";		//保存当天
	//模板DOM
	_self.$data_table = $_self.find(".cal-table");//table
	_self.$tbody = $_self.find("tbody");
	_self.$td =_self.$tbody.find("td");
	
	_self.fill();	//首次填充
	
	/********以下为DOM 事件***********/
	//回车事件
	_self.enterEvent = function(event){
		var e = event || window.event;
		
		if(e && e.keyCode==13){ // enter 键
			var year = _self.$yearBox.val().substring(0,4);
			var month = _self.$monBox.val().substring(0,2);
			_self.fill(year,month,_self.thisDay);
		}	
	}
	
	//输入按钮绑定
	_self.$yearBox.on("keydown",_self.enterEvent);
	
	_self.$monBox.on("keydown",_self.enterEvent);
	
	
	//点击input显示日历
	_self.$dateText.on("click",function(){
		_self.$dateLawyer.show();
		var year = _self.$yearBox.val();
		var month = _self.$monBox.val();
		_self.fill(year,month,_self.thisDay);
	}) 
	
	
	//隐藏日历
    $(document).on('click', function(event) {
		var event = event||window.event;
        var Target = $(event.target);
		
		if (Target.parents('.test-box ').length === 0) {		
			$(".date-lawyer").hide();
		}
    });

	//点击input 展现日历
	_self.$dateText.on("click",function(event){
		event = event || window.event;
		$(".date-lawyer").hide();
		_self.$dateLawyer.show();		
	})
	
	_self.$td.on("click",function(){
		var $this = $(this),
			thisVal = ~~$this.text() ? $this.text():1,
			year = _self.$yearBox.val(),
			month = _self.$monBox.val();
			
		_self.thisDay = ~~$this.text() ? $this.text():1;	
		_self.$dateText.val(year+"年"+month+"月"+thisVal+"日");
		_self.$dateLawyer.hide();	
	}) 
}

//调用
$(function(){
	var c = new Calendar({ id: "#data-box1" });
	
	var c2 = new Calendar({ id: "#data-box2" });
})
	
//module.exports = Calendar;
//var Calendar = require('./1');
//var xxx = new Calendar({xx:xxx});
