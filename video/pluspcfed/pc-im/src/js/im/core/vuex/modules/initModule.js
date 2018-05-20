const actions = {
    'addResourceUrl': (store, payload) => {
        store.commit('addResourceUrl', payload);
    },
    'EDIT_NOWDAYDATE': (store, date) => {
        store.commit('EDIT_NOWDAYDATE', date);
    },
    'cancelTitleWarn': (store) => {
        store.commit('cancelTitleWarn')
    },
    'addTitleWarn': (store) => {
        store.commit('addTitleWarn')
    }

};
const mutations = {
    'addResourceUrl': (state, payload) => {
        state.resourceUrl = payload.host + '/v1/img/';
        state.mallDomain = payload.mallDomain;
    },
    'EDIT_NOWDAYDATE': (state, date) => {
        state.nowDayDateStart = date.nowDayStart;
        state.nowDayDateEnd = date.nowDayEnd;
    },
    'cancelTitleWarn': (state) => {
    	clearInterval(state.titleTimer);
        state.titleTimer = null;
        document.title = state.defaultTitle;
    },
    'addTitleWarn': (state) => {
        let titles = ['您有新消息'];
        titles.push(document.title);
        if (state.titleTimer == null) {
            let index = 0;
            state.titleTimer = setInterval(function() {
                index = index === 2 ? 0 : index;
                document.title = titles[index];
                index++;
            }, 1000);
        }
    }
};
const state = {
    userInfo: {
        token: $GLOBAL_CONFIG.token,
        userId: $GLOBAL_CONFIG.imUserId,
        myAvatar: $GLOBAL_CONFIG.imagePath,
        myName: $GLOBAL_CONFIG.nickName
    },
    imType: $GLOBAL_CONFIG.imType,
    imid: $GLOBAL_CONFIG.imId,
    appId: $GLOBAL_CONFIG.appId,
    imIconUrl: $GLOBAL_CONFIG.imIconUrl,
    hasHistory: true, //是否有历史消息
    hasNewMsg: false, //是否有新消息
    resourceUrl: '', //图片、视频、语音等素材域名地址
    nowDayDateStart: 0,
    nowDayDateEnd: 0,
    mallDomain: $GLOBAL_CONFIG.mall_domain, //商城域名
    titleTimer: null,//新消息title定时器
    defaultTitle:document.title,//原始title
    gifEmoji: $GLOBAL_CONFIG.imExpUrl,
    isFirst:true,
    isDisConnect: false
}

const InitModule = {
    state,
    mutations,
    actions
};
export default InitModule;
