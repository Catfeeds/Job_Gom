<?php

namespace Ajax\Controller;

use Ajax\Controller\BaseController;
use Common\Lib\CurlHandler;

/**
 * Class UserController
 *
 * @author  imarting<guoquan@gomeplus.com>
 * @date    2016-05-26
 * @package Ajax\Controller
 */
class UserController extends BaseController
{
    private $user = null;

    public function _initialize()
    {
        $this->user = D('User');
    }

    //领取优惠券
    public function getRedPacket()
    {
        $param['redPackId']  = I('param.redPackId', 0, 'intval');
        $param['loginToken'] = $this->token;
        $result              = $this->user->postData($this->user->get_redpacket, $param);
        $this->ajaxReturn($result);
    }

    public function _before_getRedPacket()
    {
        $this->validate([
            'redPackId' => 'required|integer'
        ]);
    }
	
	/**
	 * 领取优惠券--V2
	 * @param $batchSn	String	必填	优惠券批次号
	 */
	public function getRedPacketV2()
	{
		$batchSn = xss_clean(I('param.batchSn', 0, 'strval'));
		
		if(!$batchSn)
		{
			$code = \Think\ErrorCode::PARMA_ERROR;
			$this -> outError($code);
			exit;
		}
		
		$UserV2 = D("UserV2");
		
		$param = array();
		$param['batchSn'] = $batchSn;
		$param['userId'] = intval(authcode(cookie('userId'), 'DECODE', C('ENCRYPT_COOKIE_KEY')));
		
		$res = $UserV2->postData($UserV2->getCoupons, $param);
		
		$this->ajaxReturn($res);
		exit;
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：校验昵称接口
     * @action：/ajax/user/identifynickname
     * @param：nickname，    类型：STRING，必须：YES 用户昵称
     * @date：2016-08-01
     *-------------------------------------------------------------------------
     */
    public function identifyNickname(){
        $param['nickname'] = I('param.nickname', '');
        $identifyData = $this->user->postData($this->user->identifyNickname, $param);
        $this->ajaxReturn($identifyData);
    }


    /**
     *-------------------------------------------------------------------------
     * @title：升级一账通
     * @action：/ajax/user/accountUpgrade
     * @date：2017-01-09
     *-------------------------------------------------------------------------
     */
    public function accountUpgrade(){
        $userId = intval(authcode(cookie('userId'), 'DECODE', C('ENCRYPT_COOKIE_KEY')));
        if(!$userId){
            $code = \Think\ErrorCode:: USER_NO_LOGIN;
            $this -> outError($code);
            exit;
        }
        $UserV2 = D("UserV2");
        $data = $UserV2->postData($UserV2->accountUpgrade );

        //成功后更新状态
        if ( $data['success'] ) {
            //2017-1-10 登录后保存是否已经升级一账通的标识
            session("authorize_".$userId ,$data['isAllowAuthorize']);
        }

        $this->ajaxReturn($data);
    }
    
    /**
     *-------------------------------------------------------------------------
     * @title：确认收货
     * @action：/ajax/user/confirmRecv
     * @param   $orderId            订单号     必传
     * @param   $shippingGroupId    配送单号   必传
     * @date：2017-01-24
     *-------------------------------------------------------------------------
     */
    public function confirmRecv()
    {
        $orderId = xss_clean(I('get.orderId', '', 'strval'));
        $shippingGroupId = xss_clean(I('get.shippingGroupId', '', 'strval'));
        
        if(empty($orderId) || empty($shippingGroupId))
        {
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
			exit;
        }
        
        $returnArr = array(
            'success' => false,
            'code' => 500,
            'message' => '失败',
            'data' => array()
        );
        
        $param = array(
            'orderId' => $orderId,
            'shippingGroupId' => $shippingGroupId,
            'callback' => 'ckdata',
            '_' => time().'000'
        );
        
        $recvUri = C('GOME')['SERVICE']['ORDER'].C('GOME_API')['confirmRecv'].'?'.joinParam($param);
        $curlHandler = new CurlHandler();
    	$recvRes = $curlHandler->request($recvUri, array(), 'get');
    	$recvArr = analyzeOnline($recvRes, 'ckdata');
    	if(!empty($recvArr['success']))
    	{
    		$returnArr = array(
                'success' => true,
                'code' => 200,
                'message' => '成功',
                'data' => $recvArr['result']
            );
    	}
        
        //记录日志
        if(empty($recvArr['message']))
        {
            $recvArr['message'] = 'no message';
        }
        
        if($returnArr['success'] && $returnArr['data']['pOrderConfirm'])
        {
            write_log($recvArr['message'], $recvUri, $param);
        }
        else
        {
            if(empty($recvArr['code']))
            {
                $recvArr['code'] = 500;
            }
            write_log($recvArr['message'], $recvUri, $param, $recvArr['code']);
        }
        
        $this->ajaxReturn($returnArr);
    }
}