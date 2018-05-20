var urls = require('io/url');
var fetch = require('io/fetch');
var alert = require('module/popup/alert');

var $revampBtn = $('[data-node="revamp-btn"]'),
    $confirm = $('[data-node="confirm"]'),
    $cancel = $('[data-node="cancel"]'),
    $revampPopup = $('[data-node="revamp-popup"]');

$revampBtn.on('click', function() {
  $revampPopup.show();
})

$confirm.on('click', function() {
  fetch.get(urls.get('cancelModifySetting'), {
  }).done(function(data) {
      if (data.success === true) {
        $revampPopup.hide();
        window.location.href = '/setting/index';
      } else {
        $revampPopup.hide();
        window.location.href = '/setting/index';
      }
  }).fail(function(error) {
      console.error(error);
  });
})

$cancel.on('click', function() {
  $revampPopup.hide();
})
