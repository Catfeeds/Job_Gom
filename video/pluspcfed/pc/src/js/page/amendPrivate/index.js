var avatarUploader = require('module/avatarUpload');
var checkoutFormdate = require('module/checkoutFormdate');

const REPAIR_IMG = 'REPAIR_IMG';
const REPAIR_AMEND = 'REPAIR_AMEND';

avatarUploader.init(REPAIR_IMG);
checkoutFormdate.init(REPAIR_AMEND);
