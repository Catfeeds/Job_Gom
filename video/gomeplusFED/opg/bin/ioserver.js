/**
 * Created by lishengyong on 2016/12/23.
 */
var io = require('socket.io')();

io.on('connection', function (_socket) {
    console.log(_socket.id + ': connection');
    _socket.on('pushtip', function (msg) {
        console.log('Message Received: ', msg);
        _socket.broadcast.emit('pushtip', msg);
    });
});

exports.listen = function (_server) {
    return io.listen(_server);
};