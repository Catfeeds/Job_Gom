<?php
/*
 * zabbix ap操作列表
 * by: maoxiaoqi  17.03.14
 * */
namespace elastic\driver;

use elastic\zabbix;

class zabbix_interface extends zabbix {

	//主机列表
	protected $hosts = [
		"bj02-ic-ngx01.pro.gomeplus.com",
		"bj02-ic-ngx02.pro.gomeplus.com",
		"bj02-ic-ngx03.pro.gomeplus.com",
//        "bj02-ic-ngx04.pro.gomeplus.com",
//        "bj02-ic-basic01.pro.gomeplus.com",
//        "bj02-ic-basic02.pro.gomeplus.com",
//        "bj02-ic-tcat01.pro.gomeplus.com",
//        "bj02-ic-tcat02.pro.gomeplus.com",
//        "bj02-ic-h501.pro.gomeplus.com",
//        "bj02-ic-h502.pro.gomeplus.com"
	];

	public function __construct() {
        parent::__construct();
	}

	/*
	 * 获得主机hostids
	 * @return [] | 一维数组
	 * */
	public function hostids() {
		$data = [];
		$data['method'] =  'host.get';
		$data['params']['output'] =  ["name","hostid","host","status"];
		$data['params']['filter']['host'] = $this->hosts;

		$res= $this->api( $data );

        $ids = [];
        if( $res ) foreach( $res as $k => $v ) {
            if( !isset( $v['hostid'] ) ) continue;
            $ids['hostids'][] = $v['hostid'];
            $ids['lists'][ $v['hostid'] ] = $v;
        }

        return $ids;
	}

    /*
     * 获取itemids 合并一维
     * @hostid int hostid
     * @return []
     * */
    public function get_itemids ( $hostid = 0 ) {
        if( empty( $hostid ) ) return $hostid;
        $data = config( 'zabbix_itemids' )[ $hostid ];

        $ids = [];
        foreach( $data as $k => $v ) {
            foreach( $v as $k1 => $v1 )  $ids[] = $v1;
        }

        return $ids;
    }

    /*
     * 获取主机所有itemids
     * @return []
     * */
    private function itemids( $hostid = '' ) {
        if( empty( $hostid ) ) return $hostid;

        $data = [];
        $data['method'] = 'item.get';
        $data['params']['output'] = ["itemid", "hostid", "name", "lastclock", "lastvalue", "prevvalue", "key_", "lastns", "templateid"];
        $data['params']['hostids'] = $this->hostids()['hostids'];
        $data['params']['itemids'] = $this->get_itemids( $hostid );
        $data['params']['sortfield'] = 'key_';
        $data['params']['sortorder'] = 'ASC';


        return ( $this->api( $data ) ) ? $this->api( $data ) : [] ;
    }

    /*
     * 对itemids 进行分类
     * @param $itemids [] 一维itemids
     * @param $hostid int hostid
     * @return []
     * */
    public function split_itemids( $itemids = [], $hostid = 0 ) {
        if( empty( $itemids ) || empty( $hostid ) )  return $itemids;
        $cfg = config( 'zabbix_itemids' )[$hostid];

        $ids = [];
        foreach( $cfg as $k => $v ) {
            foreach( $v as $k1 => $v1 ) {
                foreach( $itemids as $ik => $iv ) {
                    if( $v1 == $iv['itemid'] ) {
                        $ids[$k][$v1] = $iv;
//                        echo $k."==".$v1."\n";
                    }
                }
            }
        }

        return $ids;
    }

    /*
     * 格式化数据
     * @param $type string 大分类
     * @param $sub_type string key_
     * @return string
     * */
    public function format( $type, $value, $sub_type ) {

        switch( $type ) {
            case 'memory':
                return size2mb($value,4);
                break;
            case 'cpu':
                return sprintf( "%0.4f%s",$value,'%' );
                break;
            case 'disk':
                return ( $sub_type == 'disk.status[sda,wKBps]' ) ? size2mb($value,4) : sprintf( "%0.2f",$value ) ;
                break;
            case 'filessystem':
                switch( $sub_type ) {
                    case 'vfs.fs.size[/,total]':
                        return size2mb($value, 4);
                        break;
                    case 'vfs.fs.size[/gomeo2o,total]': case 'vfs.fs.size[/,free]':
                        return size2mb($value, 2);
                        break;
                    case 'vfs.fs.inode[/gomeo2o,pfree]': case 'vfs.fs.size[/gomeo2o,pfree]':
                        return sprintf( "%0.2f%s", $value, '%' );
                        break;
                    default:
                        return $value;
                }
                break;
            default:
                return $value;

        }
    }

    /*
     * 格式化名称
     * @return string
     * */
    public function format_name( $type, $value ) {
        switch( $type ) {
            case 'vfs.fs.size[/gomeo2o,pfree]':
                return "Free disk space on /gomeo2o";
                break;
            case 'vfs.fs.inode[/gomeo2o,pfree]':
                return 'Free inodes on /gomeo2o (percentage)';
                break;
            case 'vfs.fs.size[/gomeo2o,total]':
                return 'Total disk space on /gomeo2o';
                break;
            case 'vfs.fs.size[/,total]':
                return 'Total disk space on /';
                break;
            case 'vfs.fs.size[/,free]':
                return 'Free disk space on /';
                break;
            default:
                return $value;

        }
    }

    public function html_cat() {
        //遍历主机
        $host_select = '';
        foreach( $this->hostids()['lists'] as $k => $v ) {
            $host_select .= '<option value="'.$k.'">'.$v['host'].'</option>';
        }

        $html =<<<EOF
<table class="zabbix_box">
            <tr>
                <td width="80%">系统运行状态</td>
                <td width="20%">
                <select action-data="host_lists">
                    {$host_select}
                </select>
                </td>
            </tr>
        </table>
EOF;

    return $html;
    }
    public function html_table( $hostid ) {
        $itemids = $this->itemids( $hostid );
        $data = $this->split_itemids( $itemids, $hostid );

        $line_html = [];
        foreach( $data as $k => $v) {
            $cat = '<tr><td colspan="4" class="cat">'.$k.'</td></tr>';

            foreach( $v as $k1 => $v1 ) {;
                $lock = date( "Y-m-d H:i:s", $v1['lastclock'] );

                $lastvalue = $this->format( $k, $v1['lastvalue'], $v1['key_'] );
                $prevvalue = $this->format( $k, $v1['prevvalue'], $v1['key_'] );
                $name = $this->format_name( $v1['key_'], $v1['name'] );
//                echo $v1['name']."==".$v1['key_']."<br/>";

                //doc
                $line_html[] =<<<HTML
                {$cat}
                <tr style="line-height:25px;">
                    <td style="width:180px;">{$name}</td>
                    <td style="width:20%;">{$lock}</td>
                    <td style="width:20%;">{$lastvalue}</td>
                    <td style="width:20%;">{$prevvalue}</td>
                </tr>
HTML;
                $cat = '';
            }

        }

        $str = implode( $line_html, '' );

        $html =<<<HTML
        <table class="box">
			<thead style="height:35px;">
			<tr>
				<td>名称</td>
				<td>最近检查时间</td>
				<td>最新数据</td>
				<td>上一次数据</td>
			</tr>
			</thead>
			{$str}
	    </table>
HTML;

        return $html;
    }

    /*
     * Free swap space
     * @return []
     * */
    public function free_swap_space () {
        $data = [];
        $data['method'] = 'item.get';
        $data['params']['output'] =  ["name","key_","lastclock","lastvalue","prevvalue","templateid", "itemid", "hostid", "templateid"];
        $data['params']['search']['key_'] = 'system.swap.size[,total]';
        $data['params']['hostids'] = $this->hostids()['hostids'];

        return $this->api( $data );

    }

}

