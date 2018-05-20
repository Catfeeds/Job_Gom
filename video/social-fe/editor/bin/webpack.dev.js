const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const paths = require('./paths');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: paths.base,
        host: '0.0.0.0',
        port: 8080,
        before: function(app){
            app.get('/ajax/**', function(req, res, next) {
                var json = {"success":true,"code":200,"message":"\u6210\u529f","data":{"currPageNum":1,"endNum":1,"pageSize":10,"startNum":0,"totalCount":1,"totalPageNum":1,"items":[{"collectDate":"2017-03-09","displayName":"\u9f99\u6c5f\u4eba\u5bb6 \u5b81\u590f\u4e2d\u5b81\u67b8\u675e\u5b50200g\/\u888b  \u5305\u90ae","firstCategoryId":"cat15045969","giftItemId":"19299","imageUrl":"\/\/gfs17.gomein.net.cn\/T1gBLTBCYT1RCvBVdK_100.jpg","is3DProduct":false,"isJinXiangProduct":"false","isOnlyShow":false,"merchantName":"\u6b63\u6c5f\u5546\u8d38\u98df\u54c1\u4e13\u8425\u5e97","merchantUrl":"\/\/mall.gome.com.cn\/80012829","prdstock":"X","priceType":"putong","productId":"A0006164026","productType":"0","productUrl":"\/\/item.gome.com.cn\/A0006164026-pop19299.html","rebate":"0.00","shopFlag":"1","skuHtmlUrl":"\/\/item.gome.com.cn\/A0006164026-pop19299.html","skuId":"pop19299","skuImageUrl":"\/\/gfs17.gomein.net.cn\/T1gBLTBCYT1RCvBVdK_100.jpg","skuName":"\u9f99\u6c5f\u4eba\u5bb6 \u5b81\u590f\u4e2d\u5b81\u67b8\u675e\u5b50200g\/\u888b  \u5305\u90ae","skuNo":"19299","skuPrice":"35.00","thirdCategoryId":"cat16035604","pId":"A0006164026","sUrl":"\/\/item.gome.com.cn\/A0006164026-pop19299.html","mainImage":"\/\/gfs17.gomein.net.cn\/T1gBLTBCYT1RCvBVdK_260_260.jpg","name":"\u9f99\u6c5f\u4eba\u5bb6 \u5b81\u590f\u4e2d\u5b81\u67b8\u675e\u5b50200g\/\u888b  \u5305\u90ae","salePrice ":"35.00"}]}};
                res.json(json);
            });
        }
    }
});