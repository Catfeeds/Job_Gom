/**
 * [textarea高度自适应]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import encodeHTML from 'util/encodeHTML.js';

class TextAreaAutoHeight {
	constructor(props){
		this.$t = $(props.textarea);
		this.$ghost = $(props.ghostTextarea);
		this.maxHeight = props.maxHeight;

		this.initStyle();
		this.bindEvent();
	}

	initStyle(){
		let $t = this.$t;
		let $ghost = this.$ghost;
		let styles = 'width,fontSize,fontWeight,fontStyle,fontFamily,lineHeight,padding,wordWrap,wordBreak,whiteSpace,letterSpacing'.split(',');

		$ghost.css({
			left: -(9e5),
			position: 'absolute',
			zIndex: '-1',
			boxSizing: 'border-box'
		}).attr('contenteditable', true);

		$.each(styles, function(i, p) {
			$ghost.css(p, $t.css(p));
		});
	}

	bindEvent(){
		this.$t.on('focus blur input change propertychange', this.watchTextareaChange.bind(this));
	}

	offEvent(){
		this.$t.off('focus blur input change propertychange', this.watchTextareaChange.bind(this));
	}

	watchTextareaChange(){

		let $t = this.$t;
		let $ghost = this.$ghost;
		let val = $t.val();
		/*let reg = /[<">']/g;
		let htmlStr = encodeHTML(val, reg);*/
		// let html = htmlStr;
		$ghost.html(val);
		if ($ghost.outerHeight()+2 >= this.maxHeight) {
			$t.css({
				height: this.maxHeight,
				overflowY: 'scroll'
			});
			return;
		}

		if ($ghost.outerHeight()) {
			$t.css({
				height: $ghost.outerHeight()+2,
				overflowY: 'hidden'
			});
		}
	}
}

export default TextAreaAutoHeight;