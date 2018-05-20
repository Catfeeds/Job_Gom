class Player {

    constructor(opts = {}) {
        if (!opts.videoId) {
            throw new Error('videoId is required');
        }
        this.videoId = opts.videoId;
        this.videoContainer = opts.videoContainer || 'mxplayer';
        this.autoplay = opts.autoplay;
        this.danmaku = opts.danmaku;
        this.env = opts.env || 'dev';
        this.type = opts.type || 'live';
        this.danmakuStatus = opts.danmakuStatus;
        this.initPlayer();
    }

    initPlayer() {
        var player = this.player = new MeixinPlayer();
        player.init(this.videoId, this.videoContainer, {
            autoplay: this.autoplay,
            danmaku: this.danmaku,
            env: this.env,
            type: this.type,
            danmakuStatus: this.danmakuStatus
        });
        // 播放器初始化完毕时,初始化发送逻辑
	    
	    //页面初始化 后端调用 获取用户信息 主持人信息
	    // palery.on('needUserInfo', this.needUserInfo);
	    // 用户账号被其它人在其它地方登录被踢
	    // player.on('userLoginedByOther', this.userLoginedByOther);
    }
    on(type, fn) {
        this.player.on(type, fn);
    }
    send(data){
        this.player.sendDanmaku(data);
    }
}

export default Player;
