/* css */
import 'css/page/ui-collection/index.scss';
/* fastclick */
import 'fastclick.js';
import Confirm from 'components/confirm';

$('#confirmBtn').click(()=>{
    let confirm = new Confirm({
        data:{
            title: 'title',
            msg: '确定清除吗？'
        }
    });
    confirm.open();
});