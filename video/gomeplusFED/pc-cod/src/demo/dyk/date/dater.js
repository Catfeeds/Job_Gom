
//函数调用
$.fn.miniDate = function( params ) {
   
   var defaultOptions = {
        startTime : '1900/01/01',
        endTime : '9999/12/31',
        nowTime : new Date().toLocaleDateString(),
        daterCls : '',
        month : ['一','二','三','四','五','六','七','八','九','十','十一','十二'],
        week : ['日','一','二','三','四','五','六']
    }
    var options = $.extend({}, true, defaultOptions, params);  


    setDateBox();
    events( this );
    //var ss = this.selector
    //nowTime[this.selector]= []
   /* $(this).attr('data-dateId','111' + +new Date())
    console.log(nowTime)*/

    //初始化日期框
    function setDateBox(){
        var html = '';
        if( $('[data-node="data_box"]').length === 0 ){
            html = '<div class="data_box" data-node="data_box"  style="position:absolute;z-index:100;background:#fff;"><div class="sel_date" data-node="sel_date"> <div class="clearfix"> <span class="prev_y fl" data-node="prev_y">&lt;&lt;</span> <span class="prev_m fl" data-node="prev_m">&lt;</span> <span class="next_y fr" data-node="next_y">&gt;&gt;</span> <span class="next_m fr" data-node="next_m">&gt;</span> <div class="show_mn"> <span class="showDate2 month" data-node="month">八</span> <span class="ml5">月,</span> <span class="showDate2 year" data-node="year">2016</span> </div></div> <table class="data_table" data-node="data_table"><thead ><tr data-node="dateHead"></tr></thead><tbody data-node="tBody"></tbody></table></div></div>';
            
            $('body').append(html);
            boxEvents();
        }
    }

    function setHead(){
        var dateHead = '';
        for ( var  i = 0, len = options.week.length; i < len; i++ ){
            dateHead += '<td>'+ options.week[i] +'</td>'
        }
        $('[data-node="dateHead"]').html(dateHead);
    }


    //设置日期框内部数据
    function setDate( year, month, day ){

        var self = this;
        var days = new Date( year, month , 0 ).getDate();
        var week = new Date( year, month , 1 ).getDay();
        var isNow =  nowTime[0] === year && nowTime[1] === month;
        var day = ~~day;
        var isStartLose = '';
        var isEndLose = '';
        var dateBody = '<tr>';
        var dateNum = +new Date( year, month  , 0 );
        //console.log(month)
        $('[data-node="month"]').text( options.month[ ~~month -1 ] ).attr('data-month', month);

        $('[data-node="year"]').text( year );
        //失效日期
        if( dateNum < +new Date( arrStart[0], arrStart[1] , 0 ) ){
            isStartLose = '1';
        }else if( dateNum === +new Date( arrStart[0], arrStart[1] , 0 ) ){
            isStartLose = '2';
        }
        if( dateNum > +new Date( arrEnd[0], arrEnd[1] , 0 ) ){
            isEndLose = '1';
        }else if( dateNum === +new Date( arrEnd[0], arrEnd[1], 0 ) ){
            isEndLose = '2';
        }


        //补全    
        for( var i = 0, len = week; i < len; i++ ){
            dateBody += '<td> </td>';
        }
        //填充日期
        for( var i = 1, len = days; i <= len; i++ ){
            //是否是设置日期
            dateBody += '<td class="'
                        + ( i === day && isNow ? 'active' : '' ) 
                        + ( isStartLose === '1' ? 'disable' : ( isStartLose === '2' && i <= arrStart[2] ? 'disable' : '' ) )
                        + ( isEndLose === '1' ? 'disable' : ( isEndLose === '2' && i >= arrEnd[2] ? 'disable' : '' ) )
                        +'">' 
                        + i 
                        + '</td>';

            if( (week + i) % 7 === 0 ){
                dateBody += '</tr><tr>'
            }
        }

        $('[data-node="tBody"]').html( dateBody );

    }


    function getDateArr( date ){
        return date.replace(/[\/|-]/g, '!').split('!');
    }

    function showDate( obj ){
        var $dateBox = $('[data-node="data_box"]')
        $dateBox.show();
        var top = $(obj).offset().top + $(obj).height();
        var left = $(obj).offset().left;
        var winH = $(window).height();
        var st = $(window).scrollTop();
        if( top + $dateBox.height() > winH + st ){
            top -= ( $(obj).height() + $dateBox.height());
        } 
        $('[data-node="data_box"]').css({
            top : options.top !== undefined ? options.top : top,
            left : options.left !== undefined ? options.left : left
        });

    }
    function events( obj ){
        $( obj.selector ).on('click', function( e ){
            e.stopPropagation();
            time = isNaN(Date.parse($(this).val())) ? options.nowTime : new Date( $(this).val()).toLocaleDateString();
            nowTime = getDateArr( time ); 
            arrStart = getDateArr( options.startTime );
            arrEnd = getDateArr( options.endTime );
            var $dateBox = $('[data-node="data_box"]');

            //console.log(options.nowTime)
            $dateBox.attr('class', 'data_box ' + options.daterCls);
            if( $(this).attr('data-dateId') === undefined ){
                $(this).attr('data-dateId', 'dater_' + +new Date()); 
            }
            if( $dateBox.attr('data-dateId') !== $(this).attr('data-dateId')  ){
                showDate( this );
                $dateBox.attr( 'data-dateId', $(this).attr('data-dateId') );
                setHead();
                setDate( nowTime[0], nowTime[1], nowTime[2] );
            }else{

                $dateBox.hide().removeAttr( 'data-dateId' );
                //setValue( this );
            }
            $(this).blur();
            //console.log(nowTime,111111111111)

           
        })
        

    }

    function boxEvents(){
        $( document ).on('click', function(e){
            e.stopPropagation();
            var $dateBox = $('[data-node="data_box"]');
            var $focusInput = $('input[data-dateId="'+ $dateBox.attr('data-dateId') +'"]');
            var resultDate = $focusInput.val();
            if( $dateBox.css('display') !== 'none' ){
                if( $('[data-node="tBody"] .active').length !== 0 ){
                    resultDate = $('[data-node="year"]').text() + '-'  
                                + addZero( ~~$('[data-node="month"]').attr('data-month') ) + '-' 
                                + addZero( ~~$('[data-node="tBody"] .active').text() );
                }

                $focusInput.val( resultDate );
                $dateBox.hide().removeAttr('data-dateId');
            }

        });
        $('[data-node="data_box"]').on('click', function(e){
            e.stopPropagation();
        
        }).on( 'click', '[data-node="tBody"] td', function( e ){
            e.stopPropagation();
            if( !$(this).hasClass('disable') ){

                var $dateBox = $('[data-node="data_box"]');
                var resultDate = $('[data-node="year"]').text() + '-'  + addZero( ~~$('[data-node="month"]').attr('data-month') ) + '-' + addZero( ~~$(this).text() );
               
                $('[data-dateId='+ $dateBox.attr('data-dateId') +']').val( resultDate );
                $dateBox.hide().removeAttr( 'data-dateId' );

            }

            
        }).on( 'click', '[data-node="prev_m"]', function(e){
            e.stopPropagation();
            var year = $('[data-node="year"]').text();
            var month = $('[data-node="month"]').attr('data-month');
            month --;
            if( month  === 0 ){
                month = 12;
                year--;
            }
            console.log(nowTime);
            setDate( year, month, 0 );
        }).on( 'click', '[data-node="next_m"]', function(e){

            e.stopPropagation();
            var year = $('[data-node="year"]').text();
            var month = $('[data-node="month"]').attr('data-month');
            month ++;
            if( month  > 12 ){
                month = 1;
                year++;
            }
            setDate( year, month, 0 );
        }).on( 'click', '[data-node="prev_y"]', function(e){
            e.stopPropagation();
            var year = $('[data-node="year"]').text();
            var month = $('[data-node="month"]').attr('data-month');
            year --;
            setDate( year, month, 0 );
        }).on( 'click', '[data-node="next_y"]', function(e){
            e.stopPropagation();
            var year = $('[data-node="year"]').text();
            var month = $('[data-node="month"]').attr('data-month');
            year ++;
            setDate( year, month, 0 );
        });
    }
    function addZero( num ){
        return num < 10 ? '0' + num : num;
    }

};