<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：IndexController.class.php                                 |
 * +----------------------------------------------------------------------+
 * | @程序功能： 个人中心首页                                             |
 * +----------------------------------------------------------------------+
 * | Author:zhangting <zhangting@loyo24.com>                              |
 * +----------------------------------------------------------------------+
 * | Date:2016-07-07 10:23:10 CST                                         |
 * +----------------------------------------------------------------------+
 */
namespace Ucenter\Controller;
use Home\Controller\AuthController;
use Common\Lib\CurlHandler;

class IndexController extends AuthController
{
    //每页最大数据条数
    const PAGE_SIZE_MAX = 30;

    //接口允许的最大页码
    const PAGE_NUM_MAX = 5;

    //话题标题最大字数
    const TOPIC_TITLE_MAX = 28;

    //话题描述最大字数
    const TOPIC_TEXT_MAX = 30;

    private $_curlHandler;
    
    //二级城市ID
    private $addressId = '11010000';

    public function __construct()
    {
		parent::__construct();
		
        $this->_curlHandler = new CurlHandler();
        
        //获取区域信息
        $addrArr = getAddrGome();
        $this->addressId = $addrArr['cityId'];
    }
	/**
	 * 个人中心-用户信息
	 * 
	 */
    public function index()
    {
        $multiRes = $this->getMultiInfo();
        
        //账户信息
        $accountArr = array();
        if(!empty($this->userInfo['ext']['account']))
        {
            $accountArr = $this->userInfo['ext']['account'];
        }
        
        //优惠券信息
        $couponsRes = $multiRes['coupons'];
        $couponsData = analyzeOnline($couponsRes, 'ckdata');
        $couponsArr = array();
        if(!empty($couponsData['result']['success']))
        {
            $couponsArr = $couponsData['result']['buessObj']['result'];
        }
        
        //达人信息
        $expertArr = array('isExpert' => 0);
        if(!empty($this->userInfo['isExpert']))
        {
            //布尔类型转为整型，方便模板里作判断
            $expertArr['isExpert'] = 1;
        }
        
        //圈子信息
        $circleRes = json_decode($multiRes['circle'], true);
        $circleArr = array();
        if($circleRes['message'] == '' && (!empty($circleRes['data']['imember']) || !empty($circleRes['data']['imaster'])))
        {
            $circleArr = array_merge($circleRes['data']['imember'], $circleRes['data']['imaster']);
            $circleArr = array_slice($circleArr, 0 ,7);
        }
        
        //话题信息
        $topicRes = json_decode($multiRes['topic'], true);
        $topicArr = array();
        if($topicRes['message'] == '' && !empty($topicRes['data']['topics']))
        {
            $topicArr = $this->dealTopic($topicRes['data']['topics']);
        }
        
        //订单信息
        $orderRes = $multiRes['order'];
        $orderData = analyzeOnline($orderRes, 'ckdata');
        $orderArr = array();
        if(!empty($orderData['success']) && !empty($orderData['result']['pOrders']['profileProgressBarInfoList']))
        {
            $orderArr = $orderData['result']['pOrders'];
        }
        
        $this->assign('activeUrl', '/index/index') ;
        $this->assign('accountArr', $accountArr);
        $this->assign('couponsArr', $couponsArr);
        $this->assign('expertArr', $expertArr);
		$this->assign('circleArr', $circleArr);
        $this->assign('topicArr', $topicArr);
        $this->assign('orderArr', $orderArr);
        $this->assign("title","个人中心");
        $this->display("Index/index");
	}

    /**
	 * 个人中心-获取用户基本信息、话题、圈子、订单等数据
	 * 
	 */
    public function getMultiInfo()
    {
        import('Common.Lib.EpiCurl');
        $args = array(
            'coupons' => array(
                'callback' => 'ckdata',
                '_' => time().'000'
            ),
        	'circle' => array(),
        	'topic' => array(
        		'pageNum'=> 1,
        		'pageSize' => 2,
        		'ownerUserId'=> $this->userId,
                'areaCode' => $this->addressId,
        	),
            'order' => array(
                'callback' => 'ckdata',
                '_' => time().'000'
            )
        );
        
        $topic = D('Ucenter/Topic');
        
        $kv_params = array(
            'coupons' => array('url' => C('GOME')['SERVICE']['UCENTER'].C('GOME_API')['coupons'].'?'.joinParam($args['coupons'])),
            'circle' => array('url' => connectParam($topic, $topic->myRelated, $args['circle'], 2)),
            'topic' => array('url' => connectParam($topic, $topic->topic_list_v2, $args['topic'], 2)),
            'order' => array('url' => C('GOME')['SERVICE']['ORDER'].C('GOME_API')['top_two_order'].'?'.joinParam($args['order']))
        );
        
        $res = multi_curl($kv_params);
        
        //记录日志begin
        //优惠券信息日志
        $couponsRes = $res['coupons'];
        $couponsData = analyzeOnline($couponsRes, 'ckdata');
        $couponsMsg = 'no message';
        if(!empty($couponsData['result']['success']))
        {
            write_log($couponsMsg, $kv_params['coupons']['url'], $args['coupons']);
        }
        else
        {
            //uat环境的错误信息不是jsonp数据
            $couponsDataErr = analyzeOnline($couponsRes);
            if(empty($couponsDataErr['data']))
            {
                $couponsDataErr['data'] = $couponsMsg;
            }
            
            if(empty($couponsDataErr['code']))
            {
                $couponsDataErr['code'] = 500;
            }
            
            //把接口返回数据填充在日志信息里
            $dataAppend = $couponsRes;
            if(is_array($couponsRes))
            {
                $dataAppend = json_encode($couponsRes);
            }
            
            if((false !== strpos(strtolower($dataAppend), 'html')) && (false !== strpos(strtolower($dataAppend), 'head')))
            {
                preg_match('/<title>([\s\S]*?)<\/title>/', htmlspecialchars_decode($dataAppend), $matches);
                $dataAppend = !empty($matches[1]) ? $matches[1] : 'error:403';
            }
            
            $couponsDataErr['data'] = $couponsDataErr['data'] . '###' . $dataAppend;
            
            write_log($couponsDataErr['data'], $kv_params['coupons']['url'], $args['coupons'], $couponsDataErr['code']);
        }
        
        //订单信息日志
        $orderRes = $res['order'];
        $orderData = analyzeOnline($orderRes, 'ckdata');
        $orderMsg = 'no message';
        if(!empty($orderData['success']))
        {
            write_log($orderMsg, $kv_params['order']['url'], $args['order']);
        }
        else
        {
            if(empty($orderData['error']['message']))
            {
                $orderData['error']['message'] = $orderMsg;
            }
            
            if(empty($orderData['error']['code']))
            {
                $orderData['error']['code'] = 500;
            }
            
            //把接口返回数据填充在日志信息里
            $dataAppend = $orderRes;
            if(is_array($orderRes))
            {
                $dataAppend = json_encode($orderRes);
            }
            
            $orderData['error']['message'] = $orderData['error']['message'] . '###' . $dataAppend;
            
            write_log($orderData['error']['message'], $kv_params['order']['url'], $args['order'], $orderData['error']['code']);
        }        
        //记录日志end
        
        return $res;        
    }
     
    /**
    * 个人中心-处理话题里的图片、文字信息
    * @param array()  $topicArr
    * @return array()
    * note 图片展示顺序：图片、商品、视频
    */
    public function dealTopic($topicArr)
    {
        $returnArr = $topicArr;
        
        foreach($topicArr as &$val)
        {
            $textStr = '';
            $imgArr = array();
            foreach($val['components'] as $itemVal)
            {
                if($itemVal['type'] == 'image')
                {
                    $imgUrl = !empty($itemVal['url']) ? $itemVal['url'] : '';
                    $imgArr['image'][] = array(
                        'url' => !empty($itemVal['isOnLine']) ? getResizeImg($imgUrl, 360, 360, 'ONLINE') : getResizeImg($imgUrl, 285, 185),
                        'type' => 'image'
                    );
                }
                else if($itemVal['type'] == 'item')
                {
                    $imgArr['item'][] = array(
                        'url' => !empty($itemVal['item']['mainImage']) ? getResizeImg($itemVal['item']['mainImage'], 360, 360, 'ONLINE') : '',
                        'type' => 'item'
                    );
                }
                else if($itemVal['type'] == 'video')
                {
                    $imgArr['video'][] = array(
                        'url' => !empty($itemVal['coverImage']) ? getResizeImg($itemVal['coverImage'], 285, 185) : '',
                        'type' => 'video'
                    );
                }
                else if($itemVal['type'] == 'text' && empty($textStr))
                {
                    $textStr = strip_tags($itemVal['text']);
                }
            }
            
            $sortImgArr = array();
            while(!empty($imgArr['image']) || !empty($imgArr['video']) || !empty($imgArr['item']))
            {
                if(!empty($imgArr['image']))
                {
                    $sortImgArr[] = array_shift($imgArr['image']);
                }
                
                if(!empty($imgArr['item']))
                {
                    $sortImgArr[] = array_shift($imgArr['item']);
                }
                
                if(!empty($imgArr['video']))
                {
                    $sortImgArr[] = array_shift($imgArr['video']);
                }
            }
            $val['createTime'] = formatDateTime($val['createTime']);
            $val['imgShow'] = array_slice($sortImgArr, 0, 3);
            $val['textShow'] = $textStr;
            unset($val);
        }
        
        return $topicArr;
    }
    
    /**
    * 个人中心-商品推荐
    * @param void
    * @return array()
    */
	public function recommend()
    {
        $returnArr = array(
            'success' => false,
            'code' => 500,
            'message' => '失败',
            'data' => array()
        );
        
        $addrArr = getAddrGome();
        
        //uat环境 $boxid = box20,上线后换成 $boxid = grec1011100
        $param = array(
            'boxid' => 'grec1011100',
            'area' => $addrArr['borId'],
            'cid' => (empty($_COOKIE['__clickidc']) ? '' : $_COOKIE['__clickidc']),
            'uid' => $this->userId,
            'imagesize' => '260',
            'callback' => 'ckdata',
            '_' => time().'000'
        );
        
        $recomUri = C('GOME')['SERVICE']['RECOMMEND'].C('GOME_API')['ucenterRecom'].'?'.joinParam($param);
    	$recomRes = $this->_curlHandler->request($recomUri, array(), 'get');
    	$recomArr = analyzeOnline($recomRes, 'ckdata');
    	if(isset($recomArr['isSuccess']) && $recomArr['isSuccess'] == 'Y')
    	{
    		$returnArr = array(
                'success' => true,
                'code' => 200,
                'message' => '成功',
                'data' => !empty($recomArr['lst']) ? $recomArr['lst'] : array()
            );
    	}
        
        //记录日志
        $msg = 'no message';
        if(isset($recomArr['isSuccess']) && $recomArr['isSuccess'] == 'Y')
        {
            write_log($msg, $recomUri, $param);
        }
        else
        {
            write_log($msg, $recomUri, $param, 500);
        }
                
        $this->ajaxReturn($returnArr);
	}
    
}
