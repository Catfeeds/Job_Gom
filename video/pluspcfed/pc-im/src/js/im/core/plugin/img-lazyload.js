var imgPath = $GLOBAL_CONFIG['imIconUrl'] || 'http://js.im.meixincdn.com:8056';

export default  (Vue,VueLazyLoad)=> {
    Vue.use(VueLazyLoad, {
        error: imgPath + '/src/images/img-fail.png',
        loading: imgPath + '/src/images/im-gif1.gif',
        try: 10
    });
};
