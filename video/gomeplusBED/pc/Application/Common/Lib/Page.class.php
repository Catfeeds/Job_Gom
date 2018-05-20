<?php
/*
* +----------------------------------------------------------------------+
* | Copyright (c) 美信 - 信息技术中心                                      |
* +----------------------------------------------------------------------+
* | All rights reserved.                                                 |
* +----------------------------------------------------------------------+
* | @程序名称：ProductController.class1.php                                      |
* +----------------------------------------------------------------------+
* | @程序功能：通用分页类                                                |
* +----------------------------------------------------------------------+
* | Author:liuchao <liuchao@gomeplus.com>                                |
* +----------------------------------------------------------------------+
* | Date: 2016/5/25 18:18                                                |
* +----------------------------------------------------------------------+
*/
namespace Common\Lib;
class Page{
	//显示页数数量
	public $page_show_row = 5;
	public $page_offset = 2;
	public $show_more = true;
	public $show_style = 1;
	public $delimiter = '_';
	public $params = ['first_label'=>'','last_label'=>''];

	/**
	 * 分页函数 样式如： <上一页 1... 2 3 4 5...total 下一页>
	 * @param $num 总数量
	 * @param $perpage 每页显示
	 * @param $curr_page 当前页码
	 * @param $mpurl url 页面跳转url
	 * @param $ajax_func ajax调用方法 eg:"onclick='get_comment(this);return false;'"
	 * @return string
	 */
	public function multiPage($num, $perpage, $curr_page, $mpurl = '',$ajax_func)
	{
		$curr_page = (int)$curr_page;
		$curr_page = ($curr_page === 0) ? 1: $curr_page;
		$multipage = '';
		//url处理
		if($mpurl == '') {
			$mpurl = $_SERVER['PHP_SELF'];
		}
		$join_str = "?";
		if(strpos($mpurl, "?") !== false) {
			$join_str = "&";
		}

		if($num > $perpage) {
			$page = $this->page_show_row;
			//显示偏移
			$offset = $this->page_offset;
			$pages = ceil($num / $perpage);
			$from = $curr_page - $offset;
			$to = $curr_page + $page - $offset - 1;
			if($page > $pages) {
				$from = 1;
				$to = $pages;
			} else {
				if($from < 1) {
					$to = $curr_page + 1 - $from;
					$from = 1;
					if(( $to - $from ) < $page && ( $to - $from ) < $pages) {
						$to = $page;
					}
				} elseif($to > $pages) {
					$from = $curr_page - $pages + $to;
					$to = $pages;
					if(( $to - $from ) < $page && ( $to - $from ) < $pages) {
						$from = $pages - $page + 1;
					}
				}
			}

			//上一页
			if($curr_page != 1) {
				$t = $curr_page - 1;
				$multipage .= " <a ".$ajax_func." href =\"" . $mpurl . $join_str . "page=" . $t . "\" class='pageup' href='javascript:void(0)' title='上一页' ><em></em>上一页</a> ";
			} else {
				$multipage .= ' <a class="pageup pageup-dis disabled" href="javascript:void(0)" title="上一页"><em></em>上一页</a> ';
			}

			//第一页
			if($from > 1) {
				$multipage .= " <a ".$ajax_func." href =\"" . $mpurl . $join_str . "page=1\" >1</a> ";
				$multipage .= ' <span>…</span>';
			}

			//中间
			for($i = $from; $i <= $to; $i++) {
				if($i != $curr_page) {
					$multipage .= " <a ".$ajax_func." href=\"" . $mpurl . $join_str . "page=" . $i . "\">" . $i . "</a> ";
				} else {
					$multipage .= ' <a class="current" href="javascript:void(0);">' . $i . '</a> ';
				}
			}

			//...总页数显示
			if(($pages>$this->page_show_row) && ($curr_page+3 < $pages)&&($pages!=6)){
				$multipage .= ' <span>…</span>';
				$multipage .= " <a ".$ajax_func." href =\"" . $mpurl . $join_str . "page=". $pages . "\">".$pages."</a> ";
			}elseif(($pages>$this->page_show_row) && ($curr_page+2 < $pages)){
				$multipage .= " <a ".$ajax_func." href =\"" . $mpurl . $join_str . "page=". $pages . "\">".$pages."</a> ";
			}

			//下一页
			if($curr_page != $pages) {
				$t = $curr_page + 1;
				$multipage .= " <a ".$ajax_func." href =\"" . $mpurl . $join_str . "page=" . $t . "\" class='pagedown' title='下一页'>下一页<em></em></a> ";
			} else {
				$multipage .= ' <a class="pagedown pagedown-dis disabled" href="javascript:void(0);" title="下一页">下一页<em></em></a> ';

			}
		}
		return $multipage;
	}


	/**
	 * 分页函数 样式如： <上一页 1... 2 3 4 5...total 下一页>
	 * @param $num 总数量
	 * @param $perpage 每页显示
	 * @param $curr_page 当前页码
	 * @param $mpurl url 页面跳转url
	 * @param string $join_str ?附加参数
	 * @return string
	 */
	public function show($num, $perpage, $curr_page, $mpurl = '',$join_str='')
	{
		$curr_page = (int)$curr_page;
		$curr_page = ($curr_page === 0) ? 1: $curr_page;
		$multipage = '';
		//url处理
		if($mpurl == '') {
			$mpurl = $_SERVER['PHP_SELF'];
		}
		if($num > $perpage) {
			$page = $this->page_show_row;
			//显示偏移
			$offset = $this->page_offset;
			$pages = ceil($num / $perpage);
			$from = $curr_page - $offset;
			$to = $curr_page + $page - $offset - 1;
			if($page > $pages) {
				$from = 1;
				$to = $pages;
			} else {
				if($from < 1) {
					$to = $curr_page + 1 - $from;
					$from = 1;
					if(( $to - $from ) < $page && ( $to - $from ) < $pages) {
						$to = $page;
					}
				} elseif($to > $pages) {
					$from = $curr_page - $pages + $to;
					$to = $pages;
					if(( $to - $from ) < $page && ( $to - $from ) < $pages) {
						$from = $pages - $page + 1;
					}
				}
			}

            $tag = strrpos($mpurl .$join_str,'?') !== false ? '&' : '?';

			//上一页
			if($curr_page != 1) {
				$t = $curr_page - 1;
				$multipage .= " <a href =\"" . $mpurl .$join_str ."{$tag}page=" . $t .  "\" class='pageup'  title='上一页' ><em></em>上一页</a> ";
			} else {
				$multipage .= ' <a class="pageup pageup-dis disabled" href="javascript:void(0);" title="上一页"><em></em>上一页</a> ';
			}

			//第一页...
			if($from > 1) {
				$multipage .= " <a href =\"" . $mpurl .$join_str ."{$tag}page=1".  "\">1</a> ";
				$multipage .= ' <span>…</span>';
			}

			//中间
			for($i = $from; $i <= $to; $i++) {
				if($i != $curr_page) {
					$multipage .= " <a href=\"" . $mpurl . $join_str."{$tag}page=" . $i  . "\">" . $i . "</a> ";
				} else {
					$multipage .= ' <a class="active" href="javascript:void(0);">' . $i . '</a> ';
				}
			}

			//...总页数显示
			if(($pages>$this->page_show_row) && ($curr_page+3 < $pages)&&($pages!=6)){
				$multipage .= ' <span>…</span>';
				$multipage .= " <a  href=\"" . $mpurl .$join_str."&page=" . $pages  . "\">" . $pages . "</a> ";
			}elseif(($pages>$this->page_show_row) && ($curr_page+2 < $pages)){
				$multipage .= " <a  href=\"" . $mpurl .$join_str ."&page=" . $pages.   "\">" . $pages . "</a> ";
			}

			//下一页
			if($curr_page != $pages) {
				$t = $curr_page + 1;
				$multipage .= " <a href =\"" . $mpurl  .$join_str ."{$tag}page=" . $t.  "\" class='pagedown' title='下一页'>下一页<em></em></a> ";
			} else {
				$multipage .= ' <a class="pagedown pagedown-dis disabled" href="javascript:void(0)" title="下一页">下一页<em></em></a> ';

			}
		}
		return $multipage;
	}


	/**
	 * 分页函数
	 * @param $num 信息总数
	 * @param $curr_page 当前分页
	 * @param $perpage 每页显示数
	 * @param $urlrule URL规则
	 * @param $array 需要传递的数组，用于增加额外的方法
	 * @return 分页
	 */
	public function pages($num, $curr_page, $perpage = 20, $urlrule = '', $array = array(), $setpages = 10)
	{
		$perpage = intval($perpage);
		$perpage or $perpage = 20;
		if(defined('URLRULE') && $urlrule == '') {
			$urlrule = URLRULE;
			$array = $GLOBALS['URL_ARRAY'];
		} elseif($urlrule == '') {
			$urlrule = $this->url_par('page={$page}');
		}
		$multipage = '';
		if($num > $perpage) {
			$page = $setpages + 1;
			$offset = ceil($setpages / 2 - 1);
			$pages = ceil($num / $perpage);
			if(defined('IN_ADMIN') && !defined('PAGES'))
				define('PAGES', $pages);
			$from = $curr_page - $offset;
			$to = $curr_page + $offset;
			$more = 0;
			if($page >= $pages) {
				$from = 2;
				$to = $pages - 1;
			} else {
				if($from <= 1) {
					$to = $page - 1;
					$from = 2;
				} elseif($to >= $pages) {
					$from = $pages - ($page - 2);
					$to = $pages - 1;
				}
				$more = 1;
			}
			$multipage .= '<a class="a1">共' . $num . '条</a>';
			if($curr_page > 0) {
				
				if($curr_page == 1) {
				    $multipage .= ' <a class="a1 disabled" href="javascript:void(0);"><span>上一页</span></a>';
					$multipage .= ' <a class="current" href="javascript:void(0);"><span>1</span></a>';
				} elseif($curr_page > 6 && $more) {
				    $multipage .= ' <a href="' . $this->pageurl($urlrule, $curr_page - 1, $array) . '" class="a1">上一页</a>';
					$multipage .= ' <a href="' . $this->pageurl($urlrule, 1, $array) . '">1</a>..';
				} else {
				    $multipage .= ' <a href="' . $this->pageurl($urlrule, $curr_page - 1, $array) . '" class="a1">上一页</a>';
					$multipage .= ' <a href="' . $this->pageurl($urlrule, 1, $array) . '">1</a>';
				}
			}
			for($i = $from; $i <= $to; $i++) {
				if($i != $curr_page) {
					$multipage .= ' <a href="' . $this->pageurl($urlrule, $i, $array) . '">' . $i . '</a>';
				} else {
					$multipage .= ' <a class="current" href="javascript:void(0);"><span>' . $i . '</span></a>';
				}
			}
			if($curr_page < $pages) {
				if($curr_page < $pages - 5 && $more) {
					$multipage .= ' ..<a href="' . $this->pageurl($urlrule, $pages, $array) . '">' . $pages . '</a> <a href="' . $this->pageurl($urlrule, $curr_page + 1, $array) . '" class="a1">下一页</a>';
				} else {
					$multipage .= ' <a href="' . $this->pageurl($urlrule, $pages, $array) . '">' . $pages . '</a> <a href="' . $this->pageurl($urlrule, $curr_page + 1, $array) . '" class="a1">下一页</a>';
				}
			} elseif($curr_page == $pages) {
				$multipage .= ' <a class="current disabled" href="javascript:void(0);"><span>' . $pages . '</span></a> <a href="javascript:void(0);" class="a1">下一页</a>';
			} else {
				$multipage .= ' <a href="' . $this->pageurl($urlrule, $pages, $array) . '">' . $pages . '</a> <a href="' . $this->pageurl($urlrule, $curr_page + 1, $array) . '" class="a1">下一页</a>';
			}
		}
		return $multipage;
	}
	
	
	/**
	 * <1 ... 上一页 2 3 4 5 下一页 ... total>
	 * @param Int $curr_page
	 * @param String $mpurl
	 * @param String $join_str
	 * @param Int $from
	 * @param Int $to
	 * @param Int $pages
	 */
	public function display($num, $perpage, $curr_page, $mpurl = '',$join_param='',$url_extension=''){
	     
	    $curr_page = (int)$curr_page;
	    $curr_page = ($curr_page === 0) ? 1: $curr_page;
	    $multipage = '';
	    //url处理
	    if($mpurl == '') {
	        $mpurl = $_SERVER['PHP_SELF'];
	    }
// 	    $join = "?";
// 	    if(strpos($mpurl, "?") !== false) {
// 	        $join = "&";
// 	    }
	    $join_str = $mpurl.$join_param;
	    if($num > $perpage) {
	        $page = $this->page_show_row;
	        //显示偏移
	        $offset = $this->page_offset;
	        $pages = ceil($num / $perpage);
	        $from = $curr_page - $offset;
	        $to = $curr_page + $page - $offset - 1;
	        if($page > $pages) {
	            $from = 1;
	            $to = $pages;
	        } else {
	            if($from < 1) {
	                $to = $curr_page + 1 - $from;
	                $from = 1;
	                if(( $to - $from ) < $page && ( $to - $from ) < $pages) {
	                    $to = $page;
	                }
	            } elseif($to > $pages) {
	                $from = $curr_page - $pages + $to;
	                $to = $pages;
	                if(( $to - $from ) < $page && ( $to - $from ) < $pages) {
	                    $from = $pages - $page + 1;
	                }
	            }
	             
	        }
	        //第一页...
	        $fitst_label = (!empty($this->params['first_label'])) ? $this->params['first_label'] : 1;
	        if($from > 1) {
	            $params = explode('_', $join_param);
	            if(isset($params[0]) && $params[0] == 0){
	                $multipage .= " <a href =\"" . $mpurl  .$url_extension.  "\">$fitst_label</a> ";
	            }else{
	                $multipage .= " <a href =\"" . $join_str  .$url_extension.  "\">$fitst_label</a> ";
	            }
	            
	            $multipage .= ($this->show_more) ? ' <span>…</span>' : '';
	        }
	         
	        //上一页
	        if($curr_page != 1) {
	            $t = $curr_page - 1;
	            //如果前一页为第一页 需要将URL处理
	            if($t == 1){
	                $params = explode('_', $join_param);
	                if(isset($params[0]) && $params[0] == 0){
	                    $multipage .= " <a href =\"" . $mpurl   .  "$url_extension\" class='pageup'  title='上一页' ><em></em>上一页</a> ";
	                }else{
	                    $multipage .= " <a href =\"" . $join_str  .$this->delimiter . $t .  "$url_extension\" class='pageup'  title='上一页' ><em></em>上一页</a> ";
	                }
	            }else{
	               $multipage .= " <a href =\"" . $join_str  .$this->delimiter . $t .  "$url_extension\" class='pageup'  title='上一页' ><em></em>上一页</a> ";
	            }
	        } else {
	            $multipage .= " <a class='pageup pageup-dis disabled' href='javascript:void(0);' title='上一页'><em></em>上一页</a> ";
	        }
	         
	        //中间
	        for($i = $from; $i <= $to; $i++) {
	            if($i != $curr_page) {
	                if($i == 1){
	                   $params = explode('_', $join_param);
	                   if(isset($params[0]) && $params[0] == 0){
	                       $multipage .= " <a href=\"" . $mpurl . "$url_extension\">" . $i . "</a> ";
	                   }else{
    	                   $multipage .= " <a href=\"" . $join_str . "$url_extension\">" . $i . "</a> ";
	                   }
	                }else{
	                   $multipage .= " <a href=\"" . $join_str .$this->delimiter . $i  . "$url_extension\">" . $i . "</a> ";
	                }
                } else {
                    $multipage .= " <a class='active' href='javascript:void(0);'>" . $i . '</a> ';
	            }
	        }
	         
	        //下一页
	        if($curr_page != $pages) {
	            $t = $curr_page + 1;
	            $multipage .= " <a href =\"" . $join_str  .$this->delimiter . $t.  "$url_extension\" class='pagedown' title='下一页'>下一页<em></em></a> ";
	        } else {
	            $multipage .= " <a class='pagedown pagedown-dis disabled' href='javascript:void(0)' title='下一页'>下一页<em></em></a> ";
	        }
	         
	        //...总页数显示
	        $last_label = (!empty($this->params['last_label'])) ? $this->params['last_label'] : $pages;
	        if(($pages>$this->page_show_row) && ( ($curr_page+$this->page_offset+1) < $pages) && ( $pages != $this->page_show_row + 1 )){
	            $multipage .= ($this->show_more) ? ' <span>…</span>' : '';
	            $multipage .= " <a  href=\"" . $join_str .$this->delimiter . $pages  . "$url_extension\">" . $last_label . "</a> ";
	        }elseif(($pages>$this->page_show_row) && ($curr_page+$this->page_offset < $pages)){
	            $multipage .= " <a  href=\"" . $join_str .$this->delimiter . $pages.   "$url_extension\">$last_label</a> ";
	        }
	    }
	
	    return $multipage;
	}
	
	
	
	
	
	/**
	 * 分页函数：JS控制无刷新分页 样式如： <上一页 1... 2 3 4 5...total 下一页>
	 * @param $num 总数量
	 * @param $perpage 每页显示
	 * @param $curr_page 当前页码
	 * @param $mpurl url 页面跳转url
	 * @return string
	 */
	public function showNofr($num, $perpage, $curr_page, $mpurl = '')
	{
		$curr_page = (int)$curr_page;
		$curr_page = ($curr_page === 0) ? 1: $curr_page;
		$multipage = '';
		//url处理
		if($mpurl == '') {
			$mpurl = $_SERVER['PHP_SELF'];
		}
		if($num > $perpage) {
			$page = $this->page_show_row;
			//显示偏移
			$offset = $this->page_offset;
			$pages = ceil($num / $perpage);
			$from = $curr_page - $offset;
			$to = $curr_page + $page - $offset - 1;
			if($page > $pages) {
				$from = 1;
				$to = $pages;
			} else {
				if($from < 1) {
					$to = $curr_page + 1 - $from;
					$from = 1;
					if(( $to - $from ) < $page && ( $to - $from ) < $pages) {
						$to = $page;
					}
				} elseif($to > $pages) {
					$from = $curr_page - $pages + $to;
					$to = $pages;
					if(( $to - $from ) < $page && ( $to - $from ) < $pages) {
						$from = $pages - $page + 1;
					}
				}
			}

			//上一页
			if($curr_page != 1) {
				$t = $curr_page - 1;
				$multipage .= " <a href =\"" . $mpurl . "\" class='pageup'  title='上一页' data-current=".$t."><em></em>上一页</a> ";
			} else {
				$multipage .= ' <a class="pageup pageup-dis disabled" href="javascript:void(0);" title="上一页"><em></em>上一页</a> ';
			}

			//第一页...
			if($from > 1) {
				$multipage .= " <a href =\"" . $mpurl . "\" data-current=1>1</a> ";
				$multipage .= ' <span>…</span>';
			}

			//中间
			for($i = $from; $i <= $to; $i++) {
				if($i != $curr_page) {
					$multipage .= " <a href=\"" . $mpurl . "\" data-current=".$i.">" . $i . "</a> ";
				} else {
					$multipage .= ' <a class="active" href="javascript:void(0);">' . $i . '</a> ';
				}
			}

			//...总页数显示
			if(($pages>$this->page_show_row) && ($curr_page+3 < $pages)&&($pages!=6)){
				$multipage .= ' <span>…</span>';
				$multipage .= " <a  href=\"" . $mpurl . "\" data-current=".$pages.">" . $pages . "</a> ";
			}elseif(($pages>$this->page_show_row) && ($curr_page+2 < $pages)){
				$multipage .= " <a  href=\"" . $mpurl . "\" data-current=".$pages.">" . $pages . "</a> ";
			}

			//下一页
			if($curr_page != $pages) {
				$t = $curr_page + 1;
				$multipage .= " <a href =\"" . $mpurl  . "\" class='pagedown' title='下一页' data-current=".$t.">下一页<em></em></a> ";
			} else {
				$multipage .= ' <a class="pagedown pagedown-dis disabled" href="javascript:void(0)" title="下一页">下一页<em></em></a> ';

			}
		}
		return $multipage;
	}

	/**
	 * 返回分页路径
	 *
	 * @param $urlrule 分页规则
	 * @param $page 当前页
	 * @param $array 需要传递的数组，用于增加额外的方法
	 * @return 完整的URL路径
	 */
	private function pageurl($urlrule, $page, $array = array())
	{
		if(strpos($urlrule, '~')) {
			$urlrules = explode('~', $urlrule);
			$urlrule = $page < 2 ? $urlrules[0] : $urlrules[1];
		}
		$findme = array('{$page}');
		$replaceme = array($page);
		if(is_array($array))
			foreach($array as $k => $v) {
				$findme[] = '{$' . $k . '}';
				$replaceme[] = $v;
			}
		$url = str_replace($findme, $replaceme, $urlrule);
		$url = str_replace(array('http://', '//', '~'), array('~', '/', 'http://'), $url);
		return $url;
	}

	/**
	 * URL路径解析，pages 函数的辅助函数
	 *
	 * @param $par 传入需要解析的变量 默认为，page={$page}
	 * @param $url URL地址
	 * @return URL
	 */
	private function url_par($par, $url = '')
	{
		if($url == '')
			$url = $this->get_url();
		$pos = strpos($url, '?');
		if($pos === false) {
			$url .= '?' . $par;
		} else {
			$querystring = substr(strstr($url, '?'), 1);
			parse_str($querystring, $pars);
			$query_array = array();
			foreach($pars as $k => $v) {
				if($k != 'page')
					$query_array[$k] = $v;
			}
			$querystring = http_build_query($query_array) . '&' . $par;
			$url = substr($url, 0, $pos) . '?' . $querystring;
		}

		return $url;
	}

	/**
	 * 返回当前地址信息
	 * @return string
	 */
	private function get_url()
	{
		return "http://" . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"];
	}
}
