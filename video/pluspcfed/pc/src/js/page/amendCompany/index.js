var avatarUploader = require('module/avatarUpload');
var checkoutFormdate = require('module/checkoutFormdate');

const REPAIR_IMG = 'REPAIR_IMG';
const COMPANY_AMEND = 'COMPANY_AMEND';

avatarUploader.init(REPAIR_IMG);
checkoutFormdate.init(COMPANY_AMEND);
