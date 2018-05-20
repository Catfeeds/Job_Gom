// File Reader 返回 buffer array
export const readBlob = (blob, callback) => {
	var reader = new FileReader();
	reader.onload = function(e) {
		var data = new Uint8Array(e.target.result);
		callback(data);
	};
	reader.readAsArrayBuffer(blob);
}

var gAudioContext = new AudioContext();
var source = gAudioContext.createBufferSource();

// 播放 AudioContext
// https://developer.mozilla.org/zh-CN/docs/Web/API/AudioContext
const playPcm = (samples) => {
	var ctx = gAudioContext;
	source.disconnect(0);
	source = null;
	source = gAudioContext.createBufferSource();
	var buffer = ctx.createBuffer(1, samples.length, 8000);
	if (buffer.copyToChannel) {
		buffer.copyToChannel(samples, 0, 0)
	} else {
		var channelBuffer = buffer.getChannelData(0);
		channelBuffer.set(samples);
	}
	source.buffer = buffer;
	source.connect(ctx.destination);
	source.start(0);
}

// AMR 解码
export const playAmrArray = (array) => {
	var samples = AMR.decode(array);
	if (!samples) {
		// alert('Failed to decode!');
		return;
	}
	playPcm(samples);
}

