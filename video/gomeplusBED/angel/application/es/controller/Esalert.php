<?php
/*
 * php es业务逻辑
 * cli执行方法
 * ********************************正常和关键字
 * php index.php es/esalert/start pro normal/word
 * php index.php pathinfo 环境类别  数据类型
 * ********************************慢查询
 * php index.php es/esalert/start pro slow  慢查询-具体配置在extra/config.php中配置
 * by: maoxiaoqi  17.03.14
 * */

namespace app\es\controller;

vendor( 'elastic/es' );
vendor( 'elastic/driver/promotion' );
vendor( 'elastic/docs' );

//zabbix
vendor( 'elastic/zabbix' );
vendor( 'elastic/driver/zabbix_interface' );

class Esalert {

	//报警级别 (对应错误日志的错误码)    DEBUG|ERR
	private $alert_level = 'ERR';

	//cli请求参数
	protected $argv = [];

	//环境变量
	protected $env = 'pro';

	//数据类型 normal,word,slow
	protected $type = "normal";

	//环境对应文本
	public $env_text = [ "pre" => '预生产', 'pro' => '生产' ];

	/*
	 * 架构函数
	 * */
	public function __construct() {

		//初始化请求参数,环境变量设置
		$this->argv = $this->cli_argv();

		//初始化ES API
		$this->es = $this->set_host();

		//初始化 jsonrpc
		$this->zabbix = new \elastic\zabbix();
		$this->zabbix_api = new \elastic\driver\zabbix_interface();
	}

	/*
	 * 设置HOST
	 * @return object
	 * */
	public function set_host() {
		!in_array( $this->env, ['pre', 'pro'] ) && die( "只允许pre,pro等环境变量." );

		$host = config( 'es_env' )[ $this->env ];

		return new \elastic\es( $host );
	}

	/*
	 * 获取cli参数
	 * @return []
	 * */
	private function cli_argv() {
		$argv = ( isset( $_SERVER['argv'] ) ) ? $_SERVER['argv'] : [] ;

		//设置环境变量
		if( isset( $argv[2] ) ) $this->env = $argv[2];

		//设置数据类型
		if( isset( $argv[3] ) ) $this->type = $argv[3];
		return $argv;
	}

	/*
	 * ES警报工具
	 * */
	public function start() {

		switch( $this->type ) {
			case 'normal':
				//常规 类型搜索
                $doc = \elastic\docs::search_normal( $this->alert_level, '10' );
				$this->pc( $doc );
				break;
			case 'word':
				//关键字URI聚合搜索: curl_simple_url
				$words = ( !empty( config( 'words' ) ) ) ? config( 'words' ) : [] ;

				foreach( $words as $k => $v ) {
                    $ext = ( isset( $v['ext'] ) ) ? $v['ext'] : [] ;
                    $doc = \elastic\docs::search_url_word( $k, $v['times'], $this->alert_level, '20', $ext );
					$this->pc( $doc, $k );
				}
				break;
			case 'slow':
				//慢查询日志
				$doc = \elastic\docs::search_slow();
				$this->alert_level = 'SLOW';
				$this->pc( $doc );
				break;
			default:
				return "类别不存在.";
		}
	}

	/*
	 * web直接访问 - 促销导出excel
	 * */
	public function promotion() {
		$st = ( isset( $_POST['st'] ) ) ? $_POST['st'] : date( "Y-m-d H:i:s", time() - 7200 ) ;
		$ed = ( isset( $_POST['ed'] ) ) ? $_POST['ed'] : date( "Y-m-d H:i:s" ) ;
		$downlaod = ( isset( $_POST["download_submit"] ) ) ? $_POST["download_submit"] : 0 ;

		//获取所有域名数据
		$doc = \elastic\docs::promotion( $st, $ed );
		$data = $this->es->search('logstash-nginx_access*', $doc);
		$result = ( isset( $data['aggregations']['domain']['buckets'] ) ) ? $data['aggregations']['domain']['buckets'] : [] ;

		//获取apiplus数据
		$apiplus_doc = \elastic\docs::promotion_apiplus( $st, $ed );
		$apiplus_data = $this->es->search('logstash-apiplus-*', $apiplus_doc);
		$apiplus_result = ( isset( $apiplus_data['aggregations']['domain']['buckets'][0] ) ) ?$apiplus_data['aggregations']['domain']['buckets'][0] : [] ;
		if( $result && $apiplus_result ) $result[] = $apiplus_result;

		//重新排序
		if( $result ) {
			$lst = [];
			foreach( $result as $k => $v ) {
				$lst[$k] = $v['doc_count'];	
			}	
			array_multisort( $lst, SORT_DESC, $result );
		}

		//处理数据
		$result = \elastic\driver\promotion::promotion_handler( $result );


		$html = '';
		$class_name = ( !empty( $downlaod ) ) ? "excel_header" : "html_header" ;
		$html .= \elastic\driver\promotion::$class_name();
		if( !$downlaod ) $html .= \elastic\driver\promotion::get_input_html( $st, $ed );
		$html .= \elastic\driver\promotion::promotion_handler_format( $result, $st);

        //拼接zabbix数据
        $html .= $this->zabbix_api->html_cat();
        $hostid = current( $this->zabbix_api->hostids()['lists'] )['hostid'];
        $html .= '<div node-data="zbx_box">'.$this->zabbix_api->html_table( $hostid ).'</div>';

		echo $html;
	}

    /*
     * 获取zabbix系统数据
     * @return html
     * */
    public function zabbix_system() {
        $hostid = $_GET['hostid'];

        return $this->zabbix_api->html_table( $hostid );
    }
	
	/*
	 * 类别选择
	 * @param $_id string 数据唯一ID
	 * @param $type string w/r    w=写入  r=读取
	 * @param $word string 关键字 如果类型=word  填写即可
	 * @return bool
	 * */
	public function switch_type( $_id, $type = 'w', $word = '' ) {

		switch( $this->type ) {
			//常规
            case "normal":
				//写入数据
                if( $type == 'w' ) cache( 'delimiter_id', $_id);

				//读取数据
				if( $type == 'r' ) return ( cache( 'delimiter_id' ) == $_id ) ? true : false ;
                break;
			//关键字
            case "word":
				$md5_word = md5( $word );

				//写入数据
                if( $type == 'w' ) cache( 'delimiter_'.$md5_word, $_id);

//				echo $word;
//				echo cache( 'delimiter_'.$md5_word ).'=='.$_id."\n";
				//读取数据
				if( $type == 'r' ) return ( cache( 'delimiter_'.$md5_word ) == $_id ) ? true : false ;

                break;
			//慢查询
			case "slow":
				//写入数据
                if( $type == 'w' ) cache( 'delimiter_slow_id', $_id);

				//读取数据
				if( $type == 'r' ) return ( cache( 'delimiter_slow_id' ) == $_id ) ? true : false ;
                break;
        }

	}

	/*
	 * 关键字条数限制 - 如果超出规定条数就发邮件,没超出false
	 * @param $data [] ES返回的数据
	 * @param $word string url关键字
	 * @return bool
	 * */
	public function word_limit( $data, $word ) {
		if( !$word ) return false;
		$aggs = ( isset( $data['aggregations']['url_words']['buckets'] ) ) ? $data['aggregations']['url_words']['buckets'] : [] ;

		//找出来聚合count
		$count_num = 0;
		foreach( $aggs as $k => $v ) {
			if( strtolower($v['key']) == strtolower( $word ) ) {
				$count_num = $v['doc_count'];
				break;
			}
		}

		if( empty( $count_num ) ) return false;
		$cfg = config( 'words' )[$word];

		//检查是否超出规定日志条数
		return ( $count_num >= $cfg['doc_count'] ) ? true : false ;
	}

	/*
	 * PC错误报警
	 * @param $doc json 查询文档
	 * @param $word string 关键字
	 * @return bool
	 * */
	public function pc( $doc = '', $word = '' ) {
		if( empty( $doc ) ) return "没有数据文档";

		//查询数据
		$data = $this->es->search('logstash-web_access*', $doc);
//		echo json_encode($data);exit;

		//对ES原始数据处理  - 关键字
		if( $this->type == 'word' ) {

			//关键字限制
			if( !$this->word_limit( $data, $word ) ) {
				$doc_count = config( 'words' )[$word]['doc_count'];
				echo "{$word} 没超出规定 {$doc_count} 日志条数.不用发送邮件 \r\n";

				$logs = [];
				return false;
			}
		}

		//提取ES原始错误日志
		$rs = ( isset( $data['hits']['hits'] ) ) ? $data['hits']['hits'] : die( '数据为空' ) ;

		$new_data = $html_arr = [];
		foreach( $rs as $k => $v) {

			//通过类别-读取 bool
			if( $this->switch_type( $v['_id'], 'r', $word ) ) break;

			//如果是关键字 过滤不存在的数据
			if( $this->type == 'word' && isset( $v['_source']['message']['curl_simple_url'] ) ) {
				if( !strstr( $v['_source']['message']['curl_simple_url'], $word ) ) continue;
			}

			//写入数据
			$new_data[] = $v;

			//组合HTML日志列表
			$html_arr[] = $this->email_body( $v );
		}

		if( !empty( $new_data ) && isset( $new_data[0] ) ) {
			//通过类别-保存唯一ID
			$this->switch_type( $new_data[0]['_id'], 'w', $word );

		} else {
			echo "$word \r\n {$this->type} 没有最新日志信息 \r\n";
			return false;
		}

//		echo $doc;
//		echo $word;
//		print_r($new_data);
//		return true;

		//组合邮件内容
		$email_content = ( !empty( $html_arr ) ) ? $this->email_content( implode( $html_arr, '' ), $word ) : '' ;

		//发送邮件
		foreach( config( 'email_lists' ) as $ek => $v ) {
			if( empty($v) ) continue;

			$s = $this->send_mail(
                $v,
                $this->env_text[ $this->env ].'-angel['.$this->alert_level.']',
                $email_content,
                $new_data
            );

			echo ( $s ) ? "$v - 已执行 \n 邮件结束============ \r\n" : "$v - 失败\r\n" ;
		}
	}

	/*
	 * 发送邮件
	 * @param $toemail string 收件人邮箱
	 * @param $title string 邮件标题
	 * @param $content string 正文内容
	 * @param $new_data [] 邮件错误日志列表
	 * @return void
	 * */
	public function send_mail( $toemail, $title = "angel", $content, $new_data ) {
		if(empty( $toemail ) || empty($content) ) return false;

		if( !send_mail( $toemail, $title, $content) ) {
			$d = [];
			$d['toemail'] = $toemail;
			$d['msg'] = "邮件发送失败";
			$d['data'] = $new_data;
			trace( $d, 'ES_EMAIL_LOG_ERR');

			return 0;
		} else {
			return 1;
		}
	}

    /*
	 * 邮件框架内容模板
	 * @param $data [] 日志格式
     * @param $words [] 关键字
	 * @return html
	 * */
	protected function email_content( $body, $words = '' ) {

		//关键字title
		$word_title= '';
		if( $this->type == 'word' ) {
			$word_title=<<<EOF
            <tr>
              <td style="">
                <span style="font-size:16px;line-height:21px;color:#141823;">关键字:{$words}</span></td>
            </tr>
EOF;
		}

		$title = $this->env_text[ $this->env ];
		$html =<<<HOT
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>{$title} - angel</title>
</head>
<body style="margin:0;padding:0">

        <table cellspacing="0" cellpadding="0" width="100%" style="border-collapse:collapse;">
          <tbody>
          {$word_title}
          <!--
            <tr>
              <td style="">
                <span style="font-size:16px;line-height:21px;color:#141823;">{$title} - 错误日志</span></td>
            </tr>
            -->
          </tbody>
        </table>
		{$body}
</body>
</html>
HOT;
		return $html;
	}

    /*
	 * 邮件body内容模板
	 * @param $data [] 日志格式
	 * @return html
	 * */
	protected function email_body( $data ) {
		if( empty( $data ) || !is_array( $data ) ) return false;

		$json = _format_json( json_encode( $data ) );
		$source = ( isset( $data['_source'] ) ) ? $data['_source'] : [] ;
		$curl_req_time = ( isset( $source['message']['curl_consume_time'] ) ) ? $source['message']['curl_consume_time'] : '未知' ;

		$html =<<<HOT
<table cellspacing="0" cellpadding="0" width="100%" style="border-collapse:collapse;">
  <tbody>
    <tr>
      <td style="">
        <table cellspacing="0" cellpadding="0" width="100%" style="border-collapse:collapse;">
          <tbody>
            <tr>
              <td style="">
                <table cellspacing="0" cellpadding="0" width="100%" style="border-collapse:collapse;">
                  <tbody>
                    <tr>
                      <td style="height:25px;line-height:25px;font-size:11px;background:#f2f2f2;border:solid 1px #e5e5e5;border-top:0;border-radius:0 0 2px 2px;padding:0px 10px;display:block;">

                      <table>
                      	<tr>
                      		<td style="width:20%">时间:{$source['request_time']}</td>
                      		<td style="width:20%">请求:{$source['request_method']}</td>
                      		<td style="width:20%">curl消耗时间:{$curl_req_time}</td>
                      	</tr>
                      </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="font-size:11px;border:solid 1px #e5e5e5;border-radius:2px 2px 0 0;padding:10px;display:block;">
                      <pre style="padding:0;margin:0px;">
                      <textarea style="font-size:12px;width:100%;height:200px;">{$json}</textarea>
                      </pre>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
<style id="ntes_link_color" type="text/css">a,td a{color:#34783B}</style>
HOT;

		return $html;
	}

}
