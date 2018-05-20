<?php
/*
 * es 快速操作文档列表
 * by: maoxiaoqi  17.03.14
 * */
namespace elastic;

class docs {

    protected static $project_name = "gomeo2o_pc";

	/*
	 * 促销 apiplus DSL
	 * @return dsl
	 * */
	public static function promotion_apiplus( $st, $ed ) {
		if( empty( $st ) || empty( $ed ) ) return false; 
		$sttime = gmdate( DATE_ATOM, strtotime( $st ) );
		$edtime = gmdate( DATE_ATOM, strtotime( $ed ) );
		$docs =<<<DOC
{
    "query": {
        "bool": {
            "must" : [
                {
                    "match": {
						"syslogtag": "apiplus"
                    }
                },
				{
                    "match": {
						"domain": "api-pluspc.gome.com.cn"
                    }
                },
				{
                    "range": {
                        "@timestamp": {
                            "gte": "{$sttime}",
                            "lt": "{$edtime}"
                        }
                    }
                }
            ]
        }
	},
	"aggs": {
        "domain": {
            "terms": {
                "field": "domain",
				"order": { "_count" : "desc" },
                "size":20
            }
        }
    },
	"size":0,
	"sort": {
        "@timestamp" : { "order": "desc" }
    }
}
DOC;
		return $docs;
	}


	/*
	 * 促销DSL
	 * @return dsl
	 * */
	public static function promotion( $st, $ed ) {
		if( empty( $st ) || empty( $ed ) ) return false; 
		$sttime = gmdate( DATE_ATOM, strtotime( $st ) );
		$edtime = gmdate( DATE_ATOM, strtotime( $ed ) );
		$docs =<<<DOC
{
    "query": {
        "bool": {
            "must" : [
                {
                    "match": {
                        "syslogtag": "nginx_access"
                    }
                },
				{
                    "range": {
                        "@timestamp": {
                            "gte": "{$sttime}",
                            "lt": "{$edtime}"
                        }
                    }
                }
            ]
        }
	},
	"aggs": {
        "domain": {
            "terms": {
                "field": "domain",
				"order": { "_count" : "desc" },
                "size":20
            }
        }
    },
	"size":0,
	"sort": {
        "@timestamp" : { "order": "desc" }
    }
}
DOC;
		return $docs;
	}

    /*
     * 慢查询相关
     * @param $gte_time int 大于当前时间
     * @param $limit int 调用多少条数据
     * @param $order string desc|asc
     * */
    public static function search_slow( $order = 'desc' ) {
        //通过模拟测试ERR数据使用tie_breaker参数，所有匹配的子句都会起作用，只不过最佳匹配子句的作用更大。
        $slow = config( 'slow' );
        $project_name = self::$project_name;
        $docs =<<<DOC
{
    "query": {
        "bool": {
            "must" : [
                {
                    "match": {
                        "project_name": "{$project_name}"
                    }
                },
                {
                    "range": {
                        "message.curl_consume_time.raw": {
                            "from": "{$slow['gte_numbers']}",
                            "to":"25"
                        }
                    }
                },
                {
                    "range": {
                        "@timestamp": {
                            "gte": "now-{$slow['times']}"
                        }
                    }
                }
            ]
        }
    },
    "size": {$slow['limit']},
    "sort": {
        "message.curl_consume_time.raw" : { "order": "{$slow['order']}" }
    }
}
DOC;

        return $docs;
    }

    /*
     * 快速搜索（标准 - 常规） 搜索条件根据 type
     * @param $syslogtag string 日志标识,例如: pre_adev_app_pc预生产PC
     * @param $type string 错误类型
     * @param $limit int 调用多少条数据
     * @param $order string desc|asc
     * */
    public static function search_normal( $type = "ERR", $limit = 10, $order = 'desc' ) {

        //通过模拟测试ERR数据使用tie_breaker参数，所有匹配的子句都会起作用，只不过最佳匹配子句的作用更大。
        $project_name = self::$project_name;
        $docs =<<<DOC
{
    "query": {
        "bool": {
            "must" : [
                {
                    "match": {
                        "type": "{$type}"
                    }
                },
                {
                    "match": {
                        "project_name": "{$project_name}"
                    }
                }
            ],
            "must_not": [
                {
                    "match": {
                        "message.curl_simple_url" : "http://api.bs.pro.gomeplus.com/v3/ext/social/nextTopic"
                    }
                }
            ]
        }
    },
    "size": {$limit},
    "sort": {
        "@timestamp" : { "order": "{$order}" }
    }
}
DOC;

        return $docs;
    }

    /*
     * 聚合搜索 curl_simple_url
     * @param $word string url关键字
     * @param $times string ES时间,例如:15d/h/m/s
     * @param $type string 错误类型 例如:ERR,DEBUG,INFO等,具体参考日志标准
     * @param $limit int 调用多少条数据
     * @param $ext [] 符合参数 配置文件配置
     * @return json
     * */
    public static function search_url_word( $word, $times='15m',$type = "ERR", $limit = 10, $ext = []  ) {
        if( empty( $word ) ) return false;
        //user/loginTokenGenerateAction
        $project_name = ( isset( $ext['project_name'] ) ) ? $ext['project_name'] : self::$project_name ;
        $docs =<<<DOC
{
    "query": {
        "bool": {
            "must" : [
                {
                    "match": {
                        "type": "{$type}"
                    }
                },
                {
                    "match": {
                        "message.curl_simple_url.raw": "{$word}"
                    }
                },
                {
                    "match": {
                        "project_name": "{$project_name}"
                    }
                },
                {
                    "range": {
                        "@timestamp": {
                            "gte": "now-{$times}"
                        }
                    }
                }
            ]
        }
    },
    "aggs": {
        "url_words": {
            "terms": {
                "field": "message.curl_simple_url.raw",
                "size":50
            }
        }
    },
    "size": {$limit},
    "sort": {
        "@timestamp" : { "order": "desc" }
    }
}
DOC;

        return $docs;
    }

    /*
     * 测试专用
     * @return doc
     * */
    public static function test_doc() {
		return <<<DOC
{
    "query": {
        "bool": {
            "must" : [
                {
                    "match": {
                        "project_name": "gomeo2o_pc_api"
                    }
                },
				{
                    "match": {
						"message.curl_simple_url.raw": "http://api-cms.pro.gomeplus.com/v2/slot/gome/hotTopic.json"
                    }
                },
                {
                    "range": {
                        "@timestamp": {
                            "gte": "now-30d"
                        }
                    }
                }
            ]
        }
	},
	"size":10,
	"sort": {
        "@timestamp" : { "order": "desc" }
    }
}
DOC;
	}

}

