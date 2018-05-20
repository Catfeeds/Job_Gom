var talentScroll = require('./talentScroll');
function init() {
    var $manage =$('[data-node=manage]');
    var $agreement =$('[data-node=agreement]');
    var $applicationPopup =$('[data-node=application-popup]');
    var $popupManage =$applicationPopup.find('[data-node=popup-manage]');
    var $popupAgreement =$applicationPopup.find('[data-node=popup-agreement]');
    $manage.on('click',function(){
        $applicationPopup.show();
        $popupManage.show();
   		talentScroll.init($popupManage);
    });
    $applicationPopup.find('[data-node=manage-close]').on('click',function(){
        $applicationPopup.hide();
        $popupManage.hide();
    });
    $agreement.on('click',function(){
        $applicationPopup.show();
        $popupAgreement.show();
    	talentScroll.init($popupAgreement);
    });
    $applicationPopup.find('[data-node=agreement-close]').on('click',function(){
        $applicationPopup.hide();
        $popupAgreement.hide();
    });

}
module.exports = {
    init: init
};
