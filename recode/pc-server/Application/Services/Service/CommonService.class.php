<?php

namespace Services\Service;

use Home\Service\BaseService;
use Think\ErrorCode;

class CommonService extends BaseService {

    /*
     * 构造
     * */
	public function __construct() {
        $this->bs_version = 2;
		parent::__construct();
	}

    /**
     * 通过BS提供的接口，检测敏感词
     * @param $keyWord 需要检测的字符串
     * @return array
     */
	public function sensitive_check($keyWord){
        $uri = '/sensitive/checkwords';
        $keyWord = html_entity_decode( $keyWord );
        $result = $this->postData( $uri,['sensitive'=>$keyWord, 'type'=>0 ] );
        $arr  = array();
        $arrReturn['success'] = true;
        $arrReturn['code'] = 0;
        $arrReturn['message'] = "";
        $arrReturn['data'] =$arr;

        if($result['code']== 200 && isset($result['data']['isSensitive']) && $result['data']['isSensitive']){
            $arr = explode(',',htmlspecialchars($result['data']['sensitiveWords']));
            $arrReturn['success'] = false;
            $arrReturn['code'] = ErrorCode::WORD_IS_ERROR;
            $arrReturn['message'] = ErrorCode::getErrMsg(ErrorCode::WORD_IS_ERROR);
            $arrReturn['data'] =$arr;
        }else if($result['code']== 422){
            if(empty($keyWord) || is_null($keyWord)){
                $arr  = array();
                $arrReturn['success'] = false;
                $arrReturn['code'] = ErrorCode::PARMA_ERROR;
                $arrReturn['message'] = ErrorCode::getErrMsg(ErrorCode::PARMA_ERROR);
            }
        }

       return $arrReturn;
    }

    /*
     * 析构
     * */
    public function __destruct() {

    }
}
