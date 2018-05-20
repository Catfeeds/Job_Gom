<?php
namespace Home\Controller;
use Home\Controller\BaseController;
class ApiController extends BaseController {

    public function __construct() {
        parent::__construct();

    }

    /*
     * 公用头部信息
     * */
    public function comm_header() {
        $callback = I('param.callback','', 'string');
        if(formatJsonpParams($callback) === false){
            $this->outError(881001);
        }
        $data = array( 'userinfos' => array(),'buy_numbers'=>0 );
        #验证referer,防止json劫持
        $result = isTrustedDomain($_SERVER['HTTP_REFERER']);
        if($result){
            if(!empty( $this->user_infos)){
                $temp = $this->user_infos;
                $data['userinfos']['imagePath'] = $temp['imagePath'];
                $data['userinfos']['nickName'] = $temp['nickName'];
            }
            $data['buy_numbers'] = cartProductNum();
        }
        $lst = json_encode( $data );
		$this->responseJson("{$callback}('{$lst}')");
    }
}

