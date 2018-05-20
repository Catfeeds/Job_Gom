<?php
namespace Home\Controller;
use Home\Controller\BaseController;
class ZtController extends BaseController {

    public function __construct() {
        parent::__construct();

    }
    public function meidou(){
        $this->display('Zt/meidou');
    }
}

