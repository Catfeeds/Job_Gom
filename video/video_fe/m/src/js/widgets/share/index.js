import toast from 'components/toast';
import isWX from 'util/isWX';

class share {
	constructor(parameter) {
		this.parameter = parameter;
		this._init(parameter);
	}

	_init(parameter){
        let $mask = $('[data-node="shareMask"]');
        $mask.on('click','em',function(){
            $mask.hide();
        });
		$(parameter.selector + '').on('click',function(){
			if(isWX){
                $mask.show();
			}else{
				toast('请使用浏览器自带分享功能', {
					delay: 2500,
					position:{
						left:'center',
						top:'51%'
					}
				});
			}
		});
	}
}

export default share;



// 如下为使用方法
/* toast */
// import Share from 'widgets/share/share';

//	 var shareHandler = new Share({
//		 selector:'.iconbox em',
//		 config: $CONFIG || {}
//	 })
