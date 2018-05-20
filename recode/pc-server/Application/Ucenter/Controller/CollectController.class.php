<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：CollectController.class.php                               |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                          |
 * +----------------------------------------------------------------------+
 * | Author:liuzhen <liuzhen@gomeplus.com>                                |
 * +----------------------------------------------------------------------+
 * | Date:2016-07-11                                        			  |
 * +----------------------------------------------------------------------+
 */
 
/* 需要做BS接口调用失败后的容错处理，跟产品确认错误页面 */
 
namespace Ucenter\Controller;
use Home\Controller\AuthController;
class CollectController extends AuthController
{
	private $pageSizeGoods = 20;
	private $pageSizeShop = 20;
	private $pageSizeTopic = 20;
    
    //二级城市ID
    private $addressId = '11010000';
	
	public function __construct()
	{
		parent::__construct();
		$this->collect = D('Collect');
        
        //获取区域信息
        $addrArr = getAddrGome();
        $this->addressId = $addrArr['cityId'];
	}
	
	public function index()
	{
		$this->goods();
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：获取我的收藏--商品
     * @action：/collect/goods
     * @author：刘振
     * @date：2016-07-11
     *-------------------------------------------------------------------------
     */
	public function goods()
	{
		$this->assign('title', '我的收藏');
		$this->assign('activeUrl', APP_HTTP.C('UCENTER_URL').'collect/index') ; //左侧选中的地址
       
        $this->display('Collect/goods');
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：获取我的收藏--店铺
     * @action：/collect/shop
     * @author：刘振
     * @date：2016-07-11
     *-------------------------------------------------------------------------
     */
	public function shop()
	{
		$this->assign('title', '我的收藏');
		$this->assign('activeUrl', APP_HTTP.C('UCENTER_URL').'collect/index') ; //左侧选中的地址
       
        $this->display('Collect/shop');
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：获取我的收藏--话题
     * @action：/collect/topic
     * @author：刘振
     * @date：2016-07-11
     *-------------------------------------------------------------------------
     */
	public function topic()
	{
		$this->assign('title', '我的收藏');
		$this->assign('activeUrl', APP_HTTP.C('UCENTER_URL').'collect/topic') ; //左侧选中的地址
       
        $this->display('Collect/topic');
	}

	/**
     *-------------------------------------------------------------------------
     * @title：删除收藏的商品
     * @action：/collect/delGoods
	 * @param：ids	String	收藏ID
     * @author：刘振
     * @date：2016-07-11
     *-------------------------------------------------------------------------
     */
	public function delGoods()
	{
		$ids = xss_clean(I('param.ids', '', 'strval'));
		
		if(!$ids)
		{
			$code = \Think\ErrorCode::PARMA_ERROR;
			$this->outError($code);
			exit;
		}		
		
		$param = array();
		$param['ids'] = trim($ids, ',');
		
		$delRes = $this->collect->deleteData($this->collect->goodsCollectDel, $param);
		
		$this->ajaxReturn($delRes);
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：删除收藏的店铺
     * @action：/collect/delShop
	 * @param：ids	String	收藏ID
     * @author：刘振
     * @date：2016-07-11
     *-------------------------------------------------------------------------
     */
	public function delShop()
	{
		$ids = xss_clean(I('param.ids', '', 'strval'));
		
		if(!$ids)
		{
			$code = \Think\ErrorCode::PARMA_ERROR;
			$this->outError($code);
			exit;
		}		
		
		$param = array();
		$param['ids'] = trim($ids, ',');
		
		$delRes = $this->collect->deleteData($this->collect->shopCollectDel, $param);
		
		$this->ajaxReturn($delRes);
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：删除收藏的话题
     * @action：/collect/delTopic
	 * @param：ids	String	收藏ID
     * @author：刘振
     * @date：2016-07-11
     *-------------------------------------------------------------------------
     */
	public function delTopic()
	{
		$ids = xss_clean(I('param.ids', '', 'strval'));
		
		if(!$ids)
		{
			$code = \Think\ErrorCode::PARMA_ERROR;
			$this->outError($code);
			exit;
		}		
		
		$param = array();
		$param['ids'] = trim($ids, ',');
		
		$delRes = $this->collect->deleteData($this->collect->topicCollectDel, $param);
		
		$this->ajaxReturn($delRes);
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：加载更多商品
     * @action：/collect/moreGoods
	 * @param：pageNum	Integer	第几页
     * @author：刘振
     * @date：2016-07-11
     *-------------------------------------------------------------------------
     */
	public function moreGoods()
	{
		$pageNum = I('param.pageNum', 1, 'intval');
		
		if(!$pageNum)
		{
			$code = \Think\ErrorCode::PARMA_ERROR;
			$this->outError($code);
			exit;
		}
		
		$param = array();
			
		$param = array(
			'pageSize' => $this->pageSizeGoods,
			'pageNum' => $pageNum
		);
		
		
		$dataList = $this->collect->getData($this->collect->goodsCollectList, $param);
		
		if(!$dataList['success'])
		{
			$this->ajaxReturn($dataList);
			exit;
		}
		
		foreach($dataList['data']['collections'] as &$val)
		{
			$val['collectedTimeStr'] = date('Y-m-d', substr($val['collectedTime'], 0, 10));
			$val['item']['price'] = convert_price($val['item']['price']);
			$val['item']['salePrice'] = convert_price($val['item']['salePrice']);
			$val['item']['skuHighestPrice'] = convert_price($val['item']['skuHighestPrice']);
			$val['item']['mainImage'] = getResizeImg($val['item']['mainImage'], 230, 230);
			$val['item']['name'] = xss_clean($val['item']['name']);
			unset($val);
		}
		$dataList['data']['pageSize'] = $this->pageSizeGoods;
		
		$this->ajaxReturn($dataList);
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：加载更多店铺
     * @action：/collect/moreShop
	 * @param：pageNum	Integer	第几页
     * @author：刘振
     * @date：2016-07-11
     *-------------------------------------------------------------------------
     */
	public function moreShop()
	{
		$pageNum = I('param.pageNum', 1, 'intval');
		
		if(!$pageNum)
		{
			$code = \Think\ErrorCode::PARMA_ERROR;
			$this->outError($code);
			exit;
		}
		
		$param = array();
			
		$param = array(
			'pageSize' => $this->pageSizeShop,
			'pageNum' => $pageNum
		);
		
		
		$dataList = $this->collect->getData($this->collect->shopCollectList, $param);
		
		if(!$dataList['success'])
		{
			$this->ajaxReturn($dataList);
			exit;
		}
		
		foreach($dataList['data']['collections'] as &$val)
		{
			$val['collectedTimeStr'] = date('Y-m-d', substr($val['collectedTime'], 0, 10));
			$val['shop']['icon'] = getResizeImg($val['shop']['icon'], 230, 0);
			$val['shop']['name'] = xss_clean($val['shop']['name']);
			unset($val);
		}
		$dataList['data']['pageSize'] = $this->pageSizeShop;
		
		$this->ajaxReturn($dataList);
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：加载更多话题
     * @action：/collect/moreTopic
	 * @param：pageNum	Integer	第几页
     * @author：刘振
     * @date：2016-07-11
     *-------------------------------------------------------------------------
     */
	public function moreTopic()
	{
		$pageNum = I('param.pageNum', 1, 'intval');
		
		if(!$pageNum)
		{
			$code = \Think\ErrorCode::PARMA_ERROR;
			$this->outError($code);
			exit;
		}
		
		$param = array();
			
		$param = array(
			'pageSize' => $this->pageSizeTopic,
			'pageNum' => $pageNum,
            'areaCode' => $this->addressId
		);
		
		
		$dataList = $this->collect->getData($this->collect->topicCollectList, $param);
		
		if(!$dataList['success'])
		{
			$this->ajaxReturn($dataList);
			exit;
		}
		
		foreach($dataList['data']['collections'] as &$val)
		{
			$val['collectedTimeStr'] = date('Y-m-d', substr($val['collectedTime'], 0, 10));
            $val['topic']['new_components'] = array();
			if(count($val['topic']['components']))
			{
				foreach($val['topic']['components'] as $valItem)
				{
					if(isset($val['topic']['new_components'][$valItem['type']]))
					{
						continue;
					}
					if($valItem['type'] == 'item')
					{
                        if(!empty($valItem['item']))
                        {
                            $valItem['item']['price'] = convert_price($valItem['item']['price']);
                            $valItem['item']['salePrice'] = convert_price($valItem['item']['salePrice']);
                            $valItem['item']['mainImage'] = !empty($valItem['item']['mainImage']) ? getResizeImg($valItem['item']['mainImage'], 260, 260, 'ONLINE') : '';
                        }
                        else
                        {
                            continue;
                        }
                    }
					if($valItem['type'] == 'image')
					{
						$valItem['url'] = !empty($valItem['isOnLine']) ? getResizeImg($valItem['url'], 260, 260, 'ONLINE') : getResizeImg($valItem['url'], 230, 0);
					}
					if($valItem['type'] == 'video')
					{
						$valItem['coverImage'] = getResizeImg($valItem['coverImage'], 230, 0);
                        
                    }
					$val['topic']['new_components'][$valItem['type']] = $valItem;
				}
			}
			unset($val);
		}
		$dataList['data']['pageSize'] = $this->pageSizeTopic;
		
		$this->ajaxReturn($dataList);
	}
	
}
