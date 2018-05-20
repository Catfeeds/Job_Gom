//白名单
var whiteList = {
    a: ['target', 'href', 'title', 'class', 'data-node'],
    div: ['class', 'style', 'data-node', 'unselectable', 'onselectstart', 'data-type'],
    dl: ['class', 'style', 'data-node'],
    dt: ['class', 'style'],
    em: ['class', 'style', 'data-node'],
    h1: ['data-node'],
    h2: ['data-node'],
    h3: ['data-node'],
    h4: ['data-node'],
    h5: ['data-node'],
    h6: ['data-node'],
    img: ['src', 'alt', 'title', 'width', 'height', 'id', '_src', 'loadingclass', 'class', 'data-latex', 'data-node', 'data-index', 'data-type'],
    p: ['class', 'style', 'data-node'],
    span: ['class', 'style', 'data-node'],
    ul: ['class', 'style', 'data-node'],
    li: ['class', 'style', 'data-node']
};

var defaults = {
    //图片张数限制
    imgLimitNUm: 9,
    //商品个数限制
    goodsLimitNUm: 9,
    initialFrameWidth: 788,
    initialFrameHeight: 400,
    zIndex: 9,
    autoClearinitialContent: true,
    //服务器根目录
    UEDITOR_HOME_URL: $_CONFIG['js_domain'],
    //后台地址
    //serverUrl:'php/1.php',
    serverUrl: '',
    //css 路径
    themePath: $_CONFIG.csspath + '/css/module/editor/',
    theme: 'default',
    //白名单
    whitList: whiteList,
    //工具栏
    toolbars: [
        []
    ],
    //iframe 内置样式
    iframeCssUrl: $_CONFIG.csspath + '/css/module/editor/default/css/iframestyle.css',
    //'//localhost:8017/src/js/editor/themes/iframestyle.css',
    //纯文本粘贴
    pasteplain: true,
    //禁止div转换成p标签
    allowDivTransToP: false,
    //禁止缩放图片
    imageScaleEnabled: false,
    elementPathEnabled: false, // 关闭元素路径,调试时暂时开启
    wordCount: false, // 字数统计
    //禁止非同域上传图片
    catchRemoteImageEnable: false,
    //匹配快捷按键回调
    // callbackKey: shortcutKey.callbackKey,
    //右键菜单功能
    enableContextMenu: false,
    // 因为是用的自定义的弹窗,所以,关闭了编辑器自带的图片弹窗
    imagePopup: false,
    // 禁止自动保存
    enableAutoSave: false,
    // 自定义过滤规则
    // filterTxtRules:filterTxtRules()
};

module.exports = defaults;