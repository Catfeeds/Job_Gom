/**
 * Created by liuxu-ds on 2017/2/27.
 */
import $ from '../util/util';
import tpl from './share.html';

let _sington;

/**
 * actionsheet 弹出式菜单
 * @param {array} menus 上层的选项
 * @param {string} menus[].label 选项的文字
 * @param {function} menus[].onClick 选项点击时的回调
 *
 * @param {array} actions 下层的选项
 * @param {string} actions[].label 选项的文字
 * @param {function} actions[].onClick 选项点击时的回调
 *
 * @param {object=} options 配置项
 * @param {string=} options.className 自定义类名
 *
 * @example
 * opg.ui.share([
 {
     label: '微博',
     class:'weibo',
     onClick: function () {
         console.log('微博');
     }
 }, {
            label: '微信',
            class:'weixin',
            onClick: function () {
                console.log('微信');
            }
        }, {
            label: '朋友圈',
            class:'friends',
            onClick: function () {
                console.log('朋友圈');
            }
        }, {
            label: 'QQ',
            class:'qq',
            onClick: function () {
                console.log('QQ');
            }
        }, {
            label: 'QQ空间',
            class:'qzone',
            onClick: function () {
                console.log('QQ空间');
            }
        }
 ], [
 {
     label: '取消',
     onClick: function () {
         console.log('取消');
     }
 }
 ], {
        className: "custom-classname"
    });
 */
function actionSheet(menus = [], actions = [], options = {}) {
    if(_sington) return _sington;

    const isAndroid = $.os.android;
    options = $.extend({
        menus: menus,
        actions: actions,
        className: '',
        isAndroid: isAndroid
    }, options);
    const $actionSheetWrap = $($.render(tpl, options));
    // $('.m-share-bottom').attr('bottom',0);
    const $actionSheet = $actionSheetWrap.find('.m-share-bottom');
    const $actionSheetMask = $actionSheetWrap.find('.weui-mask');

    function _hide(){
        _hide = $.noop; // 防止二次调用导致报错

        $actionSheet.addClass(isAndroid ? 'weui-animate-fade-out' : 'weui-animate-slide-down');
        $actionSheetMask
            .addClass('weui-animate-fade-out')
            .on('animationend webkitAnimationEnd', function () {
                $actionSheetWrap.remove();
                _sington = false;
            });
    }
    function hide(){ _hide(); }

    $('body').append($actionSheetWrap);

    // 这里获取一下计算后的样式，强制触发渲染. fix IOS10下闪现的问题
    $.getStyle($actionSheet[0], 'transform');
    $($actionSheet).attr('style','bottom:0');
    $actionSheet.addClass(isAndroid ? 'weui-animate-fade-in' : 'weui-animate-slide-up');
    $actionSheetMask
        .addClass('weui-animate-fade-in')
        .on('click', hide);
    $actionSheetWrap.find('.share-list').on('click', '.item', function (evt) {
        const index = $(this).index();
        menus[index].onClick.call(this, evt);
        hide();
    });
    $actionSheetWrap.find('.m-share-bottom').on('click', '.share-close', function (evt) {
        // const index = $(this).index();
        actions[0].onClick.call(this, evt);
        hide();
    });

    _sington = $actionSheetWrap[0];
    _sington.hide = hide;
    return _sington;
}
export default actionSheet;
