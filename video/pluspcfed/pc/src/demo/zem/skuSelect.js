/*

不使用复杂算法的 sku 切换
@Enming Zhang

适用于每个 sku 有唯一的描述字符串（如'0黑!#1小!#2一'）的情况
在每个 sku 按钮上添加一个正则作为属性（形如'^.+!#.+!#.+$'，大意是长度等于参数行数，用'.+'填充空位）
选中/取消选中任一按钮后，更新所有按钮的该属性
若某按钮的该属性不能在 sku 字符串列表中匹配到，则禁用之，反之启用

*/

var $skuWrapper = $('.sku-wrapper');
var $skuRows = $skuWrapper.children('.sku-row');
var $skuItems = $skuWrapper.find('.sku-item');

// 伪造的 sku 对象
var skuData = {
    '0白!#1大!#2一': {
        stock: 1,
    },
    '0黑!#1小!#2三': {
        stock: 12,
    },
    '0白!#1大!#2二': {
        stock: 4,
    },
    '0蓝!#1中!#2一': {
        stock: 46,
    },
    '0蓝!#1中!#2三': {
        stock: 3,
    },
    '0黑!#1中!#2三': {
        stock: 3,
    },
    '0蓝!#1中!#2五': {
        stock: 3,
    },
    '0黑!#1中!#2五': {
        stock: 3,
    },
};

// 获取由全部可用 SKU 数组（如['0白', '160寸', '2有支架']）组成的数组
var skuStrArr = [];
for (var i in skuData) {
    skuStrArr.push(i);
}

// 保存参数的总行数
var skuParamLength = $skuRows.length;
// 已选中的 sku 的数组，长度为参数行数
var selectedSkuArr = new Array(skuParamLength);

// 在每个 sku 按钮上添加 data-sku-index 属性，为该行在参数行中的索引
$skuItems.each(function(i) {
    var $this = $(this);
    var parentParamLine = $this.closest('.sku-row');
    var skuIndex = $skuRows.index(parentParamLine);
    $this.attr('data-sku-index', skuIndex);
});

// 每次点击 sku 按钮时，遍历所有按钮，更新库存相关的内容
var checkSku = function() {

    // 用 '.+' 占位 selectedSkuArr
    selectedSkuArr.fill('.+');

    // 以已选的 sku 所在的行数为索引，把 selectedSkuArr 内这些位置置换为当前 sku 的内容
    var selectedCells = $skuItems.filter('.active');
    selectedCells.each(function() {
        var $this = $(this);
        var index = +($this.attr('data-sku-index'));
        selectedSkuArr[index] = index + $this.text();
    });

    // 修改所有 sku 按钮的属性
    $skuItems.each(function() {
        var $this = $(this);
        // 复制已选中 sku 的数组到 eachSkuArr
        var eachSkuArr = [];
        $.each(selectedSkuArr, function(index, value) {
            eachSkuArr[index] = value;
        });
        // 以当前按钮的 skuindex 为索引，把数组 eachSkuArr 的该位置替换为当前按钮 sku 的索引 + 文字（如 0白 ）
        var skuIndex = $this.attr('data-sku-index');
        var skuText = $this.text();
        eachSkuArr[skuIndex] = skuIndex + skuText;
        // 用 '\!#' 连结数组 eachSkuArr
        var eachSkuStr = eachSkuArr.join('\!#');
        eachSkuStr = '^' + eachSkuStr + '$';
        $this.attr('data-sku-spec-reg', eachSkuStr);
        var reg = new RegExp(eachSkuStr);
        // 如果能在 sku list 中匹配到该字符串至少一次，则启用按钮，否则禁用
        var foundInSkuList = false;
        $.each(skuStrArr, function(index, value) {
            if (reg.test(value)) {
                foundInSkuList = true;
                return false;
            }
        });
        foundInSkuList ? $this.removeClass('disabled') : $this.addClass('disabled');
    });

};

$skuWrapper.on('click', '.sku-item', function() {

    var $this = $(this);
    if (!$this.hasClass('disabled')) {
        $this.siblings()
            .removeClass('active')
            .end()
            .toggleClass('active');
        checkSku();
    }

});
