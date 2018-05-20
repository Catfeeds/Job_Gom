/**
 * 获取orderList，构建新数组
 * @author Zhengchun Fu
 */

var getOrderList = function() {
    var orderList = $_CONFIG.orderList;

    var newOrderList = [];
    $.each(orderList, function(i, m) {
        var shop = {
            shopId: m.shopId
        };
        var productList = m.productList;
        var totalPrice = 0;
        $.each(productList, function(k, v) {
            totalPrice += v.price * v.productNum;
        });
        shop.totalPrice = totalPrice;
        newOrderList.push(shop);
    });

    newOrderList.sort(function(a, b) {
        return a.totalPrice > b.totalPrice ? 1 : -1;
    });
    return newOrderList;
};

module.exports = getOrderList;