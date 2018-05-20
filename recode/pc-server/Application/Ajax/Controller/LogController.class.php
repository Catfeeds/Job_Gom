<?php
/**
 * JS错误日志记录
 */
namespace Ajax\Controller;
use Ajax\Controller\BaseController;
use Think\Rsyslog;
class LogController extends BaseController {

    public function index(){
        //来路检验
        if( !isset($_SERVER['HTTP_REFERER']) || !isTrustedDomain($_SERVER['HTTP_REFERER']) ){
            exit("param error.");
        }
        $errLog = array();
        $messageStr = I('param.err_msg','');
        $messageStr = urldecode($messageStr);
        $errLog['log_master'] = 'js';
        if( !$messageStr ) $this->response(output(500,\Think\ErrorCode::getErrMsg(\Think\ErrorCode::PARAM_ERROR ) ) );
        $messageStr = str_replace('^','&',$messageStr);
		$messageArr = explode("|",$messageStr);
		if( is_array($messageArr) ){
            foreach($messageArr as $k=>$v){
                parse_str($v,$line);
                foreach ($line as $kk=>$vv){
                    if($kk=='msg'){
                        $vv = urldecode($vv);
                    }
                    $errLog[$kk] = $vv;
                }
                Rsyslog::write($errLog, Rsyslog::ERR, array('project_name'=>'JS'));
            }
        }

//		$this->response(output(200,'成功'));
        $this->gif();
	}

    public function gif() {
        $im = ImageCreate(1,1);
        header('Content-Type: image/png');
        imagegif($im);
        imagedestroy($im);
    }
}
