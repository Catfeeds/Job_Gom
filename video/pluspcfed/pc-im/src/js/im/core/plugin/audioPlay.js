//amr格式音频播放
// File Reader 返回 buffer array
let ctx = getAudioContext();
function readBlob(blob, callback) {
    let reader = new FileReader();
    reader.onload = function(e) {
        let data = new Uint8Array(e.target.result);
        callback(data);
    };
    reader.readAsArrayBuffer(blob);
}
// AMR 解码
function playAmrArray(array,obj) {
    let samples = AMR.decode(array);
    if (!samples) {
        // alert('Failed to decode!');
        return;
    }

    playPcm(samples, obj);
}
// 播放 AudioContext
function playPcm(samples,obj) {
    if( ctx.state === 'closed' ){
        ctx = new AudioContext();
    }else if( ctx.state === 'running' ){
        ctx.close().then(function(){
            $('.im-voice').removeClass('active');
            obj.addClass('active');
        });
        ctx = new AudioContext();
    }
    obj.addClass('active');
    
    let src = ctx.createBufferSource();
    let buffer = ctx.createBuffer(1, samples.length, 8000);
    if (buffer.copyToChannel) {
        buffer.copyToChannel(samples, 0, 0)
    } else {
        let channelBuffer = buffer.getChannelData(0);
        channelBuffer.set(samples);
    }
    src.buffer = buffer;
    src.connect(ctx.destination);
    src.start();
    src.onended = function() {
        obj.removeClass('active');
    };
}
// 返回 AudioContext 音频处理对象
// https://developer.mozilla.org/zh-CN/docs/Web/API/AudioContext
function getAudioContext() {
    if (!gAudioContext&&window.AudioContext) {
        gAudioContext = new AudioContext();
    }
    return gAudioContext;
}
let gAudioContext = getAudioContext();

export const audioPlay = ( obj ) => {
    if(window.AudioContext){
        let url = obj.attr('src');
        fetch(url)
            .then(function(res) {
                // Response stream
                return res.blob();
            })
            .then(function(myBlob) {
                readBlob(myBlob, function(data) {

                    playAmrArray(data, obj);
                });
            });
    }

}
export const audioStop = ( callback ) => {
    if(window.AudioContext){
        let Fn = callback || function(){};
        ctx.close().then(function() {
            Fn.call(null);
        });
    }

}
