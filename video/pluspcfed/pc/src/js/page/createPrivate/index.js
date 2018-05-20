var avatarUploader = require('module/avatarUpload');
var checkoutFormdate = require('module/checkoutFormdate');

const ADD_IMG = 'ADD_IMG';
const ADD_PRIVATE = 'ADD_PRIVATE';

avatarUploader.init(ADD_IMG);
checkoutFormdate.init(ADD_PRIVATE);
