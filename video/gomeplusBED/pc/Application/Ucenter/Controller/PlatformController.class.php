<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心
 * +----------------------------------------------------------------------+
 * | All rights reserved.
 * +----------------------------------------------------------------------+
 * | @程序名称：PlatformController.class.php
 * +----------------------------------------------------------------------+
 * | @程序功能：达人平台
 * +----------------------------------------------------------------------+
 * | Author:liuzhen
 * +----------------------------------------------------------------------+
 * | Date:2017-06-15
 * +----------------------------------------------------------------------+
 * | Note:由草稿箱进入发布话题页面，会携带from参数，标识页面来源，参数说明：1：已发话题，2：草稿箱
 * +----------------------------------------------------------------------+
 */

namespace Ucenter\Controller;
use Home\Controller\BaseController;
use Common\Lib\Page;
use Think\ErrorCode;
class PlatformController extends BaseController
{
	//每页最大数据条数
	const PAGE_SIZE_MAX = 10;

	//草稿箱接口允许的最大页码
	const DRAFTS_PAGE_NUM_MAX = 2;

	//已发话题接口允许的最大页码
	const PUBLISHED_PAGE_NUM_MAX = 100;

	//草稿箱数据限值
	const DRAFTS_COUNT_MAX = 20;

	//mongoDB 主键_id长度
	const PRIMARY_KEY_LENGTH = 24;

	//二级城市ID
	private $addressId = '11010000';

	public function __construct()
	{
		//先执行构造方法获取UserId
		parent::__construct();

		// 判断是否为签约达人
		$this->checkExpert();
	}

	/**
	 * 判断是否为签约达人
	 */
	private function checkExpert()
	{
		$expertObj = D('Ucenter/Expert');
		$res = $expertObj->getdata($expertObj->getExpert);
		if($res['success'])
		{
			if(empty($res['data']['isExpert']) || $res['data']['expertType'] != 'contracted')
			{
				header('location:'.APP_HTTP_GOME.C('GOME')['URL']['UCENTER_URL']);
				exit;
			}
		}
		else
		{
			header('location:'.APP_HTTP_GOME.C('GOME')['URL']['UCENTER_URL']);
			exit;
		}
	}


	/****************************************草稿箱begin********************************************/
	public function draftsIndex()
	{
		$seoMap = seoMap();
		$this->assign('title', $seoMap['title']);
		$this->assign('activeUrl', APP_HTTP.C('UCENTER_URL').'drafts/index');
		$this->display('Platform/draftsIndex');
	}

	/**
	 * 获取草稿箱话题列表
	 */
	public function draftsList()
	{
		$pageNum = I('pageNum', 1, 'intval');
		$pageSize = I('pageSize', self::PAGE_SIZE_MAX, 'intval');
		$fields = array('_id', 'name', 'addTime');

		if($pageNum > self::DRAFTS_PAGE_NUM_MAX)
		{
			$returnArr = array(
				'success' => true,
				'code' => 200,
				'message' => '成功',
				'data' => array(
					'topics' => array()
				)
			);
			$this->ajaxReturn($returnArr);
		}

		if($pageSize > self::PAGE_SIZE_MAX)
		{
			$pageSize = self::PAGE_SIZE_MAX;
		}

		$draftsObj = D('Ucenter/Rdrafts');
        $res = $draftsObj->getDraftsList($pageNum, $pageSize, $fields);
        if(!is_array($res))
		{
			$this->outError(\Think\ErrorCode::DATA_RECEIVE_ERROR);
			exit;
		}

		foreach($res as $key => &$val)
		{
			$val['id'] = $val['_id'];
			unset($res[$key]['_id']);
			unset($val);
		}
        //获取草稿箱数据总条数
        $draftsCount = $draftsObj->getDraftsCount();

        $returnArr = array(
			'success' => true,
			'code' => 200,
			'message' => '成功',
			'data' =>
				array(
					'ownedTopicQuantity' => $draftsCount,
					'topics' => $res
				)
		);
		$this->ajaxReturn($returnArr);
	}

	/**
	 * 获取草稿箱某一条数据的详细信息
	 * @param $tid  草稿箱话题ID
	 */
	public function draftsDetail()
	{
		$tid = xss_clean(I('param.tid', '', 'strval'));
		if(empty($tid) || strlen($tid) != self::PRIMARY_KEY_LENGTH)
		{
			$this->outError(\Think\ErrorCode::PARMA_ERROR);
			exit;
		}

		$draftsObj = D('Ucenter/Rdrafts');
        $res = $draftsObj->getDraftsDetail($tid);

        if(empty($res))
		{
			$this->outError(\Think\ErrorCode::DRAFTS_GET_ERROR);
			exit;
		}

		//处理草稿ID
		$res['id'] = $res['_id'];
		unset($res['_id']);
		//获取商品价格、图片等信息
		$prodIdArr = array();
		foreach($res['components'] as $val)
		{
			if($val['type'] == 'item' && !empty($val['outProductId']))
			{
				$prodIdArr[] = $val['outProductId'];
			}
		}

		if(!empty($prodIdArr))
		{
			$prodIdStr = trim(implode(',', $prodIdArr), ',');
			$prodInfoArr = json_decode(D( "Services/Product" )->get_products_price($prodIdStr), true);

			if(empty($prodInfoArr['data']))
			{
				//接口调用失败或没数据，则赋值为空数组
				$prodInfoArr['data'] = array();
			}

			$prodArr = array();
			foreach($prodInfoArr['data'] as $val)
			{
				$prodArr[$val['id']] = array(
					'id' => $val['id'],
					'mainImage' => getResizeImg($val['mainImage'], 260, 260, 'ONLINE'),
					'name' => $val['name'],
					'salePrice' => convert_price($val['salePrice']),
					'skuId' => $val['skuId'],
					'itemDetailUrl' => productDetailUrlGen($val['shopId'], $val['id'], $val['skuId'])
				);
			}

			//将components里的数据替换为接口数据
			foreach($res['components'] as $key => &$val)
			{
				if($val['type'] == 'item')
				{
					if(!empty($prodArr[$val['outProductId']]))
					{
						$val['item'] = $prodArr[$val['outProductId']];
					}
					else
					{
						unset($res['components'][$key]);
					}
				}
				unset($val);
			}
			$res['components'] = array_merge($res['components']);
		}

		$returnArr = array(
			'success' => true,
			'code' => 200,
			'message' => '成功',
			'data' => $res
		);
		$this->ajaxReturn($returnArr);
	}

	/**
	 * 删除草稿箱里的某条数据
	 * @param $tid  草稿箱话题ID
	 */
	public function draftsDel()
	{
		$tid = xss_clean(I('param.tid', '', 'strval'));
		if(empty($tid) || strlen($tid) != self::PRIMARY_KEY_LENGTH)
		{
			$this->outError(\Think\ErrorCode::PARMA_ERROR);
			exit;
		}

		$draftsObj = D('Ucenter/Rdrafts');
		$res = $draftsObj->delDraftsItem($tid);

		if(empty($res))
		{
			$this->outError(\Think\ErrorCode::DRAFTS_GET_ERROR);
			exit;
		}

		$returnArr = array(
			'success' => true,
			'code' => 200,
			'message' => '成功',
			'data' => $res
		);
		$this->ajaxReturn($returnArr);
	}

	/**
	 * 保存草稿：新增草稿|更新原有草稿
	 */
	public function draftsSave()
	{
		$draftsObj = D('Ucenter/Rdrafts');
		$draftsCount = $draftsObj->getDraftsCount();
		if(empty($_POST['tid']) && $draftsCount >= self::DRAFTS_COUNT_MAX)
		{
			$this->outError(\Think\ErrorCode::DRAFTS_OVERFLOW);
			exit;
		}

		if(empty($_POST))
		{
			$this->outError(\Think\ErrorCode::PARMA_ERROR);
			exit;
		}

		if(!empty($_POST['tid']) && strlen($_POST['tid']) != self::PRIMARY_KEY_LENGTH)
		{
			$this->outError(\Think\ErrorCode::PARMA_ERROR);
			exit;
		}

		// 限制数量
		$limitNums = 20;
		$goodNums = 9;
		$saveData = $_POST;
		unset($saveData['from']);
		unset($saveData['tid']);

		/*if(!empty($saveData['name']))
		{
			sensitive($saveData['name']);
		}*/

		if(isset($saveData['components']) && !empty($saveData['components']))
		{
			$imagesCount = $itemCount = 0;
			foreach($saveData['components'] as $key => &$val)
			{
				switch($val['type'])
				{
					// 图片
					case 'image':
						// 敏感词过滤
						//sensitive($val['text']);
						// URL检查是否是本站
						if(isset($val['url']) && !empty($val['url']))
						{
							if(!isTrustedDomain($val['url']))
							{
								echo json_encode(output(500, '图片上传失败,请重新上传.', ''));
								exit();
							}
							$val['url'] = strrpos($val['url'], '//') === 0 ? APP_HTTP.substr($val['url'], 2) : $val['url'];
						}
						break;
					// 文本和商品
					case 'text':
						//sensitive($val['text']);
						$val['text'] = strip_tags($val['text']);
						break;
					case 'item':
						//sensitive($val['text']);
						$val['text'] = strip_tags($val['text']);
						$val['shopId'] = "0";
						$val['outProductId'] = $val['id'];
						$val['id'] = 0;
						// $val['text'] = nl2br($val['text']);
						break;
				}
				switch($val['type'])
				{
					case 'image':
						if(!isTrustedDomain($val['url']))
						{
							$this->outJSON(102, '上传图片存在非法提交.');
						}
						$imagesCount ++;
						break;
					case 'item':
						$itemCount ++;
						break;
					case 'text':
						break;
					case 'html':
						unset($saveData['components'][$key]);
						break;
				}
			}

			// 检查图片数量
			if($imagesCount > $limitNums)
			{
				$this->outJSON(101, '您最多能添加20张图片哦！[' . $limitNums . '].');
			}

			// 检查商品数量
			if($itemCount > $goodNums)
			{
				$this->outJSON(103, '您最多能添加9个商品哦！[' . $goodNums . '].');
			}
		}
		list($msec, $sec) = explode(' ',microtime());
		$addTime = bcadd($sec, $msec, 3) * 1000;

		$saveData['addTime'] = $addTime;
		$saveData['userId'] = $this->userId;
		//保存|更新草稿，有tid的情况下更新对应草稿，否则新增
		if(!empty($_POST['tid']))
		{
			$draftsExists = $draftsObj->getDraftsDetail($_POST['tid']);
			if(empty($draftsExists))
			{
				$this->outError(\Think\ErrorCode::DRAFTS_GET_ERROR);
				exit;
			}
//print_r($saveData);exit;

			$result = $draftsObj->upDraftsItem($_POST['tid'], $saveData);
		}
		else
		{
//		    print_r($saveData);exit;
			$result = $draftsObj->addDraftsItem($saveData);
		}

		if(!empty($result))
		{
			$data = array(
				'success' => true,
				'code' => 200,
				'message' => '成功',
				'data' => $result
			);
			$this->ajaxReturn($data);
		}
		else
		{
			$this->outError(\Think\ErrorCode::ADD_DRAFT_ERROR);
			exit;
		}
	}

	/**
	 * 报错页面
	 */
	public function draftsError()
	{
		$errorCode = xss_clean(I('errorCode', '', 'strval'));
		switch($errorCode)
		{
			case "404": case '422':
			$title = '抱歉！该话题已被删除';
			$message = '抱歉！该话题已被删除';
			$images = '/images/public/404-4.png';
			$jumpUrl = '<a href="'.$this->mx_domain['main'].'">首页</a>';
			break;
			case "911918";
				$title = '该草稿不存在';
				$message = '该草稿不存在';
				$images = '/images/public/404-4.png';
				$jumpUrl = '<a href="'.$this->mx_domain['i'].'expert/draftsIndex">草稿箱</a>';
				break;
			default:
				$title = $message = $images = $jumpUrl = '';
				$images = '/images/public/404-4.png';

		}

		$this->assign('title', $title);
		$this->assign('message', $message);
		$this->assign('images', $images);
		$this->assign('jumpUrl', $jumpUrl);
		$this->display('Platform/error');
	}
	/****************************************草稿箱end********************************************/

	/****************************************已发话题begin********************************************/
	/**
	 * 获取已发布话题列表
	 */
	public function publishedList()
	{
		$pageNum = I('page', 1, 'intval');
		$pageSize = self::PAGE_SIZE_MAX;
		$userId = $this->userId;
		$areaCode = $this->addressId;

		if($pageNum > self::PUBLISHED_PAGE_NUM_MAX)
		{
			$pageNum = self::PUBLISHED_PAGE_NUM_MAX;
		}

		if($pageSize > self::PAGE_SIZE_MAX)
		{
			$pageSize = self::PAGE_SIZE_MAX;
		}

		$topic = D('Ucenter/Topic');

		$res = $topic->publishedTopic($pageNum, $pageSize, $userId, $areaCode);

		//处理话题的更新时间字段，updateTime字段BS可能不会返回或者返回为0（在BS加updateTime字段前后的时间段内，由于数据缓存，所以缓存内的数据updateTime字段可能没有或者数值为0）
		if(!empty($res['data']['topics']))
		{
			foreach($res['data']['topics'] as &$val)
			{
				!empty($val['updateTime']) ? '' : $val['updateTime'] = $val['createTime'];
				unset($val);
			}
		}

		//分页
		$page = new Page();
		$paramsUrl = $this->mx_domain['i'].'expert/publishedList?';
		$linkUrl =  $page->show($res['data']['ownedTopicQuantity'], $pageSize, $pageNum, $paramsUrl);
		$res['data']['linkUrl'] = $linkUrl;

		$seoMap = seoMap();
		$this->assign('title', $seoMap['title']);
		$this->assign('activeUrl', APP_HTTP.C('UCENTER_URL').'published/index');
		$this->assign('topicList', $res['data']);
		$this->display('Platform/publishedList');
	}

	/**
	 * 获取话题详情信息
	 */
	public function publishedDetail()
	{
		$tid = xss_clean(I('param.tid', '', 'strval'));
		if(empty($tid))
		{
			$this->outError(\Think\ErrorCode::PARMA_ERROR);
			exit;
		}

		$topic = D('Group/Topic');
		$res = $topic->getData(
			$topic->topic_detail,
			array(
				'id' => $tid,
				'areaCode' => $this->addressId
			)
		);

		if(!$res['success'])
		{
			$this->ajaxReturn($res);
		}

		//判断当前userId是否为话题发布人的userId，不是则报错
		if($res['data']['user']['id'] != $this->userId)
		{
			$this->outError(\Think\ErrorCode::PARMA_ERROR);
			exit;
		}

		//获取商品价格、图片等信息
		$prodIdArr = array();
		foreach($res['data']['components'] as $val)
		{
			if($val['type'] == 'item' && !empty($val['outProductId']))
			{
				$prodIdArr[] = $val['outProductId'];
			}
		}

		if(!empty($prodIdArr))
		{
			$prodIdStr = trim(implode(',', $prodIdArr), ',');
			$prodInfoArr = json_decode(D( "Services/Product" )->get_products_price($prodIdStr), true);
			if(empty($prodInfoArr['data']))
			{
				//接口调用失败或没数据，则赋值为空数组
				$prodInfoArr['data'] = array();
			}

			$prodArr = array();
			foreach($prodInfoArr['data'] as $val)
			{
				$prodArr[$val['id']] = array(
					'id' => $val['id'],
					'mainImage' => getResizeImg($val['mainImage'], 260, 260, 'ONLINE'),
					'name' => $val['name'],
					'salePrice' => convert_price($val['salePrice']),
					'skuId' => $val['skuId'],
					'itemDetailUrl' => productDetailUrlGen($val['shopId'], $val['id'], $val['skuId'])
				);
			}

			//将components里的数据替换为接口数据
			foreach($res['data']['components'] as $key => &$val)
			{
				if($val['type'] == 'item')
				{
					if(!empty($prodArr[$val['outProductId']]))
					{
						$val['item'] = $prodArr[$val['outProductId']];
					}
					else
					{
						unset($res['data']['components'][$key]);
					}
				}
				unset($val);
			}
			$res['data']['components'] = array_merge($res['data']['components']);
		}

		$this->ajaxReturn($res);
	}
	/****************************************已发话题end********************************************/

	/****************************************发布话题begin*******************************************/
	/**
	 * 达人平台发布话题
	 * from 0 发布话题 1 已发话题  2草稿箱
	 */
	public function publish(){
		$tid = I( 'param.tid','');
		$from = I( 'param.from',0);
        $fromArr = [1,2];
        if($tid && !in_array($from,$fromArr)){
            $this->_empty();
            exit;
        }
		//随机字符 uid|token|随机数字符串|数时间戳
		do{
			$randStr1 =  $this->userId.'|'.$this->token.'|'.'addpage'.rand().'|'.time();
		}
		while( S(substr(md5($randStr1),8,16) ) );

		$pageId = authcode($randStr1,  'ENCODE', C('ENCRYPT_APP_KEY') );
		$qrcodeUrlmodel = APP_HTTP.C('MAIN_URL').'qrupload/index?pageId={pageId}&qrcodeId={qrcodeId}';

        $seoMap = seoMap();
        $this->assign('title', $seoMap['title']);

		$this->assign('tid',$tid);
		$this->assign('from',$from);
		$this->assign('activeUrl','expert/publish');
		$this->assign('pageId',$pageId);
		$this->assign('qrcodeUrlmodel',$qrcodeUrlmodel);
		$this->assign('crumbs', '发布话题');
		$this->display('Platform/publish');
	}
	/****************************************发布话题end********************************************/

	/****************************************平台首页begin*******************************************/
	//达人主页
	public function home()
	{
		$expertObj = D('Ucenter/Expert');
		//达人首页数据
		$pageData = $expertObj->getdata($expertObj->homePage);
		if( !$pageData['success'] ){
			$this->_empty();
			exit;
		}
		$pageData = $pageData['data'] ;
		//达人系统通知列表
		$param['pageNum'] = 1;
		$param['pageSize'] = 5;
		$Notifications = $expertObj->getdata($expertObj->expertNotifications,$param);
		if($Notifications['data']['notifications']) {
            foreach ($Notifications['data']['notifications'] as $k => $v) {
                $Notifications['data']['notifications'][$k]['short_title'] = htmlentities(mb_substr($v['title'],0,30,'UTF-8'));
                $Notifications['data']['notifications'][$k]['title'] = htmlentities($v['title']);
                $Notifications['data']['notifications'][$k]['description'] = htmlentities($v['description']);
            }
        }
		//达人分页
		$page = new Page();
		$paramsUrl = 'javascript:;';
		$linkUrl =  $page->showNofr($Notifications['data']['quantity'], $param['pageSize'], $param['pageNum'], $paramsUrl);
		$sum = ceil($Notifications['data']['quantity']/$param['pageSize']);
		//置顶通知
		$topNotifications = $expertObj->getdata($expertObj->notifications);

		if( $topNotifications['data']['topExpertNotifications'] ){
		    foreach( $topNotifications['data']['topExpertNotifications'] as $k=>$v ){
                $topNotifications['data']['topExpertNotifications'][$k]['short_title'] = htmlentities(mb_substr($v['title'],0,30,'UTF-8'));
                $topNotifications['data']['topExpertNotifications'][$k]['title'] = htmlentities($v['title']);
            }
        }
        $seoMap = seoMap();
        $this->assign('title', $seoMap['title']);
		$this->assign('activeUrl','expert/my');
		$this->assign('pageData',$pageData);
		$this->assign('messageData',$Notifications['data']);
		$this->assign('linkUrl',$linkUrl);
		$this->assign('pageSum',$sum);
		$this->assign('topMessageData',$topNotifications['data']);
		$this->display('Platform/home');
	}
	//系统通知分页
	public function notifications(){
		$expertObj = D('Expert');
		$param['pageNum'] = I('param.page',1);
		$param['pageSize'] = 5;
		$data = $expertObj->getdata($expertObj->expertNotifications,$param);
		if( $data['data']['notifications'] ){
            foreach ($data['data']['notifications'] as $k=>$v){
                $data['data']['notifications'][$k]['short_title'] = htmlentities(mb_substr($v['title'],0,30,'UTF-8'));
                $data['data']['notifications'][$k]['title'] = htmlentities($v['title']);
                $data['data']['notifications'][$k]['description'] = htmlentities($v['description']);
            }
        }
		//分页
		$page = new Page();
		$paramsUrl = 'javascript:;';
		$linkUrl =  $page->showNofr($data['data']['quantity'], $param['pageSize'], $param['pageNum'], $paramsUrl);

		$data['data']['page'] = $param['pageNum'];
		$data['data']['sumPage'] = ceil($data['data']['quantity']/$param['pageSize']);
		$data['data']['linkUrl'] = $linkUrl ;
		$this->response($data);
	}


	//协议
	public function protocol()
	{
        $seoMap = seoMap();
        $this->assign('title', $seoMap['title']);
		$this->assign('activeUrl','expert/protocol');
		$this->display('Platform/protocol');
	}



	/*
	 * 达人logo二维码
	 */
	public function logocode()
	{

		Vendor('phpqrcode.phpqrcode');
		$uid = $this->userId;
		$logo = $this->userInfo['ext']['account']['imagePath'];
		$nickname = $this->userInfo['nickName'];
		$referralCode = I('param.referralCode');;//推荐码
		if(!$referralCode){
			exit('referralCode error');
		}
		$invite = base64_encode( json_encode( ['n'=>$nickname,'c'=>$referralCode]) );
		$scheme = APP_HTTP.C('WAP_URL').'daren_invite.html?invite='.$invite.'&userId='.$uid ;

		$level='H';//容错级别
		$size = 2;//生成图片大小
		$margin = 4;//空白区域
		$path = APP_PATH."/Runtime/Temp/";//路径
		$fileName = $path.$uid.'_'.md5(time()).'.png';//生成的文件名
		\QRcode::png($scheme, $fileName, $level, $size ,$margin );
		$QR = imagecreatefromstring(file_get_contents($fileName));

		$logo = imagecreatefromstring(file_get_contents($logo));
        /*if( !$logo ){
            $logo = APP_HTTP.C('STATICPATH.IMG').'dist/images/public/talent-head-default.png';
            $logo = imagecreatefromstring(file_get_contents($logo) );
        }*/
		if ( imageistruecolor($logo) ) {
			/*
			 * url获取的远端的图像是一个jpeg图像。也就是所谓truecolor的图像。而png是所谓的调色板图像，需要先将 logo变成调色板图像，才能在copy时不丢失 颜色信息
			 */
			imagetruecolortopalette($logo, false, 65535);
		}
		$QR_width = imagesx($QR);//二维码图片宽度

		$QR_height = imagesy($QR);//二维码图片高度

		$logo_width = imagesx($logo);//logo图片宽度

		$logo_height = imagesy($logo);//logo图片高度

		$logo_qr_width = $QR_width / 4;

		$scale = $logo_width/$logo_qr_width;

		$logo_qr_height = $logo_height/$scale;

		$from_width = ($QR_width - $logo_qr_width) / 2;

		//重新组合图片并调整大小
		imagecopyresampled($QR, $logo, $from_width, $from_width, 0, 0, $logo_qr_width, $logo_qr_height, $logo_width, $logo_height);
		//删除临时文件
		unlink($fileName);
		Header("Content-type: image/png");
		ImagePng($QR);
		//base64输出
		/*ob_start();
		 Header("Content-type: image/png");
		 ImagePng($QR);
		 $imageString = base64_encode(ob_get_contents());
		 ob_end_clean();
		 echo "data:image/jpg;base64,".$imageString;*/
	}
	/****************************************平台首页end*******************************************/
}