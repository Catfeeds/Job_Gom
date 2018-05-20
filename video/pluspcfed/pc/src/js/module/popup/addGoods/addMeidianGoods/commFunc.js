//判断对象非空
function isEmptyObject(obj) {
     for (var key in obj) {
        return false;
     }
     return true;
}

//封装数据，以兼容
function reWrap(result){
    var resultItems= result.items;  
    //空为好货推荐           
    var itemZero =  resultItems[0];
    var flag = isEmptyObject(itemZero && itemZero.item); 

    for(var i=0;i<resultItems.length;i++){
        var arr = resultItems[i];
        // skuId、pId、sUrl、name、salePrice
        //我的美店 商品
        if(!flag){
            //1skuId 有了
            //3sUrl 无
            var item = arr.item;
            arr.pId = item.id;
            arr.name = item.name;
            arr.salePrice = item.salePrice;
            arr.skuPrice = item.salePrice;
            arr.mainImage = item.mainImage;

        }else{
            arr.pId = arr.id;
            arr.skuId = arr.skuID;
            //2pId 无
            //3sUrl 无
            //4 name 有
            arr.salePrice = arr.price;  
            arr.skuPrice = arr.price;
            arr.mainImage = arr.imageUrl;                         
        }    
    }
    return result;
}

module.exports = {
	isEmptyObject:isEmptyObject,
	reWrap:reWrap
}