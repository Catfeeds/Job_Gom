<?php

/*
* +----------------------------------------------------------------------+
* | Copyright (c) 美信 - 信息技术中心                                    |
* +----------------------------------------------------------------------+
* | All rights reserved.                                                 |
* +----------------------------------------------------------------------+
* | @程序名称：ProductController.class1.php                              |
* +----------------------------------------------------------------------+
* | @程序功能：商品详情页                                                |
* +----------------------------------------------------------------------+
* | Author:liuchao <liuchao@gomeplus.com>                                |
* +----------------------------------------------------------------------+
* | Date: 2016/5/20-15:08                                                |
* +----------------------------------------------------------------------+
*/

namespace Mall\Controller;
use Home\Controller\BaseController;

class ActController extends BaseController
{
	/**
	 * 暖心活动专题
	 */
	public function AxFPbR1N9Byk(){
		$active_no = session('active_no') ? session('active_no') : '';
		$this->assign('active_no',$active_no);
		$this->assign('active_id',session('active_id'));
		$this->display('Act/warmth');
	}

	/**
	 * winterfood
	 */
    public function YKMC3GPD8H3K(){
		$active_no = session('active_no') ? session('active_no') : '';
		$this->assign('active_id',session('active_id'));
		$this->assign('active_no',$active_no);
		$this->display('Act/winter');
	}

	/*
	 * 会玩的人在一起
	 * */
	public function TQGSS06UK5MB() {

		$active_no = session('active_no') ? session('active_no') : '';
		$this->assign('active_id',session('active_id'));
		$this->assign('active_no',$active_no);
		$this->display('Act/playtogether');
	}
    
    /*
	 * 品质生活
	 * */
	public function GNGWEZBN1ALR(){
		$active_no = session('active_no') ? session('active_no') : '';
		$this->assign('active_id',session('active_id'));
		$this->assign('active_no',$active_no);
		$this->display('Act/life');
	}

    /*
	 * 年度轰趴
	 * */
	public function QXIJI81ZNLUE(){
		$active_no = session('active_no') ? session('active_no') : '';
		$this->assign('active_id',session('active_id'));
		$this->assign('active_no',$active_no);
		$this->display('Act/food');
	}
	
	public function CXE0GUWPEOTN(){
	    $active_no = session('active_no') ? session('active_no') : '';
// 	    echo strtolower('CXE0GUWPEOTN');exit;
	    $data = A('Api')->getData();
	    $prizeList = A('Api')->getPrizeData();
// 	    print_r($data);exit;
	    $this->assign('active_id',session('active_id'));
	    $this->assign('active_no',$active_no);
	    $this->assign('data',$data);
	    $this->assign('prizeList',$prizeList);
	    $this->display('Act/coupon');
	}
	/*
	 *  全城Share爱
	 */
	public function L4FOE2VGEET(){
	        $active_no = session('active_no') ? session('active_no') : '';
	        $this->assign('active_id',session('active_id'));
	        $this->assign('active_no',$active_no);
	        $this->display('Act/sharelove');
	    }
}
