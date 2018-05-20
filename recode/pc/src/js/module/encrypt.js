/*
	介绍：基于utils/jsencrypt.js的加密方法（rsa加密）
	用法：
		1、var encrypt = require('module/encrypt');
		2、var encryptStr = encrypt(str);
		注:encryptStr即为加密之后的str
*/

var JSEncrypt = require("utils/jsencrypt");
var publicKey = '-----BEGIN PUBLIC KEY-----';
publicKey += 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBrBCRrxZQruu7KWd21Qjova/J';
publicKey += 'rBEfyLhjSmZeCBPn8GfT5sj5yFrJuHK/IIncRtiRN2mNZnhWMnEqjv3k93TmUcKy';
publicKey += 'MMRp4COEzqgdSguVf+szQ9KbvCJwvoGhghaAPJjhmiAe8LrleH4p6aAal3bzEUna';
publicKey += '2UvbhYzaqbpNLHMYowIDAQAB';
publicKey += '-----END PUBLIC KEY-----';
var encryptFn = function(str) {
	var encrypt = new JSEncrypt();
	encrypt.setPublicKey(publicKey);
	return str ? encrypt.encrypt(str) : '';
};
module.exports = encryptFn;