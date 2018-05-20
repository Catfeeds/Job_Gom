const state = {
    videoShowFlag: 0,
    videoSrc: '',

    imgShowFlag: 0,
    imgSrc: '',
    kickShowFlag: 0
};
const mutations = {
    "showMask": (state, payload) => {
        let imgReg = /\.(jpg|png|jpeg|gif)$/i;
        let videoReg = /\.(mp4|rmvb|swf|flv|avi|rm)$/i;
        let src = payload;

        if (imgReg.test(src)) {
            state.imgShowFlag = 1;
            state.imgSrc = src;

            state.videoShowFlag = 0;
            state.videoSrc = '';
        } else if (videoReg.test(src)) {
            state.imgShowFlag = 0;
            state.imgSrc = '';

            state.videoShowFlag = 1;
            state.videoSrc = src;
            setTimeout(function(){
                $('.videoPlay')[0].play(); 
            },0)
             
        }
    },
    "closeMask": (state) => {
        state.videoShowFlag = 0;
        state.imgShowFlag = 0;
        state.kickShowFlag = 0;
    },
    "showKick": (state) => {
        state.imgShowFlag = 0;
        state.imgSrc = '';
        state.videoShowFlag = 0;
        state.videoSrc = '';
        state.kickShowFlag = 1;
    }
};
const actions = {
    "showMask": (store, payload) => {
        store.commit('showMask', payload);
    },
    "closeMask": (store) => {
        store.commit('closeMask');
    },
    "showKick": (store) => {
        store.commit('showKick');
    }
};
const maskModule = {
    state,
    mutations,
    actions
};
export default maskModule;
