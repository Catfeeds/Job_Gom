var imgPath = $_CONFIG.imgpath + '/images/emoji/';

var ext = '.png';

var groupOne = [{
    name: '微笑',
    url: 'weixiao'
}, {
    name: '色',
    url: 'se'
}, {
    name: '亲亲',
    url: 'qinqin'
}, {
    name: '得意',
    url: 'deyi'
}, {
    name: '流泪',
    url: 'liulei'
}, {
    name: '害羞',
    url: 'haixiu'
}, {
    name: '闭嘴',
    url: 'bizui'
}, {
    name: '鼓掌',
    url: 'guzhang'
}, {
    name: '大哭',
    url: 'daku'
}, {
    name: '尴尬',
    url: 'ganga'
}, {
    name: '生气',
    url: 'shengqi'
}, {
    name: '调皮',
    url: 'tiaopi'
}, {
    name: '呲牙',
    url: 'ciya'
}, {
    name: '惊讶',
    url: 'jingya'
}, {
    name: '委屈',
    url: 'weiqu'
}, {
    name: '吐血',
    url: 'tuxue'
}, {
    name: '冷汗',
    url: 'lenghan'
}, {
    name: '抓狂',
    url: 'zhuakuang'
}, {
    name: '难过',
    url: 'nanguo'
}, {
    name: '偷笑',
    url: 'touxiao'
}, {
    name: '白眼',
    url: 'baiyan'
}, {
    name: '不屑',
    url: 'buxie'
}, {
    name: '快哭了',
    url: 'kuaikule'
}];

var groupTwo = [{
    name: '困',
    url: 'kun'
}, {
    name: '装酷',
    url: 'zhuangku'
}, {
    name: '大笑',
    url: 'daxiao'
}, {
    name: '偷瞄',
    url: 'toumiao'
}, {
    name: '奋斗',
    url: 'fendou'
}, {
    name: '咒骂',
    url: 'zhouma'
}, {
    name: '疑问',
    url: 'yiwen'
}, {
    name: '晕',
    url: 'yun'
}, {
    name: '捶打',
    url: 'chuida'
}, {
    name: '再见',
    url: 'zaijian'
}, {
    name: '抠鼻',
    url: 'koubi'
}, {
    name: '发呆',
    url: 'fadai'
}, {
    name: '坏笑',
    url: 'huaixiao'
}, {
    name: '哈欠',
    url: 'haqian'
}, {
    name: '鄙视',
    url: 'bishi'
}, {
    name: '睡觉',
    url: 'shuijiao'
}, {
    name: '饿',
    url: 'e'
}, {
    name: '阴险',
    url: 'yinxian'
}, {
    name: '难受',
    url: 'nanshou'
}, {
    name: '可怜',
    url: 'kelian'
}, {
    name: '撇嘴',
    url: 'piezui'
}, {
    name: '石化',
    url: 'shihua'
}, {
    name: '泪眼',
    url: 'leiyan'
}];

var format = function(arr) {
    for (var i = 0, len = arr.length; i < len; i++) {
        var emoji = arr[i];
        emoji.url = imgPath + emoji.url + ext;
    }
    return arr;
};

module.exports = format(groupOne.concat(groupTwo));