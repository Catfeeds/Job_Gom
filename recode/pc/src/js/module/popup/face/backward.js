var path = $_CONFIG.imgpath + '/images/emoji/';
var ext = '.png';

var backward = {
    '亲': {
        name: '亲亲',
        url: path + 'qinqin' + ext
    },
    '愤怒': {
        name: '生气',
        url: path + 'shengqi' + ext
    },
    '惊恐': {
        name: '惊讶',
        url: path + 'jingya' + ext
    },
    '迷茫': {
        name: '委屈',
        url: path + 'weiqu' + ext
    },
    '伤心': {
        name: '难过',
        url: path + 'nanguo' + ext
    },
    '努力': {
        name: '奋斗',
        url: path + 'fendou' + ext
    },
    'YY': {
        name: ' 坏笑',
        url: path + 'huaixiao' + ext
    },
    '恶心': {
        name: '难受',
        url: path + 'nanshou' + ext
    }
};

module.exports = backward;