
import Vue from 'vue';
import store from '../index';
import emoji from '../../plugin/emoji';
import { limitCN, byteLen } from '../../plugin/limitCN';




//表情页数 
const pageSize = Math.ceil( emoji.length / 40 );
//分页控制的数组
const pageShowArr = new Array(pageSize);
//表情二维数组
const emojiArr = [];
pageShowArr[0] = true;


for (var i = 0, len = pageShowArr.length; i < len; i++) {
	emojiArr[i] = emoji.slice(i*40, (i+1)*40);
};

const state = {
	emojiArr: emojiArr,
	isShowFace: false,
	pageSize: pageSize,
	pageShowArr: pageShowArr
};

const mutations = {
	
	FACE_MOUSEOVER: (state, j) => {
		for (var i = 0, len = state.pageShowArr.length; i < len; i++) {
			state.pageShowArr.splice(i, 1, false);
		};
		state.pageShowArr.splice(j, 1, true);
	},
	ADD_FACE: ( state, e ) => {
		let faceData = {
			title : '[' + $(e.target).attr('title') + ']',
			src: $(e.target).find('img').attr('src')
		};
		let $textarea = $('#sendMsg')[0];
		let text = '';

		if ($textarea.selectionStart >= 0) {

	        var val = $textarea.value;
	        var startIndex = $textarea.selectionStart;
	        var endIndex = $textarea.selectionEnd;
	        text = val.substring(0, startIndex) + faceData.title + val.substring($textarea.selectionEnd);
	        text =  byteLen(text, 4000) ? limitCN( text, 4000) : text; 
	        store.state.sendMsgModule.sendMsgBody = text;
	        $textarea.value = text;
	        $textarea.selectionStart = $textarea.selectionEnd = startIndex + faceData.title.length;
	        $textarea.focus(); 
	        

	    } else if (typeof document.selection != 'undefined' && typeof document.selection.createRange != 'undefined') {
	        
	        $textarea.focus();
	        var range = document.selection.createRange();
	        range.text = faceData.title;
	        range.select();

	    }
	    store.state.faceModule.isShowFace = false;
		
	}
};


const actions = {
	"FACE_MOUSEOVER": (store, i) =>{
		store.commit('FACE_MOUSEOVER', i);
	},
	"ADD_FACE": (store, e) =>{
		store.commit('ADD_FACE', e);
	}
};

const faceModule = {
	state,
	mutations,
	actions
};
export default faceModule;