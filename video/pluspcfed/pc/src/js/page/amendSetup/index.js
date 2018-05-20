var avatarUploader = require('module/avatarUpload');
var checkoutFormdate = require('module/checkoutFormdate');

const REPAIR_IMG = 'REPAIR_IMG';
const STAGE_AMEND = 'STAGE_AMEND';

avatarUploader.init(REPAIR_IMG);
checkoutFormdate.init(STAGE_AMEND);
