require('../plugin/jquery.selects');
var fetch = require('io/fetch'),
    url = require('io/url'),
    address = {},
    Pubsub = require('io/pubsub'),
    addressList = [],
    selectors;
//nodeSelector  四级联动select选择器  array   
//placeHolder   默认选项  array || string    如果是数组   保持length与nodeSelector长度一致
//options       selecct选项
//node          select内容（文字部分/按钮部分）  node.btn 按钮部分  string(html) node.content文字部分 string(html)
var init = function(nodeSelector, placeHolder, options, node) {
    var nodeSelector = nodeSelector,
        isString = false,
        addressType = [
            ['provinceId', 'provinceName'],
            ['cityId', 'cityName'],
            ['boroughId', 'boroughName'],
            ['areaId', 'areaName']
        ],
        defaultOptions = {},
        defaultNode = {},
        isObject = (node instanceof Array) ? false : true,
        options = $.extend({}, defaultOptions, options);
    selectors = nodeSelector;
    if (typeof placeHolder === 'string') {
        isString = true;
    }
    for (var i = 0; i < selectors.length; i++) {
        //初始化address
        var pleaseTxt = isString ? placeHolder : placeHolder[i];
        if (pleaseTxt !== selectors[i].text()) {
            address[addressType[i][0]] = selectors[i].attr('data-' + [addressType[i][0]]);
            address[addressType[i][1]] = selectors[i].text();
        }

        var pId = ((i - 1) >= 0 ? selectors[i - 1].attr('data-' + [addressType[i - 1][0]]) : 0);

        (function(index) {
            //初始化select
            var provinceOptions = options;
            provinceOptions.please = isString ? placeHolder : placeHolder[index];
            provinceOptions.onChanged = function(changeDate) {
                var id = changeDate.value,
                    isClicked = false;
                if (id === undefined) {
                    isClicked = true;
                }else{
                    address[addressType[index][0]] = changeDate.value;
                    address[addressType[index][1]] = changeDate.text;
                    if( index + 1 <= selectors.length - 1 ){

                        addAjax(~~id, function(data) {
                            nodeSelector[ index+1 ].setList({
                                data: data.nodes,
                                please: isString ? placeHolder : placeHolder[index+1],
                                textName: 'name',
                                valueName: 'id'
                            });
                        })
                    }
                }
                delAddress(index, isClicked);


            }
            nodeSelector[index].selects((isObject ? node : node[index]), provinceOptions);
            /*初始化列表*/
            if (pId !== '') {
                addAjax(pId, function(result) {
                    selectors[index].setList({
                        data: result.nodes,
                        please: isString ? placeHolder : placeHolder[index],
                        textName: 'name',
                        valueName: 'id',
                        checked: selectors[0].find('div').children().eq(0).text()
                    });

                })
            }
        })(i);


    }
    function addAjax(id, callback) {
        if( window.localStorage ){
            var local = JSON.parse( localStorage.getItem( 'address' + id ) );
            var isLose = local !== null && local.hasOwnProperty( 'time' ) ?  local.time < +new Date() : true; 
            if( isLose ){
                fetch.get(url.get('getAddress') + id, {}).done(function(result) {
                    if (result.code === 200) {
                        callback.call(null, result.data);
                        var addressLocal = {
                            data : result.data,
                            time : +new Date() + 604800000
                        }
                        localStorage.removeItem( 'address' + id );
                        localStorage.setItem( 'address' + id, JSON.stringify( addressLocal ) );
                    }
                }).fail(function(xhr, error) {
                    console.log(xhr, error);
                });
            }else{
                callback.call(null, local.data );
            }
        }else{
            fetch.get(url.get('getAddress') + id, {}).done(function(result) {
                if (result.code === 200) {
                    callback.call(null, result.data);
                }
            }).fail(function(xhr, error) {
                console.log(xhr, error);
            });
        }
    }

    function delAddress(i, listClciked) {
        var num = i;
        if (!listClciked) {
            num++;
            nodeSelector[i].find('div').children().eq(0).text(address[addressType[i][1]]);
        }
        for (var j = num, len = nodeSelector.length; j < len; j++) {
            if (address[addressType[j][0]] !== undefined) {
                delete address[addressType[j][0]];
                delete address[addressType[j][1]];
            }
            nodeSelector[j].find('div').children().eq(0).text((isString ? placeHolder : placeHolder[j]));
            if( j!=num)nodeSelector[j].find('ul').html('');
        }

    }
};

var destroy = function() {

    for (var i = 0, len = selectors.length; i < len; i++) {

        selectors[i].off();
    }

}
var getData = function() {
    return address;
}
module.exports = {
    init: init,
    destroy: destroy,
    getData: getData
};
