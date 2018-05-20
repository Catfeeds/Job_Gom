<?php
/*
 * 促销活动组件 
 * by: maoxiaoqi  17.06.14
 * */
namespace elastic\driver;

class promotion {

	/*
	 * 构造方法
	 * @return void
	 * */
    public function __construct( $host = [] ) {
		$this->host = ( isset( $host['host'] ) ) ? $host['host'] : $this->host ;
		$this->port = ( isset( $host['port'] ) ) ? $host['port'] : $this->port;
    }

	/*
	 * 促销数据处理
	 * @param $data [] 一维数据
	 * */
	public static function promotion_handler( $data ) {
		if( empty( $data ) ) return $data;
		//拿出总数	
		$count = [];
		foreach( $data as $k => $v ) $count[] = $v['doc_count'];
		$_count = array_sum( $count );

		//计算百分比
		foreach( $data as $k => &$v ) {
			$v['b'] = sprintf( "%0.2f", $v['doc_count']/$_count*100 );	
		}

		return $data;
	}

	/*
	 * EXCEL
	 * */
	public static function excel_header() {
		$date = date( "Y-m-d_H:i" );
		header('Content-Type:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
		header("Content-Disposition:attachment;filename={$date}.xls");

		$html =<<<EOF
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">

<head>
<meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
<meta name=ProgId content=Excel.Sheet>
<meta name=Generator content="Microsoft Excel 15">
</head>
<body>
EOF;

		return $html;
	}

	public static function html_header() {
		$html =<<<EOF
<html lang="zh-CN">
<head>
	<title>数据统计</title>
<style>
body {font-size:9pt} 
.btn {background-color:#fff;border:1px solid #ccc;height:30px;cursor:pointer;}
.box {width:100%;font-size:9pt;border:1px solid #ccc;}
.box thead {font-weight:800;}
.cat {font-size:17px;font-weight:800;height:30px;border-top:1px solid #ccc}
.zabbix_system {font-size:17px;font-weight:800;margin:0 0 10px 0;}
.zabbix_box {width:100%;font-weight:800;margin:10px 0 10px 0}
</style>
<script src="/public/static/js/jquery.min.js"></script>
<script src="/public/static/js/zabbix.js"></script>
</head>
<body>
EOF;
		echo $html;
	}

	/*
	 * 日期input
	 * @return html
	 * */
	public static function get_input_html( $st, $ed ) {
		$html =<<<HTML
<form action="" method="post" style="width:100%;" id="form1">
<input name="st" type="text" value="{$st}" style="border:1px solid #ccc;height:30px;line-height:30px;width:140px; text-align:center;" />
 - 
<input name="ed" type="text" value="{$ed}" style="border:1px solid #ccc;height:30px;line-height:30px;width:140px;text-align:center;" />
<input type="submit" name="submit" value="查询数据" class="btn" />

	<input type="submit" name="download_submit" value="下载Excel" class="btn" style="width:100%;background:#ff0000;color:#fff;margin-top:10px;"/>
</form>
HTML;
	
		return $html;
	}

	public static function promotion_handler_format( $data, $st ) {
		if( empty( $data ) ) return '';

		$_date = date( "md-H:i", strtotime( $st ) );
		$line_html = [];
		foreach( $data as $k => $v ) {
			$line_html[] =<<<HTML
			<tr style="line-height:25px;">
				<td style="width:180px;">{$v['key']}</td>
				<td style="width:20%;">{$_date}</td>
				<td style="width:20%;">{$v['doc_count']}</td>
				<td style="width:20%;">{$v['b']}%</td>
			</tr>	
HTML;
		}

		$str = implode( $line_html, '' );
		$html =<<<HOT
		<table class="box">
			<thead>
			<tr>
				<td>Plus PC域名</td>
				<td>时间</td>
				<td>访问量</td>
				<td>占比</td>
			</tr>	
			</thead>
			{$str}
	    </table>
</body>
</html>
HOT;
		return $html;
	}
}
