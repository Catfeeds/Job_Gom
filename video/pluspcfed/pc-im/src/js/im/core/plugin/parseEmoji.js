import emojis from './emoji';


import backward from './backward';

// 将表情转换成map
let emojiMap = {};

const isEmpty = function(obj) {
    var ret = true;
    for (var key in obj) {
        ret = false;
        break;
    }
    return ret;
};
// 数据适配转换
const makeData = function(data) {
    let total = data.length;
    let offset = 20;
    let page = Math.ceil(total / offset);
    let list = [];

    for (let i = 0; i < page; i++) {
        list[i] = [];
        let end = offset * (i + 1);
        end = end > total ? total : end;
        for (let j = i * offset; j < end; j++) {
            let emoji = data[j];
            list[i].push(emoji);
            emojiMap[emoji.name] = emoji.url;
            //console.log(emoji.name, emoji.url)
        }
    }
    return {
        page: new Array(page),
        list: list
    };
    data.map(( value, index )=>{
        console.log(value,index);
    })
};



export const parseEmoji = ( str ) => {
       let r = /(\[.*?\])/g;
    if (isEmpty(emojiMap)) {
        makeData(emojis);
    }
    return str.replace(r, function(s, $1, name) {
        let img = emojiMap[$1.substr(1,$1.length-2)];
        if (img) {
            return '<img  src="' + img + '" />';
        } else {
            // 兼容旧版表情
            var old = backward[name];
            if (old) {
                return '<img src="' + old.url + '" />';
            }
            return s;
        }

    });
};