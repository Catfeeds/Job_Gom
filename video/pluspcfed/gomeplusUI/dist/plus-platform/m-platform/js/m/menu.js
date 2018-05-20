/**
 * Created by lishengyong on 2016/12/8.
 */

$(function () {

    /**
     * mobile下显示隐藏Menu
     */
    $('.nav-icon').bind('click', function () {
        var menu = $('.nav-list');
        if(menu.is(':hidden')) {
            menu.show();
        } else {
            menu.hide();
        }
    });

    /**
     * 处理Menu左右箭头点击事件
     */
    var navList = $('.nav-list');
    var menuUl =  $('.nav-list ul');
    var menuItem = $('.nav-list ul>li');
    var itemsLen = 0;
    var itemW = 0;
    var moving = false;
    var acriveItem = 0;
    if(menuItem) {
        itemsLen = menuItem.length;
        if(itemsLen > 0) {
            itemW = menuItem[0].clientWidth;
        }
    }

    moveMenuTo();

// 根据当前处于活动的menu项来滑动menu
    function moveMenuTo() {
        menuItem.each(function (i) {
            if(this.classList.contains('actived')) {
                // acriveItem = i;
                if((i + 1) * itemW > navList[0].clientWidth) {
                    // moveElement(-1, i * itemW); // -1 表示向左移动
                    menuUl[0].style.left = -(i * itemW) + 'px';
                }
            }
        });
    }


    $('.nar-arrow-left').bind('click', function () {
        if(moving) {
            return;
        }
        moving = true;
        // 判断是否达到左面的临界值
        // ： 所有LI长度之和 - UL的left值 <  nav-list的宽度
        if((itemsLen * itemW) - Math.abs(getPureValue(menuUl[0].style.left)) > navList[0].clientWidth) {
            // 移动元素
            moveElement(-1, calculaeMoveWidth()); // -1 表示向左移动
        } else {
            moving = false;
        }
    });

    $('.nar-arrow-right').bind('click', function () {
        if(moving) {
            return;
        }
        moving = true;
        // 判断是否达到右面的临界值UL的left值为0
        if(getPureValue(menuUl[0].style.left) >= 0) {
            moving = false;
            return;
        }
        // 移动元素
        moveElement(1, calculaeMoveWidth()); // 1 表示向右移动
    });

    function calculaeMoveWidth() {
        // nav-list的宽度值除以LI的宽度值向下取整
        return Math.floor(navList[0].clientWidth / itemW) * itemW;
    }

    function moveElement(direction, len) {
        if(direction === -1) {
            //menuUl[0].style.left = (Number(getPureValue(menuUl[0].style.left)) -len) + 'px';
            menuUl.animate({left:(Number(getPureValue(menuUl[0].style.left)) -len) + 'px'}, 'slow', function(){
                moving = false;
            });
        }
        if(direction === 1) {
            //menuUl[0].style.left = (Number(getPureValue(menuUl[0].style.left)) + len) + 'px';
            if(Number(getPureValue(menuUl[0].style.left)) + len > 0) {
                menuUl[0].style.left = '0px';
                moving = false;
            } else {
                menuUl.animate({left:(Number(getPureValue(menuUl[0].style.left)) + len) + 'px'}, 'slow', function(){
                    moving = false;
                });
            }
        }
    }
    function getPureValue(value) {
        var res = value.split('px');
        if(res && res.length > 0) {
            res = res[0];
        } else {
            res = 0;
        }
        return res;
    }

})
