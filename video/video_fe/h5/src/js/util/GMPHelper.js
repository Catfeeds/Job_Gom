/**
 * Created by zhangmike on 2017/2/25.
 */
import GMP from 'GMP';
import fromNow from './fromNow';

GMP.template.helper('dateFormat', (date)=> {
  return fromNow(date);
});