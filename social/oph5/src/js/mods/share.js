//sharetype 1-qqzone 2-sina
//pageType 1-商品详情页 2-店铺详情页面 3-店铺优惠券 4-优惠券列表
define('mods/share.js',function(require,exports,module){
    var com = require('mods/common')
        $ = require('vendors/zepto');
    var check = require("mods/check");
    var storage = require('mods/storage');
    var UI = require('UI/alert');
    module.exports = {
        /*getShareParams:function(sharetype,pageType,imgsrc,shopName,uri){
            var url = '';
            if(pageType == 1){
                var urlObj=com.getParams(location.href),
                    nowUrl=location.href.substr(0,location.href.indexOf('?'));
                if(urlObj['kId']!='0' && urlObj['kId']!=undefined){
                    url=nowUrl+'?kId='+$('.tanchufenxi').attr('kId')+'&productId='+urlObj['productId']+'&shopId='+urlObj['shopId'];
                }else{
                    url=uri?uri + '&kId='+$('.tanchufenxi').attr('kId'):nowUrl + '?kId='+$('.tanchufenxi').attr('kId')+'&productId='+urlObj['productId']+'&shopId='+urlObj['shopId'];
                }
                desc = '我在“国美Plus”发现了一个不错的商品快来看看吧亲';
            }else if(pageType == 2){
                url = location.href;
                desc = '我在“国美Plus”发现了一个不错的店铺快来看看吧亲';
            }else if(pageType == 3){
                url = location.href+'&k='+0;
                desc = '把最超值的优惠信息带到您的身边，国美Plus领券中心等你来抢....';
            }else if(pageType == 4){
                url = location.href;
                desc = '把最超值的优惠信息带到您的身边，国美Plus领券中心等你来抢....';
            }
            var params = {
                bdText : shopName,
                bdDesc : desc,
                bdUrl : url,
                bdPic : imgsrc,
                k:0
            }    
            if(sharetype==1){
                params.bdUrl=url.substr(7);
            }
            var search = '?url='+encodeURIComponent(params.bdUrl)+'&title='+encodeURIComponent(params.bdText)+'&pics='+encodeURIComponent(params.bdPic)+'&desc='+encodeURIComponent(params.bdDesc);
            
            switch(sharetype){
                case 1:
                    $('.tanchufenxi').hide();
                    window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey'+search,"","_blank");break;
                case 2:
                    search += '&appkey=1343713053&searchPic=true'
                    location.assign('http://service.weibo.com/share/mobile.php'+search);
                    break;
                case 2:
            }
        }*/
        //pageType页面类型  0:shangpin  1:dianpu
        //sharetype 0:weibo 1:qq,weixin,pengyouquan  2:qqkongjian 
        getShareParams:function(pageType,sharetype,desc,imgsrc,shopName){
            switch(desc){
                case 0:
                    desc = '这儿有我们志趣相同的小伙伴，快快加入我们把。';  //圈子 QQ 微信
                    break;
                case 1:
                    desc = '终于找到了和我志趣相同的小伙伴，有种找到组织的感觉。';  //圈子  空间 微博
                    break;
                case 2:
                    desc = '这是我在国美Plus找到的好东西，就知道你会喜欢。';  //话题 商品     商品详情  qq weixin
                    break;
                case 3:
                    desc = '我心仪的这款商品，到底是在国美Plus找到了。';  //话题 商品     商品详情   空间 微博
                    break;
                case 4:
                    desc = '我发现了前所未有的好店，不如，你也来逛逛？';  //话题 店铺页   店铺详情
                    break;
                case 5:
                    desc = '这是我费尽千辛万苦找到的超级好店。';  //话题 店铺    店铺详情
                    break;
                case 6:
                    desc = '这家店正在放券，店好，券更牛，还不快行动？';  //店铺 优惠券
                    break;
                case 7:
                    desc = '我抢到了超给力的优惠券，就在这家牛店。';  //店铺
                    break;
                case 8:
                    desc = '你绝对想不到，在这里可以找到所有店铺的优惠券。';  //店铺 领券中心
                    break;
                case 9:
                    desc = '万万没想到，我想要的优惠劵，居然在这里找到了。';  //店铺
                    break;
            }
            var url = '';
            switch(pageType){
                case 0:                  
                    var urlObj=com.getParams(location.href),
                        kId=$('#share_cover').attr('kId'),
                        nowUrl=location.href.substr(0,location.href.indexOf('?'));
                    /*有返利*/
                    if(kId && kId!=""){
                        url=nowUrl+'?productId='+urlObj['productId']+'&shopId='+urlObj['shopId']+'&kId='+kId;                        
                    }else{   //没有返利
                        url=location.href;
                    }
                    break;
                case 1:
                    url=location.href;  //店铺，
                    break;
                case 2:
                    url = location.href+'&k='+0;   //店铺优惠券  无返回，有进店看看
                    break;
                case 3:
                    url = location.href+'&j='+0;   //店铺优惠券  有返回，有进店看看
                    break;
                case 4:
                    url = location.href;   //店铺优惠券 
                    break;
                case 5:
                    url = location.href;   //店铺优惠券  
                    break;
                case 6:
                    url = location.href;   //店铺优惠券  
                    break;
                case 7:
                    url = location.href;   //店铺优惠券  
                    break;
                case 8:                  
                    var urlObj=com.getParams(location.href),
                        kId=storage.getCookie("kId"),
                        nowUrl=location.href.substr(0,location.href.indexOf('/sidemoney'));
                    /*有返利*/
                    if(kId && kId!=""){
                        url=nowUrl+'/product/index'+'?productId='+storage.getCookie("proId")+'&shopId='+storage.getCookie("shopId")+'&kid='+kId;                        
                    }else{   //没有返利
                        url=nowUrl+'/product/index'+'?productId='+storage.getCookie("proId")+'&shopId='+storage.getCookie("shopId");
                    }
                    break;
            } 

            var params = {
                bdText : shopName,
                bdDesc : desc,
                bdUrl : url,
                bdPic : imgsrc,
                k:0
            }    
            if(sharetype==1){
                params.bdUrl=url.substr(7);
            }
            var search = '?url='+encodeURIComponent(params.bdUrl)+'&title='+encodeURIComponent(params.bdText)+'&pics='+encodeURIComponent(params.bdPic)+'&desc='+encodeURIComponent(params.bdDesc);
            var src=location.href.substr(location.href.lastIndexOf('/')+1);  //  到/  http://10.125.31.71/product/
            var srl=location.href.slice(0,location.href.indexOf('?')+1);    //  /到？  http://10.125.31.71/Product/index?"
            switch(sharetype){
                case 0:  //weibo
                    search += '&appkey=1343713053&searchPic=true'
                    location.assign('http://service.weibo.com/share/mobile.php'+search);                    
                    break;
                case 1:   //qq
                    var kId=$('#share_cover').attr('kId');
                    /*有返利*/
                    if(kId && kId!=""){
                        history.replaceState(null, "abc", srl+"productId="+urlObj['productId']+"&shopId="+urlObj['shopId']+"&kId="+kId);
                    }else{
                        /*没有新生成的返利   地址栏里有kId*/
                        if(urlObj['kId'] && urlObj['kId']!='0'){   
                            history.replaceState(null, "abc", srl+"productId="+urlObj['productId']+"&shopId="+urlObj['shopId']+"&kId="+urlObj['kId']);
                        }                     
                    }
                    if(check.isWeiXin() || check.isQQ()){
                        $('#usl_share').css('display','block');
                    }else{
                        UI.alerter('请用浏览器自带分享功能分享');
                    };
                    break;
                case 2:   //QQ空间
                    window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey'+search,"","_blank");break;
                case 3:
                    if(check.isWeiXin() || check.isQQ()){
                        $('#usl_share').css('display','block');
                    }else{
                         UI.alerter('请用浏览器自带分享功能分享');                                              
                    };
                    break;
            }
        }
    }
});
