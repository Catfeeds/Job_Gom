<?php

namespace Meihao\Controller;

use Meihao\Controller\OpenController;

class SettingController extends OpenController {

    public function __construct() {

        parent::__construct();
    }

    /**
     * 账号信息
     */
    public function index() {
        $accountId = $this->openinfo['data']['id'];
        $data = $this->open->getData($this->open->officialAccountsSettings,['id' => $accountId]);
        if(isset($_GET['test']) ){
            print_r($data);exit;
        }
        $data = isset($data['data']) && !empty($data['data']) ? $data['data'] : [];
        $basicInfo = isset($data['basicInfo']) && !empty($data['basicInfo']) ? $data['basicInfo'] : [];
        $modifyInfo = isset($data['modifyInfo']) && !empty($data['modifyInfo']) ? $data['modifyInfo'] : [];

        $this->assign('basicInfo', $basicInfo);
        $this->assign("modifyInfo", $modifyInfo);
        $this->assign('activeUrl', 'index');

        $this->display('Setting/index');
    }

    /**
     * 修改美号信息
     */
    public function modify() {
        $accountId = $this->openinfo['data']['id'];
        $data = $this->open->getData($this->open->officialAccountsSettings,['id' => $accountId]);
        $data = isset($data['data']) && !empty($data['data']) ? $data['data'] : [];
        $basicInfo = isset($data['basicInfo']) && !empty($data['basicInfo']) ? $data['basicInfo'] : [];
        //$modifyInfo = isset($data['modifyInfo']) && !empty($data['modifyInfo']) ? $data['modifyInfo'] : [];

        $this->assign('info',  $basicInfo);
        $this->assign('activeUrl', 'index');
        
        $this->display();
    }
}
