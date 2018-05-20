<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：QController.class.php                                  	  |
 * +----------------------------------------------------------------------+
 * | @程序功能：二维码扫描对应H5页面                                      |
 * +----------------------------------------------------------------------+
 * | Author:lishuai <lishuai@gomeplus.com>                                |
 * +----------------------------------------------------------------------+
 * | Date:2016-05-23 13:49:10 CST                                         |
 * +----------------------------------------------------------------------+
 */
namespace Group\Controller;
use Home\Controller\BaseController;

//1=>使用过一次 2=>二维码已经关闭
class QruploadController extends BaseController
{
    
    //话题页状态key 前缀
	public $pageCache = 'topicPageId_';
	//话题页二维码状态 前缀
	public $qrcodeCache = 'topicQrcodeId_';
	//二维码访问记录 前缀
	public $qrcodeViewCache = 'topicQrcodeView_';
	//二维码当前最大数量 前缀
	public $qrcodeMaxNum = 'qrcodeIdMaxNum_';

	//二维码对应页面最后一次的轮询时间 前缀
	public $pageRequestTime = 'page_key_request_time_';

	//二维码对应最后一次的轮询时间 前缀
	public $qrcodeRequestTime = 'qrcode_key_request_time_';

	public $qrcodeMaxTime = 300 ; //5分钟 二维码最大有效时间

	public $heartOnceTime = 5;//每次的心跳时间设置为5秒钟
    /*
     * H5页面渲染
     * @param $pageId 页面id加密串
     * @param $qrcodeId 二维码id加密串
     * @return Html
     */
	public function index(){
		$pageId = I('param.pageId');
		$qrcodeId= I('param.qrcodeId');
		$type = I('param.type','publiser');//publiser detail
		if( !$pageId || !$qrcodeId ){
			$this->assign("message","缺少参数");
			$this->display("Index/qrmessage");
			exit;
		}
		$typeNum = ($type == 'detail') ? 9 : 20;
		$pageId = str_replace(" ", "+", $pageId);
		$qrcodeId = str_replace(" ", "+", $qrcodeId);
		$pageStr = authcode($pageId,  'DECODE', C('ENCRYPT_APP_KEY') );
		$qrcodeStr = authcode($qrcodeId,  'DECODE', C('ENCRYPT_APP_KEY') );
		if( !$pageStr || !$qrcodeStr){
		    //参数错误
			$this->assign("message",\Think\ErrorCode::getErrMsg(\Think\ErrorCode::PARMA_ERROR));
			$this->display("Index/qrmessage");
			exit;
		}
		$pageArr = explode("|", $pageStr);
		$qrcodeArr = explode("|", $qrcodeStr);
		if( !is_array($pageArr) || !is_array($qrcodeArr)  || $pageArr[0] !=$qrcodeArr[0] || $pageArr[1] !=$qrcodeArr[1] ){
			//参数校验失败
		    $this->assign("message",\Think\ErrorCode::getErrMsg(\Think\ErrorCode::PARMA_CHECK_FAIL));
			$this->display("Index/qrmessage");
			exit;
		}

		//二维码有效期验证
		if( (time() - $qrcodeArr[3] ) > $this->qrcodeMaxTime ){
		    //二维码过期
			$this->assign("message",\Think\ErrorCode::getErrMsg(\Think\ErrorCode::QRCODE_EXPIRED));
			$this->display("Index/qrmessage");
			exit;
		}


		$qrcodeviewKey = $this->qrcodeViewCache.$this->_keyturn($qrcodeStr);
		$topicPage = S($qrcodeviewKey);
		if( $topicPage  ){
			$topicPageArr = explode("|",$topicPage);
			if( !empty($topicPageArr[1]) && $topicPageArr[1] != session_id() ){
			    //二维码失效
				$this->assign("message",\Think\ErrorCode::getErrMsg(\Think\ErrorCode::QRCODE_FAILURE));
				$this->display("Index/qrmessage");
				exit;
			}
		}

        //访问记录|第一次才记录
		if( !$topicPage ){
			S( $qrcodeviewKey,$qrcodeArr[0].'|'.session_id().'|'.time() ,3600);
		}


		$this->assign('pageId',$pageId);
		$this->assign('qrcodeId',$qrcodeId);
		$maxNum = S( $this->qrcodeMaxNum.$this->_keyturn($qrcodeStr) );
		$maxNum = $maxNum ? $maxNum : 0 ; 
		$this->assign('typeNum',$typeNum);
        $this->assign('maxNum',$maxNum);
		$this->display( "Index/qrupload");
	}

    /*
     * 监听PC异常状态
     * @param $pageId 页面id加密串
     * @param $qrcodeId 二维码id加密串
     * @return json
     */
	public function statreport(){
		$pageId = I('param.pageId');
		$qrcodeId= I('param.qrcodeId');
		/*
		验证合法性
		1.加密串格式
		*/
		if(!$pageId || !$qrcodeId ){
			$this->outError(\Think\ErrorCode::PARMA_ERROR);
		}
		$pageId = str_replace(" ", "+", $pageId);
		$qrcodeId = str_replace(" ", "+", $qrcodeId);
		$pageStr = authcode($pageId,  'DECODE', C('ENCRYPT_APP_KEY') );
		$qrcodeStr = authcode( $qrcodeId,  'DECODE', C('ENCRYPT_APP_KEY') );
		if( !$pageStr || !$qrcodeStr){
			$this->outError(\Think\ErrorCode::PARMA_CHECK_FAIL);
		}
		$pageArr = explode("|", $pageStr);
		$qrcodeArr = explode("|", $qrcodeStr);
		if( !is_array($pageArr) || !is_array($qrcodeArr)  || $pageArr[0] !=$qrcodeArr[0] || $pageArr[1] !=$qrcodeArr[1] ){
			$this->outError(\Think\ErrorCode::PARMA_CHECK_FAIL);
		}

		//没有心跳记录
		$pageRequestTime = S($this->pageRequestTime.$this->_keyturn($pageStr) );

		//二维码状态
		$qrcodeKey = $this->qrcodeCache.$this->_keyturn($qrcodeStr);
		$qrcodeRequestTime = S($this->qrcodeRequestTime.$this->_keyturn($qrcodeStr) );
		$topicQrcodeStat = S($qrcodeKey);

		//二维码已经被覆盖 ,但是前端可能处于别的原因没能发出二维码更新的请求
		if( $topicQrcodeStat !='2' && $pageRequestTime != $qrcodeRequestTime ){
				S($qrcodeKey,'2') ;
				$topicQrcodeStat = '2' ;
		}
		if( $topicQrcodeStat !='2' ){//2为异常
			//二维码心跳时间
			if( !$qrcodeRequestTime ){
				$code = 500;
				$message =\Think\ErrorCode::getErrMsg(\Think\ErrorCode::QRCODE_STATUS_LOSS);
				$dataArr = array();
				$this->outJSON($code, $message, $dataArr);
				exit;
			}

			//心跳超时,前端轮询已经中断，二维码的浮动层已经关闭或者被新的二维码覆盖
			if( time() - $qrcodeRequestTime > $this->heartOnceTime ){
				S($qrcodeKey,'2') ;
				$topicQrcodeStat = '2' ;
			}else{//第一次轮询
				S($qrcodeKey,'1');
				$topicQrcodeStat = '1' ;
			}
		}

		//页面状态 1,2 正常，异常

		$topicPageStat = '1';
		if( !$pageRequestTime){
			$topicPageStat = '2';

			$code = 500;
			$message = \Think\ErrorCode::getErrMsg(\Think\ErrorCode::PAGE_STATUS_LOSS);
			$dataArr = array();
			$this->outJSON($code, $message, $dataArr);
			exit;
		}

		//二维码过期
        $topicQrcodeTime = ( time() - $qrcodeArr[3] ) < $this->qrcodeMaxTime ? true : false ;
        //获取访问记录的时间
        $viewInfo = S($this->qrcodeViewCache.$this->_keyturn($qrcodeStr));
		if( $viewInfo ){
		    $viewArr = explode("|",$viewInfo);
		    if( is_array($viewArr) ){
                $topicQrcodeTime = ( time() - $viewArr[2] ) < $this->qrcodeMaxTime ? true : false ;
            }
        }

		$code = 200;
		$message = '成功';
		$dataArr = array('page'=>$topicPageStat,'qrcode'=>$topicQrcodeStat,'qrcodetime'=>$topicQrcodeTime );
		$this->outJSON($code, $message, $dataArr);
        
		
	}

	
    //获取能够上传的最大数量
	public function maxNum(){
        $qrcodeId= I('param.qrcodeId');
        $qrcodeId = $this->_strturn($qrcodeId);
        $qrcodeStr = authcode( $qrcodeId,  'DECODE', C('ENCRYPT_APP_KEY') );
        if( !$qrcodeStr){
            $this->outError(\Think\ErrorCode::PARMA_CHECK_FAIL);
        }
        $qrcodeArr = explode("|", $qrcodeStr);
        if(!is_array($qrcodeArr)){
            $this->outError(\Think\ErrorCode::PARMA_CHECK_FAIL);
        }
        $qrcodekey = $this->_keyturn($qrcodeStr);
        $data = S($this->qrcodeMaxNum.$qrcodekey);
        $code = 200;
        $message = '成功';
        $this->outJSON($code, $message, $data);
    }

	//算出 图片缓存、页面状态缓存的key，
    private function _keyturn($str){
        return substr( md5($str),8,16 );
    }

    //二维码与页面可以需要单独的空格处理
    private function _strturn($string){
        return str_replace(" ","+",$string);
    }

}
