<?php
namespace Activity\Controller;
use Home\Controller\BaseController;
class EmptyController extends BaseController {
    
    public function _empty() {
        header('location:'.APP_HTTP_GOME.C('WAP_URL'));
    }

    public function index() {
        header('location:'.APP_HTTP_GOME.C('WAP_URL'));
    }
}
