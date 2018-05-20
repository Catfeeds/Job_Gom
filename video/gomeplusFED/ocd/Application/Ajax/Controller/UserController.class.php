<?php

namespace Ajax\Controller;

use Ajax\Controller\BaseController;

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
		$batchSn = I('param.batchSn', 0);
		
		if(!$batchSn)
		{
			$code = \Think\ErrorCode::PARMA_ERROR;
			$this -> outError($code);
			exit;
		}
		
		$UserV2 = D("UserV2");
		
		$param = array();
		$param['batchSn'] = $batchSn;
		$param['userId'] = authcode(cookie('userId'), 'DECODE', C('ENCRYPT_COOKIE_KEY'));		
		
		$res = $UserV2 -> postData($UserV2 -> getCoupons, $param);
		
		$this -> ajaxReturn($res);
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
}