/**
 * [分享]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import Share from 'components/share';

let shareInfo = {
	url: location.href,
	title: $CONFIG.shareTitle,
	summary: $CONFIG.shareDesc,
	pics: $CONFIG.shareIcon,
	desc:''
};

new Share({
	id:'sharebox',
	titleHtml:'',
	targets:{
		qq: shareInfo,
		wx: {url:$CONFIG.shareWX},
		wb: shareInfo,
		qz: shareInfo
	}
});

