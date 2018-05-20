$.fn.extend({
	selects : function( node, options ){
		var selfs = this,
			defaultNode = {
				content : '<span class="span1">' + $( selfs ).text() + '</span>',
				btn : '<span class="span2"></span>'
			},
			selfsText = $.trim( $( selfs ).text() ),
			defaultOptions = {
				data : [],						//列表数据
				checked : selfsText, 	//默认选中文字
				please : '请选择',				//默认提示文字
				textName : 'text',				//数据文字key名
				valueName : 'value',			//数据value  key名
				selectdCls : 'active',			//slect点击添加class
				checkText : true,				//下拉列表是否收起  默认收起
				checkedCls : 'active',			//列表选中class
				disable : 'disable',			//是否禁用
				onChanged : function(){}		//选择后的回调
			},
			node = $.extend({}, defaultNode, node ),
			options = $.extend({}, defaultOptions, options ),
			$contentBox = $('<div></div>').appendTo( $(selfs).empty()).height( $(selfs).height() );
			$content = $( node.content ).text( ( selfsText ==='' ? options.please : selfsText ) ).appendTo( $contentBox ).attr('data-node', 'checked');
			$btn = $( node.btn ).appendTo( $contentBox ),
			value = null;


		var $checked,
			result,
			html = '<ul data-node="selectList"><li><a href="javascript:;">' + options.please + '</a></li>',
			$ul,
			$parent = options.parent ? $(options.parent) : this,
			$selector = options.parent ? this.selector : undefined;

		for ( var i = 0, len = options.data.length; i<len; i++ ) {
			value = options.data[i][options.valueName] !== undefined ? options.data[i][options.valueName] : i;
			html += '<li class="' + (options.data[i].checked === value ? options.checkedCls : '') + '"><a href="javascript:;" data-value="' + value + '" data-index="' + i + '">' + options.data[i][options.textName] + '</a></li>'
		}
		html  += '</ul>';
		$ul = $( html ).appendTo( $(selfs) );
		$parent.on( 'click', $selector, function( e ){
			e.stopPropagation();
			$( 'ul[data-node="selectList"]' ).hide();
			if ( options.data.length === 0 && $( this ).attr( 'data-refresh' ) !== 'running' ) return;
			if($(this).hasClass( options.disable )) return;
			$(this).addClass(  options.selectdCls ); 
			if( $(this).find( 'ul li' ).length !== 0 ) $(this).find( 'ul' ).show();
		});

		$parent.on( 'click', 'ul[data-node="selectList"] a', function( e ){
			e.stopPropagation();
			$checked = $(this).parents( 'ul' ).parent().find( '[data-node="checked"]' );
			if( $checked.text() !== $(this).text() ){
				result = {
					text : ( $(this).text() !== options.please ? $(this).text() : '' ),
					value : $(this).attr( 'data-value' ),
					index : $(this).attr( 'data-index' )
				}
				options.checkText && $checked.text( $(this).text() );//.attr( 'data-value', $(this).attr('data-value') );
				if ( options.checkedCls !== undefined ){
					$(this).parent().addClass( options.checkedCls ).siblings().removeClass( options.checkedCls );
				}
				options.onChanged.call( this, result );

			}
			$(this).parents( 'ul' ).hide();
			return false;
		});

		$(document).on( 'click', function(){
			selfs.find( 'ul' ).hide();
		});
		return this;
	},
	setList : function( options ){
		$( this ).attr( 'data-refresh', 'running' );
		var selfs = this,
			defaultOptions = {
				data : [],
				textName : 'text',
				checked : '',
				valueName : 'value',
				please : '请选择',	
				checkedCls : 'active'
			},
			options = $.extend({}, defaultOptions, options ),
			html = '<li><a href="javascript:;">' + options.please + '</a></li>';
		if( options.data.length !==0 ) {
			for ( var i = 0, len = options.data.length; i<len; i++ ) {
				value = options.data[i][options.valueName] !== undefined ? options.data[i][options.valueName] : i;
				html += '<li class="' + ( options.checked === options.data[i][options.textName] ? options.checkedCls : '') + '"><a href="javascript:;" data-value="' + value + '">' + options.data[i][options.textName] + '</a></li>'
			}
		}
		$( selfs ).find( '[data-node="selectList"]' ).html( html );
		return this;
	}
})