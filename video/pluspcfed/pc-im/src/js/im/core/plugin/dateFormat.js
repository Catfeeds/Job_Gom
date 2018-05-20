//日期格式化


import dateFormat from './fecha';
import store from '../vuex';

export const getNowDayDate = (  ) => {
    let time = dateFormat.format( new Date(), 'YYYY/MM/DD');
    let nowDayStart = +new Date( time + ' 00:00:00' ) ;
    let nowDayEnd = +new Date( time + ' 23:59:59' ) ;
    store.dispatch( 'EDIT_NOWDAYDATE', {
        nowDayStart: nowDayStart,
        nowDayEnd: nowDayEnd
    });
}

export const getDateFormat = ( date ) => {
    let nowDay = store.state.initModule.nowDayDateStart;
    let result = '';
    if( date < nowDay ){
        result = dateFormat.format( new Date( date ), 'YYYY/MM/DD HH:mm');
    }else{
        result = dateFormat.format( new Date( date ), 'YYYY/MM/DD HH:mm');
        result = result.substr( 11, result.length );
    }
    return result;
}