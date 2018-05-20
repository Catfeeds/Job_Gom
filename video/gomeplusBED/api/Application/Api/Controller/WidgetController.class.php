<?php

namespace Api\Controller;
use Api\Controller\BaseController;
class WidgetController extends BaseController
{

    //是否需要加载脚本 否
    const IS_SCRIPT_N = 0;
    //是否需要加载脚本 是
    const IS_SCRIPT_Y = 1;

    //版本号
    CONST SCRIPT_VERSION = '1.0';

    //返回数据类型
    CONST RETURN_TYPE_JSON = 'json';
    CONST RETURN_TYPE_HTML = 'html';

	//每页最大数据条数
	const PAGE_SIZE_MAX = 30;

	//接口允许的最大页码
	const PAGE_NUM_MAX = 5;

	//话题列表标题最大字数
	const TOPIC_TITLE_MAX = 26;

	//话题描述最大字数
	const TOPIC_TEXT_MAX = 28;

	//商品名称最大字数
	const GOODS_TITLE_MAX = 20;

	//城市ID
	private $addressId = '11010000';

    private $commendObj = null;

    //每个方法都需要返回的数据
    public $commentData = [] ;
    //模板是否加载脚本的配置
    public $tplIsScript = [
        'index_hot_topic'=>self::IS_SCRIPT_Y,
        'index_quality_life'=>self::IS_SCRIPT_N,
        'index_topic_recommend'=>self::IS_SCRIPT_N,
        'home_topic'=>self::IS_SCRIPT_Y,
        'forestall_topic'=>self::IS_SCRIPT_Y,
        'clothing_recommend'=>self::IS_SCRIPT_N,
        'car_group'=>self::IS_SCRIPT_N,
        'market_group'=>self::IS_SCRIPT_N,
        'sale_buylist'=>self::IS_SCRIPT_N,
        'groupon_topic'=>self::IS_SCRIPT_N,
        'mygome_group'=>self::IS_SCRIPT_Y,
        'mygome_topic'=>self::IS_SCRIPT_Y,
        'drinks_topic'=>self::IS_SCRIPT_Y
    ];
    //jsonp返回data的类型
    public $tplType = [
        'index_hot_topic'=>self::RETURN_TYPE_HTML,
        'index_quality_life'=>self::RETURN_TYPE_HTML,
        'index_topic_recommend'=>self::RETURN_TYPE_HTML,
        'home_topic'=>self::RETURN_TYPE_HTML,
        'forestall_topic'=>self::RETURN_TYPE_HTML,
        'clothing_recommend'=>self::RETURN_TYPE_HTML,
        'car_group'=>self::RETURN_TYPE_HTML,
        'market_group'=>self::RETURN_TYPE_HTML,
        'sale_buylist'=>self::RETURN_TYPE_HTML,
        'groupon_topic'=>self::RETURN_TYPE_HTML,
        'mygome_group'=>self::RETURN_TYPE_HTML,
        'mygome_topic'=>self::RETURN_TYPE_JSON,
        'drinks_topic'=>self::RETURN_TYPE_HTML
    ];
    public function __construct() {
        parent::__construct();
        $this->commendObj =  D('Services/Commend');

    }
    /*
     * 模板名称 index_hot_topic index_quality_life index_topic_recommend
     * 对应方法 indexHotTopic   indexQualityLife   indexTopicRecommend
	 * $tplName 模板名称
	 * $callback 回调函数名称
    */

   public function index(){
   	   $tplName = I('param.tplname','','trim');
   	   //模板参数不能为空，同时不能是入口方法（小心进入调用的死循环）
       if( !$tplName || $tplName=='index' ){
       		$this->ajaxError('模板参数错误','jsonp');
       }
       $array = explode("_",$tplName);
       //方法名称
	   $tplMethod = $array[0].ucfirst($array[1]).ucfirst($array[2]);

	   //模板对应方法必须存在，同时不能与方法名称一样
	   if( !method_exists($this,$tplMethod) || $tplName==$tplMethod ){
	   		$this->ajaxError('模板参数异常','jsonp');
	   }
       $this->commentData = array(
           'tplName'=>$tplName,
           'version'=>self::SCRIPT_VERSION,
           'type'=>$this->tplType[$tplName],
           'isScript'=>$this->tplIsScript[$tplName]
       );
	   $this->$tplMethod();

   }
    /**
     * 酒水茶叶-畅饮俱乐部+兴趣圈子
     */
    private function drinksTopic(){
        $data = $this->commentData ;

        $list['drinksClub'] = $this->commendObj->getCmsList('alcoholDrinksClub');
        $list['interestGroup'] = $this->commendObj->getCmsList('alcoholInterestGroup');
        if( $list['drinksClub']['drinksClubs'] && count( $list['drinksClub']['drinksClubs']) >=3 && $list['interestGroup']['interestGroups'] ){
            //动态数据缓存
            $topicDynamic = S('gome_drinksTopic_dynamic');
            $idsArr = [];
            foreach ( $list['drinksClub']['drinksClubs'] as $k=>$v){
                $idsArr[] = $v['topic_id'];
            }
            $idsStr1 = implode(',',$idsArr);
            //缓存过期或者缓存的话题id与推荐位的id不一致的时候需要更新缓存
            if( !$topicDynamic || $idsStr1 != $topicDynamic['idsStr'] ){
                $topicDynamicData =  D('Services/TopicChannel')->topicStatistic($idsArr);
                $topicDynamic = array('idsStr'=>$idsStr1,'data'=>$topicDynamicData);
                S('gome_drinksTopic_dynamic',$topicDynamic,300);
            }

            //动态数据缓存
            $recommendDynamic = S('gome_drinksGroup_dynamic');
            $idsArr = [];
            foreach ( $list['interestGroup']['interestGroups'] as $k=>$v){
                $idsArr[] = $v['group_id'];
            }
            $idsStr2 = implode(',',$idsArr);
            //缓存过期或者缓存的话题id与推荐位的id不一致的时候需要更新缓存
            if( !$recommendDynamic || $idsStr2 != $recommendDynamic['idsStr'] ){

                $recommendDynamicData =  D('Services/Groups')->groupStatistics($idsArr,1,1,0);
                $recommendDynamic = array('idsStr'=>$idsStr2,'data'=>$recommendDynamicData);
                S('gome_drinksGroup_dynamic',$recommendDynamic ,300);
            }



            $this->assign('topicArr',$list['drinksClub']);
            $this->assign('topicDynamicArr',$topicDynamic['data']);

            $this->assign('groupArr',$list['interestGroup']);
            $this->assign('groupDynamicArr',$recommendDynamic['data']);
            
            $data['data'] = $this->fetch('Index/alcoholDrinksTopic');
            $this->ajaxSuccess($data,'jsonp');
        }else{
            $this->ajaxError('数据无法获取','jsonp');
        }

    }


    /*
     * 首页-热门话题
     */
   private function indexHotTopic(){
       $data = $this->commentData ;
       $list['hotTopic'] = $this->commendObj->getCmsList('gomeHotTopic');
       $list['topicRecommend'] = $this->commendObj->getCmsList('gomeInterestGroup');

       if($list['hotTopic'] && $list['topicRecommend'] && count($list['hotTopic']['hotTopics'])>=3 ){
           //动态数据缓存
           $hotTopicDynamic = S('gome_hotTopic_dynamic');
           $idsArr = [];
           foreach ( $list['hotTopic']['hotTopics'] as $k=>$v){
               $idsArr[] = $v['topic_id'];
           }
           $idsStr1 = implode(',',$idsArr);
           //缓存过期或者缓存的话题id与推荐位的id不一致的时候需要更新缓存
           if( !$hotTopicDynamic || $idsStr1 != $hotTopicDynamic['idsStr'] ){
               $hotTopicDynamicData =  D('Services/TopicChannel')->topicStatistic($idsArr);
               $hotTopicDynamic = array('idsStr'=>$idsStr1,'data'=>$hotTopicDynamicData);
               S('gome_hotTopic_dynamic',$hotTopicDynamic,300);
           }

           //动态数据缓存
           $topicRecommendDynamic = S('gome_topicRecommend_dynamic');
           $idsArr = [];
           foreach ( $list['topicRecommend']['interestGroups'] as $k=>$v){
               $idsArr[] = $v['group_id'];
           }
           $idsStr2 = implode(',',$idsArr);
           //缓存过期或者缓存的话题id与推荐位的id不一致的时候需要更新缓存
           if( !$topicRecommendDynamic || $idsStr2 != $topicRecommendDynamic['idsStr'] ){

               $topicRecommendDynamicData =  D('Services/Groups')->groupStatistics($idsArr,1,1,0);
               $topicRecommendDynamic = array('idsStr'=>$idsStr2,'data'=>$topicRecommendDynamicData);
               S('gome_topicRecommend_dynamic',$topicRecommendDynamic ,300);
           }
           $this->assign('hotArr',$list['hotTopic']);
           $this->assign('hotDynamicArr',$hotTopicDynamic['data']);
           $this->assign('topicDynamicArr',$topicRecommendDynamic['data']);
           $this->assign('topicArr',$list['topicRecommend']);
           $data['data'] = $this->fetch('Index/indexHotTopic');
           $this->ajaxSuccess($data,'jsonp');
       }else{
           $this->ajaxError('数据无法获取','jsonp');
       }


   }

   /*
    * 首页-品质生活
    */
   private function indexQualityLife(){
        $data = $this->commentData;
        $qualityLife = $this->commendObj->getCmsList('gomeQualitylife');
        if( $qualityLife['qualityLife'] && count($qualityLife['qualityLife'])>= 4 ){
            $this->assign('data',$qualityLife );
            $data['data'] = $this->fetch('Index/indexQualityLife');
            $this->ajaxSuccess($data,'jsonp');
        }else{
            $this->ajaxError('数据无法获取','jsonp');
        }
   }



   /*
    *首页-主题推荐
    */
   private function indexTopicRecommend(){
       $data = $this->commentData;
       $topicRecommend = $this->commendObj->getCmsList('gomeTopicRecommend');

       if( $topicRecommend['topicRecommend'] && count($topicRecommend['topicRecommend'])>=4 ){
           $this->assign('data',$topicRecommend);
           $data['data'] = $this->fetch('Index/indexTopicRecommend');
           $this->ajaxSuccess($data,'jsonp');
       }else{
           $this->ajaxError('数据无法获取','jsonp');
       }
   }
   /*
    *服装城-热门推荐
    *
    */
    private function clothingRecommend(){
        $data = $this->commentData;
        $clothingRecommend = $this->commendObj->getCmsList('fashionHotRecommend');
        if( $clothingRecommend['hotRecommend'] && count($clothingRecommend['hotRecommend'])>=4 ){
            $this->assign('data',$clothingRecommend);
            $data['data'] = $this->fetch('Index/clothingRecommend');
            $this->ajaxSuccess($data,'jsonp');
        }else{
            $this->ajaxError('数据无法获取','jsonp');
        }
    }
    /*
     *超市-精彩圈子
     */
    private function marketGroup(){
        $data = $this->commentData ;
        $marketWonderfulGroup = $this->commendObj->getCmsList('marketWonderfulGroup');
        if( $marketWonderfulGroup['wonderfulGroups'] && count($marketWonderfulGroup['wonderfulGroups'])>=4 ){

            $marketGroupDynamic = S('market_wonderfulGroup_dynamic');
            $idsArr = [];
            foreach ( $marketWonderfulGroup['wonderfulGroups'] as $k=>$v){
                $idsArr[] = $v['group_id'];
            }
            $idsStr = implode(',',$idsArr);
            //缓存过期或者缓存的话题id与推荐位的id不一致的时候需要更新缓存
            if( !$marketGroupDynamic || $idsStr != $marketGroupDynamic['idsStr'] ){
                $DynamicData =  D('Services/Groups')->groupStatistics($idsArr,1,1,0);
                $marketGroupDynamic = array('idsStr'=>$idsStr,'data'=>$DynamicData);
                S('market_wonderfulGroup_dynamic',$marketGroupDynamic ,300);
            }

            $this->assign('data',$marketWonderfulGroup);
            $this->assign('DynamicArr',$marketGroupDynamic['data']);
            $data['data'] = $this->fetch('Index/marketWonderfulGroup');
            $this->ajaxSuccess($data,'jsonp');

        }else{
            $this->ajaxError('数据无法获取','jsonp');
        }
    }
    /*
     *团抢频道页-精彩话题
     */
    private function grouponTopic(){
        $data = $this->commentData ;
        $tuanWonderfulTopic = $this->commendObj->getCmsList('tuanWonderfulTopic');
        if( $tuanWonderfulTopic['wonderfulTopics'] && count($tuanWonderfulTopic['wonderfulTopics']) >=12 ){

            //动态数据缓存
            $tuanWonderfulDynamic = S('tuan_wonderfulTopic_dynamic');
            $idsArr = [];
            foreach ( $tuanWonderfulTopic['wonderfulTopics'] as $k=>$v){
                $idsArr[] = $v['topic_id'];
            }
            $idsStr = implode(',',$idsArr);
            //缓存过期或者缓存的话题id与推荐位的id不一致的时候需要更新缓存
            if( !$tuanWonderfulDynamic || $idsStr != $tuanWonderfulDynamic['idsStr'] ){
                $DynamicData =  D('Services/TopicChannel')->topicStatistic($idsArr);
                $tuanWonderfulDynamic = array('idsStr'=>$idsStr,'data'=>$DynamicData);
                S('tuan_wonderfulTopic_dynamic',$tuanWonderfulDynamic,300);
            }

            $this->assign('data',$tuanWonderfulTopic);
            $this->assign('dynamicArr',$tuanWonderfulDynamic['data']);
            $data['data'] = $this->fetch('Index/grouponTopic');
            $this->ajaxSuccess($data,'jsonp');
        }else{
            $this->ajaxError('数据无法获取','jsonp');
        }
    }

    /*
     * 汽车首页-精彩圈子
     */
    private function carGroup(){
        $data = $this->commentData ;
        $carGroupRecommend = $this->commendObj->getCmsList('carGroupRecommend');
        if( $carGroupRecommend['wonderfulGroups'] && count($carGroupRecommend['wonderfulGroups']) >=4 ){

            $carGroupDynamic = S('car_wonderfulGroup_dynamic');
            $idsArr = [];
            foreach ( $carGroupRecommend['wonderfulGroups'] as $k=>$v){
                $idsArr[] = $v['group_id'];
            }
            $idsStr = implode(',',$idsArr);
            //缓存过期或者缓存的话题id与推荐位的id不一致的时候需要更新缓存
            if( !$carGroupDynamic || $idsStr != $carGroupDynamic['idsStr'] ){
                $DynamicData =  D('Services/Groups')->groupStatistics($idsArr,1,1,0);
                $carGroupDynamic = array('idsStr'=>$idsStr,'data'=>$DynamicData);
                S('car_wonderfulGroup_dynamic',$carGroupDynamic ,300);
            }

            $this->assign('data',$carGroupRecommend);
            $this->assign('DynamicArr',$carGroupDynamic['data']);
            $data['data'] = $this->fetch('Index/carGroup');
            $this->ajaxSuccess($data,'jsonp');
        }else{
            $this->ajaxError('数据无法获取','jsonp');
        }
    }

	/**
	 * 家装城-热门话题+兴趣圈子
	 */
	private function homeTopic(){
		$data = $this->commentData;
        $homesHotTopics = $this->commendObj->getCmsList('homesHotTopic');
        $homesInterestGroup = $this->commendObj->getCmsList('homesInterestGroup');

		if($homesHotTopics && $homesInterestGroup){
			//判断CMS数据条数是否准确
			$countNum = 3;
			$homesHotTopics['hotTopics'] = array_slice($homesHotTopics['hotTopics'], 0, $countNum);
			$homesInterestGroup['interestGroups'] = array_slice($homesInterestGroup['interestGroups'], 0, $countNum);
			if(count($homesHotTopics['hotTopics']) < $countNum || count($homesInterestGroup['interestGroups']) < $countNum){
				$this->ajaxError('数据无法获取','jsonp');
			}

			//获取话题对应的点赞量+评论量
			$tidArr = array();
			foreach($homesHotTopics['hotTopics'] as $val){
				$tidArr[] = $val['topic_id'];
			}
			$topicNumArr = D('Services/TopicChannel')->topicStatistic($tidArr, 1, 1, 0);
			foreach($homesHotTopics['hotTopics'] as &$val){
				$val['likeQuantity'] = $topicNumArr[$val['topic_id']]['likeQuantity'];
				$val['replyQuantity'] = $topicNumArr[$val['topic_id']]['replyQuantity'];
				unset($val);
			}

			//获取圈子对应的成员数+话题数
			$gidArr = array();
			foreach($homesInterestGroup['interestGroups'] as $val){
				$gidArr[] = $val['group_id'];
			}
			$groupNumArr = D('Services/Groups')->groupStatistics($gidArr, 1, 1);
			$countNum = 3;
			foreach($homesInterestGroup['interestGroups'] as &$val){
				$val['memberQuantity'] = $groupNumArr[$val['group_id']]['memberQuantity'];
				$val['topicQuantity'] = $groupNumArr[$val['group_id']]['topicQuantity'];
				$val['topics'] = array_slice($val['topics'], 0, $countNum);
				unset($val);
			}

			$this->assign('homesHotTopics',$homesHotTopics['hotTopics']);
			$this->assign('homesTopicSlot',$homesHotTopics['slot']);
			$this->assign('homesInterestGroup',$homesInterestGroup['interestGroups']);
			$this->assign('homesGroupSlot',$homesInterestGroup['slot']);
			$data['data'] = $this->fetch('Index/homesIndex');
            $this->ajaxSuccess($data,'jsonp');
		}else{
            $this->ajaxError('数据无法获取','jsonp');
		}

	}

	/**
	 * 今日特卖-必买清单
	 */
	private function saleBuylist(){
		$data = $this->commentData;
        $saleBuyList = $this->commendObj->getCmsList('saleBuyList');
		if($saleBuyList){
			//判断CMS数据条数是否准确
			$countNum = 2;
			$saleBuyList['buyList'] = array_slice($saleBuyList['buyList'], 0, $countNum);
			if(count($saleBuyList['buyList']) < $countNum){
				$this->ajaxError('数据无法获取','jsonp');
			}

			//获取话题对应的点赞量+评论量
			$tidArr = array();
			foreach($saleBuyList['buyList'] as $val){
				$tidArr[] = $val['topic_id'];
			}
			$topicNumArr = D('Services/TopicChannel')->topicStatistic($tidArr, 1, 1, 0);
			//截取话题里的商品条数
			$countNum = 3;
			foreach($saleBuyList['buyList'] as &$val){
				$val['likeQuantity'] = $topicNumArr[$val['topic_id']]['likeQuantity'];
				$val['replyQuantity'] = $topicNumArr[$val['topic_id']]['replyQuantity'];
				$val['user_nickname_slice'] = msubstr($val['user_nickname'], 0, 8, C('DEFAULT_CHARSET'), false);
				$val['group_name_slice'] = msubstr($val['group_name'], 0, 8, C('DEFAULT_CHARSET'), false);
				$val['cmsComponents'] = array_slice($val['cmsComponents'], 0, $countNum);
				unset($val);
			}

			$this->assign('saleBuyList',$saleBuyList['buyList']);
			$this->assign('saleSlot',$saleBuyList['slot']);
			$data['data'] = $this->fetch('Index/todayBuyList');
			$this->ajaxSuccess($data,'jsonp');
		}else{
			$this->ajaxError('数据无法获取','jsonp');
		}
	}

	/**
	 * 新品抢先--热门话题+兴趣圈子
	 */
	private function forestallTopic(){
		$data = $this->commentData;
        $newHotTopic = $this->commendObj->getCmsList('newHotTopic');
        $newInterestGroup = $this->commendObj->getCmsList('newInterestGroup');

		if($newHotTopic && $newInterestGroup){
			//判断CMS数据条数是否准确
			$countNum = 3;
			$newHotTopic['hotTopics'] = array_slice($newHotTopic['hotTopics'], 0, $countNum);
			$newInterestGroup['interestGroups'] = array_slice($newInterestGroup['interestGroups'], 0, $countNum);
			if(count($newHotTopic['hotTopics']) < $countNum || count($newInterestGroup['interestGroups']) < $countNum){
				$this->ajaxError('数据无法获取','jsonp');
			}

			//获取话题对应的点赞量+评论量
			$tidArr = array();
			foreach($newHotTopic['hotTopics'] as $val){
				$tidArr[] = $val['topic_id'];
			}
			$topicNumArr = D('Services/TopicChannel')->topicStatistic($tidArr, 1, 1, 0);
			foreach($newHotTopic['hotTopics'] as &$val){
				$val['likeQuantity'] = $topicNumArr[$val['topic_id']]['likeQuantity'];
				$val['replyQuantity'] = $topicNumArr[$val['topic_id']]['replyQuantity'];
				unset($val);
			}

			//获取圈子对应的成员数+话题数
			$gidArr = array();
			foreach($newInterestGroup['interestGroups'] as $val){
				$gidArr[] = $val['group_id'];
			}
			$groupNumArr = D('Services/Groups')->groupStatistics($gidArr, 1, 1);
			$countNum = 3;
			foreach($newInterestGroup['interestGroups'] as &$val){
				$val['memberQuantity'] = $groupNumArr[$val['group_id']]['memberQuantity'];
				$val['topicQuantity'] = $groupNumArr[$val['group_id']]['topicQuantity'];
				$val['topics'] = array_slice($val['topics'], 0, $countNum);
				unset($val);
			}

			$this->assign('newHotTopic',$newHotTopic['hotTopics']);
			$this->assign('newTopicSlot',$newHotTopic['slot']);
			$this->assign('newInterestGroup',$newInterestGroup['interestGroups']);
			$this->assign('newGroupSlot',$newInterestGroup['slot']);
			$data['data'] = $this->fetch('Index/newIndex');
            $this->ajaxSuccess($data,'jsonp');
		}else{
            $this->ajaxError('数据无法获取','jsonp');
		}
	}


	/**
	 * 用户中心首页：不断寻觅+发布的话题+收藏的话题
	 */
	private function mygomeTopic()
	{
		if(!empty($_GET['flag']))
		{
			$action = trim($_GET['flag']);
			$this->$action();
		}
		else
		{
			$this->feed();
		}
	}

	/**
	 * 不断寻觅
	 */
	private function feed()
	{
		$pageNum = I('pageNum', 1, 'intval');
		$pageSize = I('pageSize', self::PAGE_SIZE_MAX, 'intval');
		$userId = $this->userId;

		if($pageNum > self::PAGE_NUM_MAX)
		{
			$pageNum = self::PAGE_NUM_MAX;
		}

		if($pageSize > self::PAGE_SIZE_MAX)
		{
			$pageSize = self::PAGE_SIZE_MAX;
		}

		$topic = D('Services/TopicChannel');

		$res = $topic->feed($pageNum, $pageSize, $userId);

		$dealRes = array();
		if($res['success'])
		{
			foreach($res['data']['feedTopics'] as &$val)
			{
				//话题图片
				$imageShow = '';
				if(!empty($val['newComponents']['image']))
				{
					$imageShow =  getResizeImg($val['newComponents']['image'][0]['url'], 230, 0, 'MEIXIN');
				}

				if(!empty($imageShow))
				{
					$val['imageShow'] = $imageShow;
				}
				else
				{
					$val['imageShow'] = '';
				}

				//商品信息
				$itemArr = array();
				if(!empty($val['newComponents']['item']))
				{
					$itemArr = array_slice($val['newComponents']['item'], 0, 5);
					foreach($itemArr as &$itemVal)
					{
						$itemVal['url'] = getResizeImg($itemVal['url'], 60, 60, 'ONLINE');
						$itemVal['itemDetailUrl'] = productDetailUrlGen($itemVal['shopId'], $itemVal['item']['id']);
						$itemVal['item']['orgName'] = $itemVal['item']['name'];
						$itemVal['item']['name'] = msubstr($itemVal['item']['name'], 0, self::GOODS_TITLE_MAX, C('DEFAULT_CHARSET'));
						$itemVal['item']['salePrice'] = !empty($itemVal['item']['salePrice']) ? convert_price($itemVal['item']['salePrice']) : '暂无售价';
						unset($itemVal);
					}
				}
				$val['itemShow'] = $itemArr;

				//话题描述
				if(!empty($val['newComponents']['text']))
				{
					$val['orgText'] = $val['newComponents']['text'];
					$val['textShow'] = msubstr($val['newComponents']['text'], 0, self::TOPIC_TEXT_MAX, C('DEFAULT_CHARSET'));
					$val['textShow'] = string_parse_face($val['textShow'], 22);
				}
				else
				{
					$val['orgText'] = '';
					$val['textShow'] = '';
				}

				//话题标题
				if(!empty($val['name']))
				{
					$val['orgName'] = $val['name'];
					$val['nameShow'] = msubstr($val['name'], 0, self::TOPIC_TITLE_MAX, C('DEFAULT_CHARSET'));
				}
				else
				{
					$val['orgName'] = '';
					$val['nameShow'] = '';
				}

				//话题评论数
				$val['replyShow'] = $val['replyQuantity'] + $val['subReplyQuantity'];

				//话题详情页链接
				$val['topicDetailUrl'] = topicDetailUrlGen($val['id']);

				unset($val);
			}
			$dealRes = $this->formatTopicData($res['data']['feedTopics'], 'feed');
		}

		//拼装前端所需参数
		$res['data'] = $this->commentData;
		$res['data']['data'] = $dealRes;

		$this->ajaxReturn($res, 'jsonp');
	}

	/**
	 * 发布的话题
	 */
	private function publishedTopic()
	{
		$pageNum = I('pageNum', 1, 'intval');
		$pageSize = I('pageSize', self::PAGE_SIZE_MAX, 'intval');
		$userId = $this->userId;

		if($pageNum > self::PAGE_NUM_MAX)
		{
			$pageNum = self::PAGE_NUM_MAX;
		}

		if($pageSize > self::PAGE_SIZE_MAX)
		{
			$pageSize = self::PAGE_SIZE_MAX;
		}

		$topic = D('Services/TopicChannel');

		$res = $topic->publishedTopic($pageNum, $pageSize, $userId);

		$dealRes = array();
		if($res['success'])
		{
			foreach($res['data']['topics'] as &$val)
			{
				//话题图片
				$imageShow = '';
				if(!empty($val['newComponents']['image']))
				{
					$imageShow =  getResizeImg($val['newComponents']['image'][0]['url'], 230, 0, 'MEIXIN');
				}

				if(!empty($imageShow))
				{
					$val['imageShow'] = $imageShow;
				}
				else
				{
					$val['imageShow'] = '';
				}

				//商品信息
				$itemArr = array();
				if(!empty($val['newComponents']['item']))
				{
					$itemArr = array_slice($val['newComponents']['item'], 0, 5);
					foreach($itemArr as &$itemVal)
					{
						$itemVal['url'] = getResizeImg($itemVal['url'], 60, 60, 'ONLINE');
						$itemVal['itemDetailUrl'] = productDetailUrlGen($itemVal['shopId'], $itemVal['item']['id']);
						$itemVal['item']['orgName'] = $itemVal['item']['name'];
						$itemVal['item']['name'] = msubstr($itemVal['item']['name'], 0, self::GOODS_TITLE_MAX, C('DEFAULT_CHARSET'));
						$itemVal['item']['salePrice'] = !empty($itemVal['item']['salePrice']) ? convert_price($itemVal['item']['salePrice']) : '暂无售价';
						unset($itemVal);
					}
				}
				$val['itemShow'] = $itemArr;

				//话题描述
				if(!empty($val['newComponents']['text']))
				{
					$val['orgText'] = $val['newComponents']['text'];
					$val['textShow'] = msubstr($val['newComponents']['text'], 0, self::TOPIC_TEXT_MAX, C('DEFAULT_CHARSET'));
					$val['textShow'] = string_parse_face($val['textShow'], 22);
				}
				else
				{
					$val['orgText'] = '';
					$val['textShow'] = '';
				}

				//话题标题
				if(!empty($val['name']))
				{
					$val['orgName'] = $val['name'];
					$val['nameShow'] = msubstr($val['name'], 0, self::TOPIC_TITLE_MAX, C('DEFAULT_CHARSET'));
				}
				else
				{
					$val['orgName'] = '';
					$val['nameShow'] = '';
				}

				//话题评论数
				$val['replyShow'] = $val['replyQuantity'] + $val['subReplyQuantity'];

				//话题详情页链接
				$val['topicDetailUrl'] = topicDetailUrlGen($val['id']);

				unset($val);
			}
			$dealRes = $this->formatTopicData($res['data']['topics'], 'published');
		}

		//拼装前端所需参数
		$res['data'] = $this->commentData;
		$res['data']['data'] = $dealRes;

		$this->ajaxReturn($res, 'jsonp');
	}

	/**
	 * 收藏的话题
	 */
	private function collectedTopic()
	{
		$pageNum = I('pageNum', 1, 'intval');
		$pageSize = I('pageSize', self::PAGE_SIZE_MAX, 'intval');
		$userId = $this->userId;

		if($pageNum > self::PAGE_NUM_MAX)
		{
			$pageNum = self::PAGE_NUM_MAX;
		}

		if($pageSize > self::PAGE_SIZE_MAX)
		{
			$pageSize = self::PAGE_SIZE_MAX;
		}

		$topic = D('Services/TopicChannel');

		$res = $topic->collectedTopic($pageNum, $pageSize, $userId);

		$dealRes = array();
		if($res['success'])
		{
			foreach($res['data']['collections'] as &$val)
			{
				//话题图片
				$imageShow = '';
				if(!empty($val['topic']['newComponents']['image']))
				{
					$imageShow =  getResizeImg($val['topic']['newComponents']['image'][0]['url'], 230, 0, MEIXIN);
				}

				if(!empty($imageShow))
				{
					$val['imageShow'] = $imageShow;
				}
				else
				{
					$val['imageShow'] = '';
				}

				//商品信息
				$itemArr = array();
				if(!empty($val['topic']['newComponents']['item']))
				{
					$itemArr = array_slice($val['topic']['newComponents']['item'], 0, 5);
					foreach($itemArr as &$itemVal)
					{
						$itemVal['url'] = getResizeImg($itemVal['url'], 60, 60, 'ONLINE');
						$itemVal['itemDetailUrl'] = productDetailUrlGen($itemVal['shopId'], $itemVal['item']['id']);
						$itemVal['item']['orgName'] = $itemVal['item']['name'];
						$itemVal['item']['name'] = msubstr($itemVal['item']['name'], 0, self::GOODS_TITLE_MAX, C('DEFAULT_CHARSET'));
						$itemVal['item']['salePrice'] = !empty($itemVal['item']['salePrice']) ? convert_price($itemVal['item']['salePrice']) : '暂无售价';
						unset($itemVal);
					}
				}
				$val['itemShow'] = $itemArr;

				//话题描述
				if(!empty($val['topic']['newComponents']['text']))
				{
					$val['orgText'] = $val['topic']['newComponents']['text'];
					$val['textShow'] = msubstr($val['topic']['newComponents']['text'], 0, self::TOPIC_TEXT_MAX, C('DEFAULT_CHARSET'));
					$val['textShow'] = string_parse_face($val['textShow'], 22);
				}
				else
				{
					$val['orgText'] = '';
					$val['textShow'] = '';
				}

				//话题标题
				if(!empty($val['topic']['name']))
				{
					$val['orgName'] = $val['topic']['name'];
					$val['nameShow'] = msubstr($val['topic']['name'], 0, self::TOPIC_TITLE_MAX, C('DEFAULT_CHARSET'));
				}
				else
				{
					$val['orgName'] = '';
					$val['nameShow'] = '';
				}

				//话题评论数
				$val['replyShow'] = $val['topic']['replyQuantity'] + $val['topic']['subReplyQuantity'];

				//话题详情页链接
				$val['topicDetailUrl'] = topicDetailUrlGen($val['topicId']);

				unset($val);
			}
			$dealRes = $this->formatTopicData($res['data']['collections'], 'collected');
		}

		//拼装前端所需参数
		$res['data'] = $this->commentData;
		$res['data']['data'] = $dealRes;

		$this->ajaxReturn($res, 'jsonp');
	}

	/**
	 * 格式化返回数据
	 * @param $topicArr 话题数组
	 * @param $dataType 数据类型
	 * detail：
	 * feed：不断寻觅
	 * published：发布的话题
	 * collected：收藏的话题
	 * @return array
	 */
	private function formatTopicData($topicArr, $dataType)
	{
		if(empty($topicArr))
		{
			return $topicArr;
		}

		$returnArr = array();
		switch($dataType)
		{
			case 'feed':
				foreach($topicArr as $val)
				{
					$tempArr = array();
					$tempArr['likeQuantity'] = $val['like']['userQuantity'];
					$tempArr['imageShow'] = $val['imageShow'];
					$tempArr['itemShow'] = $val['itemShow'];
					$tempArr['orgText'] = $val['orgText'];
					$tempArr['textShow'] = $val['textShow'];
					$tempArr['orgName'] = $val['orgName'];
					$tempArr['nameShow'] = $val['nameShow'];
					$tempArr['replyShow'] = $val['replyShow'];
					$tempArr['topicDetailUrl'] = $val['topicDetailUrl'];
					$returnArr['topics'][] = $tempArr;
				}
				break;
			case 'published':
				foreach($topicArr as $val)
				{
					$tempArr = array();
					$tempArr['likeQuantity'] = $val['like']['userQuantity'];
					$tempArr['imageShow'] = $val['imageShow'];
					$tempArr['itemShow'] = $val['itemShow'];
					$tempArr['orgText'] = $val['orgText'];
					$tempArr['textShow'] = $val['textShow'];
					$tempArr['orgName'] = $val['orgName'];
					$tempArr['nameShow'] = $val['nameShow'];
					$tempArr['replyShow'] = $val['replyShow'];
					$tempArr['topicDetailUrl'] = $val['topicDetailUrl'];
					$returnArr['topics'][] = $tempArr;
				}
				break;
			case 'collected':
				foreach($topicArr as $val)
				{
					$tempArr = array();
					$tempArr['likeQuantity'] = $val['topic']['like']['userQuantity'];
					$tempArr['imageShow'] = $val['imageShow'];
					$tempArr['itemShow'] = $val['itemShow'];
					$tempArr['orgText'] = $val['orgText'];
					$tempArr['textShow'] = $val['textShow'];
					$tempArr['orgName'] = $val['orgName'];
					$tempArr['nameShow'] = $val['nameShow'];
					$tempArr['replyShow'] = $val['replyShow'];
					$tempArr['topicDetailUrl'] = $val['topicDetailUrl'];
					$returnArr['topics'][] = $tempArr;
				}
				break;
		}

		$returnArr['createTopicUrl'] = $this->mx_domain['group'].'topic/publiser';
		$returnArr['homeUrl'] = $this->mx_domain['group'];
		$returnArr['publishedTopicUrl'] = $this->mx_domain['i'].'topic/published';
		$returnArr['collectedTopicUrl'] = $this->mx_domain['i'].'topic/collected';

		return $returnArr;
	}


	/**
	 * 精彩圈子
	 */
	private function mygomeGroup(){

		$data = $this->commentData ;

		//获取精彩圈子
		$recGroup = D('Services/Circle')->groupRecommend();

		//获取我的圈子
		$myGroup = D('Services/Circle')->getMyRelatedGroups();

		//print_r($recGroup);die;
		//print_r($myGroup);die;

		if($recGroup['code'] == 200){

			$myhome_url = APP_HTTP.C('UCENTER_URL');
			//热门圈子默认10个
			$recGroup['data']['groups'] = array_slice($recGroup['data']['groups'], 0,10);
			$myGroup['imember'] = array_slice($myGroup['imember'], 0,17);
			$this->assign('recGroup',$recGroup['data']);
			$this->assign('myGroup',$myGroup);
			$this->assign('myhome_url',$myhome_url);
			$data['data'] = $this->fetch('Circle/myGroup');
			$this->ajaxSuccess($data,'jsonp');
		}else{
			$this->ajaxError('数据无法获取','jsonp');
		}

	}

	public function upData(){
        $key = I('param.unique_key','','trim');
        S('cms_channel_'.$key, NULL );
    }
}