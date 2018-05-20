
let host = $CONFIG.jspath;
let dir = '/m/vpc/dist/imgs/emoji';

let emojiData = {
	"[呲牙]": "/ciya.png",
	"[大笑]": "/daxiao.png",
	"[微笑]": "/weixiao.png",
	"[亲亲]": "/qinqin.png",
	"[色]": "/se.png",
	"[流泪]": "/liulei.png",
	"[害羞]": "/haixiu.png",
	"[冷汗]": "/lenghan.png",
	"[抓狂]": "/zhuakuang.png",
	"[鼓掌]": "/guzhang.png",
	"[大哭]": "/daku.png",
	"[尴尬]": "/ganga.png",
	"[生气]": "/shengqi.png",
	"[调皮]": "/tiaopi.png",
	"[惊讶]": "/jingya.png",
	"[难过]": "/nanguo.png",
	"[睡觉]": "/shuijiao.png",
	"[不屑]": "/buxie.png",
	"[发呆]": "/fadai.png",
	"[装酷]": "/zhuangku.png",
	"[晕]": "/yun.png",
	"[困]": "/kun.png",
	"[咒骂]": "/zhouma.png",
	"[白眼]": "/baiyan.png",
	"[快哭了]": "/kuaikule.png",
	"[鄙视]": "/bishi.png",
	"[饿]": "/e.png",
	"[抠鼻]": "/koubi.png",
	"[石化]": "/shihua.png",
	"[泪眼]": "/leiyan.png",
	"[撇嘴]": "/piezui.png",
	"[疑问]": "/yiwen.png"
};

for(let k in emojiData){
	emojiData[k] = host + dir + emojiData[k];
}

export default emojiData;