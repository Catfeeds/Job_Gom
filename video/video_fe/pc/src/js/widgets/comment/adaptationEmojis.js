/**
 * [emoji表情适配]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import emojiData from './emojiData.js';

export default (content)=>{
		let reg = /\[([^\[]+)\]/g;
		content = content.replace(reg,function(match){
			if (typeof emojiData[match] === 'undefined') {
				return match;
			}else{
				return `<img src="${emojiData[match]}" alt="${match}" />`;
			}
		});
		return content;
};