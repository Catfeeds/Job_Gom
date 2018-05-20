/**
 * Created by lishengyong on 2016/12/23.
 */
var socket = io.connect('http://opg-pre.intra.gomeplus.com/');

socket.on('connect', function () {
    console.log('connected');
});

socket.on('pushtip', function (data) {
    console.log('有更新啦......' + data);
    alert(data.msg + '\n' +  'URL ->  ' +  data.url + '\n' + data.commits);
});

socket.on('disconnect', function() {
    console.log('socket disconnect... ');
});