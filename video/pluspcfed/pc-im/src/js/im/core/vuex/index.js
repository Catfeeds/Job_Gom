import Vue from 'vue';
import Vuex from 'vuex';

import listModule from './modules/listModule';
import initModule from './modules/initModule';

import faceModule from './modules/faceModule';
import handelModule from './modules/handelModule';

import maskModule from './modules/maskModule';
import msgInfoList from './modules/msgInfoList';

import sendMsgModule from './modules/sendMsgModule';

import contentTitleModule from './modules/contentTitleModule';

import historyModule from './modules/historyModule';

Vue.use(Vuex);

export default new Vuex.Store({
	modules:{
		initModule: initModule,
		contentTitleModule: contentTitleModule,
		faceModule: faceModule,
		handelModule: handelModule,
		listModule: listModule,
		maskModule:maskModule,
		msgInfoList: msgInfoList,
		sendMsgModule: sendMsgModule,
		historyModule: historyModule
	}
});