/* gome-brige.js */
import $g from 'util/bridge.js';
/* toast */
import toast from 'components/toast';

class share {
    constructor(parameter) {
        this.parameter = parameter;
        this._init(parameter);
    }

    shareSetTime(){}

    _init(parameter){
        const that = this;
        $(parameter.selector + '').on('click',function(){
            if(that.shareSetTime){
                clearTimeout(that.shareSetTime);
            }
            that.shareMask(that.parameter);
        })
    }

    shareMask(parameter){
    	var appType = parameter.config.appType;
        if(appType == "gomeplus"){
        	this.showMask("gomeplus");
        } else if(appType == "gome"){
        	this.showMask("gome");
        } else {
            toast('请使用浏览器自带分享功能', 2500);
        }
        $('.shareMask .share-x').on('click',function(){
            $('.shareMask').hide();
        });
    }

    showMask(isApp){
        $('.shareMask').show(0);
        if(isApp == "gome"){
            $('.share-h-gome').show(0);
        } else if(isApp == "gomeplus"){
            $('.share-h-app').show(0);
        } else {
            $('.share-h').show(0);
        }
        this.shareSetTime = setTimeout(function(){
            $('.shareMask').hide(200);
            $('.share-h').hide(200);
            $('.share-h-app').hide(200);
            $('.share-h-gome').hide(200);
        }, 5000);
    }            
}

export default share;



// 如下为使用方法
/* toast */
// import Share from 'widgets/share/share';

//     var shareHandler = new Share({
//         selector:'.iconbox em',
//         config: $CONFIG || {}
//     })
